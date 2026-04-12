"use client";
import { motion } from "framer-motion";
import { useFunMode } from "../components/FunModeProvider";
import dynamic from "next/dynamic";

const PretextName = dynamic(() => import("../components/PretextName"), { ssr: false });

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 0.3em" }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1], delay: delay + i * 0.08 }}
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
  const { funMode } = useFunMode();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* ── background layers ── */}
      {!funMode && (
        <>
          {/* animated gradient background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 30% 40%, color-mix(in srgb, var(--accent) 7%, transparent) 0%, transparent 70%),
                radial-gradient(ellipse 60% 50% at 70% 60%, color-mix(in srgb, #B8860B 5%, transparent) 0%, transparent 70%)
              `,
              backgroundSize: "200% 200%",
              animation: "gradientDrift 25s ease-in-out infinite",
            }}
          />
          {/* dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              opacity: 0.5,
            }}
          />
          {/* soft radial glow at center */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 45%, color-mix(in srgb, var(--accent) 9%, transparent) 0%, transparent 100%)",
            }}
          />
          {/* bottom fade to blend into About section */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, var(--bg))",
            }}
          />
        </>
      )}

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center">
        {funMode ? (
          /* ── FUN MODE HERO ── */
          <div className="relative" style={{ minHeight: "220px" }}>
            <PretextName />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 text-[15px] italic"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-garamond)" }}
            >
              A craftsman of pipelines and distributed systems
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-3 text-[15px]"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-garamond)" }}
            >
              Kafka pipelines · Airflow orchestration · Python microservices
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap gap-3 justify-center mt-8"
            >
              <a
                href="#projects"
                className="h-9 px-5 text-[13px] font-medium rounded border transition-colors duration-200 flex items-center"
                style={{ backgroundColor: "var(--accent)", color: "#F4E4C1", borderColor: "var(--accent)" }}
              >
                View Tomes
              </a>
              <a
                href="#contact"
                className="h-9 px-5 text-[13px] font-medium rounded border transition-colors duration-200 flex items-center"
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              >
                Send a Raven
              </a>
            </motion.div>
            <p className="mt-4 text-[11px] tracking-widest uppercase opacity-40" style={{ color: "var(--text-muted)" }}>
              ✦ Drag the dragon onto the name ✦
            </p>
          </div>
        ) : (
          /* ── NORMAL MODE HERO ── */
          <div className="flex flex-col items-center">
            {/* availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8 flex items-center gap-2 h-7 px-3 rounded-full border text-[11px] font-medium tracking-wide"
              style={{
                borderColor: "color-mix(in srgb, var(--accent) 40%, var(--border))",
                color: "var(--accent)",
                backgroundColor: "var(--accent-light)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: "var(--accent)",
                  boxShadow: "0 0 0 3px var(--accent-light)",
                  animation: "pulse 2.5s ease-in-out infinite",
                }}
              />
              Open to opportunities
            </motion.div>

            {/* role label */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              className="text-[11px] font-medium tracking-[0.28em] uppercase mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              Senior Python Developer
            </motion.p>

            {/* name — word-by-word clip reveal */}
            <h1
              className="font-normal leading-none mb-5"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.2rem, 9vw, 6rem)",
                letterSpacing: "-0.03em",
                color: "var(--text)",
              }}
            >
              <WordReveal text="Divyansh Chawla" delay={0.2} />
            </h1>

            {/* decorative rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
              className="mb-7"
              style={{
                width: 64,
                height: 2,
                background: "linear-gradient(to right, transparent, var(--accent), transparent)",
                transformOrigin: "center",
              }}
            />

            {/* description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
              className="text-[17px] leading-relaxed mb-10 max-w-md mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              Building backend systems that scale — Kafka pipelines, Airflow orchestration,
              Python microservices shipped for enterprise clients.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.65 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              <a
                href="#projects"
                className="h-10 px-6 text-[13px] font-medium rounded-lg transition-all duration-200 flex items-center"
                style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                View Work
              </a>
              <a
                href="#contact"
                className="h-10 px-6 text-[13px] font-medium rounded-lg border transition-all duration-200 flex items-center"
                style={{
                  borderColor: "var(--accent)",
                  color: "var(--accent)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--accent-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                }}
              >
                Get in Touch
              </a>
            </motion.div>

            {/* tech strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 flex flex-wrap gap-x-6 gap-y-2 justify-center text-[11px] tracking-wide uppercase"
              style={{ color: "var(--text-muted)", opacity: 0.55 }}
            >
              {["Python", "FastAPI", "Kafka", "Airflow", "PostgreSQL", "Docker"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      {/* Scroll indicator — animated mouse */}
      {!funMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          {/* Mouse outline */}
          <div
            style={{
              width: 22,
              height: 34,
              borderRadius: 11,
              border: "1.5px solid",
              borderColor: "var(--accent)",
              opacity: 0.5,
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Scroll wheel dot */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
              style={{
                width: 3,
                height: 6,
                borderRadius: 2,
                backgroundColor: "var(--accent)",
                marginTop: 6,
              }}
            />
          </div>
          <span
            className="text-[9px] tracking-[0.3em] uppercase"
            style={{ color: "var(--text-muted)", opacity: 0.4 }}
          >
            scroll
          </span>
        </motion.div>
      )}
    </section>
  );
}
