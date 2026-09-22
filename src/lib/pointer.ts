/* Shared eased pointer: one rAF loop, two lerps (blob fast, light slow).
   Effects read it directly; React never re-renders per frame. */

export type HoverKind = "link" | "cell" | null;

export interface Point {
  x: number;
  y: number;
}

export interface PointerState {
  target: Point;
  blob: Point;
  light: Point;
  active: boolean;
  hoverKind: HoverKind;
}

const BLOB_K = 0.18;
const LIGHT_K = 0.08;

const state: PointerState = {
  target: { x: -100, y: -100 },
  blob: { x: -100, y: -100 },
  light: { x: -100, y: -100 },
  active: false,
  hoverKind: null,
};

type Listener = (s: PointerState) => void;
const listeners = new Set<Listener>();
let started = false;

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

export function stepPointer(s: PointerState): void {
  s.blob.x = lerp(s.blob.x, s.target.x, BLOB_K);
  s.blob.y = lerp(s.blob.y, s.target.y, BLOB_K);
  s.light.x = lerp(s.light.x, s.target.x, LIGHT_K);
  s.light.y = lerp(s.light.y, s.target.y, LIGHT_K);
}

export function hoverKindFor(target: EventTarget | null): HoverKind {
  const el = target instanceof Element ? target : null;
  const hit = el?.closest("a, button, [data-cell]") ?? null;
  if (!hit) return null;
  return hit.hasAttribute("data-cell") ? "cell" : "link";
}

export function getPointer(): PointerState {
  return state;
}

function tick(): void {
  stepPointer(state);
  for (const l of listeners) l(state);
  requestAnimationFrame(tick);
}

export function startPointer(): void {
  if (started || typeof window === "undefined") return;
  started = true;

  window.addEventListener(
    "pointermove",
    (e) => {
      state.target.x = e.clientX;
      state.target.y = e.clientY;
      if (!state.active) {
        state.active = true;
        state.blob = { ...state.target };
        state.light = { ...state.target };
      }
    },
    { passive: true },
  );
  const deactivate = () => {
    state.active = false;
  };
  window.addEventListener("pointerout", (e) => {
    if (!e.relatedTarget) deactivate();
  });
  window.addEventListener("pointerup", (e) => {
    if (e.pointerType === "touch") deactivate();
  });
  window.addEventListener("pointercancel", deactivate);
  window.addEventListener("blur", deactivate);
  document.addEventListener("pointerover", (e) => {
    state.hoverKind = hoverKindFor(e.target);
  });

  requestAnimationFrame(tick);
}

export function subscribePointer(fn: Listener): () => void {
  listeners.add(fn);
  startPointer();
  return () => {
    listeners.delete(fn);
  };
}
