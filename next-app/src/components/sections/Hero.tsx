"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Scale } from "lucide-react";

export function Hero() {
  const [phase, setPhase] = useState<"intro" | "reveal">("intro");
  const [introVideoError, setIntroVideoError] = useState(false);

  useEffect(() => {
    if (phase !== "intro") return;

    const timer = setTimeout(() => setPhase("reveal"), 3000);

    const handleInteraction = () => {
      clearTimeout(timer);
      setPhase("reveal");
    };

    window.addEventListener("pointerdown", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [phase]);

  return (
    <section id="home" className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <style>{`
        @media (max-width: 767px) {
          .hero-main {
            flex-direction: column !important;
            align-items: stretch !important;
            justify-content: flex-start !important;
          }
          .hero-text {
            max-width: 100% !important;
            padding: 2rem 1.5rem 3.5rem 1.5rem !important;
            align-self: stretch !important;
          }
        }
      `}</style>
      {phase === "intro" ? (
        <div
          className="fixed inset-0 z-[60] w-screen h-screen overflow-hidden"
          style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #000000 100%)" }}
          aria-hidden="true"
        >
          {!introVideoError ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              preload="auto"
              tabIndex={-1}
              onError={() => setIntroVideoError(true)}
            >
              <source src="/intro.mp4" type="video/mp4" />
            </video>
          ) : null}
        </div>
      ) : null}

      {/* Extra thick red accent line on left edge */}
      <div className="absolute left-0 top-0 w-3 h-full bg-[#c41e2a] z-20" />

      {/* Text content wrapper */}
      <div
        className="hero-main relative z-10 min-h-screen bg-black transition-all duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          display: "flex",
          alignItems: phase === "intro" ? "flex-start" : "center",
          justifyContent: "flex-start",
        }}
      >
        {/* Top-left editorial composition - photos + color blocks */}
        <div
          className="absolute pointer-events-none z-0 hidden md:block"
          style={{
            top: "2%",
            left: "2%",
            width: "50%",
            height: "50%",
          }}
        >
          {/* Color block 1 - large khaki, backdrop */}
          <div
            style={{
              position: "absolute",
              width: "40%",
              height: "50%",
              backgroundColor: "#c8b898",
              top: "10%",
              left: "18%",
              opacity: phase === "reveal" ? 0.9 : 0,
              transform: phase === "reveal" ? "scale(1)" : "scale(0.6)",
              transition: "opacity 1s ease-out, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0.1s",
            }}
          />

          {/* Color block 2 - dark red, small accent */}
          <div
            style={{
              position: "absolute",
              width: "38%",
              height: "22%",
              backgroundColor: "#a82230",
              bottom: "-12%",
              left: "38%",
              zIndex: 0,
              opacity: phase === "reveal" ? 0.92 : 0,
              transform: phase === "reveal" ? "scale(1)" : "scale(0.4)",
              transition: "opacity 0.8s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0.3s",
            }}
          />

          {/* Color block 3 - beige, tiny offset square */}
          <div
            style={{
              position: "absolute",
              width: "10%",
              height: "14%",
              backgroundColor: "#ddd3be",
              top: "2%",
              left: "52%",
              opacity: phase === "reveal" ? 0.75 : 0,
              transform: phase === "reveal" ? "scale(1)" : "scale(0.3)",
              transition: "opacity 0.8s ease-out, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0.2s",
            }}
          />

          {/* Photo A - larger, anchored left */}
          <div
            style={{
              position: "absolute",
              width: "34%",
              height: "65%",
              top: "5%",
              left: "5%",
              opacity: phase === "reveal" ? 1 : 0,
              transform: phase === "reveal"
                ? "translate(0, 0) scale(1)"
                : "translate(60px, 30px) scale(0.85)",
              transition: "opacity 1s ease-out, transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0.45s",
              overflow: "hidden",
              boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
            }}
          >
            <Image
              src="/media/hero/photo-a.png"
              alt="Man in overcoat"
              fill
              priority
              sizes="34vw"
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(100%) contrast(1.1)" }}
            />
          </div>

          {/* Photo B - smaller, overlapping right-bottom */}
          <div
            style={{
              position: "absolute",
              width: "28%",
              height: "48%",
              bottom: "2%",
              right: "12%",
              opacity: phase === "reveal" ? 1 : 0,
              transform: phase === "reveal"
                ? "translate(0, 0) scale(1)"
                : "translate(-50px, -20px) scale(0.85)",
              transition: "opacity 1s ease-out, transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0.65s",
              overflow: "hidden",
              boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
            }}
          >
            <Image
              src="/media/hero/photo-b.png"
              alt="Professional silhouette"
              fill
              sizes="28vw"
              className="w-full h-full object-cover mx-[-3px] my-[0px]"
              style={{ filter: "grayscale(100%) contrast(1.1)" }}
            />
          </div>
        </div>

        {/* Right-side editorial composition */}
        <div
          className="absolute pointer-events-none hidden md:block"
          style={{
            top: "5%",
            right: "3%",
            width: "50%",
            height: "85%",
          }}
        >
          {/* Beige rectangle - expands from center with scale */}
          <div
            style={{
              position: "absolute",
              width: "55%",
              height: "60%",
              backgroundColor: "#e8e0d4",
              top: "18%",
              left: "22%",
              opacity: phase === "reveal" ? 1 : 0,
              transform: phase === "reveal" ? "scale(1)" : "scale(0.5)",
              transition: "opacity 1s ease-out, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0.15s",
            }}
          />

          {/* Photo C - large, left-leaning */}
          <div
            style={{
              position: "absolute",
              width: "40%",
              height: "58%",
              top: "8%",
              left: "8%",
              opacity: phase === "reveal" ? 1 : 0,
              transform: phase === "reveal"
                ? "translate(0, 0) scale(1)"
                : "translate(80px, 20px) scale(0.8)",
              transition: "opacity 1s ease-out, transform 1.7s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0.55s",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            }}
          >
            <Image
              src="/media/hero/photo-c.png"
              alt="Man in suit - street photography"
              fill
              sizes="40vw"
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(100%) contrast(1.1)" }}
            />
          </div>

          {/* Photo D - smaller, offset bottom-right */}
          <div
            style={{
              position: "absolute",
              width: "35%",
              height: "48%",
              bottom: "4%",
              right: "5%",
              opacity: phase === "reveal" ? 1 : 0,
              transform: phase === "reveal"
                ? "translate(0, 0) scale(1)"
                : "translate(-60px, -30px) scale(0.8)",
              transition: "opacity 1s ease-out, transform 1.7s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0.8s",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            }}
          >
            <Image
              src="/media/hero/photo-d.png"
              alt="Businessman walking - monochrome"
              fill
              sizes="35vw"
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(100%) contrast(1.1)" }}
            />
          </div>

          {/* Photo E - small, top-right corner accent */}
          <div
            style={{
              position: "absolute",
              width: "26%",
              height: "34%",
              top: "3%",
              right: "8%",
              opacity: phase === "reveal" ? 1 : 0,
              transform: phase === "reveal"
                ? "translate(0, 0) scale(1)"
                : "translate(-30px, 40px) scale(0.8)",
              transition: "opacity 1s ease-out, transform 1.7s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0.95s",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            }}
          >
            <Image
              src="/media/hero/photo-e.png"
              alt="Woman walking city street"
              fill
              sizes="26vw"
              className="w-full h-full object-cover m-[0px]"
              style={{ filter: "grayscale(100%) contrast(1.1)" }}
            />
          </div>
        </div>

        {/* Mobile photo collage */}
        <div
          className="md:hidden relative w-full pointer-events-none"
          style={{ height: "52vh", minHeight: "300px" }}
        >
          <div style={{ position: "absolute", width: "32%", height: "30%", backgroundColor: "#c8b898", top: "8%", left: "25%", opacity: phase === "reveal" ? 0.85 : 0, transform: phase === "reveal" ? "scale(1)" : "scale(0.6)", transition: "opacity 0.8s ease-out, transform 1.2s cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.1s" }} />
          <div style={{ position: "absolute", width: "42%", height: "45%", backgroundColor: "#e8e0d4", top: "5%", right: "8%", opacity: phase === "reveal" ? 0.9 : 0, transform: phase === "reveal" ? "scale(1)" : "scale(0.5)", transition: "opacity 0.8s ease-out, transform 1.3s cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.15s" }} />
          <div style={{ position: "absolute", width: "20%", height: "10%", backgroundColor: "#a82230", bottom: "24%", left: "30%", zIndex: 1, opacity: phase === "reveal" ? 0.9 : 0, transform: phase === "reveal" ? "scale(1)" : "scale(0.4)", transition: "opacity 0.8s ease-out, transform 1.1s cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.25s" }} />
          <div style={{ position: "absolute", width: "40%", height: "65%", top: "4%", left: "3%", opacity: phase === "reveal" ? 1 : 0, transform: phase === "reveal" ? "translate(0,0) scale(1)" : "translate(30px,15px) scale(0.85)", transition: "opacity 1s ease-out, transform 1.5s cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.4s", overflow: "hidden", boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}>
            <Image src="/media/hero/photo-a.png" alt="Man in overcoat" fill sizes="40vw" className="object-cover" style={{ filter: "grayscale(100%) contrast(1.1)" }} />
          </div>
          <div style={{ position: "absolute", width: "44%", height: "50%", top: "2%", right: "4%", opacity: phase === "reveal" ? 1 : 0, transform: phase === "reveal" ? "translate(0,0) scale(1)" : "translate(-25px,10px) scale(0.85)", transition: "opacity 1s ease-out, transform 1.5s cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.55s", overflow: "hidden", boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}>
            <Image src="/media/hero/photo-c.png" alt="Man in suit" fill sizes="44vw" className="object-cover" style={{ filter: "grayscale(100%) contrast(1.1)" }} />
          </div>
          <div style={{ position: "absolute", width: "38%", height: "38%", bottom: "2%", right: "6%", opacity: phase === "reveal" ? 1 : 0, transform: phase === "reveal" ? "translate(0,0) scale(1)" : "translate(-15px,-15px) scale(0.85)", transition: "opacity 1s ease-out, transform 1.5s cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.7s", overflow: "hidden", boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}>
            <Image src="/media/hero/photo-d.png" alt="Businessman walking" fill sizes="38vw" className="object-cover" style={{ filter: "grayscale(100%) contrast(1.1)" }} />
          </div>
          <div style={{ position: "absolute", width: "25%", height: "28%", bottom: "10%", left: "22%", zIndex: 2, opacity: phase === "reveal" ? 1 : 0, transform: phase === "reveal" ? "translate(0,0) scale(1)" : "translate(15px,-10px) scale(0.85)", transition: "opacity 1s ease-out, transform 1.5s cubic-bezier(0.16,1,0.3,1)", transitionDelay: "0.85s", overflow: "hidden", boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}>
            <Image src="/media/hero/photo-e.png" alt="Woman walking city" fill sizes="25vw" className="object-cover" style={{ filter: "grayscale(100%) contrast(1.1)" }} />
          </div>
        </div>

        <div
          className="hero-text transition-all duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            maxWidth: phase === "intro" ? "100%" : "55%",
            width: "100%",
            paddingTop: phase === "intro" ? "2rem" : "0",
            paddingLeft: "clamp(2.5rem, 5vw, 5rem)",
            paddingRight: phase === "intro" ? "1rem" : "0",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            justifyContent: "center",
            alignSelf: phase === "intro" ? "flex-start" : "flex-end",
            paddingBottom: phase === "intro" ? "0" : "clamp(3rem, 5vw, 5rem)",
          }}
        >
          {/* Subtitle - appears after reveal */}
          <div
            className="flex items-center gap-3 transition-all duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: phase === "reveal" ? 1 : 0,
              transform: phase === "reveal" ? "translateY(0)" : "translateY(10px)",
              transitionDelay: phase === "reveal" ? "1s" : "0s",
              justifyContent: "flex-start",
            }}
          >
            <Scale className="text-[#c41e2a]" size={20} />
            <span className="text-[#c41e2a] tracking-[0.3em] uppercase" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
              Excellence in Legal Practice
            </span>
          </div>

          {/* Main heading - always visible */}
          <h1
            className="text-white"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            <span className="text-white">Destination Lawyers</span>
          </h1>

          {/* Description - always visible */}
          <p
            className="text-white/60 p-0"
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.8,
              maxWidth: "45rem",
            }}
          >At Destination Lawyers, we combine decades of legal expertise with an unwavering commitment to our clients. Your destination for justice starts here.</p>
        </div>
      </div>
    </section>
  );
}
