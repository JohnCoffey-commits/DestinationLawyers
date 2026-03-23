"use client";

import { useState, useCallback, useRef, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
const milestones = [
    { year: 2016, title: "Inception", description: "In August 2016, our predecessor, Destination Conveyancing, was officially established." },
    { year: 2017, title: "Establishing Roots", description: "During our steady early years, we operated out of 321 Pitt Street, right opposite Town Hall, to serve our clients." },
    { year: 2021, title: "Disruption", description: "The sudden onset of the pandemic in 2021 disrupted our routine and prompted us to adapt our workplace strategy." },
    { year: 2021, title: "Transition", description: "To navigate the challenges brought by COVID-19, we temporarily relocated our operations to Gladeville that same year." },
    { year: 2021, title: "Evolution", description: "Amidst a year of change, we reached a major milestone by officially rebranding and registering as Destination Lawyers in August 2021." },
    { year: 2022, title: "Consolidation", description: "During our nearly three-year stay in Gladeville, the newly formed Destination Lawyers team continued to build strength and expertise." },
    { year: 2024, title: "A New Chapter", description: "Driven by our firm's continued growth, we officially moved into our new Crows Nest office in February 2024, embarking on an exciting new chapter." },
];

// ─── Dial geometry constants ─────────────────────────────────────────────────
const N = milestones.length;
const STEP = Math.PI / (N - 1);
const OUTER_R = 450;
const LABEL_R = 362;

// Round to 2 decimals — prevents SSR/client hydration mismatches from
// floating-point differences (e.g. 705.9999999999999 vs 706)
const r2 = (n: number) => Math.round(n * 100) / 100;

// Pre-compute static tick geometry (these don't depend on state)
const MAJOR_TICKS = milestones.map((_, i) => {
    const a = i * STEP;
    return {
        x1: r2(500 - 412 * Math.cos(a)),
        y1: r2(500 - 412 * Math.sin(a)),
        x2: r2(500 - OUTER_R * Math.cos(a)),
        y2: r2(500 - OUTER_R * Math.sin(a)),
    };
});

const MINOR_FRACS = [1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7, 6 / 7];
const MINOR_TICKS = milestones.slice(0, -1).flatMap((_, i) =>
    MINOR_FRACS.map((frac) => {
        const a = (i + frac) * STEP;
        return {
            key: `minor-${i}-${frac}`,
            x1: r2(500 - 432 * Math.cos(a)),
            y1: r2(500 - 432 * Math.sin(a)),
            x2: r2(500 - OUTER_R * Math.cos(a)),
            y2: r2(500 - OUTER_R * Math.sin(a)),
        };
    })
);

export function TimelineDial() {
    // ── Font-readiness gate ─────────────────────────────────────────────────────
    // Defer all rendering until custom fonts (Playfair Display, Inter) are loaded.
    // Without this, label bounding boxes are computed with fallback font metrics,
    // causing translate(-50%,-50%) centering to visually drift once fonts swap in.
    const [fontsReady, setFontsReady] = useState(false);

    useEffect(() => {
        let mounted = true;

        const init = async () => {
            await document.fonts.ready;
            if (!mounted) return;
            setFontsReady(true);
        };

        init();

        return () => {
            mounted = false;
        };
    }, []);

    // ── State ──────────────────────────────────────────────────────────────────
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Mouse ripple state
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isMouseStopped, setIsMouseStopped] = useState(false);
    const [rippleKey, setRippleKey] = useState(0);
    const rippleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const moveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ── Idle timer ─────────────────────────────────────────────────────────────
    const resetIdleTimer = useCallback(() => {
        setIsIdle(false);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => setIsIdle(true), 5000);
    }, []);

    useEffect(() => {
        resetIdleTimer();
        return () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, [resetIdleTimer]);

    // ── Ripple loop ────────────────────────────────────────────────────────────
    useEffect(() => {
        if (isIdle && isHovering && isMouseStopped) {
            setRippleKey(k => k + 1);
            rippleIntervalRef.current = setInterval(() => {
                setRippleKey(k => k + 1);
            }, 3400);
        } else {
            if (rippleIntervalRef.current) {
                clearInterval(rippleIntervalRef.current);
                rippleIntervalRef.current = null;
            }
        }
        return () => {
            if (rippleIntervalRef.current) clearInterval(rippleIntervalRef.current);
        };
    }, [isIdle, isHovering, isMouseStopped]);

    // ── Navigation ─────────────────────────────────────────────────────────────
    const goTo = useCallback((idx: number) => {
        if (isAnimating) return;
        const w = ((idx % N) + N) % N;
        setIsAnimating(true);
        setCurrentIndex(w);
        resetIdleTimer();
        setTimeout(() => setIsAnimating(false), 600);
    }, [isAnimating, resetIdleTimer]);

    const handleAreaClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        if (e.clientX - rect.left < rect.width / 2) {
            goTo(currentIndex - 1);
        } else {
            goTo(currentIndex + 1);
        }
    }, [goTo, currentIndex]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
        setIsMouseStopped(false);
        if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
        moveTimerRef.current = setTimeout(() => setIsMouseStopped(true), 400);
    }, []);

    // ── Dial geometry ──────────────────────────────────────────────────────────
    const rotOffset = Math.PI / 2 - currentIndex * STEP;
    const rotDeg = (rotOffset * 180) / Math.PI;

    const yearLabels = milestones.map((m, i) => {
        const angle = i * STEP + rotOffset;
        const sinA = Math.sin(angle);
        const cosA = Math.cos(angle);
        const cssLeft = r2((500 - LABEL_R * cosA) / 10);
        const cssTop = r2((500 - LABEL_R * sinA) / 5);
        const visible = sinA > -0.08;
        const distFromTop = Math.abs(angle - Math.PI / 2);
        const opacity = visible ? r2(Math.max(0, 1 - distFromTop / (Math.PI * 0.6))) : 0;
        return { ...m, index: i, isActive: i === currentIndex, cssLeft, cssTop, opacity };
    });

    // ── Render ─────────────────────────────────────────────────────────────────

    // Until fonts are loaded, render a layout-preserving placeholder that
    // matches the section's background color and aspect ratio (2:1 via
    // paddingTop: 50%). This prevents CLS and ensures the first real paint
    // has correct font metrics for all label bounding boxes.
    if (!fontsReady) {
        return (
            <section id="about" className="relative overflow-hidden" style={{ backgroundColor: "#e8e4dc" }}>
                <div className="text-center pt-10 pb-4">
                    <span
                        className="tracking-[0.3em] uppercase"
                        style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(0,0,0,0.55)" }}
                    >
                        Timeline
                    </span>
                </div>
                <div className="relative mx-auto" style={{ maxWidth: "none", padding: "0 10px" }}>
                    <div
                        className="relative w-full"
                        style={{
                            border: "1px solid rgba(196, 30, 42, 0.45)",
                            borderRadius: "24px",
                            overflow: "hidden",
                        }}
                    >
                        <div className="relative w-full" style={{ paddingTop: "50%" }} />
                    </div>
                </div>
                <div style={{ height: "48px" }} />
            </section>
        );
    }

    return (
        <section id="about" className="relative overflow-hidden" style={{ backgroundColor: "#e8e4dc" }}>
            {/* CSS animation definitions */}
            <style>{`
        @keyframes dialSway {
          0%   { transform: rotate(0deg);    animation-timing-function: ease-in-out; }
          12%  { transform: rotate(1.0deg);  animation-timing-function: ease-in-out; }
          24%  { transform: rotate(-1.0deg); animation-timing-function: ease-in-out; }
          36%  { transform: rotate(1.0deg);  animation-timing-function: ease-in-out; }
          48%  { transform: rotate(-1.0deg); animation-timing-function: ease-in-out; }
          58%  { transform: rotate(0.7deg);  animation-timing-function: ease-out; }
          100% { transform: rotate(0deg); }
        }
        @keyframes cursorRipple {
          0%   { transform: translate(-50%,-50%) scale(0);   opacity: 0; }
          20%  { opacity: 0.38; }
          100% { transform: translate(-50%,-50%) scale(3.8); opacity: 0; }
        }
        @keyframes cursorRippleMid {
          0%   { transform: translate(-50%,-50%) scale(0);   opacity: 0; }
          20%  { opacity: 0.25; }
          100% { transform: translate(-50%,-50%) scale(3.0); opacity: 0; }
        }
        @keyframes cursorRippleInner {
          0%, 100% { transform: translate(-50%,-50%) scale(1);    opacity: 0.9; }
          50%       { transform: translate(-50%,-50%) scale(1.35); opacity: 0.35; }
        }
        @media (max-width: 767px) {
          .dial-inner-desc { display: none !important; }
          .dial-inner-content { bottom: 4% !important; }
          .dial-inner-title { font-size: 1.15rem !important; margin-bottom: 0 !important; }
        }
      `}</style>

            {/* TIMELINE top label */}
            <div className="text-center pt-10 pb-4">
                <span
                    className="tracking-[0.3em] uppercase"
                    style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(0,0,0,0.55)" }}
                >
                    Timeline
                </span>
            </div>

            {/* Main container */}
            <div className="relative mx-auto" style={{ maxWidth: "none", padding: "0 10px" }}>
                <div
                    className="relative w-full"
                    style={{
                        border: "1px solid rgba(196, 30, 42, 0.45)",
                        borderRadius: "24px",
                        overflow: "hidden",
                    }}
                >
                    {/* 2:1 aspect ratio area */}
                    <div
                        className="relative w-full select-none"
                        style={{ paddingTop: "50%", cursor: "pointer" }}
                        onClick={handleAreaClick}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >

                        {/* SVG layer */}
                        <svg
                            viewBox="0 0 1000 500"
                            className="absolute inset-0 w-full h-full"
                            preserveAspectRatio="xMidYMax meet"
                            style={{ pointerEvents: "none" }}
                        >
                            {/* Outer arc */}
                            <path
                                d={`M 50 500 A ${OUTER_R} ${OUTER_R} 0 0 1 950 500`}
                                fill="none"
                                stroke="#8b0000"
                                strokeWidth="3"
                                opacity="0.9"
                            />
                            {/* Inner arc */}
                            <path
                                d={`M 90 500 A 410 410 0 0 1 910 500`}
                                fill="none"
                                stroke="#8b0000"
                                strokeWidth="1"
                                opacity="0.75"
                            />

                            {/* Idle sway wrapper */}
                            <g style={{ transformOrigin: "500px 500px", animation: isIdle ? "dialSway 5s ease-in-out infinite" : "none" }}>
                                {/* Rotation group */}
                                <g
                                    style={{
                                        transform: `rotate(${rotDeg}deg)`,
                                        transformOrigin: "500px 500px",
                                        transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                                    }}
                                >
                                    {/* Major ticks (pre-computed, rounded) */}
                                    {MAJOR_TICKS.map((t, i) => (
                                        <line key={`major-${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                                            stroke="#8b0000" strokeWidth="1" opacity="0.85" />
                                    ))}
                                    {/* Minor ticks (pre-computed, rounded) */}
                                    {MINOR_TICKS.map((t) => (
                                        <line key={t.key} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                                            stroke="#8b0000" strokeWidth="0.6" opacity="0.6" />
                                    ))}
                                </g>
                            </g>
                        </svg>

                        {/* Year labels */}
                        {yearLabels.map((item) => (
                            <div
                                key={`${item.year}-${item.index}`}
                                className="absolute"
                                style={{
                                    left: `${item.cssLeft}%`,
                                    top: `${item.cssTop}%`,
                                    transform: "translate(-50%, -50%)",
                                    transition: "left 600ms cubic-bezier(0.22,1,0.36,1), top 600ms cubic-bezier(0.22,1,0.36,1), opacity 400ms ease",
                                    zIndex: item.isActive ? 20 : 5,
                                    opacity: item.opacity,
                                    pointerEvents: item.opacity > 0.1 ? "auto" : "none",
                                    cursor: item.isActive ? "default" : "pointer",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!item.isActive) goTo(item.index);
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "var(--font-playfair), serif",
                                        fontSize: item.isActive ? "clamp(2.8rem, 6.5vw, 5rem)" : "clamp(1.8rem, 3.2vw, 2.6rem)",
                                        fontWeight: item.isActive ? 700 : 400,
                                        color: item.isActive ? "#0a0a0a" : "rgba(0,0,0,0.40)",
                                        transition: "font-size 500ms cubic-bezier(0.22,1,0.36,1), color 400ms ease",
                                        whiteSpace: "nowrap",
                                        display: "block",
                                        textAlign: "center",
                                        letterSpacing: item.isActive ? "0.04em" : "0",
                                    }}
                                >
                                    {item.year}
                                </span>
                            </div>
                        ))}

                        {/* Title + description */}
                        <div
                            className="dial-inner-content absolute left-0 right-0 text-center px-8"
                            style={{ bottom: "11%", zIndex: 10, pointerEvents: "none" }}
                        >
                            <h3
                                className="dial-inner-title mb-3"
                                style={{
                                    fontFamily: "var(--font-playfair), serif",
                                    fontSize: "clamp(1.35rem, 2.4vw, 1.9rem)",
                                    fontWeight: 700,
                                    color: "#0a0a0a",
                                    transition: "opacity 300ms ease",
                                }}
                            >
                                {milestones[currentIndex].title}
                            </h3>
                            <p
                                className="dial-inner-desc mx-auto"
                                style={{
                                    maxWidth: "500px",
                                    fontSize: "clamp(0.92rem, 1.35vw, 1.1rem)",
                                    lineHeight: 1.85,
                                    color: "rgba(0,0,0,0.62)",
                                }}
                            >
                                {milestones[currentIndex].description}
                            </p>
                        </div>

                        {/* Progress bar */}
                        <div
                            className="absolute left-0 right-0 flex items-center justify-center"
                            style={{ bottom: "2.5%", zIndex: 10, pointerEvents: "none" }}
                        >
                            <div className="relative" style={{ width: "160px", height: "2px", backgroundColor: "rgba(0,0,0,0.15)" }}>
                                <div
                                    style={{
                                        position: "absolute",
                                        left: 0, top: 0, height: "100%",
                                        width: `${(currentIndex / (milestones.length - 1)) * 100}%`,
                                        backgroundColor: "#c41e2a",
                                        transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Mouse ripple */}
                        {isIdle && isHovering && isMouseStopped && mousePos && (
                            <div
                                key={rippleKey}
                                className="absolute"
                                style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%`, pointerEvents: "none", zIndex: 50 }}
                            >
                                <div style={{
                                    position: "absolute", width: "48px", height: "48px", borderRadius: "50%",
                                    backgroundColor: "#c41e2a",
                                    transform: "translate(-50%,-50%) scale(0)", opacity: 0,
                                    animation: "cursorRipple 2.8s cubic-bezier(0.2, 0.6, 0.4, 1) both",
                                }} />
                                <div style={{
                                    position: "absolute", width: "32px", height: "32px", borderRadius: "50%",
                                    backgroundColor: "#c41e2a",
                                    transform: "translate(-50%,-50%) scale(0)", opacity: 0,
                                    animation: "cursorRippleMid 2.8s cubic-bezier(0.2, 0.6, 0.4, 1) 0.35s both",
                                }} />
                                <div style={{
                                    position: "absolute", width: "10px", height: "10px", borderRadius: "50%",
                                    backgroundColor: "#c41e2a",
                                    transform: "translate(-50%,-50%)",
                                    animation: "cursorRippleInner 2s ease-in-out infinite",
                                }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile description - below the box */}
            <div className="md:hidden text-center px-6 pt-5 pb-2">
                <p
                    style={{
                        fontSize: "0.95rem",
                        lineHeight: 1.85,
                        color: "rgba(0,0,0,0.58)",
                        maxWidth: "480px",
                        margin: "0 auto",
                        transition: "opacity 300ms ease",
                    }}
                >
                    {milestones[currentIndex].description}
                </p>
            </div>

            {/* Bottom spacing */}
            <div style={{ height: "48px" }} />
        </section>
    );
}
