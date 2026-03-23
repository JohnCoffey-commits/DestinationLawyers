"use client";

import { useEffect, useRef, useState } from "react";

export function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (reduced) { setVisible(true); return; }
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  const animActive = visible && !reduced;

  return (
    <footer className="bg-[#0a0a0a] text-white">
      <style>{`
        @keyframes sigCycleText {
          0% {
            clip-path: inset(-200% 100% -200% 0);
            opacity: 1;
            animation-timing-function: steps(55, end);
          }
          33.3% {
            clip-path: inset(-200% -5% -200% 0);
            opacity: 1;
            animation-timing-function: ease;
          }
          83.3% {
            clip-path: inset(-200% -5% -200% 0);
            opacity: 1;
            animation-timing-function: ease;
          }
          92% {
            clip-path: inset(-200% -5% -200% 0);
            opacity: 0;
            animation-timing-function: step-end;
          }
          100% {
            clip-path: inset(-200% 100% -200% 0);
            opacity: 0;
          }
        }
        @keyframes sigCycle {
          0% {
            clip-path: inset(-200% 100% -200% 0);
            opacity: 1;
            animation-timing-function: steps(28, end);
          }
          33.3% {
            clip-path: inset(-200% -5% -200% 0);
            opacity: 1;
            animation-timing-function: ease;
          }
          83.3% {
            clip-path: inset(-200% -5% -200% 0);
            opacity: 1;
            animation-timing-function: ease;
          }
          92% {
            clip-path: inset(-200% -5% -200% 0);
            opacity: 0;
            animation-timing-function: step-end;
          }
          100% {
            clip-path: inset(-200% 100% -200% 0);
            opacity: 0;
          }
        }
      `}</style>
      <div
        ref={sectionRef}
        style={{ background: "#000000" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center" style={{ minHeight: "100vh" }}>
          <div className="flex flex-col">
            <p
              className="text-[#f0ebe3]"
              style={{
                fontFamily: "'Zapfino', 'Snell Roundhand', 'Apple Chancery', 'Segoe Script', cursive",
                fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
                lineHeight: 2,
                fontWeight: 400,
                clipPath: reduced ? "none" : "inset(-200% 100% -200% 0)",
                animation: animActive ? "sigCycleText 6s infinite" : "none",
              }}
            >
              We are here to protect, guide, and resolve with legal commitment.
            </p>
            <div
              className="self-end"
              style={{ marginTop: "clamp(3.5rem, 6vw, 6rem)" }}
            >
              <span
                style={{
                  fontFamily: "'Zapfino', 'Snell Roundhand', 'Apple Chancery', 'Segoe Script', cursive",
                  fontSize: "22px",
                  color: "rgba(168, 36, 36, 0.85)",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  clipPath: reduced ? "none" : "inset(-200% 100% -200% 0)",
                  animation: animActive ? "sigCycle 6s infinite" : "none",
                }}
              >
                ── Destination Lawyers
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
