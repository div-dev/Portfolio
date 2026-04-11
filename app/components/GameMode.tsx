"use client";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// ── data ──────────────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "about",
    label: "About",
    color: "#a855f7",
    position: [-4, 1, -2] as [number, number, number],
    size: 0.7,
    content: {
      title: "About Me",
      body: "I'm a passionate full-stack developer who loves building beautiful, functional applications. 3+ years of experience shipping products that users love.",
    },
  },
  {
    id: "skills",
    label: "Skills",
    color: "#6366f1",
    position: [4, -1, -3] as [number, number, number],
    size: 0.9,
    content: {
      title: "Skills",
      body: "React · Next.js · TypeScript · Node.js · Python · PostgreSQL · MongoDB · AWS · Docker · Three.js · Tailwind CSS · Figma",
    },
  },
  {
    id: "experience",
    label: "Experience",
    color: "#ec4899",
    position: [-2, -2, -4] as [number, number, number],
    size: 0.8,
    content: {
      title: "Experience",
      body: "Senior Full Stack Dev @ Tech Company Inc (2022–Present)\nFrontend Dev @ Startup Studio (2021–2022)\nJunior Dev @ Digital Agency (2020–2021)",
    },
  },
  {
    id: "projects",
    label: "Projects",
    color: "#f59e0b",
    position: [3, 2, -5] as [number, number, number],
    size: 1.0,
    content: {
      title: "Projects",
      body: "Project Alpha — SaaS platform with real-time collaboration\nProject Beta — AI analytics dashboard\nProject Gamma — Cross-platform mobile app\nProject Delta — Open-source CLI tool (500+ ⭐)",
    },
  },
  {
    id: "contact",
    label: "Contact",
    color: "#10b981",
    position: [0, 3, -3] as [number, number, number],
    size: 0.6,
    content: {
      title: "Contact",
      body: "yourname@email.com\ngithub.com/yourname\nlinkedin.com/in/yourname",
    },
  },
];

// ── Planet ────────────────────────────────────────────────────────────────────
function Planet({
  section,
  onClick,
  active,
}: {
  section: (typeof SECTIONS)[number];
  onClick: () => void;
  active: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x += 0.002;
    meshRef.current.position.y =
      section.position[1] + Math.sin(state.clock.elapsedTime * 0.5 + section.position[0]) * 0.2;
    if (ringRef.current) ringRef.current.rotation.z += 0.01;
  });

  return (
    <group position={section.position}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "default"; }}
        scale={active ? 1.4 : hovered ? 1.2 : 1}
      >
        <icosahedronGeometry args={[section.size, 2]} />
        <meshStandardMaterial
          color={section.color}
          emissive={section.color}
          emissiveIntensity={active ? 0.6 : hovered ? 0.4 : 0.15}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[section.size + 0.3, 0.02, 8, 64]} />
        <meshStandardMaterial
          color={section.color}
          emissive={section.color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>

      <Text
        position={[0, section.size + 0.6, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {section.label}
      </Text>

      <pointLight color={section.color} intensity={active ? 3 : hovered ? 2 : 0.8} distance={3} />
    </group>
  );
}

// ── Camera controller ─────────────────────────────────────────────────────────
function CameraRig({ targetPos }: { targetPos: THREE.Vector3 | null }) {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const destPos = targetPos
      ? targetPos.clone().add(new THREE.Vector3(0, 0.5, 3.5))
      : new THREE.Vector3(0, 0, 7);
    const destLook = targetPos ?? new THREE.Vector3(0, 0, 0);

    camera.position.lerp(destPos, delta * 2);
    lookTarget.current.lerp(destLook, delta * 2);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function GameScene({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const activeSection = SECTIONS.find((s) => s.id === activeId);
  const targetPos = activeSection ? new THREE.Vector3(...activeSection.position) : null;

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={1} />
      <Stars radius={30} depth={50} count={4000} factor={3} saturation={0} fade speed={0.5} />
      {SECTIONS.map((s) => (
        <Planet
          key={s.id}
          section={s}
          active={activeId === s.id}
          onClick={() => onSelect(activeId === s.id ? null : s.id)}
        />
      ))}
      <CameraRig targetPos={targetPos} />
    </>
  );
}

// ── Info card ─────────────────────────────────────────────────────────────────
function InfoCard({
  section,
  currentIndex,
  total,
  onPrev,
  onNext,
  onClose,
}: {
  section: (typeof SECTIONS)[number];
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      key={section.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90vw] max-w-md z-20"
    >
      <div
        className="rounded-2xl border p-6 backdrop-blur-xl"
        style={{ background: `${section.color}18`, borderColor: `${section.color}50` }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white">{section.content.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-lg leading-none ml-4"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line mb-5">
          {section.content.body}
        </p>

        {/* Prev / counter / next */}
        <div className="flex items-center justify-between">
          <button
            onClick={onPrev}
            className="px-4 py-1.5 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition-colors"
          >
            ← Prev
          </button>
          <span className="text-gray-500 text-xs">
            {currentIndex + 1} / {total}
          </span>
          <button
            onClick={onNext}
            className="px-4 py-1.5 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Public component ──────────────────────────────────────────────────────────
export default function GameMode({ onExit }: { onExit: () => void }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Reset cursor on unmount
  useEffect(() => () => { document.body.style.cursor = "default"; }, []);

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeId);
  const activeSection = activeIndex >= 0 ? SECTIONS[activeIndex] : null;

  const goTo = (index: number) => {
    const i = (index + SECTIONS.length) % SECTIONS.length;
    setActiveId(SECTIONS[i].id);
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 py-4 pointer-events-none">
        <div className="pointer-events-auto">
          <p className="text-purple-400 text-xs tracking-widest uppercase">Game Mode</p>
          <p className="text-white font-bold text-lg">Explore My Universe</p>
        </div>
        <button
          onClick={onExit}
          className="pointer-events-auto px-4 py-2 border border-white/20 rounded-full text-white text-sm hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          ← Exit Game
        </button>
      </div>

      {/* Hint */}
      <AnimatePresence>
        {!activeId && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm text-center pointer-events-none z-10"
          >
            Click a planet to explore
          </motion.p>
        )}
      </AnimatePresence>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        <GameScene activeId={activeId} onSelect={setActiveId} />
      </Canvas>

      {/* Info card */}
      <AnimatePresence mode="wait">
        {activeSection && (
          <InfoCard
            key={activeSection.id}
            section={activeSection}
            currentIndex={activeIndex}
            total={SECTIONS.length}
            onPrev={() => goTo(activeIndex - 1)}
            onNext={() => goTo(activeIndex + 1)}
            onClose={() => setActiveId(null)}
          />
        )}
      </AnimatePresence>

      {/* Dot nav */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveId(activeId === s.id ? null : s.id)}
            title={s.label}
            className="w-3 h-3 rounded-full transition-all duration-200"
            style={{
              background: activeId === s.id ? s.color : "#ffffff30",
              boxShadow: activeId === s.id ? `0 0 8px ${s.color}` : "none",
              transform: activeId === s.id ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
