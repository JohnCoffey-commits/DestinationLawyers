"use client";

import { useEffect, useRef } from "react";

export function ScrollTransitionBanner() {
    const sectionRef = useRef<HTMLElement>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        // Respect prefers-reduced-motion: show full reveal (warm neutral base layer) statically
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) {
            el.style.setProperty("--reveal", "1");
            return;
        }

        const calculateProgress = () => {
            const rect = el.getBoundingClientRect();
            const viewportMid = window.innerHeight / 2;
            const sectionTop = rect.top;
            const sectionHeight = rect.height;

            // progress is 0 when section enters exactly the middle of the viewport.
            // progress is 1 when section's bottom exactly reaches the middle of the viewport.
            let progress = (viewportMid - sectionTop) / sectionHeight;
            progress = Math.max(0, Math.min(1, progress));

            el.style.setProperty("--reveal", progress.toString());
        };

        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(calculateProgress);
        };

        // Initial calculation and listeners
        calculateProgress();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden w-full h-[260px] sm:h-[360px]"
            style={{ backgroundColor: "#e8ddd0" }} // Contact section warm neutral
        >
            {/* ── Base Layer: Revealed Contact Background + Large Typography ── */}
            <div className="absolute inset-0 flex items-end justify-start px-4 sm:px-8 pb-4 sm:pb-8 pointer-events-none">
                <h2
                    className="text-[#0a0a0a]"
                    style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "clamp(4.5rem, 12vw, 10rem)",
                        fontWeight: 700,
                        lineHeight: 0.9,
                        letterSpacing: "-0.02em",
                        opacity: 0.96,
                        whiteSpace: "nowrap",
                    }}
                >
                    Get in Touch
                </h2>
            </div>

            {/* ── Wipe-reveal overlay (Solid Red, lifts UP) ── */}
            <div
                className="absolute top-0 left-0 w-full pointer-events-none will-change-[height]"
                style={{
                    backgroundColor: "#c41e2a", // Brand red, no stripes
                    // When progress goes 0 -> 1, height goes 100% -> 0% (lifting up)
                    height: "calc((1 - var(--reveal, 0)) * 100%)",
                }}
            >
                {/* ── Scanline at bottom edge of the red overlay ── */}
                <div
                    className="absolute bottom-0 left-0 w-full pointer-events-none"
                    style={{
                        height: "1px",
                        backgroundColor: "rgba(0, 0, 0, 0.15)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                    }}
                />
            </div>
        </section>
    );
}
