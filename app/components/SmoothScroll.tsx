"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    // Expose for nav smooth-scroll-to
    window.__lenis = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker (single RAF loop)
    const gsapTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(gsapTick);
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
