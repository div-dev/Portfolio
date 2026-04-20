"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

const RESUME_PATH = "/resume.pdf";

function DCLogo() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 0L29 0L34 5L34 29L29 34L5 34L0 29L0 5Z" stroke="var(--green-400)" strokeWidth="1" fill="none"/>
      <path d="M8 9L8 25L15 25Q21 25 21 17Q21 9 15 9Z" stroke="var(--green-400)" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <path d="M28 12Q22 8 22 17Q22 26 28 22" stroke="var(--green-400)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="5" cy="5" r="1.8" fill="var(--green-400)"/>
      <circle cx="29" cy="5" r="1.8" fill="var(--green-400)"/>
      <circle cx="5" cy="29" r="1.8" fill="var(--green-400)"/>
      <circle cx="29" cy="29" r="1.8" fill="var(--green-400)"/>
      <line x1="8" y1="9" x2="5" y2="5" stroke="var(--green-400)" strokeWidth="0.5" opacity="0.4"/>
      <line x1="8" y1="25" x2="5" y2="29" stroke="var(--green-400)" strokeWidth="0.5" opacity="0.4"/>
    </svg>
  );
}

function MagneticNavLink({
  label,
  id,
  isActive,
  onClick,
}: {
  label: string;
  id: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
    el.style.color = "var(--green-400)";
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
    el.style.color = isActive ? "var(--green-400)" : "rgba(200,240,200,0.45)";
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.12em",
        color: isActive ? "var(--green-400)" : "rgba(200,240,200,0.45)",
        padding: "4px 0",
        position: "relative",
        transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1), color 0.2s",
        willChange: "transform",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {isActive && (
        <span style={{ position: "absolute", left: -14, color: "var(--amber-400)", fontSize: 10 }}>▸</span>
      )}
      {label}
    </button>
  );
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -72, duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px,5vw,80px)",
          height: 68,
          background: scrolled ? "rgba(6,10,6,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(51,255,51,0.12)" : "none",
          transition: "all 0.4s",
        }}
      >
        <button
          onClick={() => scrollToSection("hero")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "var(--green-400)",
          }}
        >
          <DCLogo />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.12em", color: "var(--green-400)" }}>DC</span>
        </button>

        <ul
          className="hidden md:flex"
          style={{ gap: 36, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}
        >
          {LINKS.map(({ label, id }) => (
            <li key={id}>
              <MagneticNavLink
                label={label}
                id={id}
                isActive={activeSection === id}
                onClick={() => scrollToSection(id)}
              />
            </li>
          ))}
        </ul>

        <a
          href={RESUME_PATH}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            background: "none",
            border: "1px solid var(--green-400)",
            color: "var(--green-400)",
            padding: "8px 16px",
            cursor: "pointer",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(51,255,51,0.07)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
          }}
        >
          ↓ RESUME
        </a>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--green-400)",
            fontSize: 22,
            fontFamily: "var(--font-mono)",
          }}
        >
          {menuOpen ? "✕" : "≡"}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              background: "#080808",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 48,
            }}
          >
            {LINKS.map(({ label, id }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => { scrollToSection(id); closeMenu(); }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: 28,
                  letterSpacing: "0.2em",
                  color: activeSection === id ? "var(--green-400)" : "#e0e0e0",
                }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
