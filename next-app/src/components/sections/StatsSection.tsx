"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// ─── Custom hook: counts from 0 → end over `duration` ms ───
const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        // Respect prefers-reduced-motion
        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) {
            setCount(end);
            return;
        }

        let startTime: number;
        let animationFrame: number;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            }
        };

        animationFrame = requestAnimationFrame(step);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isInView]);

    return { count, ref: nodeRef };
};

// ─── Single stat card ───
const StatItem = ({
    value,
    label,
    numberColor,
    suffix = "+",
}: {
    value: number;
    label: string;
    numberColor: string;
    suffix?: string;
}) => {
    const { count, ref } = useCountUp(value);

    return (
        <div ref={ref} className="text-center">
            <div
                className="font-bold text-5xl md:text-6xl mb-3"
                style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    color: numberColor,
                }}
            >
                {count}
                {suffix}
            </div>
            <div
                className="uppercase"
                style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    color: "rgba(0, 0, 0, 0.55)",
                }}
            >
                {label}
            </div>
        </div>
    );
};

// ─── Exported section ───
export function StatsSection() {
    return (
        <section className="py-20" style={{ backgroundColor: "#E8E4DC" }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0">
                    {/* 500+ — Matters Handled */}
                    <div className="md:border-r" style={{ borderColor: "rgba(0, 0, 0, 0.08)" }}>
                        <StatItem
                            value={500}
                            label="Matters Handled"
                            numberColor="#C41E2A"
                        />
                    </div>

                    {/* 10+ — Years of Practice */}
                    <div className="md:border-r" style={{ borderColor: "rgba(0, 0, 0, 0.08)" }}>
                        <StatItem
                            value={10}
                            label="Years of Practice"
                            numberColor="#0A0A0A"
                        />
                    </div>

                    {/* 40+ — Combined Experience */}
                    <div className="md:border-r" style={{ borderColor: "rgba(0, 0, 0, 0.08)" }}>
                        <StatItem
                            value={40}
                            label="Combined Experience"
                            numberColor="#6B5B4A"
                        />
                    </div>

                    {/* 5+ — Practice Areas */}
                    <div>
                        <StatItem
                            value={5}
                            label="Practice Areas"
                            numberColor="#A08B6B"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
