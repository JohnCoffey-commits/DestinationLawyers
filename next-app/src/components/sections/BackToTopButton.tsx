"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTopButton() {
  const [show, setShow] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePref = () => setPrefersReducedMotion(media.matches);
    updatePref();
    media.addEventListener("change", updatePref);
    return () => media.removeEventListener("change", updatePref);
  }, []);

  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        setShow(window.scrollY > 560);
        rafId = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={handleBackToTop}
      className="fixed right-4 sm:right-6 z-[55] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c41e2a]/70 hover:bg-[#171717] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c41e2a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
      style={{
        bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
        backgroundColor: "rgba(10, 10, 10, 0.76)",
        backdropFilter: "blur(8px)",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(14px) scale(0.92)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <ChevronUp size={18} />
    </button>
  );
}
