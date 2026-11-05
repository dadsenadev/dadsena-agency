import { useEffect, useRef } from "react";

type Vec = { x: number; y: number; z: number };
type Pt = { x: number; y: number; z: number };

const INK = "#0e1110";
const PAPER = "243,238,228";
const COPPER = "212,137,74";

function rotate(p: Vec, yaw: number, pitch: number): Vec {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cx = Math.cos(pitch);
  const sx = Math.sin(pitch);
  const x1 = p.x * cy + p.z * sy;
  const z1 = -p.x * sy + p.z * cy;
  const y2 = p.y * cx - z1 * sx;
  const z2 = p.y * sx + z1 * cx;
  return { x: x1, y: y2, z: z2 };
}

function project(p: Vec, w: number, h: number, fov: number): Pt {
  const scale = fov / (fov + p.z);
  return { x: w / 2 + p.x * scale, y: h / 2 + p.y * scale, z: p.z };
}

function face(
  ctx: CanvasRenderingContext2D,
  corners: Vec[],
  yaw: number,
  pitch: number,
  w: number,
  h: number,
  fov: number,
  fill: string,
  stroke: string,
) {
  const pts = corners.map((c) => project(rotate(c, yaw, pitch), w, h, fov));
  const z = pts.reduce((s, p) => s + p.z, 0) / pts.length;
  return { z, draw() {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.25;
    ctx.stroke();
  }};
}

function boxFaces(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  cz: number,
  hw: number,
  hh: number,
  hd: number,
  yaw: number,
  pitch: number,
  w: number,
  h: number,
  fov: number,
  spin: number,
) {
  const local = (x: number, y: number, z: number): Vec => {
    const c = Math.cos(spin);
    const s = Math.sin(spin);
    return { x: cx + x * c + z * s, y: cy + y, z: cz - x * s + z * c };
  };
  const v = [
    local(-hw, -hh, -hd),
    local(hw, -hh, -hd),
    local(hw, hh, -hd),
    local(-hw, hh, -hd),
    local(-hw, -hh, hd),
    local(hw, -hh, hd),
    local(hw, hh, hd),
    local(-hw, hh, hd),
  ];
  const quads: [number, number, number, number, string, string][] = [
    [4, 5, 6, 7, `rgba(${COPPER},0.28)`, `rgba(${COPPER},0.95)`],
    [0, 1, 2, 3, `rgba(${PAPER},0.04)`, `rgba(${COPPER},0.28)`],
    [0, 4, 7, 3, `rgba(${COPPER},0.12)`, `rgba(${COPPER},0.5)`],
    [1, 5, 6, 2, `rgba(${COPPER},0.2)`, `rgba(${COPPER},0.75)`],
    [3, 2, 6, 7, `rgba(${PAPER},0.05)`, `rgba(${COPPER},0.4)`],
    [0, 1, 5, 4, `rgba(14,17,16,0.35)`, `rgba(${COPPER},0.35)`],
  ];
  return quads.map(([a, b, c, d, fill, stroke]) =>
    face(ctx, [v[a], v[b], v[c], v[d]], yaw, pitch, w, h, fov, fill, stroke),
  );
}

export function Atelier() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
    };
    resize();
    const obs = new ResizeObserver(resize);
    obs.observe(canvas);

    const draw = (now: number) => {
      if (!running) return;
      const w = canvas.width;
      const h = canvas.height;
      const t = reduced ? 1.1 : now / 1000;
      tilt.x += ((reduced ? 0.15 : pointer.y * 0.35) - tilt.x) * 0.06;
      tilt.y += ((reduced ? -0.4 : pointer.x * 0.55) - tilt.y) * 0.06;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, w, h);

      const fov = Math.min(w, h) * 1.15;
      const yaw = t * 0.18 + tilt.y;
      const pitch = 0.18 + tilt.x;
      const unit = Math.min(w, h) * 0.22;

      const queue = [
        ...boxFaces(ctx, 0, unit * 0.08, 0, unit * 0.42, unit * 0.72, unit * 0.06, yaw, pitch, w, h, fov, t * 0.22),
        ...boxFaces(ctx, unit * 0.05, unit * 0.95, unit * 0.15, unit * 0.7, unit * 0.025, unit * 0.45, yaw, pitch, w, h, fov, 0.4),
      ];

      for (let i = 0; i < 6; i++) {
        const ang = t * 0.35 + (i * Math.PI * 2) / 6;
        const ox = Math.cos(ang) * unit * 1.15;
        const oz = Math.sin(ang) * unit * 0.72;
        const oy = Math.sin(ang * 2 + i) * unit * 0.18 - unit * 0.05;
        const cardW = unit * 0.28;
        const cardH = unit * 0.4;
        const spin = ang + 0.4;
        queue.push(
          ...boxFaces(ctx, ox, oy, oz, cardW, cardH, unit * 0.02, yaw, pitch, w, h, fov, spin),
        );
      }

      const ring: { z: number; draw: () => void }[] = [];
      const steps = 72;
      for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 2 + t * 0.15;
        const p = project(
          rotate({ x: Math.cos(a) * unit * 1.35, y: unit * 0.95, z: Math.sin(a) * unit * 0.85 }, yaw, pitch),
          w,
          h,
          fov,
        );
        ring.push({
          z: p.z,
          draw() {
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.8, (fov / (fov + p.z)) * 2.2), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${COPPER},${0.25 + (i % 6 === 0 ? 0.45 : 0)})`;
            ctx.fill();
          },
        });
      }

      const all = [...queue, ...ring].sort((a, b) => b.z - a.z);
      for (const item of all) item.draw();

      const g = ctx.createRadialGradient(w * 0.5, h * 0.45, unit, w * 0.5, h * 0.5, Math.max(w, h) * 0.72);
      g.addColorStop(0, "rgba(14,17,16,0)");
      g.addColorStop(1, "rgba(14,17,16,0.72)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      obs.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="h-full w-full" aria-hidden="true" />;
}
