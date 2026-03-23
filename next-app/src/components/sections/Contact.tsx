"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  // State for email click-to-copy feedback
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [pressedCard, setPressedCard] = useState<string | null>(null);
  const timeoutRef = useRef<Required<ReturnType<typeof setTimeout>> | null>(null);

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);

      // Clear previous timeout if user clicks multiple times rapidly
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopiedEmail(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const pulseCard = (cardId: string) => {
    setPressedCard(cardId);
    window.setTimeout(() => {
      setPressedCard((prev) => (prev === cardId ? null : prev));
    }, 180);
  };

  return (
    <section id="contact" className="bg-[#e8ddd0]">
      {/* ── Top editorial block ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          {/* Left: headline */}
          <div className="lg:max-w-2xl">
            <h2
              className="text-[#0a0a0a]"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2.75rem, 6vw, 5rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              Let's Build
              <br />
              <span className="italic text-[#c41e2a]">Your Case.</span>
            </h2>
          </div>

          {/* Right: descriptor */}
          <div className="lg:max-w-xs pb-2">
            <div className="w-8 h-px bg-[#c41e2a] mb-5" />
            <p
              className="text-[#4a4035]"
              style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}
            >
              Schedule a free initial consultation. Our team is ready to listen
              and provide the guidance you need to move forward with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* ── Thin rule ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#c9bfb0]" />
      </div>

      {/* ── Contact cards ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:pb-24">
        {/* Mobile: 2x2 cards */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          <a
            href="https://www.google.com/maps/search/?api=1&query=4%2F174+Willoughby+Road%2C+Crows+Nest%2C+NSW%2C+2065"
            target="_blank"
            rel="noreferrer"
            onClick={() => pulseCard("address")}
            className="rounded-xl border border-[#d4cabd] bg-[#e8ddd0] p-4 text-[#2a2218] transition-transform duration-200"
            style={{
              transform: pressedCard === "address" ? "scale(0.97)" : "scale(1)",
              boxShadow:
                pressedCard === "address"
                  ? "0 8px 22px rgba(0,0,0,0.09)"
                  : "none",
            }}
          >
            <MapPin size={16} className="text-[#c41e2a]" />
            <p
              className="mt-3 uppercase text-[#0a0a0a]"
              style={{ fontSize: "0.63rem", letterSpacing: "0.11em", fontWeight: 700 }}
            >
              Address
            </p>
            <p style={{ marginTop: "0.45rem", fontSize: "0.8rem", lineHeight: 1.5 }}>
              4/174 Willoughby Road, Crows Nest, NSW, 2065
            </p>
          </a>

          <a
            href="tel:0208041213"
            onClick={() => pulseCard("phone")}
            className="rounded-xl border border-[#d4cabd] bg-[#e8ddd0] p-4 text-[#2a2218] transition-transform duration-200"
            style={{
              transform: pressedCard === "phone" ? "scale(0.97)" : "scale(1)",
              boxShadow:
                pressedCard === "phone"
                  ? "0 8px 22px rgba(0,0,0,0.09)"
                  : "none",
            }}
          >
            <Phone size={16} className="text-[#c41e2a]" />
            <p
              className="mt-3 uppercase text-[#0a0a0a]"
              style={{ fontSize: "0.63rem", letterSpacing: "0.11em", fontWeight: 700 }}
            >
              Phone
            </p>
            <p style={{ marginTop: "0.45rem", fontSize: "0.95rem", lineHeight: 1.5 }}>
              02 0804 1213
            </p>
          </a>

          <div
            className="rounded-xl border border-[#d4cabd] bg-[#e8ddd0] p-4 text-[#2a2218] transition-transform duration-200"
            style={{
              transform: pressedCard === "email" ? "scale(0.97)" : "scale(1)",
              boxShadow:
                pressedCard === "email"
                  ? "0 8px 22px rgba(0,0,0,0.09)"
                  : "none",
            }}
          >
            <Mail size={16} className="text-[#c41e2a]" />
            <p
              className="mt-3 uppercase text-[#0a0a0a]"
              style={{ fontSize: "0.63rem", letterSpacing: "0.11em", fontWeight: 700 }}
            >
              Email
            </p>
            <div className="mt-2 flex flex-col items-start">
              <button
                type="button"
                onClick={() => {
                  pulseCard("email");
                  void handleCopyEmail("info@destinationlawyers.com");
                }}
                className="text-left text-[#2a2218]"
                style={{ fontSize: "0.8rem", lineHeight: 1.5 }}
              >
                info@destinationlawyers.com
              </button>
              <button
                type="button"
                onClick={() => {
                  pulseCard("email");
                  void handleCopyEmail("chloe.he@destlawyers.com.au");
                }}
                className="mt-1 text-left text-[#2a2218]"
                style={{ fontSize: "0.8rem", lineHeight: 1.5 }}
              >
                chloe.he@destlawyers.com.au
              </button>
              {copiedEmail ? (
                <span className="mt-2 text-[#0a0a0a]" style={{ fontSize: "0.7rem" }}>
                  Copied {copiedEmail}
                </span>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            onClick={() => pulseCard("hours")}
            className="rounded-xl border border-[#d4cabd] bg-[#e8ddd0] p-4 text-left text-[#2a2218] transition-transform duration-200"
            style={{
              transform: pressedCard === "hours" ? "scale(0.97)" : "scale(1)",
              boxShadow:
                pressedCard === "hours"
                  ? "0 8px 22px rgba(0,0,0,0.09)"
                  : "none",
            }}
          >
            <Clock size={16} className="text-[#c41e2a]" />
            <p
              className="mt-3 uppercase text-[#0a0a0a]"
              style={{ fontSize: "0.63rem", letterSpacing: "0.11em", fontWeight: 700 }}
            >
              Hours
            </p>
            <p style={{ marginTop: "0.45rem", fontSize: "0.8rem", lineHeight: 1.5 }}>
              Mon - Fri
              <br />
              9:00 AM - 6:00 PM
              <br />
              Sat: 10:00 AM - 2:00 PM
            </p>
          </button>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* 1. Address Card */}
          <div className="bg-[#e8ddd0] hover:bg-[#0a0a0a] rounded-2xl transition-all duration-300 ease-out hover:shadow-[0_18px_60px_rgba(0,0,0,0.18)] px-8 py-10 flex flex-col gap-5 group">
            <div className="w-10 h-10 border border-[#c41e2a] group-hover:border-white transition-colors duration-300 ease-out flex items-center justify-center flex-shrink-0">
              <MapPin size={18} className="text-[#c41e2a] group-hover:text-white transition-colors duration-300 ease-out" />
            </div>
            <div>
              <p
                className="text-[#0a0a0a] group-hover:text-white transition-colors duration-300 ease-out mb-3 tracking-[0.12em] uppercase"
                style={{ fontSize: "0.6875rem", fontWeight: 700 }}
              >
                Address
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=4%2F174+Willoughby+Road%2C+Crows+Nest%2C+NSW%2C+2065"
                target="_blank"
                rel="noreferrer"
                className="block text-[#2a2218] group-hover:text-white hover:!text-[#c41e2a] cursor-pointer transition-colors duration-300 ease-out"
                style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}
              >
                4/174 Willoughby Road, Crows Nest, NSW, 2065
              </a>
            </div>
          </div>

          {/* 2. Phone Card */}
          <div className="bg-[#e8ddd0] hover:bg-[#0a0a0a] rounded-2xl transition-all duration-300 ease-out hover:shadow-[0_18px_60px_rgba(0,0,0,0.18)] px-8 py-10 flex flex-col gap-5 group">
            <div className="w-10 h-10 border border-[#c41e2a] group-hover:border-white transition-colors duration-300 ease-out flex items-center justify-center flex-shrink-0">
              <Phone size={18} className="text-[#c41e2a] group-hover:text-white transition-colors duration-300 ease-out" />
            </div>
            <div>
              <p
                className="text-[#0a0a0a] group-hover:text-white transition-colors duration-300 ease-out mb-3 tracking-[0.12em] uppercase"
                style={{ fontSize: "0.6875rem", fontWeight: 700 }}
              >
                Phone
              </p>
              <a
                href="tel:0208041213"
                className="block text-[#2a2218] group-hover:text-white hover:!text-[#c41e2a] cursor-pointer transition-colors duration-300 ease-out"
                style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}
              >
                02 0804 1213
              </a>
            </div>
          </div>

          {/* 3. Email Card */}
          <div className="bg-[#e8ddd0] hover:bg-[#0a0a0a] rounded-2xl transition-all duration-300 ease-out hover:shadow-[0_18px_60px_rgba(0,0,0,0.18)] px-8 py-10 flex flex-col gap-5 group relative">
            <div className="w-10 h-10 border border-[#c41e2a] group-hover:border-white transition-colors duration-300 ease-out flex items-center justify-center flex-shrink-0">
              <Mail size={18} className="text-[#c41e2a] group-hover:text-white transition-colors duration-300 ease-out" />
            </div>
            <div>
              <p
                className="text-[#0a0a0a] group-hover:text-white transition-colors duration-300 ease-out mb-3 tracking-[0.12em] uppercase"
                style={{ fontSize: "0.6875rem", fontWeight: 700 }}
              >
                Email
              </p>
              <div className="flex flex-col items-start gap-1">
                <button
                  type="button"
                  onClick={() => handleCopyEmail("info@destinationlawyers.com")}
                  aria-label="Copy email: info@destinationlawyers.com"
                  className="text-left text-[#2a2218] group-hover:text-white hover:!text-[#c41e2a] cursor-pointer transition-colors duration-300 ease-out outline-none focus-visible:ring-1 focus-visible:ring-[#c41e2a] focus-visible:text-[#c41e2a]"
                  style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}
                >
                  info@destinationlawyers.com
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyEmail("chloe.he@destlawyers.com.au")}
                  aria-label="Copy email: chloe.he@destlawyers.com.au"
                  className="text-left text-[#2a2218] group-hover:text-white hover:!text-[#c41e2a] cursor-pointer transition-colors duration-300 ease-out outline-none focus-visible:ring-1 focus-visible:ring-[#c41e2a] focus-visible:text-[#c41e2a]"
                  style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}
                >
                  chloe.he@destlawyers.com.au
                </button>

                {copiedEmail && (
                  <span
                    className="mt-2 text-[#0a0a0a] group-hover:text-[#c9bfb0] font-medium animate-in fade-in duration-300"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Copied {copiedEmail}!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 4. Hours Card (Static, non-clickable) */}
          <div className="bg-[#e8ddd0] hover:bg-[#0a0a0a] rounded-2xl transition-all duration-300 ease-out hover:shadow-[0_18px_60px_rgba(0,0,0,0.18)] px-8 py-10 flex flex-col gap-5 group">
            <div className="w-10 h-10 border border-[#c41e2a] group-hover:border-white transition-colors duration-300 ease-out flex items-center justify-center flex-shrink-0">
              <Clock size={18} className="text-[#c41e2a] group-hover:text-white transition-colors duration-300 ease-out" />
            </div>
            <div>
              <p
                className="text-[#0a0a0a] group-hover:text-white transition-colors duration-300 ease-out mb-3 tracking-[0.12em] uppercase"
                style={{ fontSize: "0.6875rem", fontWeight: 700 }}
              >
                Hours
              </p>
              <p
                className="text-[#2a2218] group-hover:text-white transition-colors duration-300 ease-out whitespace-pre-line"
                style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}
              >
                {"Mon – Fri\n9:00 AM – 6:00 PM\nSat: 10:00 AM – 2:00 PM"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
