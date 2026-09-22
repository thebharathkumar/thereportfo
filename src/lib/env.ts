const mq = (q: string): MediaQueryList | null =>
  typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(q) : null;

export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function finePointer(): boolean {
  return mq(FINE_POINTER)?.matches ?? false;
}

export function reducedMotion(): boolean {
  return mq(REDUCED_MOTION)?.matches ?? false;
}

export function onMediaChange(query: string, cb: (matches: boolean) => void): () => void {
  const m = mq(query);
  if (!m) return () => {};
  const handler = (e: MediaQueryListEvent) => cb(e.matches);
  m.addEventListener("change", handler);
  return () => m.removeEventListener("change", handler);
}

export function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}
