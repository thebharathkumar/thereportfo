import { describe, expect, it } from "vitest";
import { hashString, mulberry32 } from "../lib/prng";

describe("hashString", () => {
  it("is deterministic and unsigned", () => {
    expect(hashString("ForgeSync")).toBe(hashString("ForgeSync"));
    expect(hashString("ForgeSync")).toBeGreaterThanOrEqual(0);
  });
  it("differs across slugs", () => {
    expect(hashString("agent-triage")).not.toBe(hashString("agent-rx"));
    expect(hashString("")).not.toBe(hashString("a"));
  });
});

describe("mulberry32", () => {
  it("is reproducible for a seed and stays in [0,1)", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    for (let i = 0; i < 100; i++) {
      const v = a();
      expect(v).toBe(b());
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
  it("differs across seeds", () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });
});
