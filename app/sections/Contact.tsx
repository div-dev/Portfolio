"use client";
import { motion } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com/div-dev" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/divyansh-chawla-751b1a230/" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-[#FAF9F6] dark:bg-[#1C1C1E] transition-colors duration-200"
    >
      <div className="max-w-xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#C4B5F4] dark:text-[#7C6FCD] mb-3">
            Get in Touch
          </p>
          <h2 className="text-[24px] font-medium text-[#2C2C2A] dark:text-[#F1EFE8] mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-[15px] text-[#888780] dark:text-[#B4B2A9] leading-[1.7] mb-10">
            Open to new opportunities. Whether you have a project in mind or just want to
            say hello — my inbox is always open.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <a
              href="mailto:divyanshchawla12@gmail.com"
              className="h-9 px-5 bg-[#C4B5F4] dark:bg-[#7C6FCD] text-[#2C2C2A] dark:text-[#F1EFE8] text-[14px] font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center"
            >
              Say Hello
            </a>
            <a
              href="/resume.pdf"
              download="Divyansh_Chawla_Resume.pdf"
              className="h-9 px-5 border border-[#D3D1C7] dark:border-[#444441] text-[#2C2C2A] dark:text-[#F1EFE8] text-[14px] font-medium rounded-lg hover:bg-[#D3D1C7]/30 dark:hover:bg-[#444441]/30 transition-colors duration-200 flex items-center justify-center"
            >
              Download Resume
            </a>
          </div>

          <div className="flex gap-6 justify-center">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-medium text-[#888780] dark:text-[#B4B2A9] hover:text-[#C4B5F4] dark:hover:text-[#7C6FCD] transition-colors duration-200"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-20 pt-8 border-t border-[#D3D1C7] dark:border-[#444441] text-center text-[13px] text-[#888780] dark:text-[#B4B2A9] transition-colors duration-200">
        Designed & Built by Divyansh Chawla
      </div>
    </section>
  );
}
