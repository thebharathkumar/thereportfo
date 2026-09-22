import { hasWebGL, reducedMotion } from "./env";

export const LOADER_KEY = "thebharath:loaded";

function seen(): boolean {
  try {
    return sessionStorage.getItem(LOADER_KEY) === "1";
  } catch {
    return false;
  }
}

/** Once per session, only when the effects can actually run. */
export function shouldShowLoader(env?: { webgl: boolean; reducedMotion: boolean }): boolean {
  const webgl = env ? env.webgl : hasWebGL();
  const reduced = env ? env.reducedMotion : reducedMotion();
  return webgl && !reduced && !seen();
}

export function markLoaderShown(): void {
  try {
    sessionStorage.setItem(LOADER_KEY, "1");
  } catch {
    /* private mode or storage disabled: the loader simply shows again next load */
  }
}
