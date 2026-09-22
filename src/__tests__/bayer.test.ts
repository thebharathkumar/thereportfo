import { describe, expect, it } from "vitest";
import { bayerMatrix, thresholdMatrix } from "../lib/bayer";

describe("bayerMatrix", () => {
  it("builds the 2x2 base", () => {
    expect(bayerMatrix(2)).toEqual([
      [0, 2],
      [3, 1],
    ]);
  });
  it("builds the standard 4x4", () => {
    expect(bayerMatrix(4)).toEqual([
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ]);
  });
  it("builds an 8x8 permutation of 0..63", () => {
    const m = bayerMatrix(8);
    const flat = m.flat().sort((a, b) => a - b);
    expect(flat).toEqual(Array.from({ length: 64 }, (_, i) => i));
  });
});

describe("thresholdMatrix", () => {
  it("normalizes to (v + 0.5) / n^2", () => {
    const t = thresholdMatrix(4);
    expect(t[0][0]).toBeCloseTo(0.5 / 16);
    expect(t[3][0]).toBeCloseTo(15.5 / 16);
    expect(t[1][2]).toBeCloseTo(14.5 / 16);
  });
});
