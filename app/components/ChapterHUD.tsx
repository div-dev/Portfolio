"use client";
import { useEffect, useState } from "react";

const CHAPTERS: Record<string, [string, string]> = {
  hero:       ["00", "START"],
  about:      ["01", "IDENTITY"],
  experience: ["02", "JOURNEY"],
  projects:   ["03", "PROJECTS"],
  skills:     ["04", "TECH STACK"],
  contact:    ["05", "CONTACT"],
};

const SECTION_IDS = ["hero", "about", "experience", "projects", "skills", "contact"];

export default function ChapterHUD() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const cur = CHAPTERS[active] ?? CHAPTERS.hero;

  return (
    <div
      className="hidden md:flex"
      style={{
        position: "fixed",
        left: 24,
        bottom: 24,
        zIndex: 900,
        fontFamily: "var(--font-mono)",
        flexDirection: "column",
        gap: 4,
        pointerEvents: "none",
        mixBlendMode: "difference",
      }}
    >
      <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--amber-400)" }}>CHAPTER</div>
      <div style={{ fontSize: 36, fontWeight: 700, color: "var(--green-400)", lineHeight: 1, letterSpacing: "-0.02em" }}>
        {cur[0]}
      </div>
      <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(200,240,200,0.6)" }}>{cur[1]}</div>
    </div>
  );
}
