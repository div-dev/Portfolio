"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    id: "01",
    name: "LogIntel",
    role: "Data Engineering · Python · FastAPI · Apache Kafka · PostgreSQL · Redis · Docker",
    desc: "Real-time log ingestion, anomaly detection, and LLM-powered analysis. Built to understand how Kafka, FastAPI, and a Claude summarizer actually wire together end-to-end.",
    year: "2025",
    link: "https://github.com/div-dev/logIntel",
  },
  {
    id: "02",
    name: "Formbricks Lifecycle Automation",
    role: "LLM Tooling · Python · Docker · OpenAI · Anthropic · Ollama · PostgreSQL",
    desc: "Python CLI that spins up a full Formbricks stack via Docker Compose, then uses LLMs to generate synthetic surveys, users, and responses. Built to see how far LLM-generated data could go in automating QA workflows.",
    year: "2025",
    link: "https://github.com/div-dev/formbricks_task",
  },
  {
    id: "03",
    name: "LogStream",
    role: "Systems Programming · C++ · Multithreading · MESI Protocol · std::atomic",
    desc: "NVM logging simulator in C++ using MESI cache-coherency to minimize persistent writes. Parallelized with std::thread for 45% latency reduction. Built to understand cache coherency from first principles, not just from a textbook.",
    year: "2024",
    link: "https://github.com/div-dev/LogStream",
  },
  {
    id: "04",
    name: "HealthBot",
    role: "ML Engineering · Python · TensorFlow · Keras · NLP · scikit-learn",
    desc: "Intent classification chatbot trained with TensorFlow/Keras. Custom NLP pipeline: tokenization, lemmatization, bag-of-words encoding. Final-year project built to go past sklearn tutorials and train something from scratch.",
    year: "2023",
    link: "https://github.com/div-dev/HealthBot",
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hov, setHov] = useState<number | null>(null);

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
      id="projects"
      ref={ref}
      style={{
        padding: "clamp(80px,10vw,160px) clamp(20px,5vw,120px)",
        background: "#080808",
        borderTop: "1px solid rgba(51,255,51,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="ghost-num">03</div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.35em", color: "var(--green-400)", opacity: 0.65, marginBottom: 48, textTransform: "uppercase" }}>
          § 03 · PROJECT VAULT
        </div>
        <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(26px,3.5vw,48px)", fontWeight: 700, color: "#dff0df", marginBottom: 64 }}>
          Selected work.
        </h2>

        {PROJECTS.map((p, i) => (
          <a
            key={p.id}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(16px,3vw,48px)",
              padding: "clamp(24px,3vw,44px) 0",
              borderTop: i === 0 ? "1px solid rgba(51,255,51,0.13)" : "none",
              borderBottom: "1px solid rgba(51,255,51,0.13)",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(14px)",
              transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s`,
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(51,255,51,0.04), transparent)",
                transform: hov === i ? "translateX(0)" : "translateX(-110%)",
                transition: "transform 0.6s",
                pointerEvents: "none",
              }}
            />

            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--amber-400)", letterSpacing: "0.2em", minWidth: 28, flexShrink: 0 }}>
              {p.id}
            </div>

            <div style={{ flex: 1, transform: hov === i ? "translateX(14px)" : "none", transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 10, flexWrap: "wrap" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(22px,3.2vw,44px)",
                    fontWeight: 700,
                    color: hov === i ? "var(--green-400)" : "#dff0df",
                    transition: "color 0.2s",
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.name}
                </h3>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(51,255,51,0.4)", letterSpacing: "0.15em" }}>
                  {p.role}
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.75, color: "rgba(200,240,200,0.43)", margin: 0, fontWeight: 300, maxWidth: 620 }}>
                {p.desc}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, minWidth: 56, flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(51,255,51,0.3)", letterSpacing: "0.2em" }}>{p.year}</span>
              <span style={{ color: hov === i ? "var(--amber-400)" : "var(--green-400)", fontSize: 22, transform: hov === i ? "translateX(8px)" : "none", transition: "all 0.25s" }}>
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
