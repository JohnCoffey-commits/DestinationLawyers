import { ArrowRight, Phone } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative py-20 bg-[#c41e2a] overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700 }}>Ready to Take the First Step?</h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-10" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
          Don't navigate the legal system alone. Our experienced attorneys are here to fight for your rights and secure the best possible outcome.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] px-8 py-4 hover:bg-[#0a0a0a] hover:text-white transition-colors group" style={{ fontSize: "0.9375rem", fontWeight: 600, letterSpacing: "0.05em" }}>
            Book a Consultation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="tel:+15551234567" className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 hover:bg-white hover:text-[#0a0a0a] transition-colors" style={{ fontSize: "0.9375rem", fontWeight: 600, letterSpacing: "0.05em" }}>
            <Phone size={18} /> +1 (555) 123-4567
          </a>
        </div>
      </div>
    </section>
  );
}
