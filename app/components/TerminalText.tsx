"use client";
import { useEffect, useState } from "react";

interface TerminalTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
  showCursor?: boolean;
}

export default function TerminalText({
  text,
  speed = 50,
  onComplete,
  className = "",
  style,
  showCursor = true,
}: TerminalTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <span className={className} style={style}>
      {displayed}
      {showCursor && (
        <span
          style={{
            display: "inline-block",
            width: "0.6em",
            height: "1em",
            backgroundColor: "var(--green-400)",
            marginLeft: "2px",
            verticalAlign: "text-bottom",
            animation: done ? "blink 1s step-end infinite" : "none",
            opacity: done ? 1 : 1,
          }}
        />
      )}
    </span>
  );
}
