"use client";
import { motion } from "framer-motion";
import { useFunMode } from "../components/FunModeProvider";

export default function Contact() {
  const { funMode } = useFunMode();

  return (
    <section id="contact" className="py-32" style={{ backgroundColor: "var(--bg)" }}>
      {/* Horizontal rule above contact */}
      <div className="flex justify-center mb-20">
        <div style={{ width: "50%", height: 1, background: "linear-gradient(to right, transparent, var(--border), transparent)" }} />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center">
        {funMode && <div className="fun-ornament">✦ Send a Raven ✦</div>}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[11px] font-medium tracking-[0.25em] uppercase mb-3" style={{ color: "var(--accent)" }}>
            {funMode ? "Seek Audience" : "Get in Touch"}
          </p>
          <h2
            className="text-[24px] font-normal mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            {funMode ? "Seek the Craftsman" : "Let's Work Together"}
          </h2>
          <p
            className="text-[17px] leading-relaxed mb-10 max-w-md mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            {funMode
              ? "Dispatch a raven, scroll, or carrier pigeon. All missives will be answered."
              : "Open to new opportunities. Whether you have a project in mind or just want to say hello — my inbox is always open."}
          </p>

          <a
            href="mailto:divyanshchawla12@gmail.com"
            className="inline-block font-normal mb-10 pb-1 border-b-2 transition-colors duration-200"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              color: "var(--text)",
              borderColor: "var(--accent)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
          >
            divyanshchawla12@gmail.com
          </a>

          <div className="flex gap-6 justify-center">
            {[
              { label: "GitHub", href: "https://github.com/div-dev" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/divyansh-chawla-751b1a230/" },
              { label: "Resume", href: "/resume.pdf", download: "Divyansh_Chawla_Resume.pdf" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                {...(s.download ? { download: s.download } : { target: "_blank", rel: "noopener noreferrer" })}
                className="text-[13px] font-medium transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <div
        className="mt-20 pt-8 border-t text-center text-[12px]"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        Designed & Built by Divyansh Chawla
      </div>
    </section>
  );
}
