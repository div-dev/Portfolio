"use client";
import { useEffect, useRef, useState } from "react";

function BinaryRain() {
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let w = (c.width = c.offsetWidth);
    let h = (c.height = c.offsetHeight);
    const cols = Math.floor(w / 22);
    const drops = Array.from({ length: cols }, () => -Math.floor(Math.random() * 60));
    let raf: number;

    const draw = () => {
      ctx.fillStyle = "rgba(8,8,8,0.05)";
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * 22;
        const brightness = Math.max(0.05, 0.3 - (y / h) * 0.25);
        ctx.fillStyle = `rgba(51,255,51,${brightness})`;
        ctx.font = "14px JetBrains Mono, monospace";
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * 22, y);
        if (y > h && Math.random() > 0.97) drops[i] = 0;
        drops[i] += 0.5;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      w = c.width = c.offsetWidth;
      h = c.height = c.offsetHeight;
    };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={cv}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}
    />
  );
}

export default function Hero() {
  const full = "DIVYANSH CHAWLA";
  const [display, setDisplay] = useState("");
  const [ready, setReady] = useState(false);
  const [prog, setProg] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const fn = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setProg(Math.min(Math.max(-r.top / Math.max(r.height, 1), 0), 1));
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn);
    return () => { window.removeEventListener("scroll", fn); window.removeEventListener("resize", fn); };
  }, []);

  useEffect(() => {
    let f = 0;
    const tot = 50;
    const anim = () => {
      f++;
      const p = f / tot;
      const rev = Math.floor(p * full.length);
      let r = "";
      for (let i = 0; i < full.length; i++) {
        if (full[i] === " ") { r += " "; continue; }
        if (i < rev) r += full[i];
        else r += Math.random() > 0.5 ? "1" : "0";
      }
      setDisplay(r);
      if (f < tot + 8) requestAnimationFrame(anim);
      else { setDisplay(full); setReady(true); }
    };
    const t = setTimeout(() => requestAnimationFrame(anim), 300);
    return () => clearTimeout(t);
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const heroOpacity = Math.max(0, 1 - prog * 2.2);
  const heroScale = 1 - prog * 0.08;
  const rainY = prog * 80;

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 clamp(20px,5vw,120px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${rainY}px)`, willChange: "transform" }}>
        <BinaryRain />
      </div>

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "100%",
          opacity: heroOpacity,
          transform: `scale(${heroScale})`,
          transformOrigin: "left center",
          willChange: "transform, opacity",
        }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.4em", color: "var(--amber-400)", marginBottom: 28, opacity: 0.9 }}>
          § PORTFOLIO — {new Date().getFullYear()}
        </div>

        <h1
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(44px,9.5vw,148px)",
            fontWeight: 700,
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
            color: "transparent",
            backgroundImage: "linear-gradient(175deg, var(--green-400) 0%, rgba(51,255,51,0.55) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            margin: "0 0 28px",
            minWidth: "4ch",
            whiteSpace: "pre",
          }}
        >
          {display || "00000000\n000000"}
        </h1>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(11px,1.3vw,15px)",
            color: "rgba(200,240,200,0.42)",
            letterSpacing: "0.2em",
            marginBottom: 56,
            opacity: ready ? 1 : 0,
            transition: "opacity 0.9s 0.4s",
          }}
        >
          SENIOR PYTHON DEVELOPER · AI INTEGRATION · FULL STACK BUILDER
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            opacity: ready ? 1 : 0,
            transition: "opacity 0.9s 0.7s",
          }}
        >
          <button
            onClick={() => go("projects")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.15em",
              background: "var(--green-400)",
              color: "#000",
              border: "none",
              padding: "13px 28px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green-400)")}
          >
            EXPLORE WORK →
          </button>
          <button
            onClick={() => go("contact")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.15em",
              background: "transparent",
              color: "var(--amber-400)",
              border: "1px solid rgba(255,170,0,0.4)",
              padding: "13px 28px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,170,0,0.07)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            HIRE ME
          </button>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "clamp(20px,5vw,120px)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "rgba(51,255,51,0.3)",
          letterSpacing: "0.3em",
          opacity: heroOpacity,
        }}
      >
        28.71°N · 77.10°E · NEW DELHI, IN
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 36,
          right: "clamp(20px,5vw,120px)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "rgba(51,255,51,0.25)",
          letterSpacing: "0.2em",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          opacity: heroOpacity,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ display: "inline-block", width: 1, height: 40, background: "var(--green-400)", opacity: 0.3 }} />
        SCROLL ↓
      </div>
    </section>
  );
}
