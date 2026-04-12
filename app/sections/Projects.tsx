"use client";
import { motion } from "framer-motion";
import { useFunMode } from "../components/FunModeProvider";

const projects = [
  {
    num: "01",
    title: "LogIntel",
    description: "Real-time log ingestion, anomaly detection, and AI-powered analysis pipeline. Kafka-driven architecture with FastAPI services, rule-based anomaly flagging, Claude AI summarization with Redis caching, and a query API for logs and reports.",
    tech: ["Python", "FastAPI", "Apache Kafka", "PostgreSQL", "Redis", "Docker", "Anthropic API"],
    link: "https://github.com/div-dev/logIntel",
  },
  {
    num: "02",
    title: "Formbricks Lifecycle Automation",
    description: "Python CLI tool that spins up and tears down a full Formbricks instance via Docker Compose with a single command. Integrates OpenAI, Claude, and Ollama to generate synthetic surveys, users, and responses — all seeded through the REST API with no direct DB writes.",
    tech: ["Python", "Docker", "OpenAI", "Anthropic", "Ollama", "PostgreSQL", "Redis"],
    link: "https://github.com/div-dev/formbricks_task",
  },
  {
    num: "03",
    title: "LogStream",
    description: "NVM logging simulator in C++ with MESI cache-coherency protocol to minimize persistent writes. Parallelized logging with std::thread and std::atomic reduced latency by 45% and write counts by 50% through lock-free queues.",
    tech: ["C++", "Multithreading", "MESI Protocol", "std::atomic", "std::chrono"],
    link: "https://github.com/div-dev/LogStream",
  },
  {
    num: "04",
    title: "HealthBot",
    description: "ML-powered health chatbot using a TensorFlow/Keras neural network for intent classification. Trained on a custom intent dataset with NLP preprocessing — tokenization, lemmatization, and bag-of-words encoding — to understand and respond to health-related queries.",
    tech: ["Python", "TensorFlow", "Keras", "NLP", "scikit-learn", "Jupyter Notebook"],
    link: "https://github.com/div-dev/HealthBot",
  },
];

export default function Projects() {
  const { funMode } = useFunMode();

  return (
    <section id="projects" className="py-32" style={{ backgroundColor: "var(--surface)" }}>
      <div className="max-w-3xl mx-auto px-6">
        {funMode && <div className="fun-ornament">✦ Works of Craft ✦</div>}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase mb-3" style={{ color: "var(--accent)" }}>
            What I&apos;ve Built
          </p>
          <h2
            className="text-[24px] font-normal mb-12"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            Featured Projects
          </h2>

          <div>
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="group relative py-8 border-t transition-all duration-300"
                style={{
                  borderColor: "var(--border)",
                  borderLeft: "3px solid transparent",
                  paddingLeft: 16,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeftColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeftColor = "transparent";
                }}
              >
                {/* Large faded project number */}
                <span
                  className="absolute top-4 right-2 select-none pointer-events-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 72,
                    lineHeight: 1,
                    color: "var(--text)",
                    opacity: 0.04,
                    fontWeight: 400,
                  }}
                >
                  {project.num}
                </span>

                <div className="relative flex items-start gap-5">
                  {funMode && (
                    <span
                      className="text-[13px] font-medium mt-1 shrink-0 w-8 opacity-40"
                      style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
                    >
                      {project.num}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <h3
                        className="text-[18px] font-normal"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                      >
                        {project.title}
                      </h3>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] font-medium shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        style={{ color: "var(--accent)" }}
                      >
                        GitHub{" "}
                        <span
                          className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </a>
                    </div>
                    <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2 py-0.5 rounded border"
                          style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="border-t" style={{ borderColor: "var(--border)" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
