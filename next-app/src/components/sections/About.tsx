"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { aboutTimelineItems } from "@/data/aboutTimeline";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

const toRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

const lerp = (from: number, to: number, alpha: number) => {
  return from + (to - from) * alpha;
};

const ARC_STEP_DEGREES = 26;
const OUT_DURATION_MS = 180;
const IN_DURATION_MS = 360;
const POSITION_PRECISION = 3;

const quantize = (value: number, precision = POSITION_PRECISION) => {
  const factor = 10 ** precision;
  const rounded = Math.round(value * factor) / factor;
  return Object.is(rounded, -0) ? 0 : rounded;
};

const px = (value: number, precision = POSITION_PRECISION) => {
  return `${quantize(value, precision).toFixed(precision)}px`;
};

const toSignedPx = (value: number, precision = POSITION_PRECISION) => {
  const quantized = quantize(value, precision);
  const absolute = Math.abs(quantized).toFixed(precision);
  return `${quantized < 0 ? "-" : "+"} ${absolute}px`;
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const settleTimerRef = useRef<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [targetProgress, setTargetProgress] = useState(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });

  const [contentIndex, setContentIndex] = useState(0);
  const [contentPhase, setContentPhase] = useState<"idle" | "out" | "in-start" | "in">("idle");

  const steps = aboutTimelineItems.length - 1;
  const sectionHeight = `calc(100vh + ${steps * 85}vh)`;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    syncPreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncPreference);
      return () => mediaQuery.removeEventListener("change", syncPreference);
    }

    mediaQuery.addListener(syncPreference);
    return () => mediaQuery.removeListener(syncPreference);
  }, []);

  useEffect(() => {
    const syncViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      const consumed = clamp(-rect.top, 0, totalScrollable);
      const nextProgress = totalScrollable > 0 ? consumed / totalScrollable : 0;

      setTargetProgress(nextProgress);
    };

    const scheduleSettleSnap = () => {
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
      }

      settleTimerRef.current = window.setTimeout(() => {
        setTargetProgress((previous) => {
          if (steps <= 0) return 0;
          return Math.round(previous * steps) / steps;
        });
      }, 180);
    };

    const onScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateProgress();
        scheduleSettleSnap();
      });
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, [steps]);

  useEffect(() => {
    if (prefersReducedMotion) {
      const stepped = steps > 0 ? Math.round(targetProgress * steps) / steps : 0;
      setSmoothProgress(stepped);
      return;
    }

    let rafId = 0;

    const animate = () => {
      setSmoothProgress((previous) => {
        const next = lerp(previous, targetProgress, 0.18);

        // Snap tolerance stops sub-pixel chasing quickly
        if (Math.abs(next - targetProgress) < 0.003) {
          return targetProgress;
        }

        rafId = window.requestAnimationFrame(animate);
        return next;
      });
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [targetProgress, prefersReducedMotion, steps]);

  const progress = prefersReducedMotion
    ? (steps > 0 ? Math.round(targetProgress * steps) / steps : 0)
    : smoothProgress;

  const activeFloat = progress * steps;
  const activeIndex = clamp(Math.round(activeFloat), 0, steps);

  useEffect(() => {
    if (activeIndex === contentIndex) {
      if (contentPhase !== "idle") {
        setContentPhase("idle");
      }
      return;
    }

    if (prefersReducedMotion) {
      setContentIndex(activeIndex);
      setContentPhase("idle");
      return;
    }

    let outTimer = 0;
    let inTimer = 0;
    let settleTimer = 0;

    setContentPhase("out");

    outTimer = window.setTimeout(() => {
      setContentIndex(activeIndex);
      setContentPhase("in-start");

      inTimer = window.setTimeout(() => {
        setContentPhase("in");
      }, 16);

      settleTimer = window.setTimeout(() => {
        setContentPhase("idle");
      }, IN_DURATION_MS);
    }, OUT_DURATION_MS);

    return () => {
      window.clearTimeout(outTimer);
      window.clearTimeout(inTimer);
      window.clearTimeout(settleTimer);
    };
  }, [activeIndex, contentIndex, contentPhase, prefersReducedMotion]);

  const goToIndex = useCallback(
    (index: number) => {
      if (typeof window === "undefined") return;

      const section = sectionRef.current;
      if (!section || steps <= 0) return;

      const clampedIndex = clamp(index, 0, steps);
      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
      const scrollSpan = section.offsetHeight - window.innerHeight;
      const destination = sectionTop + (clampedIndex / steps) * scrollSpan;

      window.scrollTo({
        top: destination,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [prefersReducedMotion, steps],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToIndex(activeIndex - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToIndex(activeIndex + 1);
      }
    },
    [activeIndex, goToIndex],
  );

  const STROKE_MARGIN = 4;
  const TARGET_DIAMETER = 1350; // Increased radius to fill frame more
  const TARGET_RADIUS = TARGET_DIAMETER / 2;

  // Frame dimension scales - increase base height slightly to ensure the larger arc and text fit
  const baseFrameHeight = clamp(viewport.height * 0.78, 480, 850);
  const frameHeight = quantize(baseFrameHeight);

  // derive radius from available width inside the frame padding
  const framePadding = clamp(viewport.width * 0.022, 16, 38.4);
  const availableWidth = Math.min(viewport.width * 0.98, TARGET_DIAMETER + framePadding * 2) - framePadding * 2;
  const maxRadiusByWidth = availableWidth / 2 - STROKE_MARGIN;
  const maxRadiusByHeight = frameHeight - 60; // Allow radius to stretch nearly to the bottom frame edge


  // Enforce exactly 559px (TARGET_RADIUS) if it fits, else scale down gracefully
  const calculatedRadius = Math.min(maxRadiusByWidth, maxRadiusByHeight, TARGET_RADIUS);
  const radius = quantize(clamp(calculatedRadius, 140, TARGET_RADIUS));
  const diameter = quantize(radius * 2);

  // dial window = full radius + stroke margin → shows exact upper semicircle
  const dialWindowHeight = quantize(radius + STROKE_MARGIN);
  const svgTop = quantize(dialWindowHeight - radius - STROKE_MARGIN);
  const labelRadius = quantize(radius - clamp(radius * 0.22, 80, 150));


  const contentTransform =
    contentPhase === "out"
      ? "translateY(-14px)"
      : contentPhase === "in-start"
        ? "translateY(14px)"
        : "translateY(0px)";

  const contentOpacity = contentPhase === "out" || contentPhase === "in-start" ? 0 : 1;

  const contentTransition = prefersReducedMotion
    ? "none"
    : "opacity 360ms cubic-bezier(0.22, 1, 0.36, 1), transform 420ms cubic-bezier(0.22, 1, 0.36, 1)";

  const tickAngles = useMemo(() => {
    const count = 28;
    return Array.from({ length: count }, (_, index) => {
      const base = -165 + (index / (count - 1)) * 150;
      return base - activeFloat * ARC_STEP_DEGREES;
    });
  }, [activeFloat]);

  const currentContent = aboutTimelineItems[contentIndex];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#f5f4f1]"
      style={{ height: sectionHeight }}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label="About timeline"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="mx-auto flex h-full w-full items-center justify-center px-2 py-3 sm:px-4 sm:py-5 lg:px-6">
          <div
            className="relative flex w-[min(98vw,1800px)] flex-col rounded-[clamp(2rem,4.4vw,4.5rem)] border border-[#0a0a0a]/24 bg-[#f5f4f1] px-[clamp(1rem,2.2vw,2.4rem)] pb-[clamp(0.7rem,1.9vh,1.5rem)] pt-[clamp(0.55rem,1.05vh,0.8rem)]"
            style={{ height: px(frameHeight) }}
          >
            <div className="flex items-center gap-4 text-[#0a0a0a]/60">
              <div className="h-px flex-1 bg-[#0a0a0a]/20" />
              <p
                className="uppercase tracking-[0.28em]"
                style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", lineHeight: 1 }}
              >
                TIMELINE
              </p>
              <div className="h-px flex-1 bg-[#0a0a0a]/20" />
            </div>

            {/* Semicircle Container - Fill available space and anchor to bottom */}
            <div
              className="relative mt-auto overflow-hidden shrink-0 flex flex-col justify-end"
              style={{ height: px(dialWindowHeight) }}
            >
              <svg
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2"
                viewBox={`0 0 ${diameter} ${diameter}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ top: px(svgTop), width: px(diameter), height: px(diameter), maxWidth: "100%" }}
              >
                <circle
                  cx={radius}
                  cy={radius}
                  r={radius - 2}
                  fill="none"
                  stroke="rgba(10,10,10,0.24)"
                  strokeWidth="1"
                />
                <circle
                  cx={radius}
                  cy={radius}
                  r={radius - 40}
                  fill="none"
                  stroke="rgba(10,10,10,0.2)"
                  strokeWidth="0.95"
                />

                {tickAngles.map((angle, index) => {
                  const radians = toRadians(angle);
                  const isMajor = index % 4 === 0;
                  const outer = radius - 7;
                  const inner = isMajor ? radius - 80 : radius - 48;
                  const x1 = quantize(radius + Math.cos(radians) * outer);
                  const y1 = quantize(radius + Math.sin(radians) * outer);
                  const x2 = quantize(radius + Math.cos(radians) * inner);
                  const y2 = quantize(radius + Math.sin(radians) * inner);

                  return (
                    <line
                      key={`tick-${index}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isMajor ? "rgba(10,10,10,0.34)" : "rgba(10,10,10,0.18)"}
                      strokeWidth={isMajor ? "0.95" : "0.72"}
                    />
                  );
                })}
              </svg>

              {aboutTimelineItems.map((item, index) => {
                const distance = Math.abs(index - activeFloat);
                // t goes from 1 (active, distance=0) to 0 (far away)
                const t = clamp(1 - distance, 0, 1);

                const angle = -90 + (index - activeFloat) * ARC_STEP_DEGREES;
                const radians = toRadians(angle);
                const xOffset = quantize(Math.cos(radians) * labelRadius);

                const circleCenterY = dialWindowHeight - STROKE_MARGIN;
                const y = quantize(circleCenterY + Math.sin(radians) * labelRadius);
                const left = `calc(50% ${toSignedPx(xOffset)})`;

                // Continuous interpolation: inactive(t=0) → active(t=1)
                // Font size: 14px → clamp(2.1rem, 4.6vw, 3.7rem)
                // We use a px size that lerps for the inline style
                const inactiveFontSize = 14;
                const activeFontSize = clamp(viewport.width * 0.046, 33.6, 59.2); // matches clamp(2.1rem, 4.6vw, 3.7rem)
                const fontSize = quantize(lerp(inactiveFontSize, activeFontSize, t * t)); // quadratic easing for snappier feel
                const opacity = quantize(clamp(lerp(0.26, 1, t * t), 0.26, 1));
                const scale = quantize(clamp(lerp(0.8, 1, t), 0.8, 1));
                const fontWeight = t > 0.5 ? 700 : 500;
                const letterSpacing = t > 0.5 ? "0.01em" : "0.03em";
                const isActive = distance < 0.01;

                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => goToIndex(index)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 bg-transparent p-0 text-center text-[#0a0a0a] outline-none"
                    style={{
                      left,
                      top: px(y),
                      opacity,
                      transform: `translate(-50%, -50%) scale(${scale.toFixed(POSITION_PRECISION)})`,
                      fontSize: px(fontSize),
                      fontWeight,
                      letterSpacing,
                      lineHeight: 1,
                      willChange: "transform, opacity, font-size",
                      transition: prefersReducedMotion
                        ? "none"
                        : "font-weight 120ms step-end, letter-spacing 120ms step-end",
                    }}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`Show ${item.year} milestone`}
                  >
                    {item.year}
                  </button>
                );
              })}

              {/* Text and Controls anchored INSIDE the semicircle container at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-[clamp(1rem,2.5vh,2rem)]">
                <div
                  className="w-full max-w-[min(90vw,700px)] text-center px-4 sm:px-6"
                  style={{ opacity: contentOpacity, transform: contentTransform, transition: contentTransition }}
                >
                  <h2
                    className="text-[#0a0a0a]"
                    style={{
                      fontSize: "clamp(1.4rem, 2.5vw, 2.1rem)",
                      fontWeight: 600,
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {currentContent.title}
                  </h2>
                  <p
                    className="mx-auto mt-4 max-w-[62ch] text-[#1a1a1a]/78"
                    style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", lineHeight: 1.6 }}
                  >
                    {currentContent.description}
                  </p>
                </div>

                <div className="mt-[clamp(1rem,3vh,2rem)] flex items-center justify-center gap-[clamp(1rem,3.6vw,2.25rem)]">
                  <button
                    type="button"
                    onClick={() => goToIndex(activeIndex - 1)}
                    className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#0a0a0a]/24 text-[#0a0a0a] transition-colors hover:border-[#0a0a0a]/55 disabled:opacity-45"
                    aria-label="Previous timeline year"
                    disabled={activeIndex <= 0}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-2" aria-hidden="true">
                    {aboutTimelineItems.map((_, index) => {
                      const isActiveDot = index === activeIndex;
                      return (
                        <span
                          key={`dot-${index}`}
                          className="block rounded-full bg-[#0a0a0a]"
                          style={{
                            width: isActiveDot ? "7px" : "5px",
                            height: isActiveDot ? "7px" : "5px",
                            opacity: isActiveDot ? 0.7 : 0.24,
                            transition: prefersReducedMotion ? "none" : "opacity 240ms ease, transform 240ms ease",
                            transform: isActiveDot ? "scale(1)" : "scale(0.95)",
                          }}
                        />
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => goToIndex(activeIndex + 1)}
                    className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#0a0a0a]/24 text-[#0a0a0a] transition-colors hover:border-[#0a0a0a]/55 disabled:opacity-45"
                    aria-label="Next timeline year"
                    disabled={activeIndex >= steps}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
