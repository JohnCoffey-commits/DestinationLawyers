"use client";

import { useState, useRef, useCallback } from "react";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Crispy Onion Pty Ltd", role: "Business Acquisition Client", text: "Destination Lawyers made our business acquisition smooth from due diligence to contract negotiations. Their advice was practical, tailored, and dependable at every step.", rating: 5 },
  { name: "Maria Gonzalez", role: "Small Business Owner", text: "When I faced a complex immigration case, the team at Destination Lawyers provided not just legal expertise but genuine compassion. They made a stressful process manageable and successful.", rating: 5 },
  { name: "Harry", role: "Property Purchase Client", text: "Destination Lawyers guided my home purchase end to end with clear advice and quick responses. They made a complex process simple, and I would happily work with them again.", rating: 5 },
  { name: "Amanda Liu", role: "Tech Entrepreneur", text: "The IP team at Destination Lawyers protected our innovations when it mattered most. Their proactive approach to intellectual property law gave us the confidence to scale our business.", rating: 5 },
];

const CARD_COLORS = [
  { bg: "#bfae8e", text: "#ffffff", star: "#c41e2a", sub: "#e8e0d0" },   // 卡其
  { bg: "#f5f0e8", text: "#0a0a0a", star: "#c41e2a", sub: "#6b6560" },   // 米色
  { bg: "#c41e2a", text: "#ffffff", star: "#f5f0e8", sub: "#ffcfc9" },     // 红色
  { bg: "#d4c9a8", text: "#ffffff", star: "#c41e2a", sub: "#f0ebe0" },   // 深卡其
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const isAnimating = useRef(false);
  const touchStartXRef = useRef<number | null>(null);

  const goTo = useCallback((target: number) => {
    if (isAnimating.current || target === current) return;
    isAnimating.current = true;
    setLeaving(current);
    setCurrent(target);
    setTimeout(() => {
      setLeaving(null);
      isAnimating.current = false;
    }, 700);
  }, [current]);

  const next = () => goTo((current + 1) % testimonials.length);
  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);

  const handleMobileTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.changedTouches[0]?.clientX ?? null;
  };

  const handleMobileTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = endX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(deltaX) < 36) return;
    if (deltaX < 0) next();
    else prev();
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const color = CARD_COLORS[index % CARD_COLORS.length];

    // Card that is falling away downward
    if (index === leaving) {
      return {
        position: "absolute",
        inset: 0,
        width: "100%",
        padding: "3rem 3.5rem",
        backgroundColor: color.bg,
        borderRadius: "12px",
        zIndex: 30,
        opacity: 0,
        transform: "translateY(120%) scale(0.95)",
        transition: "opacity 500ms ease-in, transform 700ms cubic-bezier(0.4, 0, 1, 0.4)",
        pointerEvents: "none",
      };
    }
    // Current active card — revealed from underneath with subtle pop
    if (index === current) {
      return {
        position: "absolute",
        inset: 0,
        width: "100%",
        padding: "3rem 3.5rem",
        backgroundColor: color.bg,
        borderRadius: "12px",
        zIndex: 20,
        opacity: 1,
        transform: "translateY(0) scale(1)",
        transition: "transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease-out",
        pointerEvents: "auto",
      };
    }
    // Queued cards sitting in the stack below — visible edges for stacking effect
    const distFromCurrent = (index - current + testimonials.length) % testimonials.length;
    return {
      position: "absolute",
      inset: 0,
      width: "100%",
      padding: "3rem 3.5rem",
      backgroundColor: color.bg,
      borderRadius: "12px",
      zIndex: 10 - distFromCurrent,
      opacity: distFromCurrent <= 3 ? 1 : 0,
      transform: `translateY(${distFromCurrent * 16}px) scale(${1 - distFromCurrent * 0.04})`,
      transition: "none",
      pointerEvents: "none",
    };
  };

  const getCardColor = (index: number) => CARD_COLORS[index % CARD_COLORS.length];

  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-[#c41e2a] tracking-[0.3em] uppercase" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Client Stories</span>
          <h2 className="mt-4 text-white" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2rem, 3vw, 2.75rem)", fontWeight: 700 }}>Testimonials</h2>
          <div className="w-16 h-1 bg-[#c41e2a] mx-auto mt-6" />
        </div>
        <div className="max-w-4xl mx-auto">
          {/* Mobile: clean single-card layout */}
          <div className="md:hidden">
            {(() => {
              const testimonial = testimonials[current];
              const color = getCardColor(current);
              return (
                <div
                  className="rounded-2xl shadow-2xl p-6 select-none"
                  style={{ backgroundColor: color.bg }}
                  onClick={next}
                  onTouchStart={handleMobileTouchStart}
                  onTouchEnd={handleMobileTouchEnd}
                >
                  <div className="flex gap-1 mb-6 justify-end">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={17} style={{ color: color.star, fill: color.star }} />
                    ))}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "clamp(1.05rem, 4.8vw, 1.45rem)",
                      fontWeight: 500,
                      lineHeight: 1.8,
                      fontStyle: "italic",
                      color: color.text,
                      marginBottom: "2rem",
                    }}
                  >
                    "{testimonial.text}"
                  </p>
                  <div className="text-center">
                    <h4 style={{ fontSize: "1.9rem", fontWeight: 700, color: color.text, lineHeight: 1.1 }}>{testimonial.name}</h4>
                    <p style={{ fontSize: "0.9rem", color: color.sub, marginTop: "0.35rem" }}>{testimonial.role}</p>
                  </div>
                </div>
              );
            })()}

            <div className="mt-4 flex items-center justify-center gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  onClick={() => goTo(i)}
                  style={{
                    width: i === current ? "10px" : "7px",
                    height: i === current ? "10px" : "7px",
                    backgroundColor: i === current ? "#c41e2a" : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Desktop: stacked cards */}
          <div className="hidden md:block">
            <div
              className="relative cursor-pointer select-none overflow-visible"
              onClick={next}
              style={{ height: "430px" }}
            >
              {testimonials.map((testimonial, index) => {
                const color = getCardColor(index);
                return (
                  <div
                    key={index}
                    className="rounded-xl shadow-2xl"
                    style={getCardStyle(index)}
                  >
                    <div className="flex gap-1 mb-8 pt-4 justify-end">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={18} style={{ color: color.star, fill: color.star }} />
                      ))}
                    </div>
                    <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)", fontWeight: 500, lineHeight: 1.85, fontStyle: "italic", color: color.text, marginBottom: "2.5rem" }}>
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center justify-end">
                      <div>
                        <h4 style={{ fontSize: "1.05rem", fontWeight: 600, color: color.text }}>{testimonial.name}</h4>
                        <p style={{ fontSize: "0.875rem", color: color.sub }}>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
