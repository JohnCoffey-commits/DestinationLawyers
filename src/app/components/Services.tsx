import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const services = [
  {
    title: "Legal Consultation",
    description: "In-depth analysis of your legal situation with personalized advice from experienced attorneys.",
    features: ["Initial case assessment", "Strategic planning", "Risk evaluation", "Expert recommendations"],
    image: "https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGNvbnN1bHRhdGlvbiUyMGxhd3llciUyMG1lZXRpbmd8ZW58MXx8fHwxNzcyMDgxMDIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Litigation & Dispute Resolution",
    description: "Vigorous representation in court proceedings and alternative dispute resolution methods.",
    features: ["Trial preparation", "Court representation", "Mediation services", "Arbitration support"],
    image: "https://images.unsplash.com/photo-1758541213979-fe8c9996e197?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VydHJvb20lMjBsaXRpZ2F0aW9uJTIwbGF3fGVufDF8fHx8MTc3MjA4MTAyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Contract Drafting & Review",
    description: "Meticulous preparation and review of legal documents to protect your interests.",
    features: ["Contract negotiation", "Due diligence", "Compliance review", "Document preparation"],
    image: "https://images.unsplash.com/photo-1763729805496-b5dbf7f00c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250cmFjdCUyMHNpZ25pbmclMjBkb2N1bWVudCUyMGxlZ2FsfGVufDF8fHx8MTc3MjA4MTAyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    title: "Legal Compliance & Advisory",
    description: "Ongoing legal guidance to ensure your business operates within regulatory frameworks.",
    features: ["Regulatory compliance", "Policy development", "Risk management", "Annual audits"],
    image: "https://images.unsplash.com/photo-1636142466028-8c6c7cd616b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBjb21wbGlhbmNlJTIwYnVzaW5lc3MlMjByZWd1bGF0aW9ufGVufDF8fHx8MTc3MjA4MTAyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, services.length - 1));
    setActiveIndex(clamped);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 10) return;

      if (delta > 0 && activeIndex < services.length - 1) {
        e.preventDefault();
        isScrolling.current = true;
        setActiveIndex((prev) => Math.min(prev + 1, services.length - 1));
        setTimeout(() => { isScrolling.current = false; }, 700);
      } else if (delta < 0 && activeIndex > 0) {
        e.preventDefault();
        isScrolling.current = true;
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        setTimeout(() => { isScrolling.current = false; }, 700);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [activeIndex]);

  return (
    <section id="services" className="py-24 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left column — title + image */}
          <div className="lg:w-[38%] w-full lg:sticky lg:top-32">
            {/* Section header — left aligned */}
            <div className="mb-4 p-[0px]">
              <span
                className="text-[#c41e2a] tracking-[0.3em] uppercase"
                style={{ fontSize: "0.75rem", fontWeight: 600 }}
              >
                How We Help
              </span>
              <h2
                className="mt-1 text-[#0a0a0a]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 3vw, 2.75rem)",
                  fontWeight: 700,
                }}
              >
                Our Services
              </h2>
              <div className="w-16 h-1 bg-[#c41e2a] mt-2" />
            </div>

            {/* Fading image */}
            <div className="relative overflow-hidden w-full" style={{ height: "380px" }}>
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="absolute inset-0 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index
                      ? "translateY(0) scale(1)"
                      : activeIndex > index
                        ? "translateY(-60px) scale(0.95)"
                        : "translateY(60px) scale(0.95)",
                    pointerEvents: activeIndex === index ? "auto" : "none",
                  }}
                >
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle red accent overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c41e2a]" />
                </div>
              ))}
            </div>

            {/* Navigation controls under image */}
            <div className="flex items-center justify-center gap-3 mt-6">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: activeIndex === i ? "2rem" : "0.6rem",
                    height: "0.6rem",
                    backgroundColor: activeIndex === i ? "#c41e2a" : "#d1d5db",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right column — card carousel */}
          <div className="lg:w-[62%] w-full lg:pt-[6rem] mx-[-7px] my-[70px]">
            <div className="relative overflow-hidden" style={{ minHeight: "380px" }}>
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="absolute inset-0 w-full transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index
                      ? "translateY(0) scale(1)"
                      : activeIndex > index
                        ? "translateY(-60px) scale(0.95)"
                        : "translateY(60px) scale(0.95)",
                    pointerEvents: activeIndex === index ? "auto" : "none",
                  }}
                >
                  <div className="bg-white p-10 lg:p-12 border border-gray-100 shadow-lg h-full mx-[-9px] my-[3px] bg-[#ffffff00]">
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <h3
                          className="text-[#0a0a0a] mb-4"
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.5rem",
                            fontWeight: 600,
                          }}
                        >
                          {service.title}
                        </h3>
                        <p
                          className="text-gray-500 mb-6"
                          style={{ fontSize: "1rem", lineHeight: 1.8 }}
                        >
                          {service.description}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-center gap-2 text-gray-600"
                              style={{ fontSize: "0.9rem" }}
                            >
                              <CheckCircle size={16} className="text-[#c41e2a] flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              {/* Removed "Discuss Your Case" button */}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}