"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import {
  prepareWithSegments,
  layoutNextLine,
  type LayoutCursor,
  type PreparedTextWithSegments,
} from "@chenglou/pretext";
import { useFunMode } from "./FunModeProvider";

const TEXT = "Divyansh Chawla";
const FONT_FAMILY = "UnifrakturMaguntia";

function getFontSize(): number {
  if (typeof window === "undefined") return 64;
  return window.innerWidth < 640 ? 44 : window.innerWidth < 1024 ? 56 : 68;
}

export default function PretextName() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const preparedRef = useRef<PreparedTextWithSegments | null>(null);
  const fontStringRef = useRef<string>("");
  const [fontsReady, setFontsReady] = useState(false);
  const { dragonPos } = useFunMode();
  const dragonPosRef = useRef(dragonPos);
  dragonPosRef.current = dragonPos;

  const buildFontString = useCallback((): string => {
    return `400 ${getFontSize()}px ${FONT_FAMILY}`;
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !preparedRef.current || !fontsReady) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const containerWidth = container.clientWidth || 600;
    const fontSize = getFontSize();
    const lineHeight = Math.round(fontSize * 1.25);

    // Dragon position relative to canvas
    const canvasRect = canvas.getBoundingClientRect();
    const dragon = dragonPosRef.current;
    const dRelX = dragon.x - canvasRect.left;
    const dRelY = dragon.y - canvasRect.top;
    const dW = dragon.width;
    const dH = dragon.height;

    const getLineParams = (lineIdx: number): { maxW: number; xOff: number } => {
      const lineTop = lineIdx * lineHeight;
      const lineBot = lineTop + lineHeight;
      const overlapsV = lineBot > dRelY && lineTop < dRelY + dH;
      if (!overlapsV) return { maxW: containerWidth, xOff: 0 };
      if (dRelX < containerWidth / 2) {
        // Dragon on left — text flows to the right
        const xOff = Math.max(dRelX + dW + 8, 0);
        return { maxW: Math.max(containerWidth - xOff, 60), xOff };
      } else {
        // Dragon on right — text stops before dragon
        return { maxW: Math.max(dRelX - 8, 60), xOff: 0 };
      }
    };

    // Pass 1: count lines
    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let lineCount = 0;
    while (true) {
      const { maxW } = getLineParams(lineCount);
      const line = layoutNextLine(preparedRef.current, cursor, maxW);
      if (!line) break;
      cursor = line.end;
      lineCount++;
    }

    const totalH = Math.max(lineCount * lineHeight + Math.round(fontSize * 0.25), lineHeight + 10);

    // Size canvas
    canvas.width = containerWidth * dpr;
    canvas.height = totalH * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${totalH}px`;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, containerWidth, totalH);

    // Pass 2: render
    const fontString = fontStringRef.current;
    ctx.font = fontString;
    const textColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--text")
      .trim() || "#2C1810";
    ctx.fillStyle = textColor;
    ctx.textBaseline = "alphabetic";

    cursor = { segmentIndex: 0, graphemeIndex: 0 };
    let lineIdx = 0;
    while (true) {
      const { maxW, xOff } = getLineParams(lineIdx);
      const line = layoutNextLine(preparedRef.current, cursor, maxW);
      if (!line) break;
      ctx.fillText(line.text, xOff, lineIdx * lineHeight + fontSize);
      cursor = line.end;
      lineIdx++;
    }
  }, [fontsReady]);

  // Load fonts, then prepare (expensive — runs once per font string)
  useEffect(() => {
    const fontString = buildFontString();
    document.fonts.load(fontString).then(() => {
      fontStringRef.current = fontString;
      preparedRef.current = prepareWithSegments(TEXT, fontString);
      setFontsReady(true);
    });
  }, [buildFontString]);

  // Render when fonts ready or dragon moves
  useEffect(() => {
    if (fontsReady) render();
  }, [fontsReady, dragonPos, render]);

  // Resize: re-prepare only if font size key changes (breakpoint cross)
  useEffect(() => {
    let lastFontSize = getFontSize();
    const observer = new ResizeObserver(() => {
      const newSize = getFontSize();
      if (newSize !== lastFontSize) {
        lastFontSize = newSize;
        const fontString = buildFontString();
        fontStringRef.current = fontString;
        preparedRef.current = prepareWithSegments(TEXT, fontString);
      }
      render();
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [buildFontString, render]);

  return (
    <div ref={containerRef} className="w-full relative" style={{ minHeight: 80 }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
