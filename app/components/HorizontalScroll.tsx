"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: React.ReactNode;
  label?: string;
}

export default function HorizontalScroll({ children, label }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Wait a tick for layout to settle
    const raf = requestAnimationFrame(() => {
      const totalScroll = track.scrollWidth - window.innerWidth;
      if (totalScroll <= 0) return;

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }, container);

      (container as HTMLElement & { _gsapCtx?: typeof ctx })._gsapCtx = ctx;
    });

    return () => {
      cancelAnimationFrame(raf);
      const ctx = (container as HTMLElement & { _gsapCtx?: gsap.Context })._gsapCtx;
      ctx?.revert();
    };
  }, [isDesktop]);

  // Mobile: vertical stack
  if (!isDesktop) {
    return (
      <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ overflow: "hidden" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "24px",
          paddingLeft: "48px",
          paddingRight: "48px",
          width: "max-content",
          alignItems: "stretch",
        }}
      >
        {children}
      </div>
    </div>
  );
}
