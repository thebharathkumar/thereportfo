import { useEffect, useRef } from "react";
import { PROFILE, PROJECTS } from "../content";
import { markLoaderShown } from "../lib/loader";
import { getPointer, startPointer } from "../lib/pointer";
import { createField } from "./field";
import { Orb } from "./Orb";

const SCALE = 2;
const T_IN = 1300; // iris opens while the index counts up
const T_OUT = 450; // Bayer dissolve
const HARD_CAP = 2000; // from mount, whatever happens
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

interface Props {
  onDone: () => void;
}

/* Full-screen intro: the flashlight opens like an iris as the index loads,
   then the overlay dissolves in Bayer order onto the hero. Skippable by any
   input; the caller decides whether it shows at all (see lib/loader.ts). */
export function Loader({ onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const canvas = canvasRef.current;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      markLoaderShown();
      onDone();
    };
    const field = canvas ? createField(canvas, { alpha: true, scale: SCALE }) : null;
    if (!el || !canvas || !field) {
      finish();
      return;
    }

    startPointer();
    const pointer = getPointer();
    const total = PROJECTS.length;
    const start = performance.now();
    let skipAt: number | null = null;
    let raf = 0;
    let dissolving = false;

    const skip = () => {
      if (skipAt === null) skipAt = performance.now();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") skip();
    };
    window.addEventListener("pointerdown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    window.addEventListener("keydown", onKey);
    const cap = window.setTimeout(finish, HARD_CAP);
    const onResize = () => field.resize();
    window.addEventListener("resize", onResize);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const elapsed = now - start;
      const p = skipAt !== null ? 1 : Math.min(1, elapsed / T_IN);
      const outStart = skipAt !== null ? Math.min(skipAt, start + T_IN) : start + T_IN;
      const out = Math.min(1, Math.max(0, (now - outStart) / T_OUT));

      if (counter.current) {
        const n = Math.max(1, Math.round(p * total));
        counter.current.textContent = `${String(n).padStart(2, "0")} / ${total}`;
      }
      if (out > 0 && !dissolving) {
        dissolving = true;
        el.classList.add("loader--out");
      }

      const { width: w, height: h } = field;
      const r = canvas.getBoundingClientRect();
      const light: [number, number] = pointer.active
        ? [(pointer.light.x - r.left) / SCALE, h - (pointer.light.y - r.top) / SCALE]
        : [w * 0.5, h * 0.5];
      const diag = Math.hypot(w, h);
      const e = easeOut(p);
      field.render({
        time: elapsed / 1000,
        light,
        radius: 12 + e * diag * 1.2,
        base: Math.pow(p, 5),
        out,
      });
      if (out >= 1) finish();
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(cap);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [onDone]);

  return (
    <div ref={root} className="loader" aria-hidden="true">
      <canvas ref={canvasRef} className="loader__field" />
      <div className="loader__ui">
        <span className="loader__who">
          {PROFILE.name} · {PROFILE.title} · {PROFILE.city}
        </span>
        <span className="loader__right">
          <span className="loader__skip">click to skip</span>
          <span className="loader__status">
            <Orb state="searching" />
            <span>
              Loading index <span ref={counter} className="loader__n">{`01 / ${PROJECTS.length}`}</span>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}
