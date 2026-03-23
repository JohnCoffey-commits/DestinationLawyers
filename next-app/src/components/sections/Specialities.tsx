"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface Speciality {
  title: string;
  description: string;
  highlights: string[];
  videoSrc: string;
}

const specialities: Speciality[] = [
  {
    title: "Property Law",
    description:
      "Whether purchasing your first home, managing a commercial lease, or resolving a boundary dispute, our team delivers clear, strategic counsel at every stage — from contract review through to settlement and beyond.",
    highlights: [
      "Conveyancing & title transfers",
      "Strata, easements & property disputes",
      "Commercial & residential leasing",
    ],
    videoSrc: "/media/specialities/property-law.mp4",
  },
  {
    title: "Commercial Law",
    description:
      "We advise businesses of every scale — from emerging startups to established enterprises — on the legal frameworks that drive growth, protect assets, and manage risk across complex commercial landscapes.",
    highlights: [
      "Mergers, acquisitions & joint ventures",
      "Contract negotiation & compliance",
      "Corporate governance & restructuring",
    ],
    videoSrc: "/media/specialities/commercial-law.mp4",
  },
  {
    title: "Family Law",
    description:
      "Navigating separation, divorce, and parenting matters requires both legal precision and personal sensitivity. We prioritise resolution that safeguards your rights while protecting your family's well-being.",
    highlights: [
      "Divorce & property settlement",
      "Parenting arrangements & custody",
      "Mediation & court representation",
    ],
    videoSrc: "/media/specialities/family-law.mp4",
  },
  {
    title: "Civil Litigation",
    description:
      "When disputes escalate, our litigation team brings rigorous preparation and courtroom confidence. We pursue or defend proceedings with a strategy focused on achieving the best possible outcome efficiently.",
    highlights: [
      "Contractual & commercial disputes",
      "Negligence & consumer claims",
      "Enforcement & debt recovery",
    ],
    videoSrc: "/media/specialities/civil-litigation.mp4",
  },
  {
    title: "Bankruptcy/Insolvency",
    description:
      "Financial distress demands decisive and experienced legal guidance. We provide a structured pathway through insolvency — advising on obligations, protecting assets, and negotiating with creditors on your behalf.",
    highlights: [
      "Voluntary administration & liquidation",
      "Debt agreements & restructuring",
      "Creditor negotiations & compliance",
    ],
    videoSrc: "/media/specialities/bankruptcy.mp4",
  },
];

const ROTATE_INTERVAL = 4000;
const FADE_DURATION = 800;
const TOTAL = specialities.length;

// ─── Component ───────────────────────────────────────────────────────────────

export function Specialities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // ── Viewport gate (delay media work below the fold) ───────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "220px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // ── Video play/pause control ─────────────────────────────────────────────
  useEffect(() => {
    if (!isInView) return;
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeIndex) {
        video.play().catch(() => {
          /* autoplay blocked — silent fail for decorative video */
        });
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, isInView]);

  // ── Auto-rotation ────────────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % TOTAL);
        setTextVisible(true);
      }, 200);
    }, ROTATE_INTERVAL);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer, isInView]);

  // ── Manual selection ─────────────────────────────────────────────────────
  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setTextVisible(false);
      setTimeout(() => {
        setActiveIndex(index);
        setTextVisible(true);
      }, 200);
      startTimer();
    },
    [activeIndex, startTimer]
  );

  const active = specialities[activeIndex];

  const handleImageTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    },
    []
  );

  const handleImageTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const start = touchStartRef.current;
      const touch = e.changedTouches[0];
      touchStartRef.current = null;
      if (!start || !touch) return;

      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;
      if (Math.abs(deltaX) < 34 || Math.abs(deltaX) < Math.abs(deltaY)) return;

      if (deltaX < 0) {
        goTo((activeIndex + 1) % TOTAL);
      } else {
        goTo((activeIndex - 1 + TOTAL) % TOTAL);
      }
    },
    [activeIndex, goTo]
  );

  return (
    <section id="specialities" ref={sectionRef} className="py-24 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Desktop alignment wrapper ── */}
        <div className="lg:w-[85%] xl:w-[80%] mx-auto">
          {/* ── Section header ── */}
          <div className="mb-14">
            <span
              className="text-[#c41e2a] tracking-[0.3em] uppercase"
              style={{ fontSize: "0.75rem", fontWeight: 600 }}
            >
              How We Help
            </span>
            <h2
              className="mt-1 text-[#0a0a0a]"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2rem, 3vw, 2.75rem)",
                fontWeight: 700,
              }}
            >
              Our Specialities
            </h2>
            <div className="w-16 h-1 bg-[#c41e2a] mt-2" />
          </div>

          {/* ── 2-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT — Square video panel */}
            <div className="flex flex-col w-full">
              <div
                className="relative w-full overflow-hidden bg-transparent"
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: "8px",
                  touchAction: "pan-y",
                }}
                onTouchStart={handleImageTouchStart}
                onTouchEnd={handleImageTouchEnd}
              >
                {specialities.map((item, i) => {
                  const shouldPreload =
                    isInView &&
                    (i === activeIndex || i === (activeIndex + 1) % TOTAL);
                  return (
                    <video
                      key={item.videoSrc}
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        opacity: i === activeIndex ? 1 : 0,
                        transition: `opacity ${FADE_DURATION}ms ease`,
                        zIndex: i === activeIndex ? 2 : 1,
                      }}
                      autoPlay={isInView && i === 0}
                      muted
                      loop
                      playsInline
                      preload={shouldPreload ? "metadata" : "none"}
                      aria-hidden="true"
                    >
                      <source src={item.videoSrc} type="video/mp4" />
                    </video>
                  );
                })}
              </div>

              {/* Navigation dots */}
              <div
                className="flex items-center justify-center gap-2.5 mt-5"
                role="tablist"
                aria-label="Speciality navigation"
              >
                {specialities.map((item, i) => (
                  <button
                    key={item.title}
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Go to ${item.title}`}
                    onClick={() => goTo(i)}
                    className="cursor-pointer rounded-full transition-all duration-300 ease-out hover:opacity-80"
                    style={{
                      width: i === activeIndex ? "8px" : "6px",
                      height: i === activeIndex ? "8px" : "6px",
                      backgroundColor:
                        i === activeIndex
                          ? "#0a0a0a"
                          : "rgba(10, 10, 10, 0.18)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — Text content */}
            <div className="flex flex-col justify-center lg:pl-6 text-left">
              {/* Title */}
              <h3
                className="text-[#0a0a0a]"
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  marginBottom: "1.75rem",
                  opacity: textVisible ? 1 : 0,
                  transform: textVisible
                    ? "translateY(0)"
                    : "translateY(8px)",
                  transition:
                    "opacity 400ms ease, transform 400ms ease",
                }}
              >
                {active.title}
              </h3>

              {/* Description */}
              <p
                className="text-[#4a4035]"
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.85,
                  maxWidth: "480px",
                  marginBottom: "2rem",
                  opacity: textVisible ? 1 : 0,
                  transform: textVisible
                    ? "translateY(0)"
                    : "translateY(8px)",
                  transition:
                    "opacity 400ms ease 80ms, transform 400ms ease 80ms",
                }}
              >
                {active.description}
              </p>

              {/* Key highlights — minimal bullet list */}
              <ul
                className="flex flex-col gap-3"
                style={{
                  opacity: textVisible ? 1 : 0,
                  transform: textVisible
                    ? "translateY(0)"
                    : "translateY(8px)",
                  transition:
                    "opacity 400ms ease 160ms, transform 400ms ease 160ms",
                }}
              >
                {active.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="flex-shrink-0 rounded-full bg-[#c41e2a]"
                      style={{
                        width: "5px",
                        height: "5px",
                      }}
                    />
                    <span
                      className="text-[#2a2520]"
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 500,
                        lineHeight: 1.5,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
