import { useEffect, useRef } from "react";
import { renderCoverMask } from "../lib/dither2d";
import { reducedMotion } from "../lib/env";

export const COVER_W = 128;
export const COVER_H = 80;
const PAPER = [235, 231, 220] as const;
const ACCENT = [224, 184, 76] as const;
const BG = [15, 15, 14] as const;

interface Props {
  slug: string;
  accent?: boolean;
  hovered: boolean;
}

/** Generative 1-bit cover, seeded by the slug. Animates only while hovered. */
export function DitherCover({ slug, accent = false, hovered }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const on = accent ? ACCENT : PAPER;
    const img = ctx.createImageData(COVER_W, COVER_H);

    const paint = (t: number) => {
      const m = renderCoverMask(slug, COVER_W, COVER_H, t);
      const d = img.data;
      for (let i = 0; i < m.length; i++) {
        const c = m[i] ? on : BG;
        d[i * 4] = c[0];
        d[i * 4 + 1] = c[1];
        d[i * 4 + 2] = c[2];
        d[i * 4 + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    };

    if (!hovered || reducedMotion()) {
      paint(tRef.current);
      return;
    }
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      tRef.current += ((now - last) / 1000) * 0.35;
      last = now;
      paint(tRef.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [slug, accent, hovered]);

  return <canvas ref={ref} width={COVER_W} height={COVER_H} className="cover" aria-hidden="true" />;
}
