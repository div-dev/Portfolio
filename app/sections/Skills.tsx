"use client";
import { motion } from "framer-motion";
import { useFunMode } from "../components/FunModeProvider";

const skillGroups = [
  { category: "Languages", items: ["Python", "SQL", "C++", "JavaScript", "Bash"] },
  { category: "Backend & Frameworks", items: ["FastAPI", "Django", "Django REST Framework", "Apache Airflow"] },
  { category: "Data & Infrastructure", items: ["Apache Kafka", "Docker", "Redis", "REST APIs", "ETL Pipelines"] },
  { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
  { category: "Tools & Platforms", items: ["Git", "Linux", "Docker Compose", "Jenkins", "GCP", "Postman"] },
];

export default function Skills() {
  const { funMode } = useFunMode();

  return (
    <section id="skills" className="py-32" style={{ backgroundColor: "var(--surface)" }}>
      <div className="max-w-3xl mx-auto px-6">
        {funMode && <div className="fun-ornament">✦ Acquired Knowledge ✦</div>}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase mb-3" style={{ color: "var(--accent)" }}>
            What I Know
          </p>
          <h2
            className="text-[24px] font-normal mb-12"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Skills & Technologies
          </h2>

          <div className="space-y-5">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="flex items-baseline gap-3"
              >
                <span
                  className="text-[13px] font-medium shrink-0 whitespace-nowrap"
                  style={{ color: "var(--text)" }}
                >
                  {group.category}
                </span>
                <div
                  className="flex-1 self-end mb-1.5"
                  style={{
                    borderBottom: "1px dotted var(--border)",
                    minWidth: 24,
                  }}
                />
                <div className="flex flex-wrap gap-1.5 shrink-0 max-w-[55%] justify-end">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-[12px] px-2.5 py-0.5 rounded-md border"
                      style={{
                        color: "var(--text-muted)",
                        borderColor: "var(--border)",
                        backgroundColor: "var(--accent-light)",
                        ...(funMode ? {
                          borderRadius: "50%",
                          padding: "4px 12px",
                          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.15)",
                        } : {}),
                      }}
                    >
                      {skill}
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
