"use client";
import { motion } from "framer-motion";
import { useFunMode } from "../components/FunModeProvider";

const experience = [
  {
    role: "Senior Python Developer",
    company: "DesignX",
    period: "Nov 2025 – Present",
    bullets: [
      "Led backend engineering for enterprise automation platforms — Python microservices and REST APIs in production at Hero MotoCorp.",
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
  const { funMode } = useFunMode();

  return (
    <section id="experience" className="py-32" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto px-6">
        {funMode && <div className="fun-ornament">✦ Chronicles of Work ✦</div>}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase mb-3" style={{ color: "var(--accent)" }}>
            My Journey
          </p>
          <h2
            className="text-[24px] font-normal mb-12"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Work Experience
          </h2>

          <div className="space-y-10">
            {experience.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="pl-5"
                style={{ borderLeft: `2px solid var(--accent)` }}
              >
                <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                  <h3
                    className="text-[18px] font-normal"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                  >
                    {job.role}
                    <span className="ml-2 text-[15px]" style={{ color: "var(--text-muted)" }}>
                      · {job.company}
                    </span>
                  </h3>
                  <span
                    className="text-[12px] px-2.5 py-0.5 rounded-full border"
                    style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
                  >
                    {job.period}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 mb-5">
                  {job.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      className="text-[15px] leading-relaxed flex gap-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "0.3rem", fontSize: "13px" }}>→</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {job.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded border"
                      style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
