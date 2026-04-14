"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  style?: React.CSSProperties;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 1.8,
  style,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration,
          ease: "power2.out",
          onUpdate: () => setCount(Math.round(obj.val)),
        });
      },
    });

    return () => st.kill();
  }, [target, duration]);

  return (
    <span ref={ref} style={style}>
      {count}
      {suffix}
    </span>
  );
}
