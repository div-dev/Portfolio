"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const rpos = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest("a, button, [data-hover]")) {
        hovering.current = true;
      }
    };
    const onOut = () => { hovering.current = false; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    let raf: number;
    const tick = () => {
      rpos.current.x += (pos.current.x - rpos.current.x) * 0.1;
      rpos.current.y += (pos.current.y - rpos.current.y) * 0.1;
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      const scale = hovering.current ? 2.4 : 1;
      if (ring.current) {
        ring.current.style.transform = `translate(${rpos.current.x}px, ${rpos.current.y}px) scale(${scale})`;
        ring.current.style.opacity = hovering.current ? "0.8" : "0.4";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "var(--green-400)",
          pointerEvents: "none",
          zIndex: 9999,
          marginLeft: -2.5,
          marginTop: -2.5,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ring}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid var(--green-400)",
          pointerEvents: "none",
          zIndex: 9998,
          marginLeft: -14,
          marginTop: -14,
          opacity: 0.4,
          transition: "opacity 0.2s, transform 0.05s",
        }}
      />
    </>
  );
}
