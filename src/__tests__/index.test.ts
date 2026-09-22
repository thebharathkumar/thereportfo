import { describe, expect, it } from "vitest";
import { PROJECTS } from "../content";
import { FILTER_DEFS, buildIndex, filterIndex } from "../lib/index";

describe("buildIndex", () => {
  const index = buildIndex(PROJECTS);
  it("numbers all 24 projects 01..24", () => {
    expect(index).toHaveLength(24);
    expect(index.map((e) => e.number)).toEqual(
      Array.from({ length: 24 }, (_, i) => String(i + 1).padStart(2, "0")),
    );
  });
  it("puts the flagship first, featured next, roadmap last", () => {
    expect(index[0].project.slug).toBe("ForgeSync");
    for (let i = 1; i <= 8; i++) expect(index[i].project.featured).toBe(true);
    expect(index[23].project.roadmap).toBe(true);
  });
  it("keeps content order within a rank", () => {
    const featuredSlugs = PROJECTS.filter((p) => p.featured && !p.flagship).map((p) => p.slug);
    expect(index.slice(1, 9).map((e) => e.project.slug)).toEqual(featuredSlugs);
  });
});

describe("filterIndex", () => {
  const index = buildIndex(PROJECTS);
  it("All returns everything, Featured returns 9", () => {
    expect(filterIndex(index, "all")).toHaveLength(24);
    expect(filterIndex(index, "featured")).toHaveLength(9);
  });
  it("category filters match tags and keep numbers stable", () => {
    const rag = filterIndex(index, "RAG");
    expect(rag.every((e) => e.project.tags.includes("RAG"))).toBe(true);
    const obindoc = index.find((e) => e.project.slug === "obindoc")!;
    expect(rag.find((e) => e.project.slug === "obindoc")!.number).toBe(obindoc.number);
  });
  it("exposes All, Featured and the six categories in order", () => {
    expect(FILTER_DEFS.map((f) => f.label)).toEqual([
      "All",
      "Featured",
      "Agents",
      "Evals and Observability",
      "RAG",
      "Governance and Trust",
      "Integration",
      "ML and Research",
    ]);
  });
});
