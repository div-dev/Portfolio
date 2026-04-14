"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "../components/MagneticButton";

const EMAIL = "divyanshchawla12@gmail.com";
const EMAIL_CMD = `$ mail ${EMAIL}`;

const socials = [
  { label: "GitHub", href: "https://github.com/div-dev", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/divyansh-chawla-751b1a230/", external: true },
  { label: "Resume", href: "/resume.pdf", external: false },
];

function TypedEmail() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setDisplayed(EMAIL_CMD.slice(0, i));
            if (i >= EMAIL_CMD.length) {
              clearInterval(interval);
              setDone(true);
            }
          }, 40);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <a
        href={`mailto:${EMAIL}`}
        style={{
          fontFamily: "var(--font-code)",
          fontSize: "clamp(13px, 2.2vw, 18px)",
          color: "var(--green-400)",
          textDecoration: "none",
          textShadow: "0 0 10px rgba(51,255,51,0.3)",
          transition: "text-shadow 0.2s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.textShadow =
            "0 0 20px rgba(51,255,51,0.6)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.textShadow =
            "0 0 10px rgba(51,255,51,0.3)")
        }
      >
        {displayed}
        <span
          style={{
            display: "inline-block",
            width: "0.5em",
            height: "1.1em",
            backgroundColor: "var(--green-400)",
            marginLeft: "2px",
            verticalAlign: "text-bottom",
            animation: done ? "blink 1s step-end infinite" : "none",
          }}
        />
      </a>
    </div>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      style={{ padding: "96px 0 64px", backgroundColor: "var(--bg-primary)" }}
    >
      {/* Separator */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "80px" }}>
        <div
          style={{
            width: "40%",
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(51,255,51,0.2), transparent)",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
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
            marginBottom: "24px",
          }}
        >
          // CONTACT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(24px, 5vw, 38px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "16px",
          }}
        >
          Let&apos;s Work Together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "16px",
            color: "var(--text-secondary)",
            maxWidth: "420px",
            margin: "0 auto 48px",
            lineHeight: 1.7,
          }}
        >
          Open to new opportunities. Whether you have a project in mind or just
          want to say hello — my inbox is always open.
        </motion.p>

        {/* Typed email */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginBottom: "48px" }}
        >
          <TypedEmail />
        </motion.div>

        {/* Social links — MagneticButton */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {socials.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
            >
              <MagneticButton
                as="a"
                strength={0.3}
                href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  border: "1px solid #1a1a1a",
                  padding: "9px 20px",
                  display: "inline-block",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--green-400)";
                  (e.currentTarget as HTMLElement).style.color = "var(--green-400)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                }}
              >
                [{s.label}]
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "80px",
          paddingTop: "24px",
          borderTop: "1px solid #1a1a1a",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "11px",
            color: "var(--text-tertiary)",
            letterSpacing: "0.15em",
          }}
        >
          {"─".repeat(12)} Designed & Built by Divyansh Chawla {"─".repeat(12)}
        </p>
      </div>
    </section>
  );
}
