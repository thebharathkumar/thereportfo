import { useEffect, useRef } from "react";
import { FINE_POINTER, REDUCED_MOTION, finePointer, hasWebGL, onMediaChange, reducedMotion } from "../lib/env";
import { getPointer, startPointer } from "../lib/pointer";
import { createField } from "./field";

const SCALE = 2; // CSS pixels per dither cell
const RADIUS_CSS = 360;

export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const field = hasWebGL() ? createField(canvas, { alpha: false, scale: SCALE }) : null;
    if (!field) {
      canvas.classList.add("hero-field--fallback");
      return;
    }

    let dirty = true;
    const resize = () => {
      field.resize();
      dirty = true;
    };
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    ro?.observe(canvas);

    let motion = !reducedMotion();
    let fine = finePointer();
    const offMotion = onMediaChange(REDUCED_MOTION, (m) => {
      motion = !m;
      dirty = true;
    });
    const offFine = onMediaChange(FINE_POINTER, (m) => {
      fine = m;
      dirty = true;
    });

    let visible = true;
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
          })
        : null;
    io?.observe(canvas);

    startPointer();
    const pointer = getPointer();
    let t = 0;
    let last = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible) return;
      if (motion) t += dt;

      const { width: w, height: h } = field;
      let lx: number;
      let ly: number;
      if (pointer.active) {
        const r = canvas.getBoundingClientRect();
        lx = (pointer.light.x - r.left) / SCALE;
        ly = h - (pointer.light.y - r.top) / SCALE;
      } else if (motion) {
        lx = w * (0.5 + 0.35 * Math.sin(t * 0.11));
        ly = h * (0.5 + 0.3 * Math.cos(t * 0.07));
      } else {
        lx = w * 0.5;
        ly = h * 0.55;
      }
      if (!motion && !dirty && !pointer.active) return;

      field.render({
        time: t,
        light: [lx, ly],
        radius: RADIUS_CSS / SCALE,
        base: fine && motion ? 0.0 : motion ? 0.09 : 0.2,
        out: 0,
      });
      dirty = false;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      offMotion();
      offFine();
    };
  }, []);

  return <canvas ref={ref} className="hero-field" aria-hidden="true" />;
}
