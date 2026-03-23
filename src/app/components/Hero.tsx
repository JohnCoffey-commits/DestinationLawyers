import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Scale } from "lucide-react";

export function Hero() {
  const [phase, setPhase] = useState<"intro" | "reveal">("intro");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("reveal"), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Extra thick red accent line on left edge */}
      <div className="absolute left-0 top-0 w-3 h-full bg-[#c41e2a] z-20" />

      {/* Text content wrapper */}
      <div
        className="relative z-10 min-h-screen bg-black transition-all duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          display: "flex",
          alignItems: phase === "intro" ? "flex-start" : "center",
          justifyContent: "flex-start",
        }}
      >
        {/* Top-left editorial composition - photos + color blocks */}
        <div
          className="absolute pointer-events-none z-0"
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
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1750267712726-375d64ee0400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBvdmVyY29hdCUyMHdhbGtpbmclMjBjaXR5JTIwYmxhY2slMjB3aGl0ZXxlbnwxfHx8fDE3NzIxMDQzODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Man in overcoat"
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
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1599589179615-349171309578?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBzaWxob3VldHRlJTIwdXJiYW4lMjBtb25vY2hyb21lfGVufDF8fHx8MTc3MjEwNDczN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Professional silhouette"
              className="w-full h-full object-cover mx-[-3px] my-[0px]"
              style={{ filter: "grayscale(100%) contrast(1.1)" }}
            />
          </div>
        </div>

        {/* Right-side editorial composition */}
        <div
          className="absolute pointer-events-none"
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
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1610552134612-c30617ea3507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzdWl0JTIwc3RyZWV0JTIwYmxhY2slMjB3aGl0ZSUyMGNhbmRpZHxlbnwxfHx8fDE3NzIxMDQxODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Man in suit - street photography"
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
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1667157484907-f1efcac0577c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc21hbiUyMHdhbGtpbmclMjBzdHJlZXQlMjBtb25vY2hyb21lJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyMTA0MTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Businessman walking - monochrome"
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
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1763130782925-98ef3023ef3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdhbGtpbmclMjBjaXR5JTIwc3RyZWV0JTIwYmxhY2slMjB3aGl0ZSUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzIxMDU3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Woman walking city street"
              className="w-full h-full object-cover m-[0px]"
              style={{ filter: "grayscale(100%) contrast(1.1)" }}
            />
          </div>
        </div>

        <div
          className="transition-all duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)]"
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
              fontFamily: "'Playfair Display', serif",
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