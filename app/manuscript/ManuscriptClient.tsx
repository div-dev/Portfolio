"use client";
import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  prepareWithSegments,
  layoutNextLine,
  type PreparedTextWithSegments,
  type LayoutCursor,
} from "@chenglou/pretext";

// ─── PROSE (CORRECTED) ─────────────────────────────────────────────────────
const DROP_CAP_LETTER = "H";
const PROSE_AFTER_DROP =
  `ere begins the Chronicle of Divyansh Chawla, artificer of systems and ` +
  `architect of invisible engines, set down for the edification of all who ` +
  `would seek his counsel.\n\n` +
  `Born of the northern provinces, Divyansh was reared on algorithms and the ` +
  `ancient art of logical reasoning. In the fullness of time he came to wield ` +
  `the Python tongue with rare fluency — summoning pipelines from void, ` +
  `coaxing intelligence from raw data, and binding distributed services into ` +
  `obedient confederacies.\n\n` +
  `§ Of His Apprenticeship\n\n` +
  `His schooling was conducted at Jaypee Institute of Information Technology, ` +
  `in the learned city of Noida, where he earned the degree of Bachelor of ` +
  `Technology, completing his studies in the year of our Lord two thousand and ` +
  `twenty-four. There he mastered the foundational disciplines: data structures, ` +
  `operating systems, networks, and the subtle craft of database design.\n\n` +
  `§ Of His Service at DesignX — The Senior Post\n\n` +
  `In his second appointment at the digital atelier of DesignX, he was raised ` +
  `to the rank of Senior Python Developer, a station he holds to this day. ` +
  `There he led backend engineering for enterprise automation platforms — ` +
  `Python microservices and REST APIs deployed in production at Hero MotoCorp. ` +
  `He architected Dockerized Kafka Connect pipelines synchronizing four hundred ` +
  `enterprise tables across MySQL and internal systems, and claimed ownership ` +
  `of two hundred Apache Airflow DAGs powering ETL and workflow orchestration. ` +
  `He built IoT data pipelines processing five hundred machine telemetry events ` +
  `each hour and integrated SAP ECC for real-time bidirectional data exchange.\n\n` +
  `§ Of His Service at DesignX — The First Post\n\n` +
  `His first appointment was likewise at DesignX, where he served as Python ` +
  `Developer from the month of August in the year twenty-four until November ` +
  `of that same year. There he developed one hundred and fifty REST APIs, ` +
  `thirty reusable Python modules, and thirty-five IoT transformation pipelines. ` +
  `He modernized legacy PHP backends to Python, improving performance through ` +
  `query optimization, indexing, and partitioning. He digitized core manufacturing ` +
  `workflows for Hero MotoCorp and reduced manual reporting effort by eighty ` +
  `parts in a hundred through automated dashboards and rule-based validation.\n\n` +
  `§ Of His Great Works\n\n` +
  `LogIntel — a great engine for the ingestion and illumination of logs. ` +
  `Driven by Kafka's tireless messengers, it detects anomalies by rule and ` +
  `submits them to the Claude oracle for summarisation. Redis guards the ` +
  `treasury of past analyses; FastAPI opens the gates to queriers.\n\n` +
  `LogStream — a C++ chronicle of persistent memory, implementing the MESI ` +
  `cache-coherency protocol with std::atomic lock-free queues. It reduced ` +
  `latency by forty-five parts in a hundred and write counts by half.\n\n` +
  `HealthBot — a learned automaton trained on custom intent scrolls. ` +
  `Its neural engine, forged in TensorFlow and Keras, classifies the ailments ` +
  `of those who seek its counsel and replies with remedies drawn from its ` +
  `accumulated wisdom.\n\n` +
  `Formbricks Automation — a CLI warden that raises and strikes down a full ` +
  `Formbricks fortress with a single incantation, seeding it with synthetic ` +
  `surveys and responses conjured by OpenAI, Claude, and the local Ollama spirits.\n\n` +
  `§ Of His Weapons and Arts\n\n` +
  `He is versed in Python, C++, and JavaScript; in FastAPI, Django, and ` +
  `Apache Airflow; in PostgreSQL, Redis, and MongoDB; in Docker, Kafka, and ` +
  `the CI arts of GitHub and GitLab. He has parleyed with Prometheus and ` +
  `Grafana for observation, and consulted the Anthropic and OpenAI oracles ` +
  `for intelligence.\n\n` +
  `§ Colophon\n\n` +
  `Should you wish to parley with this artificer, dispatch a raven to ` +
  `divyanshchawla12@gmail.com, or seek his repositories at github.com/div-dev. ` +
  `His LinkedIn scroll may be found among the professional guilds. ` +
  `May your builds pass and your pipelines run green.`;

const FULL_TEXT = DROP_CAP_LETTER + PROSE_AFTER_DROP;

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const NUM_SEGS = 80;
const SEG_SPACING = 6;
const HEAD_RADIUS = 18;
const TAIL_RADIUS = 3;
const FONT_STR = '18px "EB Garamond", serif';
const LINE_HEIGHT = 28;
const MARGIN_H = 72;
const MARGIN_TOP = 160; // Increased to give room for title
const DROP_CAP_SIZE = 96;
const DROP_CAP_LINES = Math.ceil(DROP_CAP_SIZE / LINE_HEIGHT) + 1;
const DROP_CAP_W = 62;
const SPAN_POOL_SIZE = 400;
const EASING = 0.12;

// ─── GEOMETRY HELPERS ────────────────────────────────────────────────────────
function circleLineInterval(
  cx: number, cy: number, r: number,
  bandTop: number, bandBot: number
): { left: number; right: number } | null {
  const lineY = (bandTop + bandBot) / 2;
  const dy = lineY - cy;
  if (Math.abs(dy) >= r) return null;
  const dx = Math.sqrt(r * r - dy * dy);
  return { left: cx - dx, right: cx + dx };
}

function mergeIntervals(ivs: { left: number; right: number }[]): { left: number; right: number }[] {
  if (!ivs.length) return [];
  const sorted = [...ivs].sort((a, b) => a.left - b.left);
  const merged = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    if (sorted[i].left <= last.right) {
      last.right = Math.max(last.right, sorted[i].right);
    } else {
      merged.push({ ...sorted[i] });
    }
  }
  return merged;
}

function carveSlots(
  pageLeft: number, pageRight: number,
  exclusions: { left: number; right: number }[]
): { left: number; right: number }[] {
  const merged = mergeIntervals(exclusions);
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

// ─── DRAGON DRAWING ──────────────────────────────────────────────────────────
function drawWings(
  ctx: CanvasRenderingContext2D,
  xs: Float32Array, ys: Float32Array,
  time: number, velocity: number
) {
  const wx = xs[6], wy = ys[6];
  const wdx = xs[5] - xs[7];
  const wdy = ys[5] - ys[7];
  const wingAng = Math.atan2(wdy, wdx);
  const flapSpeed = 2 + velocity * 0.02;
  const flapAmp = 15 + velocity * 0.5;

  for (const side of [-1, 1] as const) {
    ctx.save();
    ctx.translate(wx, wy);
    ctx.rotate(wingAng);

    const flapOffset = Math.sin(time * flapSpeed) * flapAmp * side;
    const tipY = -50 + flapOffset;

    // Wing membrane (filled)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    // Bone 1
    ctx.lineTo(side * 12, tipY * 0.3);
    // Ragged outer edge with 6 points
    const points = 6;
    for (let p = 0; p < points; p++) {
      const t = p / (points - 1);
      const px = side * (12 + t * 38);
      const py = tipY * (0.3 + t * 0.7) + (p % 2 === 0 ? side * 4 : -side * 3);
      ctx.lineTo(px, py);
    }
    // Back to body along bottom
    ctx.lineTo(side * 30, 8);
    ctx.lineTo(side * 15, 6);
    ctx.closePath();

    ctx.fillStyle = "rgba(139, 26, 26, 0.25)";
    ctx.fill();

    // Wing bones
    ctx.strokeStyle = "rgba(44, 24, 16, 0.7)";
    ctx.lineWidth = 1.5;
    const boneCount = 4;
    for (let b = 0; b < boneCount; b++) {
      const t = b / (boneCount - 1);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      const bx = side * (12 + t * 38);
      const by = tipY * (0.3 + t * 0.7);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }

    ctx.restore();
  }
}

function drawBody(
  ctx: CanvasRenderingContext2D,
  xs: Float32Array, ys: Float32Array
) {
  // Build top and bottom outlines
  const topX: number[] = [], topY: number[] = [];
  const botX: number[] = [], botY: number[] = [];

  for (let i = 3; i < NUM_SEGS; i++) {
    const t = i / (NUM_SEGS - 1);
    const r = HEAD_RADIUS + (TAIL_RADIUS - HEAD_RADIUS) * t;
    const dx = (i < NUM_SEGS - 1) ? xs[i + 1] - xs[i] : xs[i] - xs[i - 1];
    const dy = (i < NUM_SEGS - 1) ? ys[i + 1] - ys[i] : ys[i] - ys[i - 1];
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    topX.push(xs[i] + nx * r);
    topY.push(ys[i] + ny * r);
    botX.push(xs[i] - nx * r);
    botY.push(ys[i] - ny * r);
  }

  // Body fill
  ctx.beginPath();
  ctx.moveTo(topX[0], topY[0]);
  for (let i = 1; i < topX.length; i++) {
    ctx.lineTo(topX[i], topY[i]);
  }
  for (let i = botX.length - 1; i >= 0; i--) {
    ctx.lineTo(botX[i], botY[i]);
  }
  ctx.closePath();
  ctx.fillStyle = "#1A0A05";
  ctx.fill();

  // Lighter belly
  ctx.beginPath();
  ctx.moveTo(botX[0], botY[0]);
  for (let i = 1; i < botX.length; i++) {
    ctx.lineTo(botX[i], botY[i]);
  }
  // Close with a slight offset upward
  for (let i = botX.length - 1; i >= 0; i--) {
    const t2 = i / botX.length;
    const offset = 2 + t2 * 1;
    ctx.lineTo(botX[i], botY[i] - offset);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(60, 30, 15, 0.6)";
  ctx.fill();
}

function drawSpikes(
  ctx: CanvasRenderingContext2D,
  xs: Float32Array, ys: Float32Array
) {
  for (let i = 3; i < 55; i += 2) {
    const t = i / (NUM_SEGS - 1);
    const r = HEAD_RADIUS + (TAIL_RADIUS - HEAD_RADIUS) * t;
    const dx = (i < NUM_SEGS - 1) ? xs[i + 1] - xs[i] : xs[i] - xs[i - 1];
    const dy = (i < NUM_SEGS - 1) ? ys[i + 1] - ys[i] : ys[i] - ys[i - 1];
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;

    const spikeH = r * 0.7 + 3;
    const baseX = xs[i] + nx * r;
    const baseY = ys[i] + ny * r;
    const tipX2 = xs[i] + nx * (r + spikeH);
    const tipY2 = ys[i] + ny * (r + spikeH);

    ctx.beginPath();
    const perpX = dx / len * 3;
    const perpY = dy / len * 3;
    ctx.moveTo(baseX - perpX, baseY - perpY);
    ctx.lineTo(tipX2, tipY2);
    ctx.lineTo(baseX + perpX, baseY + perpY);
    ctx.closePath();
    ctx.fillStyle = "#2A1208";
    ctx.fill();
  }
}

function drawScales(
  ctx: CanvasRenderingContext2D,
  xs: Float32Array, ys: Float32Array
) {
  for (let i = 8; i < NUM_SEGS - 5; i += 3) {
    const t = i / (NUM_SEGS - 1);
    const r = HEAD_RADIUS + (TAIL_RADIUS - HEAD_RADIUS) * t;
    const dx = (i < NUM_SEGS - 1) ? xs[i + 1] - xs[i] : xs[i] - xs[i - 1];
    const dy = (i < NUM_SEGS - 1) ? ys[i + 1] - ys[i] : ys[i] - ys[i - 1];
    const ang = Math.atan2(dy, dx);

    const sr = r * 0.4;
    const offset = (i % 6 === 0) ? 2 : -2;

    ctx.save();
    ctx.translate(xs[i] + offset * Math.cos(ang + Math.PI / 2), ys[i] + offset * Math.sin(ang + Math.PI / 2));
    ctx.rotate(ang);

    // Chevron ">" shape
    ctx.beginPath();
    ctx.moveTo(-sr, -sr * 0.5);
    ctx.lineTo(sr * 0.3, 0);
    ctx.lineTo(-sr, sr * 0.5);
    ctx.strokeStyle = "rgba(90, 50, 20, 0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }
}

function drawHead(
  ctx: CanvasRenderingContext2D,
  xs: Float32Array, ys: Float32Array,
  velocity: number
) {
  const hx = xs[0], hy = ys[0];
  const hdx = xs[0] - xs[1];
  const hdy = ys[0] - ys[1];
  const headAng = Math.atan2(hdy, hdx);

  ctx.save();
  ctx.translate(hx, hy);
  ctx.rotate(headAng);

  // Head — angular wedge, wider at back, pointed at front
  const hw = HEAD_RADIUS * 1.8;
  const hh = HEAD_RADIUS * 1.2;
  ctx.beginPath();
  ctx.moveTo(hw * 0.7, 0); // nose tip
  ctx.lineTo(-hw * 0.3, -hh * 0.8); // top back
  ctx.lineTo(-hw * 0.5, -hh * 0.4);
  ctx.lineTo(-hw * 0.5, hh * 0.4);
  ctx.lineTo(-hw * 0.3, hh * 0.8); // bottom back
  ctx.closePath();
  ctx.fillStyle = "#1A0A05";
  ctx.fill();

  // Horns — two triangular horns on top
  ctx.beginPath();
  ctx.moveTo(-hw * 0.1, -hh * 0.7);
  ctx.lineTo(-hw * 0.3, -hh * 1.5);
  ctx.lineTo(hw * 0.05, -hh * 0.6);
  ctx.closePath();
  ctx.fillStyle = "#2A1208";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(hw * 0.1, -hh * 0.6);
  ctx.lineTo(hw * 0.0, -hh * 1.3);
  ctx.lineTo(hw * 0.25, -hh * 0.5);
  ctx.closePath();
  ctx.fillStyle = "#2A1208";
  ctx.fill();

  // Open jaw when moving fast
  if (velocity > 2) {
    const jawOpen = Math.min(velocity * 0.8, 8);
    ctx.beginPath();
    ctx.moveTo(hw * 0.3, hh * 0.2);
    ctx.lineTo(hw * 0.8, jawOpen);
    ctx.lineTo(hw * 0.3, hh * 0.5);
    ctx.closePath();
    ctx.fillStyle = "#0A0000";
    ctx.fill();

    // Teeth
    ctx.fillStyle = "#F4E4C1";
    for (let t = 0; t < 3; t++) {
      const tx = hw * 0.35 + t * hw * 0.12;
      ctx.beginPath();
      ctx.moveTo(tx, hh * 0.15);
      ctx.lineTo(tx + 2, hh * 0.35);
      ctx.lineTo(tx - 1, hh * 0.15);
      ctx.fill();
    }
  }

  // Eyes — glowing red
  const eyeX = hw * 0.15;
  const eyeY = -hh * 0.3;
  ctx.shadowBlur = 8;
  ctx.shadowColor = "#FF4400";
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#FF4400";
  ctx.fill();
  ctx.shadowBlur = 0;

  // Pupil
  ctx.beginPath();
  ctx.ellipse(eyeX, eyeY, 1.2, 2.5, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#0A0000";
  ctx.fill();

  // Specular
  ctx.beginPath();
  ctx.arc(eyeX + 1.5, eyeY - 1, 1, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.fill();

  // Nostril
  ctx.beginPath();
  ctx.arc(hw * 0.5, -hh * 0.15, 2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(139,26,26,0.8)";
  ctx.fill();

  ctx.restore();
}

function drawTailTip(
  ctx: CanvasRenderingContext2D,
  xs: Float32Array, ys: Float32Array
) {
  const tx = xs[NUM_SEGS - 1];
  const ty = ys[NUM_SEGS - 1];
  const tdx = xs[NUM_SEGS - 1] - xs[NUM_SEGS - 2];
  const tdy = ys[NUM_SEGS - 1] - ys[NUM_SEGS - 2];
  const tailAng = Math.atan2(tdy, tdx);

  ctx.save();
  ctx.translate(tx, ty);
  ctx.rotate(tailAng);

  // Diamond/spade shape
  ctx.beginPath();
  ctx.moveTo(10, 0);
  ctx.lineTo(4, -7);
  ctx.lineTo(-2, 0);
  ctx.lineTo(4, 7);
  ctx.closePath();
  ctx.fillStyle = "#8B1A1A";
  ctx.fill();

  ctx.restore();
}

function drawFire(
  ctx: CanvasRenderingContext2D,
  particles: { x: number; y: number; vx: number; vy: number; life: number; color: string; r: number }[]
) {
  for (const p of particles) {
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.08;
    p.life -= 0.025;
  }
  ctx.globalAlpha = 1;
}

// ─── Neck drawing ────────────────────────────────────────────────────────────
function drawNeck(
  ctx: CanvasRenderingContext2D,
  xs: Float32Array, ys: Float32Array
) {
  for (let i = 3; i <= 8; i++) {
    const t = i / (NUM_SEGS - 1);
    const r = HEAD_RADIUS + (TAIL_RADIUS - HEAD_RADIUS) * t;
    const nextI = Math.min(i + 1, NUM_SEGS - 1);
    const prevI = i - 1;

    const dx = xs[nextI] - xs[prevI];
    const dy = ys[nextI] - ys[prevI];
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;

    // Trapezoid from this seg to next
    if (i < 8) {
      const t2 = (i + 1) / (NUM_SEGS - 1);
      const r2 = HEAD_RADIUS + (TAIL_RADIUS - HEAD_RADIUS) * t2;
      const ni = i + 1;
      const ndx = xs[Math.min(ni + 1, NUM_SEGS - 1)] - xs[ni - 1];
      const ndy = ys[Math.min(ni + 1, NUM_SEGS - 1)] - ys[ni - 1];
      const nlen = Math.sqrt(ndx * ndx + ndy * ndy) || 1;
      const nnx = -ndy / nlen;
      const nny = ndx / nlen;

      ctx.beginPath();
      ctx.moveTo(xs[i] + nx * r, ys[i] + ny * r);
      ctx.lineTo(xs[ni] + nnx * r2, ys[ni] + nny * r2);
      ctx.lineTo(xs[ni] - nnx * r2, ys[ni] - nny * r2);
      ctx.lineTo(xs[i] - nx * r, ys[i] - ny * r);
      ctx.closePath();
      ctx.fillStyle = "#1A0A05";
      ctx.fill();
    }
  }
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ManuscriptClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const dropCapRef = useRef<HTMLDivElement>(null);

  // Dragon state
  const segsX = useRef<Float32Array>(new Float32Array(NUM_SEGS).fill(800));
  const segsY = useRef<Float32Array>(new Float32Array(NUM_SEGS).fill(200));
  const mouseX = useRef(800);
  const mouseY = useRef(200);
  const prevMouseX = useRef(800);
  const prevMouseY = useRef(200);
  const fireParticles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; color: string; r: number }[]>([]);

  // Pretext
  const preparedRef = useRef<PreparedTextWithSegments | null>(null);
  const spanPool = useRef<HTMLSpanElement[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const fontsReadyRef = useRef(false);

  const FIRE_COLORS = ["#FF6B00", "#FF4500", "#FFD700", "#FF8C00", "#FF2200"];

  // ── Build span pool ──────────────────────────────────────────────────────
  useEffect(() => {
    const layer = textLayerRef.current;
    if (!layer) return;
    for (let i = 0; i < SPAN_POOL_SIZE; i++) {
      const s = document.createElement("span");
      s.style.cssText = "position:absolute;white-space:pre;visibility:hidden;font-family:'EB Garamond',serif;font-size:18px;color:#2C1810;line-height:1px;";
      layer.appendChild(s);
      spanPool.current.push(s);
    }
  }, []);

  // ── Load fonts + prepare ─────────────────────────────────────────────────
  useEffect(() => {
    document.fonts.load(FONT_STR).then(() => {
      preparedRef.current = prepareWithSegments(FULL_TEXT.slice(1), FONT_STR);
      fontsReadyRef.current = true;
    });
  }, []);

  // ── Mouse tracking ───────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseX.current = e.clientX - rect.left;
      mouseY.current = e.clientY - rect.top + container.scrollTop;
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", onMove);
    return () => el?.removeEventListener("mousemove", onMove);
  }, []);

  // ── Fire on click ────────────────────────────────────────────────────────
  useEffect(() => {
    const onClick = () => {
      const hx = segsX.current[0];
      const hy = segsY.current[0];
      for (let i = 0; i < 18; i++) {
        fireParticles.current.push({
          x: hx, y: hy,
          vx: (Math.random() * 5 + 2) * (Math.random() > 0.3 ? 1 : -0.4),
          vy: (Math.random() - 0.65) * 4,
          life: 1,
          color: FIRE_COLORS[Math.floor(Math.random() * FIRE_COLORS.length)],
          r: Math.random() * 6 + 3,
        });
      }
    };
    const el = containerRef.current;
    el?.addEventListener("click", onClick);
    return () => el?.removeEventListener("click", onClick);
  }, []);

  // ── Resize canvas ────────────────────────────────────────────────────────
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

  // ── Draw dragon on canvas ────────────────────────────────────────────────
  const drawDragon = useCallback((ctx: CanvasRenderingContext2D, dpr: number, t: number) => {
    const xs = segsX.current;
    const ys = segsY.current;

    // Calculate velocity
    const vx = xs[0] - prevMouseX.current;
    const vy = ys[0] - prevMouseY.current;
    const velocity = Math.sqrt(vx * vx + vy * vy);

    ctx.save();
    ctx.scale(dpr, dpr);

    // 1. Fire particles first (behind everything)
    fireParticles.current = fireParticles.current.filter(p => p.life > 0);
    drawFire(ctx, fireParticles.current);

    // 2. Wings (behind body)
    drawWings(ctx, xs, ys, t, velocity);

    // 3. Neck
    drawNeck(ctx, xs, ys);

    // 4. Body as continuous filled path
    drawBody(ctx, xs, ys);

    // 5. Dorsal spikes
    drawSpikes(ctx, xs, ys);

    // 6. Scales
    drawScales(ctx, xs, ys);

    // 7. Tail tip
    drawTailTip(ctx, xs, ys);

    // 8. Head last (on top)
    drawHead(ctx, xs, ys, velocity);

    ctx.restore();

    prevMouseX.current = xs[0];
    prevMouseY.current = ys[0];
  }, []);

  // ── Layout text ──────────────────────────────────────────────────────────
  const layoutText = useCallback(() => {
    if (!fontsReadyRef.current || !preparedRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    const pageW = container.clientWidth;
    const contentW = pageW - MARGIN_H * 2;
    const xs = segsX.current;
    const ys = segsY.current;

    // Build exclusion list from dragon segments
    const segCircles: { cx: number; cy: number; r: number }[] = [];
    for (let i = 0; i < NUM_SEGS; i++) {
      const t = i / (NUM_SEGS - 1);
      const r = (HEAD_RADIUS + (TAIL_RADIUS - HEAD_RADIUS) * t) + 4;
      segCircles.push({ cx: xs[i] - MARGIN_H, cy: ys[i] - MARGIN_TOP, r });
    }

    let spanIdx = 0;
    const pool = spanPool.current;
    const assign = (text: string, x: number, y: number) => {
      if (spanIdx >= pool.length) return;
      const s = pool[spanIdx++];
      s.textContent = text;
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.visibility = "visible";
    };

    // Drop cap — always at top left
    const dc = dropCapRef.current;
    if (dc) {
      dc.style.left = MARGIN_H + "px";
      dc.style.top = MARGIN_TOP + "px";
    }

    let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
    let lineIdx = 0;
    const maxLines = 600;

    while (lineIdx < maxLines) {
      const bandTop = lineIdx * LINE_HEIGHT;
      const bandBot = bandTop + LINE_HEIGHT;
      const absTop = bandTop + MARGIN_TOP;

      // Compute exclusions for this band
      const exclusions: { left: number; right: number }[] = [];

      // Drop cap exclusion for first N lines
      if (lineIdx < DROP_CAP_LINES) {
        exclusions.push({ left: 0, right: DROP_CAP_W });
      }

      // Dragon exclusions
      for (const { cx, cy, r } of segCircles) {
        const iv = circleLineInterval(cx, cy, r, bandTop, bandBot);
        if (iv) exclusions.push(iv);
      }

      const slots = carveSlots(0, contentW, exclusions);
      if (!slots.length) {
        lineIdx++;
        continue;
      }

      // Use the widest slot
      let best = slots[0];
      for (const s of slots) {
        if (s.right - s.left > best.right - best.left) best = s;
      }

      const slotW = best.right - best.left;
      if (slotW < 20) { lineIdx++; continue; }

      const line = layoutNextLine(preparedRef.current, cursor, slotW);
      if (!line) break;

      assign(line.text, MARGIN_H + best.left, absTop);
      cursor = line.end;
      lineIdx++;
    }

    // Hide unused spans
    for (let i = spanIdx; i < pool.length; i++) {
      pool[i].style.visibility = "hidden";
    }
  }, []);

  // ── RAF loop ─────────────────────────────────────────────────────────────
  const tick = useCallback(() => {
    timeRef.current += 0.016;
    const t = timeRef.current;
    const xs = segsX.current;
    const ys = segsY.current;

    // Head follows mouse
    xs[0] += (mouseX.current - xs[0]) * EASING;
    ys[0] += (mouseY.current - ys[0]) * EASING;

    // Chain constraint
    for (let i = 1; i < NUM_SEGS; i++) {
      const dx = xs[i] - xs[i - 1];
      const dy = ys[i] - ys[i - 1];
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      if (dist > SEG_SPACING) {
        const scale = SEG_SPACING / dist;
        xs[i] = xs[i - 1] + dx * scale;
        ys[i] = ys[i - 1] + dy * scale;
      }
    }

    // Draw
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const dpr = window.devicePixelRatio || 1;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawDragon(ctx, dpr, t);
      }
    }

    layoutText();
    rafRef.current = requestAnimationFrame(tick);
  }, [drawDragon, layoutText]);

  // ── Start loop + handle resize ───────────────────────────────────────────
  useEffect(() => {
    resizeCanvas();
    rafRef.current = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [tick, resizeCanvas]);

  // ── Touch support ────────────────────────────────────────────────────────
  useEffect(() => {
    const onTouch = (e: TouchEvent) => {
      const container = containerRef.current;
      if (!container || !e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      mouseX.current = e.touches[0].clientX - rect.left;
      mouseY.current = e.touches[0].clientY - rect.top + container.scrollTop;
    };
    const el = containerRef.current;
    el?.addEventListener("touchmove", onTouch, { passive: true });
    return () => el?.removeEventListener("touchmove", onTouch);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F4E4C1",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "300px 300px",
      }}
    >
      {/* Back link */}
      <div
        style={{
          position: "fixed",
          top: 20,
          left: 24,
          zIndex: 100,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 14,
            color: "#6B4428",
            textDecoration: "none",
            letterSpacing: "0.06em",
            borderBottom: "1px solid #C4A35A",
            paddingBottom: 2,
          }}
        >
          ← Portfolio
        </Link>
      </div>

      {/* Marginalia */}
      <div className="hidden md:block">
        {/* Left margin note — DesignX */}
        <div
          style={{
            position: "absolute",
            top: 520,
            left: 12,
            writingMode: "vertical-rl",
            fontFamily: "'EB Garamond', serif",
            fontSize: 12,
            fontStyle: "italic",
            color: "#8B6914",
            zIndex: 20,
            maxHeight: 180,
          }}
        >
          Of his service at the forge of DesignX
        </div>
        {/* Right margin note — projects */}
        <div
          style={{
            position: "absolute",
            top: 1100,
            right: 12,
            fontFamily: "'EB Garamond', serif",
            fontSize: 12,
            fontStyle: "italic",
            color: "#8B6914",
            zIndex: 20,
            maxWidth: 140,
            textAlign: "right",
          }}
        >
          Here follow his four great works
        </div>
        {/* Left margin note — skills */}
        <div
          style={{
            position: "absolute",
            top: 1600,
            left: 12,
            writingMode: "vertical-rl",
            fontFamily: "'EB Garamond', serif",
            fontSize: 12,
            fontStyle: "italic",
            color: "#8B6914",
            zIndex: 20,
            maxHeight: 200,
          }}
        >
          The arts & instruments of his craft
        </div>
        {/* Right margin note — contact */}
        <div
          style={{
            position: "absolute",
            top: 1900,
            right: 12,
            fontFamily: "'EB Garamond', serif",
            fontSize: 12,
            fontStyle: "italic",
            color: "#8B6914",
            zIndex: 20,
            maxWidth: 140,
            textAlign: "right",
          }}
        >
          How to summon the artificer
        </div>
      </div>

      {/* Scroll container */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          maxWidth: 760,
          margin: "0 auto",
          minHeight: "100vh",
          paddingTop: MARGIN_TOP,
          paddingBottom: 120,
          paddingLeft: MARGIN_H,
          paddingRight: MARGIN_H,
          cursor: "none",
          overflow: "hidden",
        }}
      >
        {/* Ornate top border */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: MARGIN_H - 20,
            right: MARGIN_H - 20,
            height: 1,
            background: "linear-gradient(to right, transparent, #C4A35A 20%, #8B1A1A 50%, #C4A35A 80%, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 28,
            left: MARGIN_H - 20,
            right: MARGIN_H - 20,
            height: 1,
            background: "linear-gradient(to right, transparent, #C4A35A 20%, #8B1A1A 50%, #C4A35A 80%, transparent)",
            opacity: 0.4,
          }}
        />

        {/* Title — ABOVE the text area, with clear separation */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: MARGIN_H,
            right: MARGIN_H,
            textAlign: "center",
            zIndex: 15,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "#8B1A1A",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            ✦ Illuminated Manuscript ✦
          </div>
          <h1
            style={{
              fontFamily: "'UnifrakturMaguntia', cursive",
              fontSize: 36,
              color: "#2C1810",
              fontWeight: 400,
              margin: 0,
              textShadow: "1px 1px 0 rgba(0,0,0,0.12)",
            }}
          >
            The Chronicle of Divyansh Chawla
          </h1>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "#8B1A1A",
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            ✦ Anno Domini MMXXVI ✦
          </div>
          {/* Decorative rule between title and text */}
          <div
            style={{
              marginTop: 16,
              marginBottom: 0,
              textAlign: "center",
              color: "#8B1A1A",
              fontSize: 14,
              letterSpacing: "0.4em",
            }}
          >
            ─────── ❧ ✦ ❧ ───────
          </div>
        </div>

        {/* Canvas for dragon */}
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

        {/* Drop cap */}
        <div
          ref={dropCapRef}
          style={{
            position: "absolute",
            fontFamily: "'UnifrakturMaguntia', cursive",
            fontSize: DROP_CAP_SIZE,
            lineHeight: 1,
            color: "#8B1A1A",
            zIndex: 5,
            userSelect: "none",
            textShadow: "2px 2px 0 rgba(0,0,0,0.15)",
          }}
        >
          {DROP_CAP_LETTER}
        </div>

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

        {/* Pitlane link at bottom */}
        <div
          style={{
            position: "relative",
            zIndex: 20,
            textAlign: "center",
            marginTop: 2200,
            paddingBottom: 40,
          }}
        >
          <Link
            href="/pitlane"
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 14,
              color: "#6B4428",
              textDecoration: "none",
              letterSpacing: "0.06em",
              borderBottom: "1px solid #C4A35A",
              paddingBottom: 2,
            }}
          >
            Or experience the race → /pitlane
          </Link>
        </div>

        {/* Accessible text */}
        <article
          aria-label="Chronicle text"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
          }}
        >
          {FULL_TEXT}
        </article>
      </div>
    </div>
  );
}
