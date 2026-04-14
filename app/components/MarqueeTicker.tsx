"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MarqueeTickerProps {
  items: string[];
  speed?: number;
  separator?: string;
  reverse?: boolean;
}

export default function MarqueeTicker({
  items,
  speed = 50,
  separator = "✦",
  reverse = false,
}: MarqueeTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const original = track.children[0] as HTMLElement;
    if (!original) return;

    // Clone until we have enough width to loop seamlessly
    const cloneCount = Math.ceil(window.innerWidth / original.offsetWidth) + 1;
    for (let i = 0; i < cloneCount; i++) {
      track.appendChild(original.cloneNode(true));
    }

    const totalWidth = original.offsetWidth;
    const duration = totalWidth / speed;

    const anim = gsap.fromTo(
      track,
      { x: reverse ? -totalWidth : 0 },
      {
        x: reverse ? 0 : -totalWidth,
        duration,
        ease: "none",
        repeat: -1,
      }
    );

    return () => {
      anim.kill();
    };
  }, [items, speed, reverse, separator]);

  const text = items.join(` ${separator} `) + `  ${separator}  `;

  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        borderTop: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <div ref={trackRef} style={{ display: "flex" }}>
        <div
          style={{
            flexShrink: 0,
            padding: "14px 0",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
