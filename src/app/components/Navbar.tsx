import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Specialities", href: "#specialities" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    const email = "info@destinationlawyers.com";
    try {
      navigator.clipboard.writeText(email).catch(() => fallbackCopy(email));
    } catch {
      fallbackCopy(email);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setOpen(false);
  };

  const fallbackCopy = (text: string) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  };

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10 transition-all duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#c41e2a] rounded flex items-center justify-center">
              <span className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700 }}>D</span>
            </div>
            <div>
              <span className="text-white tracking-wider" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.125rem", fontWeight: 600 }}>DESTINATION</span>
              <span className="block text-[#c41e2a] tracking-[0.3em]" style={{ fontSize: "0.625rem", fontWeight: 500 }}>LAWYERS</span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-white/70 hover:text-[#c41e2a] transition-colors" style={{ fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.05em" }}>
                {link.label}
              </a>
            ))}
            {/* Desktop: click to copy email */}
            <button
              onClick={handleCopyEmail}
              className="bg-[#c41e2a] text-white px-6 py-2.5 hover:bg-[#a31822] transition-colors cursor-pointer"
              style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.05em" }}
            >
              {copied ? "✓ Copied!" : "Email"}
            </button>
          </div>

          <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0a0a0a] border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="block text-white/70 hover:text-[#c41e2a] transition-colors" style={{ fontSize: "0.875rem", fontWeight: 500 }} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            {/* Mobile: click to copy email */}
            <button
              onClick={handleCopyEmail}
              className="block w-full bg-[#c41e2a] text-white text-center px-6 py-3 hover:bg-[#a31822] transition-colors cursor-pointer"
              style={{ fontSize: "0.875rem", fontWeight: 600 }}
            >
              {copied ? "✓ Email Copied!" : "Free Consultation"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}