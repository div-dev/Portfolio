"use client";
import { useEffect, useRef, useState } from "react";

const ROLES = ["AI Product Engineer", "Full Stack Builder", "Automation Architect", "Creative Technologist"];

const STATS = [
  { v: 400, s: "+", l: "Enterprise Tables Synced" },
  { v: 200, s: "+", l: "Airflow DAGs Owned" },
  { v: 150, s: "+", l: "REST APIs Shipped" },
  { v: 7,   s: "+", l: "Enterprise Clients" },
];

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const dur = 1800;
    let raf = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(e * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return <>{val}{suffix}</>;
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setRoleIdx((i) => (i + 1) % ROLES.length); setFade(true); }, 350);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "clamp(80px,12vw,160px) clamp(20px,5vw,120px)",
        background: "linear-gradient(180deg, #080808 0%, #0c0c0c 100%)",
        borderTop: "1px solid rgba(51,255,51,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="ghost-num">01</div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 860 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.35em", color: "var(--green-400)", opacity: 0.65, marginBottom: 48, textTransform: "uppercase" }}>
          § 01 · IDENTITY
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(13px,1.4vw,17px)",
            color: "var(--green-400)",
            marginBottom: 20,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(16px)",
            transition: "all 0.8s",
          }}
        >
          {">"} role.current ={" "}
          <span style={{ color: "var(--amber-400)", opacity: fade ? 1 : 0, transition: "opacity 0.3s" }}>
            {ROLES[roleIdx]}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(30px,5vw,72px)",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#dff0df",
            margin: "0 0 28px",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            transition: "all 0.9s 0.1s",
          }}
        >
          Building systems that{" "}
          <span style={{ color: "var(--green-400)" }}>think, scale,</span>
          <br />
          <span style={{ color: "var(--green-400)" }}>and perform.</span>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(14px,1.2vw,17px)",
            lineHeight: 1.85,
            color: "rgba(200,240,200,0.5)",
            maxWidth: 580,
            margin: "0 0 44px",
            opacity: inView ? 1 : 0,
            transition: "all 1s 0.2s",
            fontWeight: 300,
          }}
        >
          Senior Python Developer at DesignX (via Hero MotoCorp, HUL, Mondelez, Dabur), building Kafka pipelines, Airflow DAGs, IoT telemetry, and SAP ECC integrations that ship. BTech, JIIT Noida. Open to product-engineering and AI-integration roles.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            opacity: inView ? 1 : 0,
            transition: "all 1s 0.3s",
            marginBottom: 64,
          }}
        >
          <button
            onClick={() => go("projects")}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em",
              background: "var(--green-400)", color: "#000", border: "none", padding: "13px 28px",
              cursor: "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green-400)")}
          >
            EXPLORE WORK →
          </button>
          <button
            onClick={() => go("contact")}
            style={{
              fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.15em",
              background: "transparent", color: "var(--amber-400)", border: "1px solid rgba(255,170,0,0.4)", padding: "13px 28px",
              cursor: "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,170,0,0.07)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            HIRE ME
          </button>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 20 }}>
          {STATS.map((s, i) => (
            <div
              key={s.l}
              style={{
                padding: "clamp(22px,3vw,36px)",
                border: "1px solid rgba(51,255,51,0.12)",
                position: "relative",
                background: "rgba(51,255,51,0.015)",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(16px)",
                transition: `all 0.7s ${i * 0.1}s`,
              }}
            >
              {([
                { top: -1, left: -1, borderWidth: "1px 0 0 1px" },
                { top: -1, right: -1, borderWidth: "1px 1px 0 0" },
                { bottom: -1, left: -1, borderWidth: "0 0 1px 1px" },
                { bottom: -1, right: -1, borderWidth: "0 1px 1px 0" },
              ] as const).map((pos, k) => (
                <div
                  key={k}
                  aria-hidden
                  style={{ position: "absolute", width: 12, height: 12, borderStyle: "solid", borderColor: "var(--green-400)", ...pos }}
                />
              ))}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, color: "var(--amber-400)", lineHeight: 1 }}>
                <Counter target={s.v} suffix={s.s} active={inView} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: "rgba(200,240,200,0.45)", marginTop: 10 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
