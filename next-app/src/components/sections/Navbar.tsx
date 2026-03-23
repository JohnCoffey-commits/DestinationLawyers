"use client";

import { useState, useEffect, useMemo, useCallback, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Specialities", href: "#specialities" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [copied, setCopied] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace("#", "")),
    [],
  );
  const navOffset = 104;

  const scrollToHash = useCallback(
    (hash: string, updateHistory: boolean) => {
      const id = hash.replace("#", "");
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      const top = Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - navOffset,
      );

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      setActiveHref(`#${id}`);
      if (updateHistory && window.location.hash !== `#${id}`) {
        window.history.pushState(null, "", `#${id}`);
      }
    },
    [prefersReducedMotion],
  );

  const handleCopyEmail = () => {
    const email = "info@destinationlawyers.com";
    try {
      navigator.clipboard.writeText(email).catch(() => fallbackCopy(email));
    } catch {
      fallbackCopy(email);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePref = () => setPrefersReducedMotion(media.matches);
    updatePref();
    media.addEventListener("change", updatePref);
    return () => media.removeEventListener("change", updatePref);
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 24);

      const viewportProbe = scrollY + navOffset + window.innerHeight * 0.22;
      let nextActive = "#home";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const sectionTop = el.offsetTop;
        if (viewportProbe >= sectionTop) {
          nextActive = `#${id}`;
        } else {
          break;
        }
      }

      const nearBottom =
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 2;
      if (nearBottom) {
        nextActive = "#contact";
      }

      setActiveHref(nextActive);
    };

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateScrollState();
        rafId = 0;
      });
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [sectionIds]);

  useEffect(() => {
    const onHashChange = () => {
      if (!window.location.hash) return;
      scrollToHash(window.location.hash, false);
      setOpen(false);
    };

    const initFromHash = () => {
      if (!window.location.hash) return;
      window.setTimeout(() => scrollToHash(window.location.hash, false), 0);
    };

    initFromHash();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [scrollToHash]);

  const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToHash(href, true);
    setOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          backgroundColor: scrolled ? "rgba(10, 10, 10, 0.9)" : "rgba(10, 10, 10, 0.58)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(6px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.08)",
          boxShadow: scrolled ? "0 10px 28px rgba(0,0,0,0.35)" : "0 4px 18px rgba(0,0,0,0.18)",
        }}
      >
        <div className="relative z-[70] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#home" onClick={handleNavClick("#home")} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#c41e2a] rounded flex items-center justify-center">
                <span className="text-white" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.25rem", fontWeight: 700 }}>D</span>
              </div>
              <div>
                <span className="text-white tracking-wider" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.125rem", fontWeight: 600 }}>DESTINATION</span>
                <span className="block text-[#c41e2a] tracking-[0.3em]" style={{ fontSize: "0.625rem", fontWeight: 500 }}>LAWYERS</span>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick(link.href)}
                  className="relative transition-colors focus-visible:outline-none"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    color: activeHref === link.href ? "#ffffff" : "rgba(255,255,255,0.7)",
                    textShadow: activeHref === link.href ? "0 0 18px rgba(196,30,42,0.3)" : "none",
                  }}
                  aria-current={activeHref === link.href ? "page" : undefined}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-2 left-1/2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300"
                    style={{
                      width: activeHref === link.href ? "1.9rem" : "0",
                      backgroundColor: "#c41e2a",
                      opacity: activeHref === link.href ? 1 : 0,
                    }}
                  />
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
          <div className="relative z-[70] lg:hidden bg-[#0a0a0a] border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block transition-colors"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: activeHref === link.href ? "#ffffff" : "rgba(255,255,255,0.72)",
                  }}
                  onClick={handleNavClick(link.href)}
                  aria-current={activeHref === link.href ? "page" : undefined}
                >
                  {link.label}
                </a>
              ))}
              {/* Mobile quick actions */}
              <div className="pt-1">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:0208041213"
                    className="bg-[#c41e2a] text-white text-center px-4 py-3 hover:bg-[#a31822] transition-colors"
                    style={{ fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.04em" }}
                  >
                    PHONE
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="bg-[#c41e2a] text-white text-center px-4 py-3 hover:bg-[#a31822] transition-colors cursor-pointer"
                    style={{ fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.04em" }}
                  >
                    EMAIL
                  </button>
                </div>
                {copied ? (
                  <p className="mt-2 text-[#c9bfb0]" style={{ fontSize: "0.73rem" }}>
                    copied info@destinationlawyers.com
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Portal: must sit under nav (z-60) but above page (Hero) so taps on dimmed area close menu.
          Backdrop inside <nav> can fail hit-testing below the dropdown on mobile WebKit. */}
      {open && typeof document !== "undefined"
        ? createPortal(
            <button
              type="button"
              className="lg:hidden fixed inset-0 z-[58] cursor-default border-0 bg-black/45 p-0"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />,
            document.body,
          )
        : null}
    </>
  );
}
