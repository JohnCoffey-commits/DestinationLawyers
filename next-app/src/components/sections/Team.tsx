"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

const teamMembers = [
  {
    name: "Ken Hu",
    role: "Paralegal",
    specialty: "Immigration Law",
    quote: "I ensure no detail is overlooked, providing the thorough groundwork that every successful legal strategy depends on.",
    email: "info@destinationlawyers.com",
    phone: "02 0804 1213",
    image: "/media/team/Ken.webp",
  },
  {
    name: "Sophie Liu",
    role: "Solicitor",
    specialty: "Criminal Defense",
    quote: "Precision and preparation define my practice — I stand with my clients when the stakes are at their highest.",
    email: "info@destinationlawyers.com",
    phone: "02 0804 1213",
    image: "/media/team/Sophie.webp",
  },
  {
    name: "Chloe He",
    role: "Solicitor",
    specialty: "Family Law",
    quote: "My clients trust me to protect what matters most — I bring tenacity and empathy to every case I take on.",
    email: "chloe.he@destlawyers.com.au",
    phone: "02 0804 1213",
    image: "/media/team/Chloe.webp",
  },
  {
    name: "Samuel Li",
    role: "Principal Solicitor",
    specialty: "Corporate Law",
    quote: "I lead every matter with strategic clarity, turning complex legal challenges into decisive outcomes for my clients.",
    email: "info@destinationlawyers.com",
    phone: "02 0804 1213",
    image: "/media/team/Samuel.webp",
  },
  {
    name: "Jane Xiao",
    role: "Paralegal",
    specialty: "Real Estate Law",
    quote: "Behind every strong case is meticulous research and relentless attention to detail — that is what I deliver every day.",
    email: "info@destinationlawyers.com",
    phone: "02 0804 1213",
    image: "/media/team/Jane.webp",
  },
  {
    name: "John Chan",
    role: "Solicitor",
    specialty: "International Law",
    quote: "I navigate cross-border complexities with confidence, ensuring my clients are protected wherever the law takes them.",
    email: "info@destinationlawyers.com",
    phone: "02 0804 1213",
    image: "/media/team/John.webp",
  },
];

const SKEW = 28;
const GAP = 6;
const TOTAL = teamMembers.length;

const getClipPath = (i: number) => {
  const isFirst = i === 0;
  const isLast = i === TOTAL - 1;

  const topLeft = isFirst ? "0" : `${SKEW}px`;
  const bottomRight = isLast ? "100%" : `calc(100% - ${SKEW}px)`;

  return `polygon(${topLeft} 0, 100% 0, ${bottomRight} 100%, 0 100%)`;
};

export function Team() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      window.setTimeout(() => setCopiedEmail((prev) => (prev === email ? null : prev)), 1200);
    } catch {
      setCopiedEmail(null);
    }
  };

  return (
    <section id="team" className="bg-black overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center">
          <span
            className="text-[#c41e2a] tracking-[0.3em] uppercase"
            style={{ fontSize: "0.75rem", fontWeight: 600 }}
          >
            Meet The Experts
          </span>
          <h2
            className="mt-4 text-white"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(2rem, 3vw, 2.75rem)",
              fontWeight: 700,
            }}
          >
            Our Team
          </h2>
          <div className="w-16 h-1 bg-[#c41e2a] mx-auto mt-6" />
        </div>
      </div>

      {/* Cards row */}
      <div
        className="flex w-full px-2"
        style={{ height: "clamp(480px, 65vh, 700px)" }}
      >
        {teamMembers.map((member, i) => {
          const isHovered = hoveredIndex === i;
          const anyHovered = hoveredIndex !== null;
          const isFirst = i === 0;

          return (
            <div
              key={member.name}
              className="relative flex-shrink-0 overflow-hidden cursor-pointer"
              style={{
                flex: isHovered ? "1.7" : anyHovered ? "0.78" : "1",
                transition: "flex 0.6s cubic-bezier(0.25,0.1,0.25,1)",
                zIndex: isHovered ? 10 : 1,
                clipPath: getClipPath(i),
                marginLeft: isFirst ? "0" : `${-(SKEW - GAP)}px`,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Photo */}
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 70vw, (max-width: 1280px) 30vw, 22vw"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{
                  filter: anyHovered && !isHovered
                    ? "brightness(0.35) saturate(0.4)"
                    : isHovered
                      ? "brightness(0.92) saturate(1)"
                      : "brightness(0.82) saturate(0.85)",
                  transition: "filter 0.6s ease, transform 0.6s cubic-bezier(0.25,0.1,0.25,1)",
                  transform: isHovered ? "scale(1.02)" : "scale(1)",
                }}
              />

              {/* Warm gradient at bottom — khaki → red-brown → dark beige */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: isHovered
                    ? "linear-gradient(to top, #1a0a04 0%, #4a1a0e 18%, #8b5e3c80 38%, #c4a87040 55%, transparent 78%)"
                    : "linear-gradient(to top, #1a0a04 0%, #6b3420aa 22%, #c4956a30 48%, transparent 70%)",
                  transition: "background 0.6s ease",
                }}
              />

              {/* Default label (always visible, fades on hover) */}
              <div
                className="absolute bottom-0 left-0 right-0 pb-6 pt-10"
                style={{
                  paddingLeft: `${(i === 0 ? 20 : SKEW + 16)}px`,
                  paddingRight: `${(i === TOTAL - 1 ? 20 : SKEW + 16)}px`,
                  opacity: isHovered ? 0 : 1,
                  transform: isHovered ? "translateY(6px)" : "translateY(0)",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                }}
              >
                <h3
                  className="text-white mt-1 truncate"
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(0.85rem, 1.1vw, 1.1rem)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-white/45 truncate mt-0.5"
                  style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.03em" }}
                >
                  {member.role}
                </p>
              </div>

              {/* Hover info panel — slides up elegantly */}
              <div
                className="absolute bottom-0 left-0 right-0 pb-7"
                style={{
                  paddingLeft: `${(i === 0 ? 24 : SKEW + 20)}px`,
                  paddingRight: `${(i === TOTAL - 1 ? 24 : SKEW + 20)}px`,
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 0.45s ease 0.08s, transform 0.5s cubic-bezier(0.25,0.1,0.25,1) 0.08s",
                }}
              >
                {/* Thin gold accent line */}
                <div
                  className="mb-4"
                  style={{
                    width: "28px",
                    height: "2px",
                    background: "linear-gradient(to right, #c41e2a, #c4956a)",
                  }}
                />

                <h3
                  className="text-white mb-1"
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-[#c4956a] mb-4"
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {member.role}
                </p>

                {/* Quote — italic editorial style */}
                <p
                  className="text-white/55 mb-5 leading-relaxed"
                  style={{
                    fontSize: "0.76rem",
                    fontStyle: "italic",
                    fontFamily: "var(--font-playfair), serif",
                  }}
                >
                  "{member.quote}"
                </p>

                {/* Contact — minimal, refined */}
                <div className="space-y-2 border-t border-white/10 pt-3">
                  <button
                    type="button"
                    className="flex items-center gap-2.5 text-white/50 hover:text-[#c4a870] transition-colors"
                    style={{ fontSize: "0.68rem", letterSpacing: "0.02em" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      void handleCopyEmail(member.email);
                    }}
                  >
                    <Mail size={10} className="text-[#c4956a] flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                    <span className="text-[#c4a870] text-[0.62rem]">
                      {copiedEmail === member.email ? "Copied" : ""}
                    </span>
                  </button>
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2.5 text-white/50 hover:text-[#c4a870] transition-colors"
                    style={{ fontSize: "0.68rem", letterSpacing: "0.02em" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone size={10} className="text-[#c4956a] flex-shrink-0" />
                    <span>{member.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom spacer */}
      <div className="pb-16" />
    </section>
  );
}
