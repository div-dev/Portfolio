"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  text: string;
  style?: React.CSSProperties;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p";
}

export default function ScrollRevealText({
  text,
  style,
  className = "",
  tag = "h2",
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const words = container.querySelectorAll<HTMLElement>(".srv-word");
      if (!words.length) return;

      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            end: "top 25%",
            scrub: 1.2,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [text]);

  const Tag = tag;
  const words = text.split(" ");

  return (
    <div ref={containerRef}>
      <Tag className={className} style={style}>
        {words.map((word, i) => (
          <span
            key={i}
            className="srv-word"
            style={{ display: "inline-block", marginRight: "0.28em", willChange: "opacity" }}
          >
            {word}
          </span>
        ))}
      </Tag>
    </div>
  );
}
