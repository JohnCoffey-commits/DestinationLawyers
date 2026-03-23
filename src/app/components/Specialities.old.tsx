import { useState } from "react";

const specialities = [
  { title: "Corporate Law", description: "Our corporate law practice provides comprehensive legal counsel to businesses at every stage of their lifecycle. From startup formation and venture capital financing to complex mergers and acquisitions, we guide our clients through the intricate landscape of corporate governance and regulatory compliance. Our team has extensive experience advising boards of directors, structuring joint ventures, negotiating shareholder agreements, and managing corporate restructurings. We understand that every business decision carries legal implications, and we work proactively to identify risks before they become liabilities. Whether you are navigating cross-border transactions, managing intellectual property portfolios, or preparing for an initial public offering, our attorneys bring a strategic, results-oriented approach that aligns legal strategy with your broader business objectives. We pride ourselves on building lasting partnerships with our clients, serving as trusted advisors who understand the nuances of their industries and the competitive pressures they face in today's global marketplace." },
  { title: "Criminal Defense", description: "When your freedom and reputation are at stake, you need a defense team that combines rigorous legal expertise with an unwavering commitment to protecting your constitutional rights. Our criminal defense practice handles cases ranging from white-collar fraud investigations and federal conspiracy charges to DUI offenses and domestic disputes. We believe that every individual deserves a vigorous defense, regardless of the charges they face. Our attorneys conduct thorough independent investigations, challenge prosecutorial evidence at every turn, and craft compelling narratives that resonate with judges and juries alike. We have a proven track record of securing dismissals, acquittals, and favorable plea agreements in cases that other firms considered unwinnable. From the moment you engage our services, we work tirelessly to minimize the impact of criminal proceedings on your life, your career, and your family. Our approach is built on transparency, constant communication, and an aggressive willingness to take cases to trial when the prosecution refuses to offer a just resolution." },
  { title: "Real Estate Law", description: "Real estate transactions represent some of the most significant financial decisions individuals and businesses will ever make. Our real estate practice offers end-to-end legal services covering residential and commercial property acquisitions, development projects, zoning and land use approvals, construction contracts, and lease negotiations. We represent buyers, sellers, developers, investors, landlords, and tenants across a wide spectrum of transactions, from single-family home purchases to multi-million dollar commercial developments. Our attorneys conduct meticulous due diligence, identify potential title defects and environmental liabilities, and negotiate contract terms that protect our clients' interests at every stage of the deal. We also handle complex real estate disputes including boundary conflicts, easement disagreements, construction defect claims, and landlord-tenant litigation. With deep knowledge of local regulations and a network of industry relationships, we help our clients navigate the complexities of the real estate market with confidence and clarity." },
];

const panelColors = ["#d4c5a9", "#f5f0eb", "#c41e2a"];

export function Specialities() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="specialities" className="pt-24 pb-24 bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[#c41e2a] tracking-[0.3em] uppercase" style={{ fontSize: "0.75rem", fontWeight: 600 }}>What We Do Best</span>
          <h2 className="mt-4 text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3vw, 2.75rem)", fontWeight: 700 }}>Our Specialities</h2>
          <div className="w-16 h-1 bg-[#c41e2a] mx-auto mt-6" />
        </div>
      </div>

        {/* Desktop: horizontal expandable panels */}
        <div className="hidden md:flex gap-3 h-[700px] px-0">
          {specialities.map((item, index) => {
            const isActive = activeIndex === index;
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
                      fontFamily: "'Playfair Display', serif",
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
                  <div className="flex-1 flex flex-col justify-center" style={{ width: "60%" }}>
                    <h3
                      className="mb-6"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "3rem",
                        fontWeight: 700,
                        color: index === 2 ? "#ffffff" : "#0a0a0a",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9375rem",
                        lineHeight: 1.9,
                        color: index === 2 ? "rgba(255,255,255,0.55)" : "rgba(10,10,10,0.45)",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: stacked accordion */}
        <div className="md:hidden flex flex-col gap-3 px-4">
          {specialities.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={item.title}
                onClick={() => setActiveIndex(index)}
                className="overflow-hidden cursor-pointer"
                style={{
                  backgroundColor: isActive ? "#0a0a0a" : "#f5f0eb",
                  height: isActive ? "260px" : "64px",
                  transition: "height 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease",
                  position: "relative",
                }}
              >
                {/* Collapsed row */}
                <div
                  className="flex items-center gap-4 px-6"
                  style={{
                    height: "64px",
                    opacity: isActive ? 0 : 1,
                    transition: "opacity 0.2s ease",
                    position: "absolute",
                    inset: 0,
                    pointerEvents: isActive ? "none" : "auto",
                  }}
                >
                  <span className="text-[#0a0a0a]/70" style={{ fontSize: "0.9rem", fontWeight: 600, fontFamily: "'Playfair Display', serif" }}>
                    {item.title}
                  </span>
                </div>

                {/* Expanded content */}
                <div
                  className="p-6 flex flex-col justify-end h-full"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(10px)",
                    transition: isActive
                      ? "opacity 0.4s ease 0.2s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s"
                      : "opacity 0.15s ease, transform 0.15s ease",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700 }}>
                    {item.title}
                  </h3>
                  <p className="text-white/50" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
    </section>
  );
}