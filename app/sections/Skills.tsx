"use client";
import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Languages",
    color: "text-[#C4B5F4] dark:text-[#7C6FCD]",
    tagColor: "bg-[#C4B5F4]/10 dark:bg-[#7C6FCD]/10 border-[#C4B5F4]/20 dark:border-[#7C6FCD]/20 text-[#7C6FCD] dark:text-[#C4B5F4]",
    items: ["Python", "SQL", "C++", "JavaScript", "Bash"],
  },
  {
    category: "Backend & Frameworks",
    color: "text-[#F4C0D1] dark:text-[#D4537E]",
    tagColor: "bg-[#F4C0D1]/10 dark:bg-[#D4537E]/10 border-[#F4C0D1]/20 dark:border-[#D4537E]/20 text-[#D4537E] dark:text-[#F4C0D1]",
    items: ["FastAPI", "Django", "Django REST Framework", "Apache Airflow"],
  },
  {
    category: "Data & Infrastructure",
    color: "text-[#9FE1CB] dark:text-[#1D9E75]",
    tagColor: "bg-[#9FE1CB]/10 dark:bg-[#1D9E75]/10 border-[#9FE1CB]/20 dark:border-[#1D9E75]/20 text-[#1D9E75] dark:text-[#9FE1CB]",
    items: ["Apache Kafka", "Docker", "Redis", "REST APIs", "ETL Pipelines"],
  },
  {
    category: "Databases",
    color: "text-[#C4B5F4] dark:text-[#7C6FCD]",
    tagColor: "bg-[#C4B5F4]/10 dark:bg-[#7C6FCD]/10 border-[#C4B5F4]/20 dark:border-[#7C6FCD]/20 text-[#7C6FCD] dark:text-[#C4B5F4]",
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
  },
  {
    category: "Tools & Platforms",
    color: "text-[#F4C0D1] dark:text-[#D4537E]",
    tagColor: "bg-[#F4C0D1]/10 dark:bg-[#D4537E]/10 border-[#F4C0D1]/20 dark:border-[#D4537E]/20 text-[#D4537E] dark:text-[#F4C0D1]",
    items: ["Git", "Linux", "Docker Compose", "Jenkins", "GCP", "Postman"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-white dark:bg-[#2C2C2A] transition-colors duration-200"
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#C4B5F4] dark:text-[#7C6FCD] mb-3">
            What I Know
          </p>
          <h2 className="text-[24px] font-medium text-[#2C2C2A] dark:text-[#F1EFE8]">
            Skills & Technologies
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#FAF9F6] dark:bg-[#1C1C1E] border border-[#D3D1C7] dark:border-[#444441] rounded-xl p-5 hover:border-[#C4B5F4]/40 dark:hover:border-[#7C6FCD]/40 transition-colors duration-200"
            >
              <h3 className={`text-[13px] font-medium mb-4 ${group.color}`}>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className={`px-2.5 py-1 rounded-lg border text-[13px] font-medium ${group.tagColor}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
