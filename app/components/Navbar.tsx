"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const links = ["About", "Skills", "Experience", "Projects", "Contact"];

function SunIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full z-50"
        style={{
          backgroundColor: scrolled ? "color-mix(in srgb, var(--bg) 90%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
          transition: "background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#hero"
            className="text-[15px] font-medium tracking-tight"
            style={{ color: "var(--accent)", fontFamily: "var(--font-display)" }}
          >
            Divyansh Chawla
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-6">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-[13px] font-medium transition-colors duration-200"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <Link
                href="/manuscript"
                className="h-7 px-3 text-[11px] font-medium rounded-full border tracking-wide transition-all duration-200 flex items-center"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)"; }}
              >
                ✦ The Chronicle
              </Link>
              <Link
                href="/pitlane"
                className="h-7 px-3 text-[11px] font-medium rounded-full border tracking-wide transition-all duration-200 flex items-center"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)"; }}
              >
                🏎 Pitlane
              </Link>
              <button
                onClick={toggleTheme}
                className="w-7 h-7 flex items-center justify-center rounded-md transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                aria-label="Toggle theme"
              >
                {theme === "light" ? <MoonIcon /> : <SunIcon />}
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] w-6"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-px w-full"
                style={{ backgroundColor: "var(--text)" }}
                animate={
                  menuOpen
                    ? i === 0 ? { rotate: 45, y: 6 }
                    : i === 1 ? { opacity: 0 }
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <ul className="flex flex-col items-center gap-7">
              {links.map((link, i) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-[28px] font-normal"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex items-center gap-3 flex-wrap justify-center">
              <Link
                href="/manuscript"
                onClick={() => setMenuOpen(false)}
                className="h-8 px-4 text-[12px] font-medium rounded-full border flex items-center"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)", textDecoration: "none" }}
              >
                ✦ The Chronicle
              </Link>
              <Link
                href="/pitlane"
                onClick={() => setMenuOpen(false)}
                className="h-8 px-4 text-[12px] font-medium rounded-full border flex items-center"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)", textDecoration: "none" }}
              >
                🏎 Pitlane
              </Link>
              <button onClick={toggleTheme} className="w-8 h-8 flex items-center justify-center" style={{ color: "var(--text-muted)" }}>
                {theme === "light" ? <MoonIcon /> : <SunIcon />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
