"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const skills: Record<string, string[]> = {
  languages: ["Python", "SQL", "C++", "JavaScript", "Bash"],
  backend: ["FastAPI", "Django", "Django REST Framework", "Apache Airflow"],
  infra: ["Apache Kafka", "Docker", "Redis", "REST APIs", "ETL Pipelines"],
  databases: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
  tools: ["Git", "Linux", "Docker Compose", "Jenkins", "GCP", "Postman"],
};

interface LineProps {
  children: React.ReactNode;
  delay: number;
}

function Line({ children, delay }: LineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  const entries = Object.entries(skills);
  let delay = 0.15;

  return (
    <section
      id="skills"
      style={{
        padding: "96px 0",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: "var(--green-400)",
            marginBottom: "48px",
          }}
        >
          // SKILLS
        </motion.p>

        {/* Terminal block */}
        <div
          ref={containerRef}
          style={{
            backgroundColor: "var(--bg-tertiary)",
            border: "1px solid #1a1a1a",
            borderRadius: "2px",
            padding: "clamp(20px, 4vw, 36px)",
            fontFamily: "var(--font-code)",
            fontSize: "clamp(12px, 2vw, 14px)",
            lineHeight: 1.9,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Terminal title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "20px",
              paddingBottom: "14px",
              borderBottom: "1px solid #1a1a1a",
            }}
          >
            {["#ff5f57", "#ffbd2e", "#28c941"].map((c) => (
              <div
                key={c}
                style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: c, opacity: 0.7 }}
              />
            ))}
            <span style={{ color: "var(--text-tertiary)", fontSize: "11px", marginLeft: "8px" }}>
              skills.json
            </span>
          </div>

          {/* Command line */}
          <Line delay={0.05}>
            <span style={{ color: "var(--green-400)" }}>$ </span>
            <span style={{ color: "var(--text-primary)" }}>cat skills.json</span>
          </Line>

          {/* Opening brace */}
          <Line delay={0.12}>
            <span style={{ color: "var(--text-primary)" }}>{`{`}</span>
          </Line>

          {entries.map(([key, values], i) => {
            const isLast = i === entries.length - 1;
            const keyDelay = delay;
            delay += 0.08;
            const valDelay = delay;
            delay += 0.06;

            return (
              <div key={key} style={{ paddingLeft: "clamp(16px, 4vw, 28px)" }}>
                <Line delay={keyDelay}>
                  <span style={{ color: "var(--green-400)" }}>&quot;{key}&quot;</span>
                  <span style={{ color: "var(--text-primary)" }}>: [</span>
                </Line>
                <Line delay={valDelay}>
                  <span style={{ paddingLeft: "clamp(16px, 4vw, 28px)" }}>
                    {values.map((v, vi) => (
                      <span key={v}>
                        <span style={{ color: "var(--amber-400)" }}>&quot;{v}&quot;</span>
                        {vi < values.length - 1 && (
                          <span style={{ color: "var(--text-primary)" }}>, </span>
                        )}
                      </span>
                    ))}
                  </span>
                </Line>
                <Line delay={valDelay + 0.04}>
                  <span style={{ color: "var(--text-primary)" }}>
                    ]{isLast ? "" : ","}
                  </span>
                </Line>
              </div>
            );
          })}

          {/* Closing brace */}
          <Line delay={delay}>
            <span style={{ color: "var(--text-primary)" }}>{`}`}</span>
          </Line>
        </div>
      </div>
    </section>
  );
}
