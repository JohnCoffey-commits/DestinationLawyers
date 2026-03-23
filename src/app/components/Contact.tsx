import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    label: "Address",
    value: "123 Legal Avenue\nSuite 500\nNew York, NY 10001",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@destinationlawyers.com",
    link: "mailto:info@destinationlawyers.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Fri\n9:00 AM – 6:00 PM\nSat: 10:00 AM – 2:00 PM",
  },
];

export function Contact() {
  return (
    <section id="contact" className="bg-[#e8ddd0]">
      {/* ── Top editorial block ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          {/* Left: headline */}
          <div className="lg:max-w-2xl">
            <span
              className="text-[#c41e2a] tracking-[0.3em] uppercase"
              style={{ fontSize: "0.75rem", fontWeight: 600 }}
            >
              Get In Touch
            </span>
            <h2
              className="mt-4 text-[#0a0a0a]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.75rem, 6vw, 5rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              Let's Build
              <br />
              <span className="italic text-[#c41e2a]">Your Case.</span>
            </h2>
          </div>

          {/* Right: descriptor */}
          <div className="lg:max-w-xs pb-2">
            <div className="w-8 h-px bg-[#c41e2a] mb-5" />
            <p
              className="text-[#4a4035]"
              style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}
            >
              Schedule a free initial consultation. Our team is ready to listen
              and provide the guidance you need to move forward with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* ── Thin rule ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#c9bfb0]" />
      </div>

      {/* ── Contact cards ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#c9bfb0]">
          {contactItems.map((item) => (
            <div
              key={item.label}
              className="bg-[#e8ddd0] px-8 py-10 flex flex-col gap-5 group"
            >
              <div className="w-10 h-10 border border-[#c41e2a] flex items-center justify-center flex-shrink-0">
                <item.icon size={18} className="text-[#c41e2a]" />
              </div>
              <div>
                <p
                  className="text-[#0a0a0a] mb-3 tracking-[0.12em] uppercase"
                  style={{ fontSize: "0.6875rem", fontWeight: 700 }}
                >
                  {item.label}
                </p>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-[#2a2218] whitespace-pre-line hover:text-[#c41e2a] transition-colors"
                    style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p
                    className="text-[#2a2218] whitespace-pre-line"
                    style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}
                  >
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA strip ── */}
      <div className="bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p
              className="text-[#e8ddd0] tracking-[0.2em] uppercase mb-1"
              style={{ fontSize: "0.6875rem", fontWeight: 600 }}
            >
              Free Consultation
            </p>
            <p
              className="text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                fontWeight: 600,
              }}
            >
              Ready to discuss your legal needs?
            </p>
          </div>
          <a
            href="tel:+15551234567"
            className="group inline-flex items-center gap-3 bg-[#c41e2a] text-white px-8 py-4 hover:bg-[#a31822] transition-colors flex-shrink-0"
            style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.06em" }}
          >
            CALL NOW
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
