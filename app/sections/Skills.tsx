"use client";
import { useEffect, useRef, useState } from "react";

const TECH_UNIQUE = [
  { g: "Languages",   items: ["Python", "SQL", "C++", "JavaScript", "TypeScript", "Bash"] },
  { g: "Backend",     items: ["FastAPI", "Django", "DRF", "Airflow", "Redis", "PostgreSQL", "Kafka", "Docker", "AWS"] },
  { g: "AI & ML",     items: ["LangChain", "OpenAI", "Anthropic", "TensorFlow", "Keras", "scikit-learn", "Pandas", "NumPy", "RAG", "Ollama"] },
  { g: "Infra & Data",items: ["Apache Kafka", "Docker", "ETL Pipelines", "SAP ECC", "MySQL", "MongoDB", "GCP", "Redis", "Celery"] },
  { g: "Tooling",     items: ["Git", "Linux", "Jenkins", "Postman", "Docker Compose", "GitHub Actions", "Vercel"] },
];

const COPIES = 8;

const TECH = TECH_UNIQUE.map((group) => ({
  ...group,
  items: Array.from({ length: COPIES }, () => group.items).flat(),
}));

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="skills"
      style={{
        padding: "clamp(80px,10vw,160px) 0",
        background: "#060d06",
        borderTop: "1px solid rgba(51,255,51,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(51,255,51,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div className="ghost-num" style={{ right: "auto", left: 0 }}>04</div>

      <div style={{ padding: "0 clamp(20px,5vw,120px)", position: "relative", zIndex: 2, marginBottom: 64 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.35em", color: "var(--green-400)", opacity: 0.65, marginBottom: 48, textTransform: "uppercase" }}>
          § 04 · TECH STACK
        </div>
        <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(26px,3.5vw,48px)", fontWeight: 700, color: "#dff0df" }}>
          Tools of the trade.
        </h2>
      </div>

      <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "clamp(20px,2.5vw,36px)", position: "relative", zIndex: 2 }}>
        {TECH.map((group, gi) => (
          <div key={group.g} style={{ opacity: inView ? 1 : 0, transition: `opacity 0.7s ${gi * 0.12}s` }}>
            <div style={{
              padding: "0 clamp(20px,5vw,120px)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "var(--amber-400)",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <span style={{ display: "inline-block", width: 20, height: 1, background: "var(--amber-400)", flexShrink: 0 }} />
              {group.g.toUpperCase()} — {TECH_UNIQUE[gi].items.length} TOOLS
            </div>
            <div className="marquee-wrap">
              <div
                className="marquee-row"
                style={{
                  animationDuration: `${80 + gi * 12}s`,
                  animationDirection: gi % 2 === 1 ? "reverse" : "normal",
                }}
              >
                {group.items.map((item, ii) => (
                  <span
                    key={ii}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "clamp(14px,1.6vw,22px)",
                      padding: "clamp(10px,1.2vw,18px) clamp(16px,2vw,28px)",
                      border: "1px solid rgba(51,255,51,0.15)",
                      color: "rgba(200,240,200,0.75)",
                      background: "rgba(51,255,51,0.025)",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      transition: "all 0.2s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--amber-400)";
                      e.currentTarget.style.color = "var(--amber-400)";
                      e.currentTarget.style.background = "rgba(255,170,0,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(51,255,51,0.15)";
                      e.currentTarget.style.color = "rgba(200,240,200,0.75)";
                      e.currentTarget.style.background = "rgba(51,255,51,0.025)";
                    }}
                  >
                    {item} <span style={{ color: "var(--amber-400)", opacity: 0.5, marginLeft: 8 }}>◆</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
