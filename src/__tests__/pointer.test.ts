import { describe, expect, it } from "vitest";
import { hoverKindFor, stepPointer, type PointerState } from "../lib/pointer";

const fresh = (): PointerState => ({
  target: { x: 100, y: 100 },
  blob: { x: 0, y: 0 },
  light: { x: 0, y: 0 },
  active: true,
  hoverKind: null,
});

describe("stepPointer", () => {
  it("moves the blob faster than the light toward the target", () => {
    const s = fresh();
    stepPointer(s);
    expect(s.blob.x).toBeCloseTo(18);
    expect(s.light.x).toBeCloseTo(8);
    for (let i = 0; i < 200; i++) stepPointer(s);
    expect(s.blob.x).toBeCloseTo(100, 1);
    expect(s.light.x).toBeCloseTo(100, 1);
  });
});

describe("hoverKindFor", () => {
  it("classifies links, cells and everything else", () => {
    document.body.innerHTML = `
      <article data-cell><p><span id="inCell">x</span></p><a id="link" href="#"><b id="inLink">y</b></a></article>
      <div id="plain"></div>`;
    expect(hoverKindFor(document.getElementById("inCell"))).toBe("cell");
    expect(hoverKindFor(document.getElementById("inLink"))).toBe("link");
    expect(hoverKindFor(document.getElementById("plain"))).toBeNull();
    expect(hoverKindFor(null)).toBeNull();
  });
});
