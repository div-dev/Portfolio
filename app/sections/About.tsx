"use client";
import { motion } from "framer-motion";
import { useFunMode } from "../components/FunModeProvider";

const stats = [
  { value: "150+", label: "APIs Built" },
  { value: "2+", label: "Yrs Exp" },
  { value: "200+", label: "Airflow DAGs" },
  { value: "7+", label: "Clients" },
];

export default function About() {
  const { funMode } = useFunMode();

  return (
    <section
      id="about"
      className="py-32"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        {funMode && (
          <div className="fun-ornament">✦ About the Author ✦</div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-14 items-start"
        >
          {/* Avatar */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-44 h-44 rounded-full">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-40"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <div
                className="relative w-full h-full rounded-full border flex items-center justify-center"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <span
                  className="text-4xl font-normal"
                  style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
                >
                  DC
                </span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p
              className="text-[11px] font-medium tracking-[0.25em] uppercase mb-3"
              style={{ color: "var(--accent)" }}
            >
              About Me
            </p>
            <h2
              className="text-[24px] font-normal mb-6 leading-snug"
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
            >
              Backend engineer who ships things that actually run in production
            </h2>

            {/* Drop cap ONLY in fun mode, ONLY on this paragraph */}
            <p
              className={`text-[17px] leading-relaxed mb-4${funMode ? " fun-drop-cap" : ""}`}
              style={{ color: "var(--text-muted)" }}
            >
              Senior Python Developer at DesignX, building and scaling backend systems for
              enterprise clients — Hero MotoCorp, Hindustan Unilever, Mondelez, Dabur, and others.
              My work spans Kafka pipelines, Airflow orchestration, IoT data ingestion, and SAP integrations.
            </p>
            <p
              className="text-[17px] leading-relaxed mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              BTech from Jaypee Institute of Information Technology, Noida. Outside of work I build
              side projects at the intersection of distributed systems and AI.
            </p>

            {/* Stats — horizontal row with vertical dividers */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-0 mt-2"
              style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center py-3 sm:py-0"
                  style={{
                    borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <div
                    className="text-[28px] font-normal leading-none mb-1"
                    style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
