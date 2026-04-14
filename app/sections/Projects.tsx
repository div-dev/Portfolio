"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    num: "01",
    title: "LogIntel",
    description:
      "Real-time log ingestion, anomaly detection, and AI-powered analysis pipeline. Kafka-driven architecture with FastAPI services, rule-based anomaly flagging, Claude AI summarization with Redis caching.",
    tech: ["Python", "FastAPI", "Apache Kafka", "PostgreSQL", "Redis", "Docker", "Anthropic API"],
    link: "https://github.com/div-dev/logIntel",
    repo: "logIntel",
  },
  {
    num: "02",
    title: "Formbricks Lifecycle Automation",
    description:
      "Python CLI tool that spins up and tears down a full Formbricks instance via Docker Compose. Integrates OpenAI, Claude, and Ollama to generate synthetic surveys, users, and responses.",
    tech: ["Python", "Docker", "OpenAI", "Anthropic", "Ollama", "PostgreSQL", "Redis"],
    link: "https://github.com/div-dev/formbricks_task",
    repo: "formbricks_task",
  },
  {
    num: "03",
    title: "LogStream",
    description:
      "NVM logging simulator in C++ with MESI cache-coherency protocol to minimize persistent writes. Parallelized logging with std::thread reduced latency by 45%.",
    tech: ["C++", "Multithreading", "MESI Protocol", "std::atomic", "std::chrono"],
    link: "https://github.com/div-dev/LogStream",
    repo: "LogStream",
  },
  {
    num: "04",
    title: "HealthBot",
    description:
      "ML-powered health chatbot using TensorFlow/Keras neural network for intent classification. Custom NLP preprocessing with tokenization, lemmatization, and bag-of-words encoding.",
    tech: ["Python", "TensorFlow", "Keras", "NLP", "scikit-learn"],
    link: "https://github.com/div-dev/HealthBot",
    repo: "HealthBot",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 5, y: x * -5 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        borderLeftColor: hovered ? "var(--green-400)" : "transparent",
        boxShadow: hovered ? "0 0 40px rgba(51,255,51,0.05)" : "none",
        opacity: 1,
        y: 0,
      }}
      transition={{
        opacity: { duration: 0.5, ease: "easeOut", delay: index * 0.08 },
        y: { duration: 0.5, ease: "easeOut", delay: index * 0.08 },
        rotateX: { type: "spring", stiffness: 300, damping: 25 },
        rotateY: { type: "spring", stiffness: 300, damping: 25 },
        borderLeftColor: { duration: 0.2 },
        boxShadow: { duration: 0.2 },
      }}
      style={{
        backgroundColor: "var(--bg-tertiary)",
        borderLeft: "2px solid transparent",
        borderTop: "1px solid #1a1a1a",
        borderRight: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
        padding: "32px 28px",
        position: "relative",
        cursor: "default",
        perspective: "800px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Noise texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Large faded number */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "16px",
          right: "20px",
          fontFamily: "var(--font-code)",
          fontSize: "72px",
          lineHeight: 1,
          color: "var(--text-primary)",
          opacity: 0.04,
          userSelect: "none",
          pointerEvents: "none",
          fontWeight: 700,
          zIndex: 0,
        }}
      >
        {project.num}
      </span>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Title + hover link */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "14px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>
          <AnimatePresence>
            {hovered && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.18 }}
                style={{
                  fontFamily: "var(--font-code)",
                  fontSize: "11px",
                  color: "var(--green-400)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  letterSpacing: "0.04em",
                  marginTop: "4px",
                }}
              >
                ↗ github
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            marginBottom: "20px",
          }}
        >
          {project.description}
        </p>

        {/* Tech pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-code)",
                fontSize: "11px",
                color: "var(--text-secondary)",
                border: `1px solid ${hovered ? "var(--border-green-bright)" : "var(--border-green)"}`,
                padding: "3px 8px",
                transition: "border-color 0.2s",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      style={{ padding: "96px 0", backgroundColor: "var(--bg-secondary)" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
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
          // PROJECTS
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "24px",
          }}
          className="md:grid-cols-2"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
