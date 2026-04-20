"use client";
import { useEffect, useRef, useState } from "react";

const EMAIL = "divyanshchawla12@gmail.com";
const LINKEDIN = "https://linkedin.com/in/divyansh-chawla-751b1a230";
const GITHUB = "https://github.com/div-dev";
const RESUME = "/resume.pdf";

const TERM_LINES = [
  { p: "$", t: " INITIALIZING CONTACT PROTOCOL...", d: 0 },
  { p: ">", t: " NAME: DIVYANSH CHAWLA", d: 500 },
  { p: ">", t: " STATUS: AVAILABLE FOR HIRE", d: 950 },
  { p: ">", t: " LOCATION: 28.71°N 77.10°E — NEW DELHI", d: 1400 },
  { p: ">", t: " FOCUS: Python / AI Integration / Full Stack", d: 1850 },
  { p: ">", t: " RESPONSE: < 24 hours", d: 2300 },
  { p: "✓", t: " CHANNEL OPEN — AWAITING INPUT_", d: 2750 },
];

function Terminal({ active }: { active: boolean }) {
  const [lines, setLines] = useState<typeof TERM_LINES>([]);

  useEffect(() => {
    if (!active) return;
    TERM_LINES.forEach((line) =>
      setTimeout(() => setLines((prev) => [...prev, line]), line.d)
    );
  }, [active]);

  return (
    <div style={{ maxWidth: 600, marginBottom: 44, background: "#020502", border: "1px solid rgba(51,255,51,0.18)", opacity: active ? 1 : 0, transition: "all 0.8s 0.25s" }}>
      <div style={{ display: "flex", gap: 7, padding: "11px 16px", borderBottom: "1px solid rgba(51,255,51,0.08)", alignItems: "center" }}>
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(51,255,51,0.35)", marginLeft: "auto", letterSpacing: "0.1em" }}>contact.sh</span>
      </div>
      <div style={{ padding: "18px 22px", minHeight: 210 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.85, marginBottom: 2 }}>
            <span style={{ color: line.p === "$" ? "var(--amber-400)" : line.p === "✓" ? "#28c840" : "rgba(51,255,51,0.45)" }}>
              {line.p}
            </span>
            <span style={{ color: "rgba(210,245,210,0.7)" }}>{line.t}</span>
          </div>
        ))}
        {lines.length > 0 && lines.length < TERM_LINES.length && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--green-400)", animation: "blink 1s step-end infinite" }}>█</span>
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "clamp(80px,10vw,160px) clamp(20px,5vw,120px)",
        background: "linear-gradient(180deg,#0c0c0c 0%,#020402 100%)",
        borderTop: "1px solid rgba(51,255,51,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="ghost-num">05</div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.35em", color: "var(--green-400)", opacity: 0.65, marginBottom: 48, textTransform: "uppercase" }}>
          § 05 · CONTACT NODE
        </div>

        <h2
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(26px,4.5vw,68px)",
            fontWeight: 700,
            color: "#dff0df",
            marginBottom: 56,
            maxWidth: 640,
            lineHeight: 1.08,
            opacity: active ? 1 : 0,
            transform: active ? "none" : "translateY(20px)",
            transition: "all 0.8s",
          }}
        >
          Ready to build<br />something<br />
          <span style={{ color: "var(--green-400)" }}>unforgettable?</span>
        </h2>

        <Terminal active={active} />

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            opacity: active ? 1 : 0,
            transition: "all 0.8s 0.45s",
            marginBottom: 80,
          }}
        >
          <a
            href={`mailto:${EMAIL}`}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em",
              background: "var(--green-400)", color: "#000",
              border: "none", padding: "13px 28px",
              cursor: "pointer", transition: "background 0.2s", textDecoration: "none",
              display: "inline-block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green-400)")}
          >
            EMAIL ME →
          </a>
          {[
            { label: "LINKEDIN", href: LINKEDIN, external: true },
            { label: "GITHUB", href: GITHUB, external: true },
            { label: "↓ RESUME", href: RESUME, download: "Divyansh_Chawla_Resume.pdf" },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target={"external" in btn ? "_blank" : undefined}
              rel={"external" in btn ? "noreferrer" : undefined}
              download={"download" in btn ? btn.download : undefined}
              style={{
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em",
                background: "transparent", color: "var(--green-400)",
                border: "1px solid var(--green-400)", padding: "13px 28px",
                cursor: "pointer", transition: "background 0.2s", textDecoration: "none",
                display: "inline-block",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(51,255,51,0.07)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {btn.label}
            </a>
          ))}
          <button
            onClick={copy}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em",
              background: "transparent", color: "rgba(224,255,224,0.35)",
              border: "1px solid rgba(51,255,51,0.15)", padding: "13px 28px",
              cursor: "pointer", transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--green-400)";
              e.currentTarget.style.borderColor = "rgba(51,255,51,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(224,255,224,0.35)";
              e.currentTarget.style.borderColor = "rgba(51,255,51,0.15)";
            }}
          >
            {copied ? "✓ COPIED" : "⎘ COPY EMAIL"}
          </button>
        </div>

        <div style={{ paddingTop: 24, borderTop: "1px solid rgba(51,255,51,0.1)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(51,255,51,0.25)", letterSpacing: "0.2em" }}>
            © {new Date().getFullYear()} DIVYANSH CHAWLA
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(51,255,51,0.25)", letterSpacing: "0.2em" }}>
            BUILT WITH LOVE + TERMINAL ENERGY
          </span>
        </div>
      </div>
    </section>
  );
}
