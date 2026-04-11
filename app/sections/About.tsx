"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "150+", label: "REST APIs Built" },
  { value: "2+", label: "Years Experience" },
  { value: "200+", label: "Airflow DAGs Owned" },
  { value: "7+", label: "Enterprise Clients" },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-[#FAF9F6] dark:bg-[#1C1C1E] transition-colors duration-200"
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative w-56 h-56 rounded-full">
              <div className="absolute inset-0 rounded-full bg-[#C4B5F4]/20 dark:bg-[#7C6FCD]/20 blur-2xl" />
              <div className="relative w-full h-full rounded-full bg-white dark:bg-[#2C2C2A] border border-[#D3D1C7] dark:border-[#444441] flex items-center justify-center">
                <span className="text-5xl font-medium text-[#C4B5F4] dark:text-[#7C6FCD]">DC</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#C4B5F4] dark:text-[#7C6FCD] mb-3">
              About Me
            </p>
            <h2 className="text-[24px] font-medium text-[#2C2C2A] dark:text-[#F1EFE8] mb-6 leading-snug">
              Backend engineer who ships things that actually run in production
            </h2>
            <p className="text-[15px] text-[#888780] dark:text-[#B4B2A9] leading-[1.7] mb-4">
              I&apos;m a Senior Python Developer at DesignX, building and scaling backend systems for
              enterprise clients — Hero MotoCorp, Hindustan Unilever, Mondelez, Dabur, and others.
              My work spans Kafka pipelines, Airflow orchestration, IoT data ingestion, and SAP integrations.
            </p>
            <p className="text-[15px] text-[#888780] dark:text-[#B4B2A9] leading-[1.7] mb-8">
              I hold a BTech from Jaypee Institute of Information Technology, Noida. Outside of
              work I build side projects that sit at the intersection of distributed systems and AI.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-[#2C2C2A] border border-[#D3D1C7] dark:border-[#444441] rounded-xl p-4 transition-colors duration-200"
                >
                  <div className="text-[24px] font-medium text-[#C4B5F4] dark:text-[#7C6FCD]">
                    {stat.value}
                  </div>
                  <div className="text-[13px] text-[#888780] dark:text-[#B4B2A9]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
