"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["About", "Skills", "Experience", "Projects", "Contact"];

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(element, {
      offset: -72,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
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
    links.forEach((link) => {
      const el = document.getElementById(link.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const navLinkStyle = (id: string): React.CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: activeSection === id ? "var(--green-400)" : "#888888",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    transition: "color 0.2s",
  });

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          backgroundColor: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
          transition: "background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 32px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--green-400)",
              background: "none",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.05em",
              textShadow: "0 0 10px rgba(51,255,51,0.4)",
              padding: 0,
            }}
          >
            DC
          </button>

          {/* Desktop nav */}
          <ul
            className="hidden md:flex"
            style={{ gap: "32px", listStyle: "none", margin: 0, padding: 0 }}
          >
            {links.map((link) => {
              const id = link.toLowerCase();
              const isActive = activeSection === id;
              return (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(id)}
                    style={navLinkStyle(id)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--green-400)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = isActive
                        ? "var(--green-400)"
                        : "#888888")
                    }
                  >
                    {isActive && (
                      <span style={{ color: "var(--green-400)", fontSize: "10px" }}>▸</span>
                    )}
                    {link}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "4px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  backgroundColor: menuOpen ? "var(--green-400)" : "#888888",
                  transformOrigin: "center",
                }}
                animate={
                  menuOpen
                    ? i === 0
                      ? { rotate: 45, y: 6 }
                      : i === 1
                      ? { opacity: 0 }
                      : { rotate: -45, y: -6 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
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
              zIndex: 40,
              backgroundColor: "rgba(10,10,10,0.97)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "28px",
              }}
            >
              {links.map((link, i) => {
                const id = link.toLowerCase();
                return (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <button
                      onClick={() => {
                        scrollToSection(id);
                        closeMenu();
                      }}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "24px",
                        fontWeight: 700,
                        color: activeSection === id ? "var(--green-400)" : "#e0e0e0",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {link}
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
