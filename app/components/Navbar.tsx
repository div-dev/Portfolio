"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const links = ["About", "Skills", "Experience", "Projects", "Contact"];

function SunIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#FAF9F6]/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md border-b border-[#D3D1C7] dark:border-[#444441]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-[15px] font-medium text-[#C4B5F4] dark:text-[#7C6FCD] tracking-tight">
          Divyansh Chawla
        </span>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-6">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-[13px] font-medium text-[#888780] dark:text-[#B4B2A9] hover:text-[#2C2C2A] dark:hover:text-[#F1EFE8] transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={toggle}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#888780] dark:text-[#B4B2A9] hover:bg-[#D3D1C7]/50 dark:hover:bg-[#444441]/50 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
