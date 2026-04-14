"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Standalone CRT monitor zoom transition — placed between About and Skills.
// Frame zooms from small to full screen while terminal content reveals
// line-by-line scrubbed to scroll position.

const LINES = [
  { label: "> divyansh@portfolio:~$", value: "sys-info --verbose", dimLabel: true, highlight: false, spacer: false },
  { label: "", value: "", dimLabel: false, highlight: false, spacer: true },
  { label: "  OPERATOR", value: "Divyansh Chawla", dimLabel: true, highlight: false, spacer: false },
  { label: "  ROLE", value: "Senior Python Developer", dimLabel: true, highlight: false, spacer: false },
  { label: "  COMPANY", value: "DesignX", dimLabel: true, highlight: false, spacer: false },
  { label: "  STATUS", value: "● ACTIVE", dimLabel: true, highlight: true, spacer: false },
  { label: "", value: "", dimLabel: false, highlight: false, spacer: true },
  { label: "  APIS BUILT", value: "150+", dimLabel: true, highlight: false, spacer: false },
  { label: "  AIRFLOW DAGS", value: "200+", dimLabel: true, highlight: false, spacer: false },
  { label: "  UPTIME", value: "2+ years", dimLabel: true, highlight: false, spacer: false },
  { label: "  CLIENTS", value: "7+", dimLabel: true, highlight: false, spacer: false },
  { label: "", value: "", dimLabel: false, highlight: false, spacer: true },
  { label: "  STACK", value: "Python · FastAPI · Kafka · Airflow · Docker", dimLabel: true, highlight: false, spacer: false },
  { label: "", value: "", dimLabel: false, highlight: false, spacer: true },
  { label: "> LOADING SKILLS MODULE", value: "... OK", dimLabel: false, highlight: true, spacer: false },
];

export default function ZoomTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const ctx = gsap.context(() => {
      const nonSpacerLines = lineRefs.current.filter(
        (el, i) => el && !LINES[i]?.spacer
      ) as HTMLElement[];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // More scroll space = more time to read each line
          end: "+=200%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 1. Frame zooms in from a small centered box
      tl.fromTo(
        frame,
        { scale: 0.15, borderRadius: "14px", opacity: 0.2 },
        { scale: 1, borderRadius: "0px", opacity: 1, duration: 0.5, ease: "power2.inOut" }
      );

      // 2. Lines reveal one by one, staggered across the remaining timeline
      nonSpacerLines.forEach((line, i) => {
        tl.fromTo(
          line,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.18, ease: "power1.out" },
          // Spread evenly from 0.5 onwards
          0.5 + i * (0.45 / Math.max(nonSpacerLines.length - 1, 1))
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "var(--bg-primary)",
        overflow: "hidden",
      }}
    >
      <div
        ref={frameRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "var(--bg-primary)",
          border: "1.5px solid rgba(51,255,51,0.5)",
          boxShadow:
            "0 0 40px rgba(51,255,51,0.1), inset 0 0 80px rgba(51,255,51,0.025)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Scanlines */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Corner brackets */}
        {[
          { top: 14, left: 14, borderTop: "1.5px solid var(--green-400)", borderLeft: "1.5px solid var(--green-400)" },
          { top: 14, right: 14, borderTop: "1.5px solid var(--green-400)", borderRight: "1.5px solid var(--green-400)" },
          { bottom: 14, left: 14, borderBottom: "1.5px solid var(--green-400)", borderLeft: "1.5px solid var(--green-400)" },
          { bottom: 14, right: 14, borderBottom: "1.5px solid var(--green-400)", borderRight: "1.5px solid var(--green-400)" },
        ].map((s, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{ position: "absolute", width: "22px", height: "22px", ...s, zIndex: 3 }}
          />
        ))}

        {/* Terminal content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "560px",
            padding: "0 32px",
          }}
        >
          {LINES.map((line, i) => (
            <div
              key={i}
              ref={(el) => { lineRefs.current[i] = el; }}
              style={{
                opacity: 0,
                fontFamily: "var(--font-code)",
                fontSize: "clamp(11px, 1.6vw, 14px)",
                lineHeight: line.spacer ? "0.6" : "2",
                display: "flex",
                gap: "12px",
                ...(line.spacer ? { height: "10px" } : {}),
              }}
            >
              {!line.spacer && (
                <>
                  <span
                    style={{
                      color: line.dimLabel ? "var(--text-tertiary)" : "var(--green-400)",
                      minWidth: "160px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {line.label}
                  </span>
                  <span
                    style={{
                      color: line.highlight ? "var(--green-400)" : "var(--text-primary)",
                      textShadow: line.highlight
                        ? "0 0 8px rgba(51,255,51,0.5)"
                        : "none",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {line.value}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
