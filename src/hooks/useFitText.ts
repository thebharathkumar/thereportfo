import { useLayoutEffect, type RefObject } from "react";

/** Scales one line of text so it exactly fills its parent's width. Re-runs on resize and
    whenever a web font finishes loading, and corrects itself with a second measurement
    (scrollWidth is an integer and glyph metrics are not perfectly linear in font size). */
export function useFitText(ref: RefObject<HTMLElement | null>, max = 480): void {
  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      const target = parent.clientWidth;
      if (target <= 0) return;
      el.style.fontSize = "100px";
      const w = el.scrollWidth;
      if (w <= 0) return;
      let size = Math.min(max, (100 * target) / w);
      el.style.fontSize = `${size}px`;
      const actual = el.getBoundingClientRect().width;
      if (actual > 0) size = Math.min(max, (size * target) / actual);
      el.style.fontSize = `${size}px`;
    };
    fit();

    let cancelled = false;
    const fonts = document.fonts;
    fonts?.ready.then(() => {
      if (!cancelled) fit();
    });
    const onFonts = () => fit();
    fonts?.addEventListener("loadingdone", onFonts);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null;
    ro?.observe(parent);
    return () => {
      cancelled = true;
      fonts?.removeEventListener("loadingdone", onFonts);
      ro?.disconnect();
    };
  }, [ref, max]);
}
