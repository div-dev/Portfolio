"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function StarField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function FloatingSphere({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.005;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.4, 1]} />
      <meshStandardMaterial color={color} wireframe opacity={0.4} transparent />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ position: "absolute", inset: 0 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
      <StarField />
      <FloatingSphere position={[-3, 1, -2]} color="#a855f7" speed={0.8} />
      <FloatingSphere position={[3, -1, -2]} color="#6366f1" speed={1.2} />
      <FloatingSphere position={[0, 2, -3]} color="#ec4899" speed={0.6} />
    </Canvas>
  );
}
