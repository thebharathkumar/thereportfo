import { thresholdMatrix } from "./bayer";
import { hashString, mulberry32 } from "./prng";

/** Per-project pattern parameters, drawn once from a PRNG seeded by the slug. */
export interface CoverParams {
  fx: number;
  fy: number;
  rot: number;
  warp: number;
  bands: number;
  phase: number;
  nx: number;
  ny: number;
}

export function coverParams(slug: string): CoverParams {
  const r = mulberry32(hashString(slug));
  return {
    fx: 0.5 + r() * 1.1,
    fy: 0.5 + r() * 1.1,
    rot: r() * Math.PI,
    warp: 0.3 + r() * 0.6,
    bands: 1 + Math.floor(r() * 3),
    phase: r() * Math.PI * 2,
    nx: 1 + r() * 1.5,
    ny: 1 + r() * 1.5,
  };
}

function hash2(x: number, y: number): number {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h ^= h >>> 13;
  h = Math.imul(h, 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const smooth = (t: number) => t * t * (3 - 2 * t);

/** 2D value noise in [0, 1]. */
export function valueNoise(x: number, y: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = smooth(x - x0);
  const ty = smooth(y - y0);
  const a = hash2(x0, y0);
  const b = hash2(x0 + 1, y0);
  const c = hash2(x0, y0 + 1);
  const d = hash2(x0 + 1, y0 + 1);
  return (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty;
}

/** Brightness in [0, 1] at normalized position (u, v) and time t: warped sine bands plus noise. */
export function coverField(p: CoverParams, u: number, v: number, t: number): number {
  const cx = u - 0.5;
  const cy = v - 0.5;
  const rx = cx * Math.cos(p.rot) - cy * Math.sin(p.rot);
  const ry = cx * Math.sin(p.rot) + cy * Math.cos(p.rot);
  const n = valueNoise(u * p.nx + t * 0.15, v * p.ny - t * 0.1);
  const w = p.warp * (n - 0.5);
  const s =
    Math.sin((rx * p.fx + w) * Math.PI * 2 + p.phase + t) * 0.6 +
    Math.sin((ry * p.fy - w) * Math.PI * 2 - t * 0.7) * 0.4;
  const bands = Math.abs((((s * 0.5 + 0.5) * p.bands) % 1) - 0.5) * 2;
  const raw = 0.2 * n + 0.8 * bands;
  // Contrast curve: solid regions with dithered transitions, not a dithered gradient.
  const k = Math.min(1, Math.max(0, (raw - 0.45) / 0.3));
  return k * k * (3 - 2 * k);
}

const T4 = thresholdMatrix(4);

/** 1-bit mask (0/1 per pixel), row-major, dithered with the 4x4 Bayer matrix. */
export function renderCoverMask(slug: string, w: number, h: number, t: number): Uint8Array {
  const p = coverParams(slug);
  const out = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    const row = T4[y & 3];
    for (let x = 0; x < w; x++) {
      const v = coverField(p, (x + 0.5) / w, (y + 0.5) / h, t);
      out[y * w + x] = v > row[x & 3] ? 1 : 0;
    }
  }
  return out;
}
