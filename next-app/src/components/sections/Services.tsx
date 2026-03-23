"use client";

import { useState } from "react";

const specialities = [
  {
    title: "Corporate Law",
    description:
      "We provide strategic legal counsel to businesses across every stage of growth — from early structuring through to complex transactions and governance challenges.",
    detail:
      "Our lawyers work closely with directors, founders and investors to manage risk, align legal frameworks with commercial priorities, and support confident decision-making in fast-moving markets.",
    bullets: [
      "Mergers & acquisitions",
      "Governance & restructuring",
      "Cross-border transactions",
    ],
  },
  {
    title: "Criminal Defense",
    description:
      "When freedom, reputation and future opportunities are at risk, experienced and decisive legal representation becomes critical.",
    detail:
      "We defend individuals and organisations facing serious allegations, conducting independent investigations, challenging prosecutorial assumptions, and positioning each matter for the strongest possible outcome.",
    bullets: [
      "Trial & investigation strategy",
      "White-collar and serious offences",
      "Negotiated resolutions",
    ],
  },
  {
    title: "Real Estate Law",
    description:
      "We guide clients through high-value property transactions and disputes with clarity, structure and commercial awareness.",
    detail:
      "From acquisitions and developments to leasing negotiations and complex conflicts, our team helps protect long-term interests while navigating regulatory pressure and market uncertainty.",
    bullets: [
      "Acquisitions & developments",
      "Leasing & contract negotiation",
      "Property disputes",
    ],
  },
];

const panelColors = ["#d4c5a9", "#f5f0eb", "#c41e2a"];
const iconStroke = ["rgba(10,10,10,0.22)", "rgba(10,10,10,0.18)", "rgba(255,255,255,0.25)"];

function ScaleIcon({ color }: { color: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <line x1="22" y1="36" x2="22" y2="14" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="15" y1="36" x2="29" y2="36" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <g className="svc-scale-beam">
        <line x1="7" y1="14" x2="37" y2="14" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        <line x1="7" y1="14" x2="4" y2="24" stroke={color} strokeWidth="1" />
        <line x1="7" y1="14" x2="13" y2="24" stroke={color} strokeWidth="1" />
        <path d="M3 24 Q8.5 27.5 14 24" stroke={color} strokeWidth="1.2" fill="none" />
        <line x1="37" y1="14" x2="31" y2="24" stroke={color} strokeWidth="1" />
        <line x1="37" y1="14" x2="40" y2="24" stroke={color} strokeWidth="1" />
        <path d="M30 24 Q35.5 27.5 41 24" stroke={color} strokeWidth="1.2" fill="none" />
      </g>
    </svg>
  );
}

function GavelIcon({ color }: { color: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="14" y="34" width="16" height="4" rx="1" stroke={color} strokeWidth="1.2" fill="none" />
      <g className="svc-gavel-head">
        <line x1="22" y1="30" x2="22" y2="14" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        <rect x="13" y="8" width="18" height="8" rx="2" stroke={color} strokeWidth="1.2" fill="none" />
      </g>
    </svg>
  );
}

function HourglassIcon({ color }: { color: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <g className="svc-hg-body">
        <line x1="10" y1="6" x2="34" y2="6" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        <line x1="10" y1="38" x2="34" y2="38" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M12 6 L12 10 L22 22 L12 34 L12 38" stroke={color} strokeWidth="1.2" fill="none" />
        <path d="M32 6 L32 10 L22 22 L32 34 L32 38" stroke={color} strokeWidth="1.2" fill="none" />
        <line x1="22" y1="18" x2="22" y2="26" stroke={color} strokeWidth="0.8" strokeLinecap="round"
          strokeDasharray="1.5 2" className="svc-sand-flow" />
      </g>
    </svg>
  );
}

const ServiceIcons = [ScaleIcon, GavelIcon, HourglassIcon];

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="pt-24 pb-24 bg-[#000000]">
      <style>{`
        .svc-scale-beam {
          transform-origin: 22px 14px;
          animation: svcScaleRock 3.5s ease-in-out infinite;
        }
        @keyframes svcScaleRock {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(4.5deg); }
          75% { transform: rotate(-4.5deg); }
        }
        .svc-gavel-head {
          animation: svcGavelStrike 2.5s ease-in-out infinite;
        }
        @keyframes svcGavelStrike {
          0%, 60%, 100% { transform: translateY(0); }
          15% { transform: translateY(-5px); }
          28% { transform: translateY(4px); }
          36% { transform: translateY(0); }
        }
        .svc-hg-body {
          transform-origin: 22px 22px;
          animation: svcHgFlip 7s ease-in-out infinite alternate;
        }
        @keyframes svcHgFlip {
          0%, 82% { transform: rotate(0deg); }
          100% { transform: rotate(180deg); }
        }
        .svc-sand-flow {
          animation: svcSandFlow 1.2s linear infinite;
        }
        @keyframes svcSandFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -7; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[#c41e2a] tracking-[0.3em] uppercase" style={{ fontSize: "0.75rem", fontWeight: 600 }}>What We Do Best</span>
          <h2 className="mt-4 text-white" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2rem, 3vw, 2.75rem)", fontWeight: 700 }}>Our Services</h2>
          <div className="w-16 h-1 bg-[#c41e2a] mx-auto mt-6" />
        </div>
      </div>

      {/* Desktop: horizontal expandable panels */}
      <div className="hidden md:flex gap-3 h-[700px] px-0">
        {specialities.map((item, index) => {
          const isActive = activeIndex === index;
          const bodyColor =
            index === 2 ? "rgba(255,255,255,0.55)" : "rgba(10,10,10,0.45)";
          const IconComp = ServiceIcons[index];
          return (
            <div
              key={item.title}
              onClick={() => setActiveIndex(index)}
              className="relative overflow-hidden cursor-pointer"
              style={{
                flex: isActive ? 5 : 1,
                transition: "flex 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                backgroundColor: panelColors[index],
              }}
            >
              {/* Collapsed state */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                style={{
                  opacity: isActive ? 0 : 1,
                  transform: isActive ? "scale(0.9)" : "scale(1)",
                  transition: "opacity 0.3s ease, transform 0.4s ease",
                  pointerEvents: isActive ? "none" : "auto",
                }}
              >
                <span
                  style={{
                    color: index === 2 ? "rgba(255,255,255,0.85)" : "rgba(10,10,10,0.6)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    fontFamily: "var(--font-playfair), serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.title}
                </span>
              </div>

              {/* Expanded state: full content */}
              <div
                className="absolute inset-0 flex flex-col justify-between p-10"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0) translateX(0)" : "translateY(30px) translateX(-10px)",
                  transition: isActive
                    ? "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s"
                    : "opacity 0.2s ease, transform 0.2s ease",
                  pointerEvents: isActive ? "auto" : "none",
                  backgroundColor: panelColors[index],
                }}
              >
                {/* Title + paragraph, left-aligned, 3/5 width */}
                <div className="flex-1 flex flex-col justify-center" style={{ width: "60%", maxWidth: "34rem" }}>
                  <h3
                    className="mb-6"
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "3rem",
                      fontWeight: 700,
                      color: index === 2 ? "#ffffff" : "#0a0a0a",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "1.125rem",
                      lineHeight: 1.78,
                      color: bodyColor,
                    }}
                  >
                    {item.description}
                  </p>
                  <p
                    style={{
                      marginTop: "1rem",
                      fontSize: "1.125rem",
                      lineHeight: 1.78,
                      color: bodyColor,
                    }}
                  >
                    {item.detail}
                  </p>
                  <ul
                    style={{
                      marginTop: "1.35rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.65rem",
                      color: bodyColor,
                      fontSize: "1.0625rem",
                      lineHeight: 1.72,
                      listStyleType: "disc",
                      listStylePosition: "inside",
                      marginLeft: 0,
                      paddingLeft: 0,
                    }}
                  >
                    {item.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "28px",
                  right: "28px",
                  opacity: isActive ? 1 : 0,
                  transition: isActive ? "opacity 0.5s ease 0.45s" : "opacity 0.2s ease",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              >
                <IconComp color={iconStroke[index]} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: stacked accordion */}
      <div className="md:hidden flex flex-col gap-3 px-4">
        {specialities.map((item, index) => {
          const isActive = activeIndex === index;
          const IconComp = ServiceIcons[index];
          const isRed = index === 2;
          const titleColor = isRed ? "#ffffff" : "#0a0a0a";
          const bodyColor = isRed ? "rgba(255,255,255,0.55)" : "rgba(10,10,10,0.5)";
          const collapsedTextColor = isRed ? "rgba(255,255,255,0.85)" : "rgba(10,10,10,0.6)";
          return (
            <div
              key={item.title}
              onClick={() => setActiveIndex(index)}
              className="overflow-hidden cursor-pointer"
              style={{
                backgroundColor: panelColors[index],
                maxHeight: isActive ? "500px" : "64px",
                transition: "max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
              }}
            >
              {/* Collapsed row */}
              <div
                className="flex items-center px-6"
                style={{
                  height: "64px",
                  opacity: isActive ? 0 : 1,
                  transition: "opacity 0.2s ease",
                  position: "absolute",
                  inset: 0,
                  pointerEvents: isActive ? "none" : "auto",
                }}
              >
                <span style={{ color: collapsedTextColor, fontSize: "0.9rem", fontWeight: 600, fontFamily: "var(--font-playfair), serif" }}>
                  {item.title}
                </span>
              </div>

              {/* Expanded content */}
              <div
                className="p-6 flex flex-col"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(10px)",
                  transition: isActive
                    ? "opacity 0.4s ease 0.2s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s"
                    : "opacity 0.15s ease, transform 0.15s ease",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.5rem", fontWeight: 700, color: titleColor, marginBottom: "0.75rem" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: bodyColor }}>
                  {item.description}
                </p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: bodyColor, marginTop: "0.75rem" }}>
                  {item.detail}
                </p>
                <ul
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.45rem",
                    color: bodyColor,
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    listStyleType: "disc",
                    listStylePosition: "inside",
                    marginLeft: 0,
                    paddingLeft: 0,
                  }}
                >
                  {item.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  opacity: isActive ? 1 : 0,
                  transition: isActive ? "opacity 0.4s ease 0.25s" : "opacity 0.15s ease",
                  pointerEvents: "none",
                  zIndex: 2,
                  transform: "scale(0.7)",
                  transformOrigin: "top right",
                }}
              >
                <IconComp color={isRed ? "rgba(255,255,255,0.2)" : "rgba(10,10,10,0.1)"} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
