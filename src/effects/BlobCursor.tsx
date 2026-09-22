import { useEffect, useRef } from "react";
import { finePointer } from "../lib/env";
import { subscribePointer } from "../lib/pointer";

/** Eased blob that trails the cursor; hidden without a fine pointer. The native cursor stays.
    The outer element only translates; the inner dot scales, so scaling never moves the blob. */
export function BlobCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const d = dot.current;
    if (!el || !d || !finePointer()) return;
    return subscribePointer((s) => {
      el.style.display = s.active ? "block" : "none";
      el.style.transform = `translate3d(${s.blob.x}px, ${s.blob.y}px, 0)`;
      const k = s.hoverKind === "link" ? 3.2 : s.hoverKind === "cell" ? 1.8 : 1;
      d.style.transform = `translate(-50%, -50%) scale(${k})`;
    });
  }, []);

  return (
    <div ref={ref} className="blob" aria-hidden="true">
      <div ref={dot} className="blob__dot" />
    </div>
  );
}
