"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "LogIntel",
    description:
      "Real-time log ingestion, anomaly detection, and AI-powered analysis pipeline. Kafka-driven architecture with FastAPI services, rule-based anomaly flagging, Claude AI summarization with Redis caching, and a query API for logs and reports.",
    tech: ["Python", "FastAPI", "Apache Kafka", "PostgreSQL", "Redis", "Docker", "Anthropic API"],
    accent: "bg-[#C4B5F4]/10 dark:bg-[#7C6FCD]/10 border-[#C4B5F4]/30 dark:border-[#7C6FCD]/30",
    bar: "bg-[#C4B5F4] dark:bg-[#7C6FCD]",
    link: "https://github.com/div-dev/logIntel",
  },
  {
    title: "Formbricks Lifecycle Automation",
    description:
      "Python CLI tool that spins up and tears down a full Formbricks instance via Docker Compose with a single command. Integrates OpenAI, Claude, and Ollama to generate synthetic surveys, users, and responses — all seeded through the REST API with no direct DB writes. Modular architecture with retry logic, rate-limit awareness, and cross-platform support.",
    tech: ["Python", "Docker", "OpenAI", "Anthropic", "Ollama", "PostgreSQL", "Redis"],
    accent: "bg-[#F4C0D1]/10 dark:bg-[#D4537E]/10 border-[#F4C0D1]/30 dark:border-[#D4537E]/30",
    bar: "bg-[#F4C0D1] dark:bg-[#D4537E]",
    link: "https://github.com/div-dev/formbricks_task",
  },
  {
    title: "LogStream",
    description:
      "NVM logging simulator in C++ with MESI cache-coherency protocol to minimize persistent writes. Parallelized logging with std::thread and std::atomic reduced latency by 45% and write counts by 50% through lock-free queues.",
    tech: ["C++", "Multithreading", "MESI Protocol", "std::atomic", "std::chrono"],
    accent: "bg-[#9FE1CB]/10 dark:bg-[#1D9E75]/10 border-[#9FE1CB]/30 dark:border-[#1D9E75]/30",
    bar: "bg-[#9FE1CB] dark:bg-[#1D9E75]",
    link: "https://github.com/div-dev/LogStream",
  },
  {
    title: "HealthBot",
    description:
      "ML-powered health chatbot using a TensorFlow/Keras neural network for intent classification. Trained on a custom intent dataset with NLP preprocessing — tokenization, lemmatization, and bag-of-words encoding — to understand and respond to health-related queries.",
    tech: ["Python", "TensorFlow", "Keras", "NLP", "scikit-learn", "Jupyter Notebook"],
    accent: "bg-[#C4B5F4]/10 dark:bg-[#7C6FCD]/10 border-[#C4B5F4]/30 dark:border-[#7C6FCD]/30",
    bar: "bg-[#C4B5F4] dark:bg-[#7C6FCD]",
    link: "https://github.com/div-dev/HealthBot",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
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
            What I&apos;ve Built
          </p>
          <h2 className="text-[24px] font-medium text-[#2C2C2A] dark:text-[#F1EFE8]">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group bg-[#FAF9F6] dark:bg-[#1C1C1E] border rounded-xl overflow-hidden hover:border-opacity-60 transition-colors duration-200 flex flex-col ${project.accent}`}
            >
              <div className={`h-1 w-full ${project.bar}`} />
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-[18px] font-medium text-[#2C2C2A] dark:text-[#F1EFE8] mb-2">
                  {project.title}
                </h3>
                <p className="text-[15px] text-[#888780] dark:text-[#B4B2A9] leading-[1.7] mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-white dark:bg-[#2C2C2A] border border-[#D3D1C7] dark:border-[#444441] rounded text-[13px] text-[#888780] dark:text-[#B4B2A9]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium text-[#C4B5F4] dark:text-[#7C6FCD] hover:underline inline-flex items-center gap-1 transition-colors duration-200"
                  >
                    View on GitHub →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
