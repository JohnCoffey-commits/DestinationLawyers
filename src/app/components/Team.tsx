import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Mail, Phone } from "lucide-react";

const teamMembers = [
  {
    name: "James Richardson",
    role: "Managing Partner",
    specialty: "Corporate Law",
    quote: "Three decades of corporate mastery — delivering clarity where others see only complexity.",
    email: "j.richardson@destinationlawyers.com",
    phone: "+1 (555) 001-0001",
    image: "https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXd5ZXIlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHN1aXR8ZW58MXx8fHwxNzcyMDc5MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Sarah Mitchell",
    role: "Senior Partner",
    specialty: "Family Law",
    quote: "Every family deserves a fierce advocate. I've spent 20 years being exactly that.",
    email: "s.mitchell@destinationlawyers.com",
    phone: "+1 (555) 001-0002",
    image: "https://images.unsplash.com/photo-1736939666660-d4c776e0532c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGF0dG9ybmV5JTIwY29ycG9yYXRlfGVufDF8fHx8MTc3MjA3OTEzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Michael Chen",
    role: "Partner",
    specialty: "Criminal Defense",
    quote: "In the courtroom, precision wins. I prepare for every case as if it's the only one.",
    email: "m.chen@destinationlawyers.com",
    phone: "+1 (555) 001-0003",
    image: "https://images.unsplash.com/photo-1543879739-ab87be3df369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc21hbiUyMEFzaWFuJTIwc3VpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzIwNzkxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Emily Torres",
    role: "Associate",
    specialty: "Immigration Law",
    quote: "Borders are legal constructs. I help people navigate them with dignity and confidence.",
    email: "e.torres@destinationlawyers.com",
    phone: "+1 (555) 001-0004",
    image: "https://images.unsplash.com/photo-1771240730126-594a8ab66be1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBMYXRpbmElMjBidXNpbmVzc3dvbWFuJTIwb2ZmaWNlfGVufDF8fHx8MTc3MjA3OTEzOHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "David Okafor",
    role: "Partner",
    specialty: "Real Estate Law",
    quote: "Property disputes demand both legal acumen and strategic vision. I bring both to every deal.",
    email: "d.okafor@destinationlawyers.com",
    phone: "+1 (555) 001-0005",
    image: "https://images.unsplash.com/photo-1524538198441-241ff79d153b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBCbGFjayUyMG1hbGUlMjBsYXd5ZXIlMjBwb3J0cmFpdCUyMHN1aXR8ZW58MXx8fHwxNzcyMTkyMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Alexandra Petrov",
    role: "Senior Associate",
    specialty: "International Law",
    quote: "Global cases require global thinking. I bridge jurisdictions so clients never face uncertainty alone.",
    email: "a.petrov@destinationlawyers.com",
    phone: "+1 (555) 001-0006",
    image: "https://images.unsplash.com/photo-1665224752136-4dbe2dfc8195?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGF0dG9ybmV5JTIwcG9ydHJhaXQlMjBlbGVnYW50fGVufDF8fHx8MTc3MjE5MjE2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
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
              fontFamily: "'Playfair Display', serif",
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
              <ImageWithFallback
                src={member.image}
                alt={member.name}
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
                <p
                  className="text-[#c4a870] tracking-[0.2em] uppercase truncate"
                  style={{ fontSize: "0.6rem", fontWeight: 600 }}
                >
                  {member.specialty}
                </p>
                <h3
                  className="text-white mt-1 truncate"
                  style={{
                    fontFamily: "'Playfair Display', serif",
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

                <p
                  className="text-[#c4a870] tracking-[0.25em] uppercase mb-1.5"
                  style={{ fontSize: "0.6rem", fontWeight: 600 }}
                >
                  {member.specialty}
                </p>
                <h3
                  className="text-white mb-1"
                  style={{
                    fontFamily: "'Playfair Display', serif",
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
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  "{member.quote}"
                </p>

                {/* Contact — minimal, refined */}
                <div className="space-y-2 border-t border-white/10 pt-3">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2.5 text-white/50 hover:text-[#c4a870] transition-colors"
                    style={{ fontSize: "0.68rem", letterSpacing: "0.02em" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Mail size={10} className="text-[#c4956a] flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </a>
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