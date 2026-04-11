"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const Scene3D = dynamic(() => import("../components/Scene3D"), { ssr: false });
const GameMode = dynamic(() => import("../components/GameMode"), { ssr: false });

export default function Hero() {
  const [gameActive, setGameActive] = useState(false);

  return (
    <>
      <AnimatePresence>
        {gameActive && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GameMode onExit={() => setGameActive(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {!gameActive && <Scene3D />}

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[13px] font-medium tracking-[0.25em] uppercase text-[#C4B5F4] mb-5"
          >
            Senior Python Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl md:text-7xl font-medium text-[#F1EFE8] mb-4 leading-tight tracking-tight"
          >
            Hi, I&apos;m{" "}
            <span className="text-[#C4B5F4]">Divyansh</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[18px] text-[#B4B2A9] mb-10 leading-relaxed"
          >
            Building backend systems that scale — Kafka, Airflow, Python microservices, and AI-powered pipelines.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <a
              href="#projects"
              className="h-9 px-5 bg-[#C4B5F4] text-[#2C2C2A] text-[14px] font-medium rounded-lg hover:bg-[#b5a3f0] transition-colors duration-200 flex items-center"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="h-9 px-5 border border-[#444441] text-[#F1EFE8] text-[14px] font-medium rounded-lg hover:bg-white/5 transition-colors duration-200 flex items-center"
            >
              Get in Touch
            </a>
            <button
              onClick={() => setGameActive(true)}
              className="h-9 px-5 border border-[#444441] text-[#B4B2A9] text-[14px] font-medium rounded-lg hover:bg-white/5 transition-colors duration-200 flex items-center gap-2"
            >
              <span>🚀</span> Explore Universe
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#444441]"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#444441] to-transparent" />
        </motion.div>
      </section>
    </>
  );
}
