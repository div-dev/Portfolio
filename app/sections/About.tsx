"use client";
import { motion } from "framer-motion";
import AnimatedCounter from "../components/AnimatedCounter";
import ScrollRevealText from "../components/ScrollRevealText";

const stats = [
  { num: 400, suffix: "+", label: "Enterprise Tables Synced" },
  { num: 200, suffix: "+", label: "Airflow DAGs Owned" },
  { num: 150, suffix: "+", label: "REST APIs Shipped" },
  { num: 7, suffix: "+", label: "Enterprise Clients" },
];

export default function About() {
  return (
    <section
      id="about"
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
          // ABOUT
        </motion.p>

        <div
          style={{ display: "grid", gap: "48px" }}
          className="md:grid-cols-[160px_1fr]"
        >
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", justifyContent: "center" }}
            className="md:justify-start"
          >
            <div style={{ position: "relative", width: "160px", height: "160px" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(51,255,51,0.15) 0%, transparent 70%)",
                  filter: "blur(16px)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: "1px solid var(--green-400)",
                  backgroundColor: "var(--bg-tertiary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(51,255,51,0.1)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "var(--green-400)",
                    textShadow: "0 0 10px rgba(51,255,51,0.5)",
                  }}
                >
                  DC
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div>
            {/* Scroll-reveal heading */}
            <ScrollRevealText
              text="Backend is the day job. The rest is whatever I'm curious about this month."
              tag="h2"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(18px, 2.5vw, 22px)",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.45,
                marginBottom: "20px",
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "16px",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
                marginBottom: "16px",
              }}
            >
              Senior Python Developer at DesignX. I build and maintain production backend systems
              for large manufacturers: Kafka pipelines, 200+ Airflow DAGs, IoT telemetry ingestion,
              SAP ECC integration. The clients include Hero MotoCorp, Hindustan Unilever, Mondelez, Dabur, and others.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: "16px",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
                marginBottom: "36px",
              }}
            >
              BTech from Jaypee Institute of Information Technology, Noida. Side projects go wherever
              curiosity takes me: C++ cache simulators, TensorFlow classifiers, LLM automation tooling.
            </motion.p>

            {/* Stats with AnimatedCounter */}
            <div
              style={{
                display: "grid",
                borderTop: "1px solid #1a1a1a",
                paddingTop: "24px",
              }}
              className="grid-cols-2 sm:grid-cols-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  style={{
                    padding: "16px 8px",
                    borderRight: i < stats.length - 1 ? "1px solid #1a1a1a" : "none",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-code)",
                      fontSize: "26px",
                      fontWeight: 700,
                      color: "var(--green-400)",
                      lineHeight: 1,
                      marginBottom: "6px",
                      textShadow: "0 0 14px rgba(51,255,51,0.3)",
                    }}
                  >
                    <AnimatedCounter target={stat.num} suffix={stat.suffix} />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-code)",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
