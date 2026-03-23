import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  website?: string;
};

type ErrorResponse = {
  ok: false;
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string>;
  };
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

declare global {
  var __contactRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

function getRateLimitStore(): Map<string, RateLimitEntry> {
  if (!globalThis.__contactRateLimitStore) {
    globalThis.__contactRateLimitStore = new Map<string, RateLimitEntry>();
  }
  return globalThis.__contactRateLimitStore;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

function createErrorResponse(
  status: number,
  code: string,
  message: string,
  fieldErrors?: Record<string, string>,
): NextResponse<ErrorResponse> {
  return NextResponse.json(
    {
      ok: false,
      error: { code, message, fieldErrors },
    },
    { status },
  );
}

function enforceRateLimit(ip: string): {
  limited: boolean;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const store = getRateLimitStore();

  if (store.size > 500) {
    for (const [key, value] of store.entries()) {
      if (value.resetAt <= now) {
        store.delete(key);
      }
    }
  }

  const current = store.get(ip);
  if (!current || current.resetAt <= now) {
    store.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((current.resetAt - now) / 1000),
    );
    return { limited: true, retryAfterSeconds };
  }

  current.count += 1;
  store.set(ip, current);
  return { limited: false };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(input: unknown): {
  valid: boolean;
  data?: ContactPayload;
  fieldErrors?: Record<string, string>;
  honeypotFilled?: boolean;
} {
  if (!isRecord(input)) {
    return {
      valid: false,
      fieldErrors: { form: "Payload must be a JSON object." },
    };
  }

  const name = asTrimmedString(input.name);
  const email = asTrimmedString(input.email);
  const phone = asTrimmedString(input.phone);
  const message = asTrimmedString(input.message);
  const website = asTrimmedString(input.website);

  const fieldErrors: Record<string, string> = {};

  if (!name) fieldErrors.name = "Name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  if (!message) fieldErrors.message = "Message is required.";

  if (name.length > 120) fieldErrors.name = "Name is too long.";
  if (phone.length > 40) fieldErrors.phone = "Phone is too long.";
  if (message.length > 5000) fieldErrors.message = "Message is too long.";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailPattern.test(email)) {
    fieldErrors.email = "Email format is invalid.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { valid: false, fieldErrors };
  }

  if (website) {
    return { valid: false, honeypotFilled: true };
  }

  return {
    valid: true,
    data: {
      name,
      email,
      message,
      phone: phone || undefined,
      website: undefined,
    },
  };
}

function buildEmailText(payload: ContactPayload): string {
  return [
    "Placeholder contact form submission",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone ?? "-"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = enforceRateLimit(ip);

  if (rateLimit.limited) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "RATE_LIMITED",
          message: "Too many requests. Please try again later.",
        },
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) },
      },
    );
  }

  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = Number(contentLengthHeader);
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return createErrorResponse(
        413,
        "PAYLOAD_TOO_LARGE",
        "Request body is too large.",
      );
    }
  }

  let rawBody = "";
  try {
    rawBody = await request.text();
  } catch {
    return createErrorResponse(400, "INVALID_BODY", "Unable to read request.");
  }

  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    return createErrorResponse(
      413,
      "PAYLOAD_TOO_LARGE",
      "Request body is too large.",
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return createErrorResponse(400, "INVALID_JSON", "Malformed JSON payload.");
  }

  const validation = validatePayload(parsed);
  if (!validation.valid && validation.honeypotFilled) {
    return createErrorResponse(400, "SPAM_DETECTED", "Invalid submission.");
  }

  if (!validation.valid) {
    return createErrorResponse(
      422,
      "VALIDATION_ERROR",
      "One or more fields are invalid.",
      validation.fieldErrors,
    );
  }

  if (!validation.data) {
    return createErrorResponse(500, "INTERNAL_ERROR", "Validation failed.");
  }

  const region = process.env.AWS_REGION;
  const fromEmail = process.env.SES_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!region || !fromEmail || !toEmail) {
    return createErrorResponse(
      500,
      "CONFIG_ERROR",
      "Server email configuration is incomplete.",
    );
  }

  const ses = new SESClient({ region });
  const payload = validation.data;

  try {
    await ses.send(
      new SendEmailCommand({
        Source: fromEmail,
        Destination: {
          ToAddresses: [toEmail],
        },
        ReplyToAddresses: [payload.email],
        Message: {
          Subject: {
            Data: "[Placeholder] New contact submission",
            Charset: "UTF-8",
          },
          Body: {
            Text: {
              Data: buildEmailText(payload),
              Charset: "UTF-8",
            },
          },
        },
      }),
    );
  } catch {
    return createErrorResponse(
      502,
      "EMAIL_SEND_FAILED",
      "Unable to send the message right now.",
    );
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Message accepted.",
    },
    { status: 200 },
  );
}
