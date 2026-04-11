"use client";
import { motion } from "framer-motion";

const experience = [
  {
    role: "Senior Python Developer",
    company: "DesignX",
    period: "Nov 2025 – Present",
    bullets: [
      "Led backend engineering for enterprise automation platforms — Python microservices and REST APIs used in production by Hero MotoCorp.",
      "Architected Dockerized Kafka Connect pipelines synchronizing 400+ enterprise tables across MySQL and internal systems for real-time data movement.",
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
      "Developed 150+ REST APIs, 30+ reusable Python modules, and 35+ IoT transformation pipelines for analytics and enterprise workflows.",
      "Modernized legacy PHP backends to Python, improving performance through query optimization, indexing, and database partitioning.",
      "Digitized core manufacturing workflows (PQCS, NPD) for Hero MotoCorp by building backend systems that streamlined execution.",
      "Reduced manual reporting effort by 80% by engineering automated dashboards, alerting pipelines, and rule-based validation workflows.",
    ],
    tech: ["Python", "Django", "Django REST Framework", "PostgreSQL", "Redis", "ETL Pipelines"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 bg-[#FAF9F6] dark:bg-[#1C1C1E] transition-colors duration-200"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#C4B5F4] dark:text-[#7C6FCD] mb-3">
            My Journey
          </p>
          <h2 className="text-[24px] font-medium text-[#2C2C2A] dark:text-[#F1EFE8]">
            Work Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-[#D3D1C7] dark:bg-[#444441]" />

          <div className="space-y-10 pl-8">
            {experience.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-10 top-1.5 w-3 h-3 rounded-full bg-[#C4B5F4] dark:bg-[#7C6FCD] border-2 border-[#FAF9F6] dark:border-[#1C1C1E]" />

                <div className="bg-white dark:bg-[#2C2C2A] border border-[#D3D1C7] dark:border-[#444441] rounded-xl p-6 hover:border-[#C4B5F4]/40 dark:hover:border-[#7C6FCD]/40 transition-colors duration-200">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                    <h3 className="text-[18px] font-medium text-[#2C2C2A] dark:text-[#F1EFE8]">
                      {job.role}
                    </h3>
                    <span className="text-[13px] text-[#C4B5F4] dark:text-[#7C6FCD] bg-[#C4B5F4]/10 dark:bg-[#7C6FCD]/10 px-3 py-1 rounded-full">
                      {job.period}
                    </span>
                  </div>

                  <p className="text-[13px] font-medium text-[#888780] dark:text-[#B4B2A9] mb-4">
                    {job.company}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {job.bullets.map((b, bi) => (
                      <li key={bi} className="text-[15px] text-[#888780] dark:text-[#B4B2A9] leading-[1.7] flex gap-2">
                        <span className="text-[#C4B5F4] dark:text-[#7C6FCD] mt-[6px] shrink-0">·</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 bg-[#FAF9F6] dark:bg-[#1C1C1E] border border-[#D3D1C7] dark:border-[#444441] rounded-lg text-[13px] text-[#888780] dark:text-[#B4B2A9]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
