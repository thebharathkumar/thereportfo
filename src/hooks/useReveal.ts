import { useEffect } from "react";
import { reducedMotion } from "../lib/env";

/** Adds .reveal to every [data-reveal] element, then .in once it is inside the viewport.
    Visibility is checked on scroll and resize over the not-yet-revealed elements only,
    so the cost drops to nothing once everything is shown. Fail-open: with reduced
    motion nothing is ever hidden. */
export function useReveal(): void {
  useEffect(() => {
    if (reducedMotion()) return;
    const pending = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    for (const el of pending) el.classList.add("reveal");
    void document.body.offsetHeight; // flush styles so the first reveal still transitions

    const check = () => {
      const limit = window.innerHeight * 0.92;
      for (const el of pending) {
        const r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) {
          el.classList.add("in");
          pending.delete(el);
        }
      }
      if (pending.size === 0) stop();
    };
    const stop = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return stop;
  }, []);
}
