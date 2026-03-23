import { Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#c41e2a] rounded flex items-center justify-center">
                <span className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700 }}>D</span>
              </div>
              <div>
                <span className="text-white tracking-wider" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 600 }}>DESTINATION</span>
                <span className="block text-[#c41e2a] tracking-[0.3em]" style={{ fontSize: "0.5625rem", fontWeight: 500 }}>LAWYERS</span>
              </div>
            </div>
            <p className="text-white/50 mb-6" style={{ fontSize: "0.875rem", lineHeight: 1.8 }}>Your trusted destination for exceptional legal counsel. Providing justice-driven solutions since 2001.</p>
          </div>
          <div>
            <h4 className="text-white mb-6" style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}>QUICK LINKS</h4>
            <ul className="space-y-3">
              {["Home", "About Us", "Services", "Our Team", "Testimonials", "Contact"].map((link) => (
                <li key={link}><a href="#" className="text-white/50 hover:text-[#c41e2a] transition-colors" style={{ fontSize: "0.875rem" }}>{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-6" style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}>PRACTICE AREAS</h4>
            <ul className="space-y-3">
              {["Corporate Law", "Criminal Defense", "Real Estate Law", "Family Law", "Immigration Law", "Intellectual Property"].map((link) => (
                <li key={link}><a href="#" className="text-white/50 hover:text-[#c41e2a] transition-colors" style={{ fontSize: "0.875rem" }}>{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-6" style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}>NEWSLETTER</h4>
            <p className="text-white/50 mb-4" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>Stay updated with the latest legal insights and firm news.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="flex-1 bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:border-[#c41e2a] focus:outline-none" style={{ fontSize: "0.875rem" }} />
              <button className="bg-[#c41e2a] px-5 py-3 hover:bg-[#a31822] transition-colors"><Scale size={18} className="text-white" /></button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40" style={{ fontSize: "0.8125rem" }}>&copy; 2026 Destination Lawyers. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Disclaimer"].map((link) => (
              <a key={link} href="#" className="text-white/40 hover:text-[#c41e2a] transition-colors" style={{ fontSize: "0.8125rem" }}>{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
