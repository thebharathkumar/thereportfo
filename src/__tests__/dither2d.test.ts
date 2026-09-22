import { describe, expect, it } from "vitest";
import { coverField, coverParams, renderCoverMask, valueNoise } from "../lib/dither2d";

describe("valueNoise", () => {
  it("stays in [0,1] and is continuous-ish", () => {
    for (let i = 0; i < 200; i++) {
      const v = valueNoise(i * 0.37, i * 0.11);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
    expect(Math.abs(valueNoise(1.5, 1.5) - valueNoise(1.51, 1.5))).toBeLessThan(0.05);
  });
});

describe("coverParams", () => {
  it("is deterministic per slug and differs across slugs", () => {
    expect(coverParams("loopcheck")).toEqual(coverParams("loopcheck"));
    expect(coverParams("loopcheck")).not.toEqual(coverParams("costfloor"));
  });
});

describe("coverField", () => {
  it("returns values in [0,1]", () => {
    const p = coverParams("obindoc");
    for (let i = 0; i < 100; i++) {
      const v = coverField(p, (i % 10) / 10, Math.floor(i / 10) / 10, 0.5);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });
});

describe("renderCoverMask", () => {
  it("returns a w*h mask of 0/1 with both values present", () => {
    const m = renderCoverMask("ForgeSync", 128, 80, 0);
    expect(m.length).toBe(128 * 80);
    let on = 0;
    for (const v of m) {
      expect(v === 0 || v === 1).toBe(true);
      on += v;
    }
    expect(on).toBeGreaterThan(0);
    expect(on).toBeLessThan(m.length);
  });
  it("is deterministic per slug, differs across slugs, and changes with time", () => {
    const a = renderCoverMask("agent-triage", 64, 40, 0);
    const b = renderCoverMask("agent-triage", 64, 40, 0);
    const c = renderCoverMask("streamsense", 64, 40, 0);
    const d = renderCoverMask("agent-triage", 64, 40, 2);
    expect(Array.from(a)).toEqual(Array.from(b));
    expect(Array.from(a)).not.toEqual(Array.from(c));
    expect(Array.from(a)).not.toEqual(Array.from(d));
  });
});
