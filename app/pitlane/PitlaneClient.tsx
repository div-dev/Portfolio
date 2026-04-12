"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import {
  prepareWithSegments,
  layoutNextLine,
  type PreparedTextWithSegments,
  type LayoutCursor,
} from "@chenglou/pretext";

// ─── CONTENT ──────────────────────────────────────────────────────────────────
const SECTORS = [
  {
    id: "sector-1",
    label: "SECTOR 1 — THE GRID",
    title: "Driver Profile",
  },
  {
    id: "sector-2",
    label: "SECTOR 2 — QUALIFYING",
    title: "Early Laps",
  },
  {
    id: "sector-3",
    label: "SECTOR 3 — RACE PACE",
    title: "Full Throttle",
  },
  {
    id: "sector-4",
    label: "SECTOR 4 — PIT STOPS",
    title: "Special Projects",
  },
  {
    id: "sector-5",
    label: "SECTOR 5 — THE PODIUM",
    title: "Setup & Contact",
  },
];

const PROSE =
  `SECTOR 1 — THE GRID\n\n` +
  `Driver: Divyansh Chawla. Team: DesignX. Weapon of choice: Python. ` +
  `Current classification: Senior Python Developer, running hot since November 2025. ` +
  `Fastest lap: 150+ APIs shipped in a single season. Race engineer's note: this driver ` +
  `does not pit unless the strategy demands it. Preferred circuit: distributed systems, ` +
  `high-throughput data pipelines, enterprise backend at scale. ` +
  `Sponsors: Kafka, Airflow, FastAPI, Docker. Home base: Noida, India. ` +
  `Communication channel: divyanshchawla12@gmail.com.\n\n` +

  `SECTOR 2 — QUALIFYING\n\n` +
  `The early laps were spent at Jaypee Institute of Information Technology, Noida, ` +
  `where the foundations were laid — data structures, operating systems, networks, ` +
  `database design. Graduated BTech in 2024 with clean sector times across every module.\n\n` +
  `First stint at DesignX as Python Developer, August 2024 to November 2025. ` +
  `The pace was relentless from lap one: 150+ REST APIs built from scratch, ` +
  `30+ reusable Python modules, 35+ IoT transformation pipelines. ` +
  `Upgraded the legacy PHP chassis to Python — faster, leaner, better on the tyres. ` +
  `Improved lap times through query optimization, indexing, and partitioning. ` +
  `Digitized core manufacturing workflows for Hero MotoCorp. ` +
  `Cut manual reporting overhead by 80% through automated dashboards. ` +
  `The telemetry was clear: this driver had race pace.\n\n` +

  `SECTOR 3 — RACE PACE\n\n` +
  `Promoted to Senior Python Developer at DesignX, November 2025 — still running. ` +
  `The machinery behind enterprise scale, running at full throttle:\n\n` +
  `Kafka Connect pipelines: 400+ enterprise tables synchronized across MySQL and ` +
  `internal systems, Dockerized and production-hardened. Zero data loss at race pace. ` +
  `Airflow: 200+ DAGs owned and operated — ETL orchestration, automated alerting, ` +
  `production scheduling. The pit wall runs on these signals. ` +
  `IoT ingestion: 500+ machine telemetry events per hour, processed in real-time. ` +
  `SAP ECC integration: bidirectional data exchange at enterprise cadence. ` +
  `Clients on the timing screen: Hero MotoCorp, Hindustan Unilever, Mondelez, Dabur. ` +
  `DRS deployed. Top speed sustained.\n\n` +

  `SECTOR 4 — PIT STOPS\n\n` +
  `Four rapid pit stops — projects built at race pace outside the day job:\n\n` +
  `PIT 1: LogIntel. Anomaly detection pit wall. Kafka-fed log ingestion, ` +
  `rule-based flagging, Claude AI summarization with Redis caching. ` +
  `FastAPI query layer. Full stack, zero downtime. Stack: Python, Kafka, FastAPI, ` +
  `PostgreSQL, Redis, Docker, Anthropic API.\n\n` +
  `PIT 2: Formbricks. Full environment tear-up-and-teardown at race pace. ` +
  `Single-command Docker Compose orchestration. Synthetic surveys and users ` +
  `seeded via OpenAI, Claude, and Ollama through REST APIs — no direct DB writes. ` +
  `Stack: Python, Docker, OpenAI, Anthropic, Ollama, PostgreSQL, Redis.\n\n` +
  `PIT 3: LogStream. C++ NVM logging — 45% latency cut, MESI cache-coherency ` +
  `protocol tuned for zero wasted writes. Lock-free queues with std::atomic, ` +
  `50% write count reduction. The fastest stop in the garage. ` +
  `Stack: C++, Multithreading, MESI Protocol, std::atomic.\n\n` +
  `PIT 4: HealthBot. TensorFlow intent classification — the AI that reads the signals. ` +
  `Neural network trained on custom intent datasets with NLP preprocessing: ` +
  `tokenization, lemmatization, bag-of-words encoding. ` +
  `Stack: Python, TensorFlow, Keras, NLP, scikit-learn.\n\n` +

  `SECTOR 5 — THE PODIUM\n\n` +
  `Car setup parameters — full aero configuration:\n\n` +
  `ENGINE: Python, SQL, C++, JavaScript, Bash. ` +
  `CHASSIS: FastAPI, Django, Django REST Framework, Apache Airflow. ` +
  `AERO: Apache Kafka, Docker, Redis, REST APIs, ETL Pipelines. ` +
  `TELEMETRY: PostgreSQL, MySQL, MongoDB, SQLite. ` +
  `TOOLS: Git, Linux, Docker Compose, Jenkins, GCP, Postman.\n\n` +
  `Race radio open. Transmit to: divyanshchawla12@gmail.com. ` +
  `Onboard data at: github.com/div-dev. ` +
  `Season standings at: linkedin.com/in/divyansh-chawla-751b1a230. ` +
  `Team briefing available — resume on request. ` +
  `The chequered flag is in sight. Let's build something fast.`;

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CAR_SEGS = 15;
const CAR_SEG_SPACING = 8;
const CAR_EASING = 0.1;
const FONT_STR = '16px "Geist Sans", system-ui, sans-serif';
const LINE_HEIGHT = 26;
const MARGIN_H = 80;
const MARGIN_TOP = 80;
const CAR_W = 32;
const CAR_H = 64;
const SPAN_POOL_SIZE = 600;

// ─── COLORS ───────────────────────────────────────────────────────────────────
const F1_RED = "#FF1801";
const F1_TEAL = "#00D2BE";
const F1_GOLD = "#FFD700";
const F1_GREEN = "#00FF41";
const F1_BG = "#0A0A0A";
const F1_TEXT = "#E0E0E0";
const F1_MUTED = "#888888";

// ─── STAT COUNTER HOOK ────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1500, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const steps = 50;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setValue(Math.round((target * step) / steps));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [target, duration, start]);
  return value;
}

// ─── GEOMETRY ─────────────────────────────────────────────────────────────────
function rectLineInterval(
  rx: number, ry: number, rw: number, rh: number,
  bandTop: number, bandBot: number
): { left: number; right: number } | null {
  const top = ry - rh / 2 - 20;
  const bot = ry + rh / 2 + 20;
  if (bandBot < top || bandTop > bot) return null;
  return { left: rx - rw / 2 - 20, right: rx + rw / 2 + 20 };
}

function carveSlots(
  pageLeft: number, pageRight: number,
  exclusions: { left: number; right: number }[]
): { left: number; right: number }[] {
  if (!exclusions.length) return [{ left: pageLeft, right: pageRight }];
  const sorted = [...exclusions].sort((a, b) => a.left - b.left);
  const merged = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    if (sorted[i].left <= last.right) last.right = Math.max(last.right, sorted[i].right);
    else merged.push({ ...sorted[i] });
  }
  const slots: { left: number; right: number }[] = [];
  let cursor = pageLeft;
  for (const ex of merged) {
    const l = Math.max(pageLeft, ex.left);
    const r = Math.min(pageRight, ex.right);
    if (l > cursor) slots.push({ left: cursor, right: l });
    cursor = Math.max(cursor, r);
  }
  if (cursor < pageRight) slots.push({ left: cursor, right: pageRight });
  return slots;
}

// ─── F1 CAR (proper top-down anatomy) ─────────────────────────────────────────
function drawCar(
  ctx: CanvasRenderingContext2D,
  xs: Float32Array, ys: Float32Array,
  _time: number
) {
  const hx = xs[0], hy = ys[0];
  const hdx = xs[0] - xs[1];
  const hdy = ys[0] - ys[1];
  const angle = Math.atan2(hdy, hdx) + Math.PI / 2;

  // Exhaust trail first (behind car)
  for (let i = CAR_SEGS - 1; i >= 1; i--) {
    const alpha = (1 - i / CAR_SEGS) * 0.4;
    const r = 5 * (1 - i / CAR_SEGS) + 1;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = F1_RED;
    ctx.beginPath();
    ctx.arc(xs[i], ys[i], r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.save();
  ctx.translate(hx, hy);
  ctx.rotate(angle);

  // ── Shadow ──
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 3;

  // ── Rear wing (widest part, drawn first / at bottom) ──
  // Main wing span
  ctx.fillStyle = "#BB1000";
  ctx.beginPath();
  ctx.moveTo(-28, 30);
  ctx.lineTo(28, 30);
  ctx.lineTo(26, 36);
  ctx.lineTo(-26, 36);
  ctx.closePath();
  ctx.fill();
  // Wing endplates (vertical fins at sides)
  ctx.fillStyle = "#991000";
  ctx.fillRect(-29, 28, 4, 10);
  ctx.fillRect(25, 28, 4, 10);
  // DRS element (lighter stripe)
  ctx.fillStyle = "#DD2010";
  ctx.fillRect(-24, 31, 48, 2.5);

  // ── Diffuser area ──
  ctx.fillStyle = "#1A0A00";
  ctx.beginPath();
  ctx.moveTo(-14, 26);
  ctx.lineTo(14, 26);
  ctx.lineTo(16, 33);
  ctx.lineTo(-16, 33);
  ctx.closePath();
  ctx.fill();

  // ── Main body — coke-bottle silhouette ──
  // The key shape: wider at sidepods (mid), narrows front & rear
  ctx.fillStyle = F1_RED;
  ctx.beginPath();
  // Left side (top = front)
  ctx.moveTo(-5, -34);   // nose attachment
  ctx.lineTo(-8, -20);   // widen into sidepod
  ctx.lineTo(-16, -5);   // sidepod peak
  ctx.lineTo(-14, 8);    // coke-bottle taper
  ctx.lineTo(-10, 18);   // narrowing to rear
  ctx.lineTo(-8, 28);    // rear
  // Right side (mirror)
  ctx.lineTo(8, 28);
  ctx.lineTo(10, 18);
  ctx.lineTo(14, 8);
  ctx.lineTo(16, -5);    // sidepod peak
  ctx.lineTo(8, -20);
  ctx.lineTo(5, -34);
  ctx.closePath();
  ctx.fill();

  // ── Sidepod surface detail (inlet) ──
  ctx.fillStyle = "#CC1000";
  // Left sidepod inlet
  ctx.beginPath();
  ctx.moveTo(-14, -8);
  ctx.lineTo(-16, 0);
  ctx.lineTo(-13, 4);
  ctx.lineTo(-11, -4);
  ctx.closePath();
  ctx.fill();
  // Right sidepod inlet
  ctx.beginPath();
  ctx.moveTo(14, -8);
  ctx.lineTo(16, 0);
  ctx.lineTo(13, 4);
  ctx.lineTo(11, -4);
  ctx.closePath();
  ctx.fill();

  // ── Engine cover highlight ──
  ctx.fillStyle = "#FF2010";
  ctx.beginPath();
  ctx.moveTo(-4, 10);
  ctx.lineTo(4, 10);
  ctx.lineTo(5, 22);
  ctx.lineTo(-5, 22);
  ctx.closePath();
  ctx.fill();

  // ── Nose box — tapers from body to needle ──
  ctx.fillStyle = "#EE1800";
  ctx.beginPath();
  ctx.moveTo(-5, -34);
  ctx.lineTo(5, -34);
  ctx.lineTo(2.5, -52);
  ctx.lineTo(-2.5, -52);
  ctx.closePath();
  ctx.fill();

  ctx.restore(); // pop shadow

  // ── Front wing — spans much wider than body ──
  // Main plane
  ctx.fillStyle = "#CC1200";
  ctx.beginPath();
  ctx.moveTo(-26, -38);
  ctx.lineTo(26, -38);
  ctx.lineTo(24, -34);
  ctx.lineTo(-24, -34);
  ctx.closePath();
  ctx.fill();
  // Second flap element
  ctx.fillStyle = "#BB1000";
  ctx.beginPath();
  ctx.moveTo(-28, -42);
  ctx.lineTo(28, -42);
  ctx.lineTo(26, -39);
  ctx.lineTo(-26, -39);
  ctx.closePath();
  ctx.fill();
  // Endplates
  ctx.fillStyle = "#991000";
  ctx.fillRect(-30, -44, 4, 12);
  ctx.fillRect(26, -44, 4, 12);
  // Cascade winglets (small fins on outer wing)
  ctx.fillStyle = "#AA1000";
  ctx.fillRect(-22, -44, 3, 4);
  ctx.fillRect(19, -44, 3, 4);

  // ── Front tires ──
  ctx.fillStyle = "#1A1A1A";
  // Left front
  ctx.beginPath();
  ctx.ellipse(-18, -24, 7, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  // Right front
  ctx.beginPath();
  ctx.ellipse(18, -24, 7, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  // Tire shine
  ctx.fillStyle = "#2A2A2A";
  ctx.beginPath();
  ctx.ellipse(-17, -25, 4, 6, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(17, -25, 4, 6, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // ── Rear tires (wider than front) ──
  ctx.fillStyle = "#1A1A1A";
  // Left rear
  ctx.beginPath();
  ctx.ellipse(-16, 20, 8, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  // Right rear
  ctx.beginPath();
  ctx.ellipse(16, 20, 8, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2A2A2A";
  ctx.beginPath();
  ctx.ellipse(-15, 19, 5, 8, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(15, 19, 5, 8, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // ── Cockpit opening ──
  ctx.fillStyle = "#080808";
  ctx.beginPath();
  ctx.ellipse(0, -14, 5.5, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  // ── Halo safety structure ──
  ctx.strokeStyle = "#444444";
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-6, -10);
  ctx.quadraticCurveTo(0, -28, 6, -10);
  ctx.stroke();
  // Halo center pillar
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.lineTo(0, -12);
  ctx.stroke();

  // ── Driver helmet visible in cockpit ──
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.ellipse(0, -14, 3.5, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = F1_RED;
  ctx.beginPath();
  ctx.ellipse(0, -15, 2, 1.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // ── Racing number "12" on engine cover ──
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 9px 'Space Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("12", 0, 15);

  // ── Front wing number ──
  ctx.font = "bold 7px 'Space Mono', monospace";
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillText("12", 0, -40);

  ctx.restore();
}

// ─── STAT BOX ─────────────────────────────────────────────────────────────────
function StatBox({ label, value, started }: { label: string; value: number; suffix: string; started: boolean }) {
  const displayed = useCountUp(value, 1500, started);
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10, letterSpacing: "0.15em", color: F1_MUTED, textTransform: "uppercase", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontFamily: "var(--font-space-mono), monospace", color: F1_GREEN, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
        {displayed}+
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function PitlaneClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);

  const segsX = useRef<Float32Array>(new Float32Array(CAR_SEGS).fill(400));
  const segsY = useRef<Float32Array>(new Float32Array(CAR_SEGS).fill(300));
  const mouseX = useRef(400);
  const mouseY = useRef(300);
  const prevX = useRef(400);
  const prevY = useRef(300);

  const preparedRef = useRef<PreparedTextWithSegments | null>(null);
  const spanPool = useRef<HTMLSpanElement[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const fontsReadyRef = useRef(false);

  const [currentSector, setCurrentSector] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);

  // ── Span pool ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const layer = textLayerRef.current;
    if (!layer) return;
    for (let i = 0; i < SPAN_POOL_SIZE; i++) {
      const s = document.createElement("span");
      s.style.cssText = `position:absolute;white-space:pre;visibility:hidden;font-family:var(--font-geist-sans),system-ui,sans-serif;font-size:16px;color:${F1_TEXT};line-height:1px;`;
      layer.appendChild(s);
      spanPool.current.push(s);
    }
  }, []);

  // ── Font load + prepare ───────────────────────────────────────────────────
  useEffect(() => {
    document.fonts.ready.then(() => {
      preparedRef.current = prepareWithSegments(PROSE, FONT_STR);
      fontsReadyRef.current = true;
    });
  }, []);

  // ── Mouse/touch tracking ──────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseX.current = e.clientX - rect.left;
      mouseY.current = e.clientY - rect.top + container.scrollTop;
    };
    const onTouch = (e: TouchEvent) => {
      const container = containerRef.current;
      if (!container || !e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      mouseX.current = e.touches[0].clientX - rect.left;
      mouseY.current = e.touches[0].clientY - rect.top + container.scrollTop;
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", onMove);
    el?.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      el?.removeEventListener("mousemove", onMove);
      el?.removeEventListener("touchmove", onTouch);
    };
  }, []);

  // ── Canvas resize ─────────────────────────────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const w = container.scrollWidth;
    const h = container.scrollHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
  }, []);

  // ── Layout text ───────────────────────────────────────────────────────────
  const layoutText = useCallback(() => {
    if (!fontsReadyRef.current || !preparedRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    const pageW = container.clientWidth;
    const contentW = pageW - MARGIN_H * 2;

    const carX = segsX.current[0] - MARGIN_H;
    const carY = segsY.current[0] - MARGIN_TOP;

    let spanIdx = 0;
    const pool = spanPool.current;
    const assign = (text: string, x: number, y: number, color?: string) => {
      if (spanIdx >= pool.length) return;
      const s = pool[spanIdx++];
      s.textContent = text;
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.color = color || F1_TEXT;
      s.style.visibility = "visible";
    };

    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let lineIdx = 0;
    const maxLines = 800;

    while (lineIdx < maxLines) {
      const bandTop = lineIdx * LINE_HEIGHT;
      const bandBot = bandTop + LINE_HEIGHT;
      const absTop = bandTop + MARGIN_TOP;

      const exclusions: { left: number; right: number }[] = [];
      const iv = rectLineInterval(carX, carY, CAR_W + 20, CAR_H + 20, bandTop, bandBot);
      if (iv) exclusions.push(iv);

      const slots = carveSlots(0, contentW, exclusions);
      if (!slots.length) { lineIdx++; continue; }

      let best = slots[0];
      for (const s of slots) {
        if (s.right - s.left > best.right - best.left) best = s;
      }

      const slotW = best.right - best.left;
      if (slotW < 40) { lineIdx++; continue; }

      const line = layoutNextLine(preparedRef.current, cursor, slotW);
      if (!line) break;

      // Color sector headings differently
      const isSectorHeading = line.text.startsWith("SECTOR");
      assign(line.text, MARGIN_H + best.left, absTop, isSectorHeading ? F1_RED : F1_TEXT);
      cursor = line.end;
      lineIdx++;
    }

    for (let i = spanIdx; i < pool.length; i++) {
      pool[i].style.visibility = "hidden";
    }
  }, []);

  // ── RAF loop ──────────────────────────────────────────────────────────────
  const tick = useCallback(() => {
    timeRef.current += 0.016;
    const t = timeRef.current;
    const xs = segsX.current;
    const ys = segsY.current;

    xs[0] += (mouseX.current - xs[0]) * CAR_EASING;
    ys[0] += (mouseY.current - ys[0]) * CAR_EASING;

    for (let i = 1; i < CAR_SEGS; i++) {
      const dx = xs[i] - xs[i - 1];
      const dy = ys[i] - ys[i - 1];
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      if (dist > CAR_SEG_SPACING) {
        const scale = CAR_SEG_SPACING / dist;
        xs[i] = xs[i - 1] + dx * scale;
        ys[i] = ys[i - 1] + dy * scale;
      }
    }

    // Compute speed
    const vx = xs[0] - prevX.current;
    const vy = ys[0] - prevY.current;
    const pixelSpeed = Math.sqrt(vx * vx + vy * vy);
    const kmh = Math.round(Math.min(pixelSpeed * 40, 350));
    setSpeed(kmh);
    prevX.current = xs[0];
    prevY.current = ys[0];

    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = window.devicePixelRatio || 1;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(dpr, dpr);
        drawCar(ctx, xs, ys, t);
        ctx.restore();
      }
    }

    layoutText();
    rafRef.current = requestAnimationFrame(tick);
  }, [layoutText]);

  // ── Start loop ────────────────────────────────────────────────────────────
  useEffect(() => {
    resizeCanvas();
    rafRef.current = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resizeCanvas);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [tick, resizeCanvas]);

  // ── Sector tracking via IntersectionObserver ──────────────────────────────
  useEffect(() => {
    const spans = Array.from(textLayerRef.current?.querySelectorAll("[data-sector]") ?? []);
    if (!spans.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = parseInt((e.target as HTMLElement).dataset.sector ?? "0");
            setCurrentSector(idx);
            if (idx >= 4) setStatsStarted(true);
          }
        }
      },
      { threshold: 0.5 }
    );
    spans.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Trigger stats on page load after short delay
  useEffect(() => {
    const timer = setTimeout(() => setStatsStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: F1_BG,
        color: F1_TEXT,
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* ── Fixed top timing bar ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 44,
          backgroundColor: "#050505",
          borderBottom: `1px solid #1A1A1A`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: 12,
          letterSpacing: "0.08em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: F1_RED, fontWeight: 700 }}>DIV</span>
          <span style={{ color: "#333" }}>|</span>
          <span style={{ color: F1_TEXT }}>CHAWLA</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: F1_MUTED }}>
            <span style={{ color: F1_RED }}>{SECTORS[currentSector]?.label.split("—")[0].trim()}</span>
            {" / " + (currentSector + 1) + " of " + SECTORS.length}
          </span>
          <span style={{ color: F1_GOLD, fontVariantNumeric: "tabular-nums" }}>
            LAP 2 OF 2 YRS
          </span>
          <span style={{ color: F1_GREEN, fontVariantNumeric: "tabular-nums" }}>
            {String(speed).padStart(3, "0")} km/h
          </span>
        </div>
        <Link
          href="/"
          style={{
            color: F1_MUTED,
            textDecoration: "none",
            fontSize: 11,
            letterSpacing: "0.06em",
            borderBottom: `1px solid #333`,
          }}
        >
          ← PORTFOLIO
        </Link>
      </div>

      {/* ── Right sidebar stats ── */}
      <div
        className="hidden lg:flex"
        style={{
          position: "fixed",
          top: 44,
          right: 0,
          width: 180,
          height: "calc(100vh - 44px)",
          backgroundColor: "#050505",
          borderLeft: "1px solid #1A1A1A",
          padding: "32px 20px",
          flexDirection: "column",
          justifyContent: "flex-start",
          zIndex: 90,
        }}
      >
        <div style={{ fontSize: 9, letterSpacing: "0.2em", color: F1_RED, textTransform: "uppercase", marginBottom: 24, fontFamily: "var(--font-space-mono), monospace" }}>
          TELEMETRY
        </div>
        <StatBox label="APIs Built" value={150} suffix="+" started={statsStarted} />
        <StatBox label="DAGs Owned" value={200} suffix="+" started={statsStarted} />
        <StatBox label="Clients" value={7} suffix="+" started={statsStarted} />
        <StatBox label="Experience (Yrs)" value={2} suffix="+" started={statsStarted} />
        <div style={{ marginTop: "auto", borderTop: "1px solid #1A1A1A", paddingTop: 16 }}>
          <div style={{ fontSize: 9, letterSpacing: "0.15em", color: F1_MUTED, marginBottom: 8 }}>SPEED</div>
          <div style={{ fontSize: 22, fontFamily: "var(--font-space-mono), monospace", color: F1_GREEN, fontVariantNumeric: "tabular-nums" }}>
            {String(speed).padStart(3, "0")}
          </div>
          <div style={{ fontSize: 9, color: F1_MUTED, marginTop: 2 }}>km/h</div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          maxWidth: 800,
          margin: "0 auto",
          paddingTop: MARGIN_TOP + 44,
          paddingBottom: 120,
          paddingLeft: MARGIN_H,
          paddingRight: MARGIN_H,
          minHeight: "200vh",
          cursor: "none",
          overflow: "hidden",
        }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        {/* Text layer */}
        <div
          ref={textLayerRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 5,
            userSelect: "text",
          }}
        />

        {/* Grid lines for F1 feel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            backgroundImage: `
              linear-gradient(to right, #1A1A1A 1px, transparent 1px),
              linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            opacity: 0.4,
          }}
        />

        {/* Chronicle link at bottom */}
        <div
          style={{
            position: "relative",
            zIndex: 20,
            textAlign: "center",
            marginTop: 2800,
            paddingBottom: 40,
          }}
        >
          <Link
            href="/manuscript"
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: 12,
              color: F1_MUTED,
              textDecoration: "none",
              letterSpacing: "0.08em",
              borderBottom: `1px solid #333`,
              paddingBottom: 2,
            }}
          >
            ← BACK TO THE CHRONICLE
          </Link>
        </div>

        {/* Accessible text */}
        <article
          aria-label="Pitlane race career text"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
          }}
        >
          {PROSE}
        </article>
      </div>

      {/* ── Teal accent line at bottom of timing bar ── */}
      <div
        style={{
          position: "fixed",
          top: 44,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(to right, ${F1_RED} 0%, ${F1_TEAL} 50%, ${F1_GOLD} 100%)`,
          zIndex: 101,
        }}
      />
    </div>
  );
}
