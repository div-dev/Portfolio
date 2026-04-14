"use client";
import { motion } from "framer-motion";

const experience = [
  {
    role: "Senior Python Developer",
    company: "DesignX",
    period: "Nov 2025 – Present",
    bullets: [
      "Led backend engineering for enterprise automation — Python microservices and REST APIs in production at Hero MotoCorp.",
      "Architected Dockerized Kafka Connect pipelines synchronizing 400+ enterprise tables across MySQL and internal systems.",
      "Own 200+ Apache Airflow DAGs powering ETL and workflow orchestration, with automated alerting and production scheduling.",
      "Built IoT data pipelines processing 500+ machine telemetry events/hour and integrated SAP ECC for real-time bidirectional data exchange.",
    ],
    tech: ["Python", "FastAPI", "Apache Kafka", "Apache Airflow", "Docker", "SAP ECC", "MySQL"],
  },
  {
    role: "Python Developer",
    company: "DesignX",
    period: "Aug 2024 – Nov 2025",
    bullets: [
      "Developed 150+ REST APIs, 30+ reusable Python modules, and 35+ IoT transformation pipelines.",
      "Modernized legacy PHP backends to Python, improving performance through query optimization, indexing, and partitioning.",
      "Digitized core manufacturing workflows (PQCS, NPD) for Hero MotoCorp.",
      "Reduced manual reporting effort by 80% through automated dashboards and rule-based validation pipelines.",
    ],
    tech: ["Python", "Django", "Django REST Framework", "PostgreSQL", "Redis", "ETL Pipelines"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      style={{ padding: "96px 0", backgroundColor: "var(--bg-primary)" }}
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
          // EXPERIENCE
        </motion.p>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: "0",
              top: "8px",
              bottom: "8px",
              width: "1px",
              backgroundColor: "rgba(51,255,51,0.15)",
              transformOrigin: "top",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
            {experience.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                style={{ paddingLeft: "28px", position: "relative" }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-4px",
                    top: "4px",
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    backgroundColor: "var(--green-400)",
                    boxShadow: "0 0 8px rgba(51,255,51,0.5)",
                    flexShrink: 0,
                  }}
                />

                {/* Terminal header */}
                <div
                  style={{
                    fontFamily: "var(--font-code)",
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                    marginBottom: "12px",
                    wordBreak: "break-word",
                  }}
                >
                  <span style={{ color: "var(--green-400)" }}>$ </span>
                  <span style={{ color: "var(--text-secondary)" }}>history </span>
                  <span style={{ color: "var(--amber-400)" }}>--role</span>
                  <span style={{ color: "var(--text-primary)" }}>
                    {" "}&quot;{job.role}&quot;
                  </span>
                  <span style={{ color: "var(--amber-400)" }}> --company</span>
                  <span style={{ color: "var(--text-primary)" }}>
                    {" "}&quot;{job.company}&quot;
                  </span>
                  <span style={{ color: "var(--amber-400)" }}> --period</span>
                  <span style={{ color: "var(--text-primary)" }}>
                    {" "}&quot;{job.period}&quot;
                  </span>
                </div>

                {/* Role + company */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "baseline",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    {job.role}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-code)",
                      fontSize: "13px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    · {job.company}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-code)",
                      fontSize: "11px",
                      color: "var(--text-tertiary)",
                      border: "1px solid #1a1a1a",
                      padding: "2px 8px",
                      marginLeft: "auto",
                    }}
                  >
                    {job.period}
                  </span>
                </div>

                {/* Bullets */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {job.bullets.map((bullet, bi) => (
                    <motion.li
                      key={bi}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + bi * 0.07 }}
                      style={{
                        display: "flex",
                        gap: "10px",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 300,
                        fontSize: "15px",
                        lineHeight: 1.65,
                        color: "var(--text-secondary)",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--green-400)",
                          flexShrink: 0,
                          marginTop: "0.25em",
                          fontSize: "12px",
                        }}
                      >
                        →
                      </span>
                      {bullet}
                    </motion.li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {job.tech.map((t, ti) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + ti * 0.05 }}
                      style={{
                        fontFamily: "var(--font-code)",
                        fontSize: "11px",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-green)",
                        padding: "3px 8px",
                      }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
