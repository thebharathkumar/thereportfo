import { PROJECTS, type Category, type Project } from "../content";

export const CATEGORIES: Category[] = [
  "Agents",
  "Evals and Observability",
  "RAG",
  "Governance and Trust",
  "Integration",
  "ML and Research",
];

export type FilterId = "all" | "featured" | Category;

export interface FilterDef {
  id: FilterId;
  label: string;
}

export const FILTER_DEFS: FilterDef[] = [
  { id: "all", label: "All" },
  { id: "featured", label: "Featured" },
  ...CATEGORIES.map((c) => ({ id: c, label: c })),
];

export interface IndexedProject {
  number: string;
  project: Project;
}

/** Flagship first, then featured, then the rest, roadmap last; content order within a rank. */
function rank(p: Project): number {
  if (p.roadmap) return 3;
  if (p.flagship) return 0;
  if (p.featured) return 1;
  return 2;
}

export function buildIndex(projects: Project[] = PROJECTS): IndexedProject[] {
  return projects
    .map((project, i) => ({ project, i }))
    .sort((a, b) => rank(a.project) - rank(b.project) || a.i - b.i)
    .map(({ project }, k) => ({ number: String(k + 1).padStart(2, "0"), project }));
}

export function matchesFilter(p: Project, f: FilterId): boolean {
  if (f === "all") return true;
  if (f === "featured") return p.featured === true;
  return p.tags.includes(f);
}

export function filterIndex(index: IndexedProject[], f: FilterId): IndexedProject[] {
  return index.filter((e) => matchesFilter(e.project, f));
}
