"use client";
import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useFunMode } from "./FunModeProvider";

interface FireParticle {
  id: number;
  dx: number;
  dy: number;
  color: string;
  size: number;
}

const FIRE_COLORS = ["#FF6B00", "#FF4500", "#FFD700", "#FF8C00", "#FF2200", "#FFAA00"];
const DRAGON_SIZE = 160;

export default function Dragon() {
  const { setDragonPos } = useFunMode();
  const dragonRef = useRef<HTMLDivElement>(null);
  const constraintRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<FireParticle[]>([]);
  const particleId = useRef(0);
  const x = useMotionValue(48);
  const y = useMotionValue(110);

  const updateDragonRect = useCallback(() => {
    if (!dragonRef.current) return;
    const rect = dragonRef.current.getBoundingClientRect();
    setDragonPos({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
  }, [setDragonPos]);

  const breatheFire = useCallback(() => {
    const newParticles: FireParticle[] = Array.from({ length: 18 }, () => ({
      id: particleId.current++,
      dx: (Math.random() * 110 + 40) * (Math.random() > 0.2 ? 1 : -0.35),
      dy: (Math.random() - 0.68) * 70,
      color: FIRE_COLORS[Math.floor(Math.random() * FIRE_COLORS.length)],
      size: Math.random() * 11 + 5,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((n) => n.id === p.id)));
    }, 850);
  }, []);

  return (
    /* Fixed: covers full viewport so dragon can roam the entire page */
    <div
      ref={constraintRef}
      style={{ position: "fixed", inset: 0, zIndex: 200, pointerEvents: "none" }}
    >
      <motion.div
        ref={dragonRef}
        drag
        dragMomentum={false}
        dragConstraints={constraintRef}
        style={{
          x, y,
          position: "absolute", top: 0, left: 0,
          width: DRAGON_SIZE, height: DRAGON_SIZE,
          cursor: "grab", pointerEvents: "auto", zIndex: 210,
        }}
        whileDrag={{ cursor: "grabbing", scale: 1.07 }}
        onDrag={updateDragonRect}
        onDragEnd={updateDragonRect}
        onClick={breatheFire}
        title="Drag me! Click for fire."
      >
        {/* Fire particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: DRAGON_SIZE * 0.77, y: DRAGON_SIZE * 0.21, opacity: 1, scale: 0.3 }}
              animate={{ x: DRAGON_SIZE * 0.77 + p.dx, y: DRAGON_SIZE * 0.21 + p.dy, opacity: 0, scale: 1.8 }}
              exit={{}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: p.size, height: p.size,
                backgroundColor: p.color,
                zIndex: 220,
                filter: "blur(1.5px)",
              }}
            />
          ))}
        </AnimatePresence>

        {/* ── Menacing dragon SVG ── */}
        <svg
          viewBox="0 0 160 160"
          width={DRAGON_SIZE}
          height={DRAGON_SIZE}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: "block",
            filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.6))",
          }}
        >
          {/* ── LEFT WING ── */}
          <g style={{ transformOrigin: "52px 74px", animation: "wingFlap 1.8s ease-in-out infinite" }}>
            <path
              d="M52,74 L4,16 L16,42 L2,60 L20,66 L8,84 L44,77 Z"
              fill="var(--text)"
              opacity="0.92"
            />
            {/* membrane veins */}
            <line x1="52" y1="74" x2="4" y2="16" stroke="var(--accent)" strokeWidth="0.8" opacity="0.45"/>
            <line x1="52" y1="74" x2="20" y2="66" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3"/>
            <line x1="52" y1="74" x2="8" y2="84" stroke="var(--accent)" strokeWidth="0.6" opacity="0.25"/>
          </g>

          {/* ── RIGHT WING ── */}
          <g style={{ transformOrigin: "96px 70px", animation: "wingFlapRight 1.8s ease-in-out infinite" }}>
            <path
              d="M96,70 L150,14 L140,42 L154,58 L136,63 L148,80 L108,75 Z"
              fill="var(--text)"
              opacity="0.84"
            />
            <line x1="96" y1="70" x2="150" y2="14" stroke="var(--accent)" strokeWidth="0.8" opacity="0.38"/>
            <line x1="96" y1="70" x2="136" y2="63" stroke="var(--accent)" strokeWidth="0.6" opacity="0.25"/>
            <line x1="96" y1="70" x2="148" y2="80" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2"/>
          </g>

          {/* ── BODY ── */}
          <ellipse cx="76" cy="97" rx="23" ry="28" fill="var(--text)" />
          {/* belly highlight */}
          <ellipse cx="75" cy="101" rx="13" ry="18" fill="var(--accent)" opacity="0.2" />
          {/* belly scale bands */}
          <path d="M68,93 Q76,88 84,93 Q76,98 68,93 Z" fill="var(--accent)" opacity="0.16"/>
          <path d="M68,100 Q76,95 84,100 Q76,105 68,100 Z" fill="var(--accent)" opacity="0.13"/>
          <path d="M68,107 Q76,102 84,107 Q76,112 68,107 Z" fill="var(--accent)" opacity="0.1"/>

          {/* ── BACK SPINES ── */}
          <path d="M72,70 L65,52 M74,73 L68,56 M76,75 L72,60 M78,74 L76,59 M80,73 L80,58"
                stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round"/>

          {/* ── NECK ── */}
          <path d="M60,72 Q68,53 86,47 L90,60 Q74,64 66,78 Z" fill="var(--text)" />
          {/* neck scales */}
          <path d="M66,66 L62,60 L70,64 Z" fill="var(--accent)" opacity="0.3"/>
          <path d="M72,60 L68,54 L76,58 Z" fill="var(--accent)" opacity="0.25"/>

          {/* ── HEAD — angular, predatory ── */}
          {/* skull */}
          <path d="M86,47 Q93,28 112,24 Q124,21 128,30 Q124,37 116,39 Q104,42 98,48 Z"
                fill="var(--text)" />
          {/* brow ridge */}
          <path d="M98,34 Q106,28 116,30 Q110,34 98,34 Z" fill="var(--text)" />

          {/* ── LOWER JAW — open, snarling ── */}
          <path d="M98,48 Q106,58 120,54 L128,44 Q116,40 104,46 Z" fill="var(--text)" opacity="0.95"/>

          {/* upper teeth — jagged fangs */}
          <path d="M101,45 L98,53" stroke="var(--bg)" strokeWidth="2" strokeLinecap="round" opacity="0.92"/>
          <path d="M105,43 L103,52" stroke="var(--bg)" strokeWidth="2.2" strokeLinecap="round" opacity="0.92"/>
          <path d="M110,42 L109,51" stroke="var(--bg)" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
          <path d="M115,41 L115,50" stroke="var(--bg)" strokeWidth="1.8" strokeLinecap="round" opacity="0.88"/>
          <path d="M120,41 L121,49" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
          {/* lower teeth */}
          <path d="M104,48 L101,55" stroke="var(--bg)" strokeWidth="1.8" strokeLinecap="round" opacity="0.85"/>
          <path d="M108,47 L106,54" stroke="var(--bg)" strokeWidth="1.8" strokeLinecap="round" opacity="0.82"/>
          <path d="M113,46 L112,53" stroke="var(--bg)" strokeWidth="1.6" strokeLinecap="round" opacity="0.8"/>
          <path d="M118,46 L118,52" stroke="var(--bg)" strokeWidth="1.4" strokeLinecap="round" opacity="0.75"/>

          {/* nostril */}
          <circle cx="122" cy="38" r="2.2" fill="var(--bg)" opacity="0.65" />
          <circle cx="125" cy="37" r="1.5" fill="var(--bg)" opacity="0.45" />

          {/* ── HORNS ── */}
          <path d="M98,28 L89,8 L102,26 Z" fill="var(--text)" />
          <path d="M109,24 L106,4 L115,22 Z" fill="var(--text)" />
          {/* horn accent color */}
          <path d="M98,28 L89,8 L102,26 Z" fill="var(--accent)" opacity="0.35"/>
          <path d="M109,24 L106,4 L115,22 Z" fill="var(--accent)" opacity="0.3"/>
          {/* ear fin */}
          <path d="M94,29 L87,18 L96,27 Z" fill="var(--accent)" opacity="0.55"/>

          {/* ── EYE — glowing red, with slit pupil ── */}
          {/* outer glow */}
          <circle cx="101" cy="30" r="9" fill="#CC0000" opacity="0.18" />
          <circle cx="101" cy="30" r="6.5" fill="#880000" opacity="0.35" />
          {/* iris */}
          <circle cx="101" cy="30" r="5" fill="#CC0000" />
          {/* bright inner */}
          <circle cx="101" cy="30" r="3.2" fill="#FF2200" />
          {/* slit pupil */}
          <ellipse cx="101" cy="30" rx="1.1" ry="3" fill="#0A0000" />
          {/* specular */}
          <circle cx="99.5" cy="28.5" r="1.3" fill="#FF9988" opacity="0.85" />

          {/* ── TAIL ── */}
          <path
            d="M63,122 Q51,133 40,142 Q30,150 24,155"
            fill="none"
            stroke="var(--text)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* tail spines */}
          <path d="M55,127 L48,121" stroke="var(--text)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M48,133 L41,127" stroke="var(--text)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M42,139 L35,133" stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round"/>
          {/* arrow tip */}
          <path d="M21,156 L14,160 L21,158 L24,160 Z" fill="var(--text)" />
          <path d="M21,156 L14,160 L21,158 L24,160 Z" fill="var(--accent)" opacity="0.5"/>

          {/* ── CLAWS ── front left */}
          <path d="M57,120 L48,131 L44,138" stroke="var(--text)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
          <path d="M57,120 L53,133 L50,140" stroke="var(--text)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
          <path d="M64,122 L60,135 L57,142" stroke="var(--text)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
          {/* back right */}
          <path d="M88,121 L95,130 L101,135" stroke="var(--text)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
          <path d="M86,125 L92,135 L96,140" stroke="var(--text)" strokeWidth="3" strokeLinecap="round" fill="none"/>
        </svg>
      </motion.div>
    </div>
  );
}
