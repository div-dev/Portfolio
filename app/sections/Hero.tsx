"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import TerminalText from "../components/TerminalText";
import MagneticButton from "../components/MagneticButton";

const PROMPT = "> divyansh@portfolio:~$";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -72, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 0.25em" }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: delay + i * 0.08 }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [, setPromptDone] = useState(false);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(51,255,51,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.45,
          pointerEvents: "none",
        }}
      />
      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(51,255,51,0.05) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, var(--bg-primary))",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        {/* Terminal prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            marginBottom: "28px",
            fontFamily: "var(--font-code)",
            fontSize: "12px",
            color: "var(--green-400)",
            letterSpacing: "0.05em",
            minHeight: "18px",
          }}
        >
          <TerminalText
            text={PROMPT}
            speed={45}
            onComplete={() => setPromptDone(true)}
          />
        </motion.div>

        {/* Name */}
        <h1
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "clamp(2.6rem, 9vw, 6.5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: "var(--text-primary)",
            marginBottom: "20px",
          }}
        >
          <WordReveal text="DIVYANSH CHAWLA" delay={0.2} />
        </h1>

        {/* Dash ruler */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "11px",
            color: "var(--green-400)",
            opacity: 0.3,
            letterSpacing: "0.15em",
            marginBottom: "18px",
            transformOrigin: "center",
            userSelect: "none",
          }}
        >
          {"─".repeat(32)}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            fontWeight: 400,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--green-400)",
            marginBottom: "18px",
          }}
        >
          Senior Python Developer
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "17px",
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            maxWidth: "460px",
            margin: "0 auto 40px",
          }}
        >
          Building backend systems that scale — Kafka pipelines, Airflow orchestration,
          Python microservices shipped for enterprise clients.
        </motion.p>

        {/* CTAs with MagneticButton */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
        >
          <MagneticButton
            strength={0.25}
            onClick={() => scrollTo("projects")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "var(--green-400)",
              border: "1px solid var(--green-400)",
              padding: "10px 24px",
              cursor: "pointer",
              backgroundColor: "transparent",
              transition: "background-color 0.2s, color 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--green-400)";
              (e.currentTarget as HTMLElement).style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--green-400)";
            }}
          >
            [ VIEW_PROJECTS ]
          </MagneticButton>

          <MagneticButton
            strength={0.25}
            onClick={() => scrollTo("contact")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.12em",
              color: "var(--text-secondary)",
              border: "1px solid #333333",
              padding: "10px 24px",
              cursor: "pointer",
              backgroundColor: "transparent",
              transition: "border-color 0.2s, color 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--green-400)";
              (e.currentTarget as HTMLElement).style.color = "var(--green-400)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#333333";
              (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
            }}
          >
            [ GET_IN_TOUCH ]
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 }}
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "14px",
            color: "var(--green-400)",
            opacity: 0.5,
          }}
        >
          ▼
        </motion.span>
        <span
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            opacity: 0.4,
          }}
        >
          scroll
        </span>
      </motion.div>
    </section>
  );
}
