import { describe, expect, it } from "vitest";
import * as content from "../content";
import { EXPERIENCE, PROFILE, PROJECTS } from "../content";

const bySlug = (slug: string) => {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) throw new Error(`missing project ${slug}`);
  return p;
};

function allStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => allStrings(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => allStrings(v, out));
  return out;
}

describe("content honesty rules", () => {
  it("Artie Labs pull requests are opened, never merged", () => {
    const oss = EXPERIENCE.find((e) => e.org.includes("Artie Labs"));
    expect(oss).toBeDefined();
    const artie = oss!.points.find((p) => p.includes("Artie Labs"))!;
    expect(artie).toContain("opened");
    expect(artie.toLowerCase()).not.toContain("merged");
  });

  it("MCP Trust Scanner is roadmap, not shipped", () => {
    const p = bySlug("MCP-Trust-Scanner");
    expect(p.roadmap).toBe(true);
    expect(p.badgeLabel).toBe("ROADMAP");
    expect(p.desc.startsWith("Roadmap, not built")).toBe(true);
  });

  it("downgrade is in progress and publishes no test count", () => {
    const p = bySlug("downgrade");
    expect(p.badgeLabel).toBe("IN PROGRESS");
    expect(p.desc).not.toMatch(/\d+ tests/);
  });

  it("loopcheck ships its recall figure with its caveat", () => {
    const p = bySlug("loopcheck");
    expect(p.desc).toContain("0.33");
    expect(p.desc).toContain("too small");
  });

  it("Compsoft is NLP only", () => {
    const e = EXPERIENCE.find((x) => x.org === "Compsoft Technologies")!;
    expect(allStrings(e).join(" ")).not.toMatch(/CNN/);
  });

  it("has no em dashes anywhere", () => {
    for (const s of allStrings(content)) expect(s).not.toContain("—");
  });

  it("keeps the confirmed profile facts", () => {
    expect(PROFILE.quickFacts).toContain("GPA 3.87");
    expect(PROFILE.links.email).toBe("bharath.kr702@gmail.com");
    expect(PROFILE.links.resume).toBe("/resume.pdf");
    expect(PROJECTS).toHaveLength(24);
  });
});
