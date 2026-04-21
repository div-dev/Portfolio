"use client";
import { useEffect, useRef, useState } from "react";

const EXP = [
  {
    period: "Nov 2025 — Present",
    role: "Senior Python Developer",
    org: "DesignX",
    bullets: [
      "Python microservices and REST APIs running in production for Hero MotoCorp, HUL, Mondelez, and Dabur.",
      "Kafka Connect pipelines sync 400+ enterprise tables across MySQL. Dockerized, zero manual intervention.",
      "200+ Airflow DAGs in production. ETL orchestration, automated alerting, scheduled jobs.",
      "IoT telemetry pipeline at 500+ events/hour. Bidirectional SAP ECC integration for real-time manufacturing data.",
    ],
    tags: ["Python", "Kafka", "Airflow", "FastAPI", "Hero MotoCorp"],
  },
  {
    period: "Aug 2024 — Nov 2025",
    role: "Python Developer",
    org: "DesignX",
    bullets: [
      "150+ REST APIs, 30+ Python modules, 35+ IoT transformation pipelines.",
      "Migrated legacy PHP backends to Python. Improved performance via query optimization and table partitioning.",
      "Led NPD manufacturing workflow end-to-end across Hero MotoCorp, HUL, Mondelez, and Dabur; digitized PQCS and NPD processes.",
      "Automation cut manual reporting effort by 80%.",
    ],
    tags: ["Python", "Django", "PostgreSQL", "Docker", "AWS"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const fn = () => {
      if (!sectionRef.current || !railFillRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      const p = Math.min(Math.max((-r.top + window.innerHeight * 0.55) / r.height, 0), 1);
      railFillRef.current.style.height = `${p * 100}%`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        padding: "clamp(80px,10vw,160px) clamp(20px,5vw,120px)",
        background: "linear-gradient(180deg,#080808 0%,#0c0c0c 100%)",
        borderTop: "1px solid rgba(51,255,51,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="ghost-num">02</div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.35em", color: "var(--green-400)", opacity: 0.65, marginBottom: 48, textTransform: "uppercase" }}>
          § 02 · JOURNEY
        </div>
        <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(26px,3.5vw,48px)", fontWeight: 700, color: "#dff0df", marginBottom: 72 }}>
          Where I&apos;ve been.
        </h2>

        <div style={{ display: "flex", gap: "clamp(32px,5vw,72px)" }}>
          <div style={{ position: "relative", width: 2, flexShrink: 0, background: "rgba(51,255,51,0.08)", alignSelf: "stretch", minHeight: 300 }}>
            <div
              ref={railFillRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "0%",
                background: "var(--amber-400)",
                boxShadow: "0 0 10px var(--amber-400)",
                transition: "height 0.08s",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 72, flex: 1 }}>
            {EXP.map((n, i) => (
              <div
                key={i}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "none" : "translateX(-20px)",
                  transition: `all 0.8s ${i * 0.2}s`,
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--amber-400)", letterSpacing: "0.2em", marginBottom: 10 }}>
                  {n.period}
                </div>
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(16px,2vw,24px)", fontWeight: 700, color: "#dff0df", marginBottom: 6 }}>
                  {n.role}
                </h3>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(51,255,51,0.45)", marginBottom: 20, letterSpacing: "0.08em" }}>
                  @ {n.org}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {n.bullets.map((b, bi) => (
                    <li key={bi} style={{ fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.75, color: "rgba(200,240,200,0.48)", paddingLeft: 18, position: "relative", fontWeight: 300 }}>
                      <span style={{ position: "absolute", left: 0, color: "var(--green-400)" }}>›</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {n.tags.map((t) => (
                    <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 10, padding: "4px 9px", border: "1px solid rgba(255,170,0,0.22)", color: "rgba(255,170,0,0.65)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
