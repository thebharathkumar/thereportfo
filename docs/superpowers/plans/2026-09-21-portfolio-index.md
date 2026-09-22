# thebharath.co "The Index" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the single-page dark editorial portfolio for Bharath Kumar Rajesh described in the spec: numbered hairline project index, giant serif wordmark, pill filters, and three effects (1-bit Bayer dither, flashlight, blob cursor), with all facts ported verbatim from the old site.

**Architecture:** Vite + React 19 + TypeScript SPA, no UI or animation libraries. Pure logic lives in `src/lib` (PRNG, Bayer matrices, cover field, project index, shared pointer store) and is unit-tested. Effects are three small components that read the pointer store each frame without React re-renders. Sections are plain components fed by `src/content.ts`.

**Tech Stack:** Vite, React 19, TypeScript (strict), Vitest, @testing-library/react, jsdom, hand-written WebGL1 GLSL. Google Fonts: Fraunces, Geist, Geist Mono (verified served on 2026-09-21).

**Spec:** `docs/superpowers/specs/2026-09-21-portfolio-index-design.md`

## Global Constraints

- Content is a verbatim port of the old `content.js` (extracted at `/private/tmp/claude-501/-Volumes-Bharath-SSD-portfolio-redo/2734ef41-2c81-4191-9eba-269c5169e8fd/scratchpad/existing/thereportfo-claude-determined-shannon-sefcnt/src/content.js`). No invented metrics, no new facts. GPA 3.87. Email bharath.kr702@gmail.com. No photo.
- The Artie Labs line says "opened"; the word "merged" never appears in it.
- MCP Trust Scanner: `roadmap: true`, badge ROADMAP, dashed border, desc starts "Roadmap, not built", last in the index.
- `downgrade`: badge IN PROGRESS, no test count in its desc.
- loopcheck: "0.33" and "too small" appear together in its desc.
- Compsoft Technologies: NLP only, never mentions CNN.
- No em dashes ("—") in any copy, content or UI.
- Dark only. Tokens: `--bg #0f0f0e`, `--paper #ebe7dc`, `--paper-dim rgba(235,231,220,.62)`, `--paper-faint rgba(235,231,220,.35)`, `--line rgba(235,231,220,.14)`, `--lift rgba(235,231,220,.035)`, `--accent #e0b84c`.
- Fonts: Fraunces (display), Geist Mono (UI/labels), Geist (paragraphs).
- Dependencies: `react`, `react-dom` only at runtime. Dev: vite, @vitejs/plugin-react, typescript, vitest, jsdom, @testing-library/react, @testing-library/jest-dom, @types/react, @types/react-dom.
- `prefers-reduced-motion` and no-WebGL fallbacks per spec section 6.
- No git operations (init, commit, push) unless Bharath asks. Task steps therefore have no commit step.
- Working directory: `/Volumes/Bharath SSD/portfolio redo` (contains a space; quote paths).

## File Structure

```
index.html                      meta, OG, JSON-LD Person, font links, #root
package.json                    scripts dev/build/preview/test/typecheck
tsconfig.json  vite.config.ts   strict TS; vitest jsdom env + setup file
vercel.json  .gitignore  README.md
public/resume.pdf  public/favicon.svg
src/main.tsx                    mount
src/App.tsx                     composition + useReveal
src/content.ts                  typed facts
src/styles.css                  tokens, base, nav, hero, work, experience, numbers, skills, credentials, contact, effects
src/lib/prng.ts                 hashString, mulberry32
src/lib/bayer.ts                bayerMatrix, thresholdMatrix
src/lib/dither2d.ts             coverParams, valueNoise, coverField, renderCoverMask
src/lib/index.ts                FILTER_DEFS, buildIndex, matchesFilter, filterIndex
src/lib/env.ts                  finePointer, reducedMotion, onMediaChange, hasWebGL
src/lib/pointer.ts              shared eased pointer store
src/hooks/useFitText.ts
src/hooks/useReveal.ts
src/effects/heroShader.ts       VERT, FRAG
src/effects/HeroField.tsx
src/effects/DitherCover.tsx
src/effects/BlobCursor.tsx
src/sections/SectionHeader.tsx Nav.tsx Hero.tsx Work.tsx Experience.tsx Numbers.tsx Skills.tsx Credentials.tsx Contact.tsx
src/__tests__/setup.ts prng.test.ts bayer.test.ts dither2d.test.ts index.test.ts pointer.test.ts content.test.ts Work.test.tsx Hero.test.tsx
```

---

### Task 1: Scaffold, content port, content guard tests

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `vercel.json`, `.gitignore`, `public/favicon.svg`, `public/resume.pdf`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`, `src/content.ts`
- Test: `src/__tests__/setup.ts`, `src/__tests__/content.test.ts`

**Interfaces:**
- Produces: `src/content.ts` exports `PROFILE`, `SKILLS`, `EXPERIENCE`, `ERRORBARS`, `ERRORBARS_FOOT`, `PROJECTS`, `WRITING`, `EDUCATION`, `CERTS`, `PUBLICATIONS` and types `Category`, `Project`, `Experience`, `ErrorBar`, `SkillGroup`, `Cert`, `Publication`, `Education`, `WritingItem`.

- [x] **Step 1: Create package.json and install**

```json
{
  "name": "thebharath.co",
  "private": true,
  "version": "2.0.0",
  "type": "module",
  "description": "Bharath Kumar Rajesh, AI Engineer. Portfolio at thebharath.co.",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "typecheck": "tsc"
  }
}
```

Run (in the project dir):
```bash
npm install react react-dom
npm install -D vite @vitejs/plugin-react typescript vitest jsdom @testing-library/react @testing-library/jest-dom @types/react @types/react-dom
```
Expected: `node_modules/` created, `package.json` gains `dependencies` and `devDependencies` with current versions.

- [x] **Step 2: tsconfig.json, vite.config.ts, .gitignore, vercel.json**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "noEmit": true,
    "types": ["vite/client"]
  },
  "include": ["src", "vite.config.ts"]
}
```

`vite.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["src/__tests__/setup.ts"],
  },
});
```

`.gitignore`:
```
node_modules
dist
.DS_Store
```

`vercel.json`:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/", "headers": [{ "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }] },
    { "source": "/index.html", "headers": [{ "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }] }
  ]
}
```

- [x] **Step 3: index.html, favicon, resume**

`index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bharath Kumar Rajesh, AI Engineer</title>
    <meta name="description" content="Bharath Kumar Rajesh, AI Engineer building reliable agentic systems. Triage, evals, observability, and governance tooling that makes agents trustworthy in production." />
    <meta name="theme-color" content="#0f0f0e" />
    <link rel="canonical" href="https://thebharath.co" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta property="og:title" content="Bharath Kumar Rajesh, AI Engineer" />
    <meta property="og:description" content="AI Engineer building reliable agentic systems. The triage, eval, and governance tooling that makes agents trustworthy in production." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://thebharath.co" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Bharath Kumar Rajesh, AI Engineer" />
    <meta name="twitter:description" content="AI Engineer building reliable agentic systems. Triage, evals, observability, and governance tooling for production agents." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Geist+Mono:wght@400;500&family=Geist:wght@400;500&display=swap" rel="stylesheet" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Bharath Kumar Rajesh",
        "jobTitle": "AI Engineer",
        "url": "https://thebharath.co",
        "email": "mailto:bharath.kr702@gmail.com",
        "address": { "@type": "PostalAddress", "addressLocality": "New York City" },
        "alumniOf": "Pace University, Seidenberg School",
        "sameAs": [
          "https://github.com/thebharathkumar",
          "https://linkedin.com/in/thebharathkumar",
          "https://medium.com/@thebharathkumar",
          "https://twitter.com/passdweed"
        ]
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#0f0f0e"/><text x="32" y="47" font-family="Georgia, 'Times New Roman', serif" font-size="46" text-anchor="middle" fill="#ebe7dc">B</text></svg>
```

Copy the resume:
```bash
cp "/private/tmp/claude-501/-Volumes-Bharath-SSD-portfolio-redo/2734ef41-2c81-4191-9eba-269c5169e8fd/scratchpad/existing/thereportfo-claude-determined-shannon-sefcnt/Bharath_Kumar_Rajesh_Master_Resume.pdf" "public/resume.pdf"
```

- [x] **Step 4: Write the failing content guard tests**

`src/__tests__/setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";

// jsdom has no canvas or observers; components guard on these being absent.
HTMLCanvasElement.prototype.getContext = (() => null) as unknown as HTMLCanvasElement["getContext"];
```

`src/__tests__/content.test.ts`:
```ts
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
```

- [x] **Step 5: Run the tests to verify they fail**

Run: `npm test -- src/__tests__/content.test.ts`
Expected: FAIL, "Cannot find module '../content'".

- [x] **Step 6: Write src/content.ts**

Head of the file (types), then the data. The data blocks are copied byte-for-byte from the old `content.js` with exactly these changes: `window.X =` becomes `export const X: Type =`; `const gh` stays; `CATS`, `BOOT`, `FILTERS`, and `NAV` are dropped; the `code` and `status` fields are removed from each experience entry; `resume: "resume.pdf"` becomes `resume: "/resume.pdf"`; the `WRITING.stub` field is dropped.

```ts
/* ============================================================
   content.ts  ::  single source of truth for thebharath.co
   Rules: no em dashes, no invented metrics, NLP-only for
   Compsoft, Artie Labs PRs are opened (never merged),
   MCP Trust Scanner is roadmap (not shipped).
   ============================================================ */

export type Category =
  | "Agents"
  | "Evals and Observability"
  | "RAG"
  | "Governance and Trust"
  | "Integration"
  | "ML and Research";

export interface Project {
  slug: string;
  name: string;
  desc: string;
  stack: string[];
  tags: Category[];
  repo: string;
  featured?: boolean;
  flagship?: boolean;
  roadmap?: boolean;
  inDev?: boolean;
  badgeLabel?: string;
  facts?: string[];
  perf?: string;
  pypi?: string;
}

export interface Experience {
  role: string;
  org: string;
  period: string;
  points: string[];
  stack: string[];
}

export interface ErrorBar {
  claim: string;
  figure: string;
  caveat: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Cert {
  badge: string;
  title: string;
  issuer: string;
  date: string;
}

export interface Publication {
  venue: string;
  meta: string;
  title: string;
  figure: string;
}

export interface Education {
  school: string;
  degree: string;
  detail: string;
}

export interface WritingItem {
  kind: string;
  title: string;
  handle: string;
  desc: string;
  href: string;
}

export const PROFILE = {
  name: "Bharath Kumar Rajesh",
  title: "AI Engineer",
  city: "New York City",
  coords: "40.7128 N, 74.0060 W",
  relocation: ["Bay Area", "Dallas", "Orlando", "Seattle"],
  headline: "AI Engineer building reliable agentic systems.",
  thesis:
    "I build the triage, eval, and governance tooling that makes agents trustworthy in production.",
  quickFacts: ["MS CS, Pace Seidenberg", "GPA 3.87", "New York City", "Open to relocation"],
  roles: ["AI Engineer", "Forward Deployed Engineer", "Software Engineer"],
  sponsorship: "On F-1 OPT. Will require H-1B sponsorship in the future.",
  links: {
    github: "https://github.com/thebharathkumar",
    linkedin: "https://linkedin.com/in/thebharathkumar",
    medium: "https://medium.com/@thebharathkumar",
    twitter: "https://twitter.com/passdweed",
    portfolio: "https://thebharath.co",
    email: "bharath.kr702@gmail.com",
    resume: "/resume.pdf",
  },
};

export const SKILLS: SkillGroup[] = [ /* copied verbatim from window.SKILLS */ ];
export const EXPERIENCE: Experience[] = [ /* copied verbatim, minus code/status */ ];
export const ERRORBARS: ErrorBar[] = [ /* copied verbatim */ ];
export const ERRORBARS_FOOT = "Every figure above is published in a public README or came off a committed benchmark report.";
const gh = "https://github.com/thebharathkumar/";
export const PROJECTS: Project[] = [ /* copied verbatim; tags typed as Category */ ];
export const WRITING: { items: WritingItem[] } = { items: [ /* copied verbatim, href uses PROFILE.links.medium and gh */ ] };
export const EDUCATION: Education[] = [ /* copied verbatim */ ];
export const CERTS: Cert[] = [ /* copied verbatim */ ];
export const PUBLICATIONS: Publication[] = [ /* copied verbatim */ ];
```

The `/* copied verbatim */` markers above stand for the literal arrays from the old file; the executor pastes them. Nothing in the pasted data is edited.

- [x] **Step 7: Minimal app shell so the build has an entry**

`src/main.tsx`:
```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

`src/App.tsx` (temporary shell, replaced in Task 8):
```tsx
import { PROFILE } from "./content";

export function App() {
  return <h1>{PROFILE.name}</h1>;
}
```

`src/styles.css` (tokens and base; later tasks append sections below this block):
```css
/* ---- tokens ---- */
:root {
  --bg: #0f0f0e;
  --paper: #ebe7dc;
  --paper-dim: rgba(235, 231, 220, 0.62);
  --paper-faint: rgba(235, 231, 220, 0.35);
  --line: rgba(235, 231, 220, 0.14);
  --lift: rgba(235, 231, 220, 0.035);
  --accent: #e0b84c;
  --font-display: "Fraunces", Georgia, "Times New Roman", serif;
  --font-mono: "Geist Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --font-sans: "Geist", system-ui, -apple-system, "Segoe UI", sans-serif;
  --gutter: 24px;
  --nav-h: 56px;
  color-scheme: dark;
}
@media (min-width: 760px) {
  :root { --gutter: 40px; }
}

/* ---- base ---- */
*, *::before, *::after { box-sizing: border-box; }
html {
  background: var(--bg);
  color: var(--paper);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}
body { margin: 0; min-height: 100vh; }
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
.meta {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--paper);
}
.meta--dim { color: var(--paper-dim); }
.meta--faint { color: var(--paper-faint); }
.label {
  font: 500 11px/1 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--paper-dim);
}
.chips { display: flex; flex-wrap: wrap; gap: 6px; list-style: none; margin: 0; padding: 0; }
.chips li {
  font: 400 11px/1 var(--font-mono);
  letter-spacing: 0.03em;
  padding: 5px 7px;
  border: 1px solid var(--line);
  color: var(--paper-dim);
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

- [x] **Step 8: Run tests and build to verify green**

Run: `npm test` then `npm run build`
Expected: content tests PASS (7 tests); `dist/index.html` and `dist/assets/*` produced with no TypeScript errors.

---

### Task 2: PRNG and Bayer matrices

**Files:**
- Create: `src/lib/prng.ts`, `src/lib/bayer.ts`
- Test: `src/__tests__/prng.test.ts`, `src/__tests__/bayer.test.ts`

**Interfaces:**
- Produces: `hashString(s: string): number` (FNV-1a 32-bit, unsigned), `mulberry32(seed: number): () => number` (values in [0,1)), `type BayerSize = 2 | 4 | 8`, `bayerMatrix(n: BayerSize): number[][]` (integers 0..n*n-1), `thresholdMatrix(n: BayerSize): number[][]` (each `(v + 0.5) / (n*n)`).

- [x] **Step 1: Write the failing tests**

`src/__tests__/prng.test.ts`:
```ts
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
```

`src/__tests__/bayer.test.ts`:
```ts
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
```

- [x] **Step 2: Run to verify they fail**

Run: `npm test -- src/__tests__/prng.test.ts src/__tests__/bayer.test.ts`
Expected: FAIL, modules not found.

- [x] **Step 3: Implement**

`src/lib/prng.ts`:
```ts
/** FNV-1a 32-bit hash of a string, returned unsigned. Seeds the per-project covers. */
export function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Small, fast, seedable PRNG. Returns a function producing values in [0, 1). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
```

`src/lib/bayer.ts`:
```ts
export type BayerSize = 2 | 4 | 8;

/** Ordered-dither matrix, built recursively: M(2n) = [[4M, 4M+2], [4M+3, 4M+1]]. */
export function bayerMatrix(n: BayerSize): number[][] {
  if (n === 2) {
    return [
      [0, 2],
      [3, 1],
    ];
  }
  const h = (n / 2) as BayerSize;
  const half = bayerMatrix(h);
  const m = Array.from({ length: n }, () => new Array<number>(n).fill(0));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < h; x++) {
      const v = 4 * half[y][x];
      m[y][x] = v;
      m[y][x + h] = v + 2;
      m[y + h][x] = v + 3;
      m[y + h][x + h] = v + 1;
    }
  }
  return m;
}

/** Same matrix scaled to (0, 1): a pixel is "on" when its value exceeds this threshold. */
export function thresholdMatrix(n: BayerSize): number[][] {
  const d = n * n;
  return bayerMatrix(n).map((row) => row.map((v) => (v + 0.5) / d));
}
```

- [x] **Step 4: Run to verify green**

Run: `npm test -- src/__tests__/prng.test.ts src/__tests__/bayer.test.ts`
Expected: PASS (8 tests).

---

### Task 3: Cover field and mask renderer

**Files:**
- Create: `src/lib/dither2d.ts`
- Test: `src/__tests__/dither2d.test.ts`

**Interfaces:**
- Consumes: `hashString`, `mulberry32` (Task 2), `thresholdMatrix(4)` (Task 2).
- Produces: `interface CoverParams { fx; fy; rot; warp; bands; phase; nx; ny }` (all numbers), `coverParams(slug: string): CoverParams`, `valueNoise(x: number, y: number): number` in [0,1], `coverField(p: CoverParams, u: number, v: number, t: number): number` in [0,1], `renderCoverMask(slug: string, w: number, h: number, t: number): Uint8Array` of length `w*h` with values 0 or 1.

- [x] **Step 1: Write the failing tests**

`src/__tests__/dither2d.test.ts`:
```ts
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
```

- [x] **Step 2: Run to verify they fail**

Run: `npm test -- src/__tests__/dither2d.test.ts`
Expected: FAIL, module not found.

- [x] **Step 3: Implement**

`src/lib/dither2d.ts`:
```ts
import { thresholdMatrix } from "./bayer";
import { hashString, mulberry32 } from "./prng";

/** Per-project pattern parameters, drawn once from a PRNG seeded by the slug. */
export interface CoverParams {
  fx: number;
  fy: number;
  rot: number;
  warp: number;
  bands: number;
  phase: number;
  nx: number;
  ny: number;
}

export function coverParams(slug: string): CoverParams {
  const r = mulberry32(hashString(slug));
  return {
    fx: 1.5 + r() * 4,
    fy: 1.5 + r() * 4,
    rot: r() * Math.PI,
    warp: 0.2 + r() * 0.8,
    bands: 3 + Math.floor(r() * 5),
    phase: r() * Math.PI * 2,
    nx: 2 + r() * 4,
    ny: 2 + r() * 4,
  };
}

function hash2(x: number, y: number): number {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h ^= h >>> 13;
  h = Math.imul(h, 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const smooth = (t: number) => t * t * (3 - 2 * t);

/** 2D value noise in [0, 1]. */
export function valueNoise(x: number, y: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = smooth(x - x0);
  const ty = smooth(y - y0);
  const a = hash2(x0, y0);
  const b = hash2(x0 + 1, y0);
  const c = hash2(x0, y0 + 1);
  const d = hash2(x0 + 1, y0 + 1);
  return (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty;
}

/** Brightness in [0, 1] at normalized position (u, v) and time t: warped sine bands plus noise. */
export function coverField(p: CoverParams, u: number, v: number, t: number): number {
  const cx = u - 0.5;
  const cy = v - 0.5;
  const rx = cx * Math.cos(p.rot) - cy * Math.sin(p.rot);
  const ry = cx * Math.sin(p.rot) + cy * Math.cos(p.rot);
  const n = valueNoise(u * p.nx + t * 0.15, v * p.ny - t * 0.1);
  const w = p.warp * (n - 0.5);
  const s =
    Math.sin((rx * p.fx + w) * Math.PI * 2 + p.phase + t) * 0.5 +
    Math.sin((ry * p.fy - w) * Math.PI * 2 - t * 0.7) * 0.5;
  const bands = Math.abs((((s * 0.5 + 0.5) * p.bands) % 1) - 0.5) * 2;
  return Math.min(1, Math.max(0, 0.35 * n + 0.65 * bands));
}

const T4 = thresholdMatrix(4);

/** 1-bit mask (0/1 per pixel), row-major, dithered with the 4x4 Bayer matrix. */
export function renderCoverMask(slug: string, w: number, h: number, t: number): Uint8Array {
  const p = coverParams(slug);
  const out = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    const row = T4[y & 3];
    for (let x = 0; x < w; x++) {
      const v = coverField(p, (x + 0.5) / w, (y + 0.5) / h, t);
      out[y * w + x] = v > row[x & 3] ? 1 : 0;
    }
  }
  return out;
}
```

- [x] **Step 4: Run to verify green**

Run: `npm test -- src/__tests__/dither2d.test.ts`
Expected: PASS (5 tests).

---

### Task 4: Project index and filters

**Files:**
- Create: `src/lib/index.ts`
- Test: `src/__tests__/index.test.ts`

**Interfaces:**
- Consumes: `PROJECTS`, `Project`, `Category` (Task 1).
- Produces: `type FilterId = "all" | "featured" | Category`, `interface FilterDef { id: FilterId; label: string }`, `FILTER_DEFS: FilterDef[]`, `interface IndexedProject { number: string; project: Project }`, `buildIndex(projects?: Project[]): IndexedProject[]`, `matchesFilter(p: Project, f: FilterId): boolean`, `filterIndex(index: IndexedProject[], f: FilterId): IndexedProject[]`.

- [x] **Step 1: Write the failing tests**

`src/__tests__/index.test.ts`:
```ts
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
```

- [x] **Step 2: Run to verify they fail**

Run: `npm test -- src/__tests__/index.test.ts`
Expected: FAIL, module not found.

- [x] **Step 3: Implement**

`src/lib/index.ts`:
```ts
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
```

- [x] **Step 4: Run to verify green**

Run: `npm test -- src/__tests__/index.test.ts`
Expected: PASS (6 tests).

---

### Task 5: Environment flags, pointer store, hooks

**Files:**
- Create: `src/lib/env.ts`, `src/lib/pointer.ts`, `src/hooks/useFitText.ts`, `src/hooks/useReveal.ts`
- Test: `src/__tests__/pointer.test.ts`

**Interfaces:**
- Produces (env): `finePointer(): boolean`, `reducedMotion(): boolean`, `onMediaChange(query: string, cb: (matches: boolean) => void): () => void`, `hasWebGL(): boolean`.
- Produces (pointer): `type HoverKind = "link" | "cell" | null`, `interface Point { x: number; y: number }`, `interface PointerState { target: Point; blob: Point; light: Point; active: boolean; hoverKind: HoverKind }`, `getPointer(): PointerState`, `startPointer(): void` (idempotent), `subscribePointer(fn: (s: PointerState) => void): () => void`, `stepPointer(s: PointerState): void`, `hoverKindFor(target: EventTarget | null): HoverKind`.
- Produces (hooks): `useFitText(ref: RefObject<HTMLElement | null>, max?: number): void`, `useReveal(): void`.

- [x] **Step 1: Write the failing test**

`src/__tests__/pointer.test.ts`:
```ts
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
```

- [x] **Step 2: Run to verify it fails**

Run: `npm test -- src/__tests__/pointer.test.ts`
Expected: FAIL, module not found.

- [x] **Step 3: Implement env, pointer, hooks**

`src/lib/env.ts`:
```ts
const mq = (q: string): MediaQueryList | null =>
  typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(q) : null;

export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function finePointer(): boolean {
  return mq(FINE_POINTER)?.matches ?? false;
}

export function reducedMotion(): boolean {
  return mq(REDUCED_MOTION)?.matches ?? false;
}

export function onMediaChange(query: string, cb: (matches: boolean) => void): () => void {
  const m = mq(query);
  if (!m) return () => {};
  const handler = (e: MediaQueryListEvent) => cb(e.matches);
  m.addEventListener("change", handler);
  return () => m.removeEventListener("change", handler);
}

export function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}
```

`src/lib/pointer.ts`:
```ts
/* Shared eased pointer: one rAF loop, two lerps (blob fast, light slow).
   Effects read it directly; React never re-renders per frame. */

export type HoverKind = "link" | "cell" | null;

export interface Point {
  x: number;
  y: number;
}

export interface PointerState {
  target: Point;
  blob: Point;
  light: Point;
  active: boolean;
  hoverKind: HoverKind;
}

const BLOB_K = 0.18;
const LIGHT_K = 0.08;

const state: PointerState = {
  target: { x: -100, y: -100 },
  blob: { x: -100, y: -100 },
  light: { x: -100, y: -100 },
  active: false,
  hoverKind: null,
};

type Listener = (s: PointerState) => void;
const listeners = new Set<Listener>();
let started = false;

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

export function stepPointer(s: PointerState): void {
  s.blob.x = lerp(s.blob.x, s.target.x, BLOB_K);
  s.blob.y = lerp(s.blob.y, s.target.y, BLOB_K);
  s.light.x = lerp(s.light.x, s.target.x, LIGHT_K);
  s.light.y = lerp(s.light.y, s.target.y, LIGHT_K);
}

export function hoverKindFor(target: EventTarget | null): HoverKind {
  const el = target instanceof Element ? target : null;
  const hit = el?.closest("a, button, [data-cell]") ?? null;
  if (!hit) return null;
  return hit.hasAttribute("data-cell") ? "cell" : "link";
}

export function getPointer(): PointerState {
  return state;
}

function tick(): void {
  stepPointer(state);
  for (const l of listeners) l(state);
  requestAnimationFrame(tick);
}

export function startPointer(): void {
  if (started || typeof window === "undefined") return;
  started = true;

  window.addEventListener(
    "pointermove",
    (e) => {
      state.target.x = e.clientX;
      state.target.y = e.clientY;
      if (!state.active) {
        state.active = true;
        state.blob = { ...state.target };
        state.light = { ...state.target };
      }
    },
    { passive: true },
  );
  const deactivate = () => {
    state.active = false;
  };
  window.addEventListener("pointerout", (e) => {
    if (!e.relatedTarget) deactivate();
  });
  window.addEventListener("pointerup", (e) => {
    if (e.pointerType === "touch") deactivate();
  });
  window.addEventListener("pointercancel", deactivate);
  window.addEventListener("blur", deactivate);
  document.addEventListener("pointerover", (e) => {
    state.hoverKind = hoverKindFor(e.target);
  });

  requestAnimationFrame(tick);
}

export function subscribePointer(fn: Listener): () => void {
  listeners.add(fn);
  startPointer();
  return () => {
    listeners.delete(fn);
  };
}
```

`src/hooks/useFitText.ts`:
```ts
import { useLayoutEffect, type RefObject } from "react";

/** Scales one line of text so it exactly fills its parent's width. Re-runs on resize and font load. */
export function useFitText(ref: RefObject<HTMLElement | null>, max = 480): void {
  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      el.style.fontSize = "100px";
      const w = el.scrollWidth;
      const target = parent.clientWidth;
      if (w > 0 && target > 0) el.style.fontSize = `${Math.min(max, (100 * target) / w)}px`;
    };
    fit();

    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) fit();
    });
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null;
    ro?.observe(parent);
    return () => {
      cancelled = true;
      ro?.disconnect();
    };
  }, [ref, max]);
}
```

`src/hooks/useReveal.ts`:
```ts
import { useEffect } from "react";
import { reducedMotion } from "../lib/env";

/** Adds .reveal to every [data-reveal] element, then .in when it scrolls into view.
    Fail-open: without an observer or with reduced motion, nothing is ever hidden. */
export function useReveal(): void {
  useEffect(() => {
    if (reducedMotion() || typeof IntersectionObserver === "undefined") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    for (const el of els) {
      el.classList.add("reveal");
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
}
```

- [x] **Step 4: Run to verify green**

Run: `npm test -- src/__tests__/pointer.test.ts && npm run typecheck`
Expected: PASS (2 tests); no type errors.

---

### Task 6: Effects (HeroField, DitherCover, BlobCursor)

**Files:**
- Create: `src/effects/heroShader.ts`, `src/effects/HeroField.tsx`, `src/effects/DitherCover.tsx`, `src/effects/BlobCursor.tsx`
- Modify: `src/styles.css` (append the effects block)

**Interfaces:**
- Consumes: `getPointer`, `startPointer`, `subscribePointer` (Task 5); `finePointer`, `reducedMotion`, `onMediaChange`, `hasWebGL`, `FINE_POINTER`, `REDUCED_MOTION` (Task 5); `renderCoverMask` (Task 3).
- Produces: `<HeroField />` (props none), `<DitherCover slug accent? hovered />` where `slug: string`, `accent?: boolean`, `hovered: boolean`; `<BlobCursor />`.

These components are verified in the browser (Task 9); their logic is in the tested libs. A jsdom render test is included in Task 7 to prove they mount without a canvas.

- [x] **Step 1: Shader source**

`src/effects/heroShader.ts`:
```ts
export const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

/* Dithered contour field lit by a flashlight. Every fragment ends as pure
   BG or PAPER: brightness falloff is expressed as dot density, never grey. */
export const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_light;
uniform float u_radius;
uniform float u_base;

const vec3 BG = vec3(0.059, 0.059, 0.055);
const vec3 PAPER = vec3(0.922, 0.906, 0.863);

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

/* Recursive Bayer without bit ops (WebGL1 safe). Values in [0, 1). */
float b2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float b4(vec2 a) { return b2(0.5 * a) * 0.25 + b2(a); }
float b8(vec2 a) { return b4(0.5 * a) * 0.25 + b2(a); }

void main() {
  vec2 px = gl_FragCoord.xy;
  vec2 uv = (px - 0.5 * u_res) / u_res.y;
  float t = u_time;

  vec2 w = 0.35 * vec2(noise(uv * 1.5 + t * 0.05), noise(uv * 1.5 - t * 0.05 + 3.1));
  float n = fbm(uv * 2.2 + w);
  float c = abs(fract(n * 7.0) - 0.5) * 2.0;
  float line = smoothstep(0.80, 1.0, c);
  float shade = 0.18 * n + 0.82 * line;

  float d = distance(px, u_light);
  float light = pow(1.0 - clamp(d / u_radius, 0.0, 1.0), 1.6);
  float v = shade * (u_base + (1.0 - u_base) * light);

  float on = step(b8(px), v);
  gl_FragColor = vec4(mix(BG, PAPER, on), 1.0);
}
`;
```

- [x] **Step 2: HeroField**

`src/effects/HeroField.tsx`:
```tsx
import { useEffect, useRef } from "react";
import { FINE_POINTER, REDUCED_MOTION, finePointer, hasWebGL, onMediaChange, reducedMotion } from "../lib/env";
import { getPointer, startPointer } from "../lib/pointer";
import { FRAG, VERT } from "./heroShader";

const SCALE = 2; // CSS pixels per dither cell
const RADIUS_CSS = 320;

export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = hasWebGL()
      ? canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" })
      : null;
    if (!gl) {
      canvas.classList.add("hero-field--fallback");
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) throw new Error("createShader failed");
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader error");
      return s;
    };
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      light: gl.getUniformLocation(prog, "u_light"),
      radius: gl.getUniformLocation(prog, "u_radius"),
      base: gl.getUniformLocation(prog, "u_base"),
    };

    let w = 1;
    let h = 1;
    let dirty = true;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width / SCALE));
      h = Math.max(1, Math.floor(r.height / SCALE));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      dirty = true;
    };
    resize();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    ro?.observe(canvas);

    let motion = !reducedMotion();
    let fine = finePointer();
    const offMotion = onMediaChange(REDUCED_MOTION, (m) => {
      motion = !m;
      dirty = true;
    });
    const offFine = onMediaChange(FINE_POINTER, (m) => {
      fine = m;
      dirty = true;
    });

    let visible = true;
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
          })
        : null;
    io?.observe(canvas);

    startPointer();
    const pointer = getPointer();
    let t = 0;
    let last = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      if (motion) t += dt;

      let lx: number;
      let ly: number;
      if (pointer.active) {
        const r = canvas.getBoundingClientRect();
        lx = (pointer.light.x - r.left) / SCALE;
        ly = h - (pointer.light.y - r.top) / SCALE;
      } else if (motion) {
        lx = w * (0.5 + 0.35 * Math.sin(t * 0.11));
        ly = h * (0.5 + 0.3 * Math.cos(t * 0.07));
      } else {
        lx = w * 0.5;
        ly = h * 0.55;
      }
      if (!motion && !dirty && !pointer.active) return;

      gl.uniform2f(u.res, w, h);
      gl.uniform1f(u.time, t);
      gl.uniform2f(u.light, lx, ly);
      gl.uniform1f(u.radius, RADIUS_CSS / SCALE);
      gl.uniform1f(u.base, fine && motion ? 0.07 : 0.35);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      dirty = false;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      offMotion();
      offFine();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className="hero-field" aria-hidden="true" />;
}
```

- [x] **Step 3: DitherCover**

`src/effects/DitherCover.tsx`:
```tsx
import { useEffect, useRef } from "react";
import { renderCoverMask } from "../lib/dither2d";
import { reducedMotion } from "../lib/env";

export const COVER_W = 128;
export const COVER_H = 80;
const PAPER = [235, 231, 220] as const;
const ACCENT = [224, 184, 76] as const;
const BG = [15, 15, 14] as const;

interface Props {
  slug: string;
  accent?: boolean;
  hovered: boolean;
}

/** Generative 1-bit cover, seeded by the slug. Animates only while hovered. */
export function DitherCover({ slug, accent = false, hovered }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const on = accent ? ACCENT : PAPER;
    const img = ctx.createImageData(COVER_W, COVER_H);

    const paint = (t: number) => {
      const m = renderCoverMask(slug, COVER_W, COVER_H, t);
      const d = img.data;
      for (let i = 0; i < m.length; i++) {
        const c = m[i] ? on : BG;
        d[i * 4] = c[0];
        d[i * 4 + 1] = c[1];
        d[i * 4 + 2] = c[2];
        d[i * 4 + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    };

    if (!hovered || reducedMotion()) {
      paint(tRef.current);
      return;
    }
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      tRef.current += (now - last) / 1000;
      last = now;
      paint(tRef.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [slug, accent, hovered]);

  return <canvas ref={ref} width={COVER_W} height={COVER_H} className="cover" aria-hidden="true" />;
}
```

- [x] **Step 4: BlobCursor**

`src/effects/BlobCursor.tsx`:
```tsx
import { useEffect, useRef } from "react";
import { finePointer } from "../lib/env";
import { subscribePointer } from "../lib/pointer";

/** Eased blob that trails the cursor; hidden without a fine pointer. The native cursor stays. */
export function BlobCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;
    return subscribePointer((s) => {
      el.style.display = s.active ? "block" : "none";
      el.style.transform = `translate3d(${s.blob.x}px, ${s.blob.y}px, 0) translate(-50%, -50%)`;
      el.style.scale = s.hoverKind === "link" ? "3.2" : s.hoverKind === "cell" ? "1.8" : "1";
    });
  }, []);

  return <div ref={ref} className="blob" aria-hidden="true" />;
}
```

- [x] **Step 5: Append effects CSS**

Append to `src/styles.css`:
```css
/* ---- effects ---- */
.hero-field {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  image-rendering: pixelated;
}
.hero-field--fallback {
  background-image: radial-gradient(rgba(235, 231, 220, 0.2) 0.5px, transparent 0.6px);
  background-size: 4px 4px;
}
.cover {
  width: 100%;
  height: 100%;
  display: block;
  image-rendering: pixelated;
}
.blob {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--paper);
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 100;
  display: none;
  transition: scale 0.2s ease;
  will-change: transform;
}
@media (hover: none), (pointer: coarse) {
  .blob { display: none !important; }
}
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: calc(min(var(--i, 0), 10) * 40ms);
}
.reveal.in { opacity: 1; transform: none; }
@keyframes rise {
  from { opacity: 0; filter: blur(8px); transform: translateY(8px); }
  to { opacity: 1; filter: blur(0); transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [x] **Step 6: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

---

### Task 7: Nav, Hero, SectionHeader, Work (with tests)

**Files:**
- Create: `src/sections/SectionHeader.tsx`, `src/sections/Nav.tsx`, `src/sections/Hero.tsx`, `src/sections/Work.tsx`
- Modify: `src/styles.css` (append nav, hero, section, work blocks)
- Test: `src/__tests__/Work.test.tsx`, `src/__tests__/Hero.test.tsx`

**Interfaces:**
- Consumes: `PROFILE`, `PROJECTS` (Task 1); `buildIndex`, `filterIndex`, `FILTER_DEFS`, `FilterId`, `IndexedProject` (Task 4); `useFitText` (Task 5); `HeroField`, `DitherCover` (Task 6).
- Produces: `<SectionHeader n title lede? />`, `<Nav />`, `<Hero />`, `<Work />`.

- [x] **Step 1: Write the failing tests**

`src/__tests__/Work.test.tsx`:
```tsx
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Work } from "../sections/Work";

describe("Work", () => {
  it("renders all 24 cells with the honesty badges", () => {
    render(<Work />);
    const cells = screen.getAllByRole("article");
    expect(cells).toHaveLength(24);
    const roadmap = document.querySelector('[data-roadmap="true"]')!;
    expect(roadmap).not.toBeNull();
    expect(within(roadmap as HTMLElement).getByText("ROADMAP")).toBeInTheDocument();
    expect(within(roadmap as HTMLElement).getByText("MCP Trust Scanner")).toBeInTheDocument();
    expect(screen.getByText("IN PROGRESS")).toBeInTheDocument();
    expect(screen.getByText("pip install agent-triage")).toBeInTheDocument();
  });

  it("filters to Featured and keeps the original numbers", () => {
    render(<Work />);
    const before = new Map(
      screen.getAllByRole("article").map((c) => [
        within(c).getByRole("heading", { level: 3 }).textContent,
        c.querySelector(".cell__num")!.textContent,
      ]),
    );
    fireEvent.click(screen.getByRole("button", { name: /^Featured/ }));
    const after = screen.getAllByRole("article");
    expect(after).toHaveLength(9);
    for (const c of after) {
      const name = within(c).getByRole("heading", { level: 3 }).textContent;
      expect(c.querySelector(".cell__num")!.textContent).toBe(before.get(name));
    }
    expect(screen.getByRole("button", { name: /^Featured/ })).toHaveAttribute("aria-pressed", "true");
  });
});
```

`src/__tests__/Hero.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PROFILE } from "../content";
import { Hero } from "../sections/Hero";

describe("Hero", () => {
  it("names Bharath in full and links the four destinations", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName("Bharath Kumar Rajesh");
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", PROFILE.links.github);
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", PROFILE.links.linkedin);
    expect(screen.getByRole("link", { name: /Email/ })).toHaveAttribute("href", `mailto:${PROFILE.links.email}`);
    expect(screen.getByRole("link", { name: /Resume/ })).toHaveAttribute("href", PROFILE.links.resume);
    expect(screen.getByText(PROFILE.thesis)).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Run to verify they fail**

Run: `npm test -- src/__tests__/Work.test.tsx src/__tests__/Hero.test.tsx`
Expected: FAIL, modules not found.

- [x] **Step 3: Implement the components**

`src/sections/SectionHeader.tsx`:
```tsx
interface Props {
  n: string;
  title: string;
  lede?: string;
}

export function SectionHeader({ n, title, lede }: Props) {
  return (
    <div className="section__head" data-reveal>
      <h2 className="section__title">
        <span className="section__n">{n} /</span> {title}
      </h2>
      {lede && <p className="section__lede">{lede}</p>}
    </div>
  );
}
```

`src/sections/Nav.tsx`:
```tsx
import { PROFILE } from "../content";

const LINKS = [
  ["work", "Work"],
  ["experience", "Experience"],
  ["numbers", "Numbers"],
  ["skills", "Skills"],
  ["credentials", "Credentials"],
  ["contact", "Contact"],
] as const;

export function Nav() {
  return (
    <header className="nav">
      <a className="nav__name" href="#top">
        {PROFILE.name}
      </a>
      <nav className="nav__links" aria-label="Sections">
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <a className="nav__resume" href={PROFILE.links.resume} target="_blank" rel="noopener">
        Resume ↗
      </a>
    </header>
  );
}
```

`src/sections/Hero.tsx`:
```tsx
import { useRef } from "react";
import { PROFILE, PROJECTS } from "../content";
import { HeroField } from "../effects/HeroField";
import { useFitText } from "../hooks/useFitText";

export function Hero() {
  const mark = useRef<HTMLSpanElement>(null);
  useFitText(mark);
  const first = PROFILE.name.split(" ")[0];
  const rest = PROFILE.name.slice(first.length);
  const { links } = PROFILE;

  return (
    <section id="top" className="hero" aria-label="Introduction">
      <HeroField />
      <div className="hero__inner">
        <h1 className="hero__title">
          <span ref={mark} className="wordmark">
            {first}
          </span>
          <span className="sr-only">{rest}</span>
        </h1>
        <div className="hero__row">
          <div className="hero__lead">
            <p className="meta">
              {PROFILE.title} · {PROFILE.city} · {PROFILE.coords}
            </p>
            <p className="thesis">{PROFILE.thesis}</p>
            <p className="meta meta--dim">Open to: {PROFILE.roles.join(", ")}</p>
          </div>
          <ul className="hero__links">
            <li>
              <a href={links.github} target="_blank" rel="noopener">
                <span>GitHub</span>
                <span>↗</span>
              </a>
            </li>
            <li>
              <a href={links.linkedin} target="_blank" rel="noopener">
                <span>LinkedIn</span>
                <span>↗</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${links.email}`}>
                <span>Email</span>
                <span>{links.email}</span>
              </a>
            </li>
            <li>
              <a href={links.resume} target="_blank" rel="noopener">
                <span>Resume</span>
                <span>PDF ↗</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="hero__foot">
          <span className="meta meta--faint">Scroll</span>
          <span className="meta meta--faint">Index of {PROJECTS.length} repositories</span>
        </div>
      </div>
    </section>
  );
}
```

`src/sections/Work.tsx`:
```tsx
import { useMemo, useState, type CSSProperties } from "react";
import { DitherCover } from "../effects/DitherCover";
import { FILTER_DEFS, buildIndex, filterIndex, type FilterId, type IndexedProject } from "../lib/index";
import { SectionHeader } from "./SectionHeader";

export function Work() {
  const index = useMemo(() => buildIndex(), []);
  const [filter, setFilter] = useState<FilterId>("all");
  const visible = filterIndex(index, filter);

  return (
    <section id="work" className="section">
      <SectionHeader n="01" title="Work" lede={`${index.length} repositories, indexed.`} />
      <div className="pills" role="group" aria-label="Filter projects">
        {FILTER_DEFS.map((f) => (
          <button
            key={f.id}
            type="button"
            className="pill"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label} <span className="pill__n">{filterIndex(index, f.id).length}</span>
          </button>
        ))}
      </div>
      <div className="grid">
        {visible.map((entry, i) => (
          <ProjectCell key={entry.project.slug} entry={entry} i={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCell({ entry: { number, project: p }, i }: { entry: IndexedProject; i: number }) {
  const [hovered, setHovered] = useState(false);
  const className = ["cell", p.flagship && "cell--flagship", p.roadmap && "cell--roadmap"]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={className}
      data-cell=""
      data-roadmap={p.roadmap ? "true" : undefined}
      data-reveal
      style={{ "--i": i } as CSSProperties}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <header className="cell__head">
        <span className="cell__num">{number}.</span>
        <h3 className="cell__name">{p.name}</h3>
        <span className="cell__tag">{p.tags[0]}</span>
      </header>
      <div className="cell__cover">
        <DitherCover slug={p.slug} accent={p.flagship === true} hovered={hovered} />
        {p.badgeLabel && <span className="badge">{p.badgeLabel}</span>}
      </div>
      <p className="cell__desc">{p.desc}</p>
      {p.facts && (
        <ul className="cell__facts">
          {p.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}
      {p.perf && <p className="cell__desc cell__perf">{p.perf}</p>}
      <ul className="chips">
        {p.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <footer className="cell__foot">
        <a href={p.repo} target="_blank" rel="noopener">
          Repo ↗
        </a>
        {p.pypi && <code className="cell__pypi">{p.pypi}</code>}
      </footer>
    </article>
  );
}
```

- [x] **Step 4: Append nav, hero, section and work CSS**

Append to `src/styles.css`:
```css
/* ---- nav ---- */
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: var(--nav-h);
  padding: 0 var(--gutter);
  border-bottom: 1px solid var(--line);
  background: rgba(15, 15, 14, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
}
.nav__name { text-transform: uppercase; }
.nav__links { display: none; gap: 24px; }
.nav__links a { color: var(--paper-dim); transition: color 0.15s; }
.nav__links a:hover { color: var(--paper); }
.nav__resume { color: var(--accent); }
@media (min-width: 760px) {
  .nav__links { display: flex; }
}

/* ---- hero ---- */
.hero {
  position: relative;
  min-height: calc(100svh - var(--nav-h));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
}
.hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 var(--gutter);
}
.hero__title {
  margin: auto 0 0;
  padding: 56px 0 4px;
  font-family: var(--font-display);
  font-weight: 500;
  font-variation-settings: "opsz" 144;
  letter-spacing: -0.035em;
  line-height: 0.88;
  animation: rise 0.7s ease both;
}
.wordmark {
  display: inline-block;
  white-space: nowrap;
  font-size: 100px;
}
.hero__row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  padding: 24px 0 32px;
  border-top: 1px solid var(--line);
  animation: rise 0.7s 0.12s ease both;
}
.thesis {
  margin: 16px 0;
  max-width: 24ch;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-variation-settings: "opsz" 40;
  font-size: clamp(22px, 2.6vw, 34px);
  line-height: 1.22;
  letter-spacing: -0.01em;
}
.hero__links {
  list-style: none;
  margin: 0;
  padding: 0;
  align-self: start;
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
}
.hero__links li { border-top: 1px solid var(--line); }
.hero__links li:last-child { border-bottom: 1px solid var(--line); }
.hero__links a {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  color: var(--paper-dim);
  transition: color 0.15s;
}
.hero__links a:hover { color: var(--paper); }
.hero__foot {
  display: flex;
  justify-content: space-between;
  padding: 12px 0 16px;
  border-top: 1px solid var(--line);
  animation: rise 0.7s 0.2s ease both;
}
@media (min-width: 760px) {
  .hero__row { grid-template-columns: 1.4fr 1fr; gap: 64px; }
}
@media (prefers-reduced-motion: reduce) {
  .hero__title, .hero__row, .hero__foot { animation: none; }
}

/* ---- sections ---- */
.section {
  padding: 64px var(--gutter) 96px;
  border-bottom: 1px solid var(--line);
}
.section__head {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding-bottom: 32px;
}
.section__title {
  margin: 0;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.section__n { color: var(--accent); }
.section__lede {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 400;
  font-variation-settings: "opsz" 96;
  font-size: clamp(32px, 4vw, 56px);
  line-height: 1.02;
  letter-spacing: -0.02em;
}
@media (min-width: 760px) {
  .section__head { grid-template-columns: 1fr 1fr; align-items: end; }
}

/* ---- work ---- */
.pills {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 12px 0;
  border-top: 1px solid var(--line);
  scrollbar-width: none;
}
.pills::-webkit-scrollbar { display: none; }
.pill {
  flex: none;
  font: 500 12px/1 var(--font-mono);
  letter-spacing: 0.04em;
  padding: 9px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--paper-dim);
  cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
}
.pill:hover { color: var(--paper); border-color: var(--paper-faint); }
.pill[aria-pressed="true"] { background: var(--paper); color: var(--bg); border-color: var(--paper); }
.pill__n { opacity: 0.6; margin-left: 4px; }

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-top: 0;
}
.cell {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  background: var(--bg);
  transition: background 0.2s;
}
.cell:hover { background: #161615; }
.cell--roadmap::after {
  content: "";
  position: absolute;
  inset: 6px;
  border: 1px dashed var(--line);
  pointer-events: none;
}
.cell--roadmap .cover { opacity: 0.5; }
.cell__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 13px;
}
.cell__num { color: var(--accent); }
.cell__name { margin: 0; font: inherit; font-weight: 500; }
.cell__tag {
  margin-left: auto;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: right;
  color: var(--paper-faint);
}
.cell__cover {
  position: relative;
  aspect-ratio: 16 / 10;
  border: 1px solid var(--line);
  overflow: hidden;
}
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  font: 500 10px/1 var(--font-mono);
  letter-spacing: 0.1em;
  padding: 5px 7px;
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--paper-dim);
}
.cell__desc { margin: 0; font-size: 14.5px; color: var(--paper-dim); }
.cell__facts {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--paper-dim);
}
.cell__facts li::before { content: "+ "; color: var(--accent); }
.cell__foot {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-top: 6px;
  font-family: var(--font-mono);
  font-size: 12px;
}
.cell__foot a { color: var(--accent); }
.cell__foot a:hover { text-decoration: underline; text-underline-offset: 4px; }
.cell__pypi { font-family: var(--font-mono); font-size: 11px; color: var(--paper-faint); }
@media (min-width: 760px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .cell--flagship {
    grid-column: span 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 28px;
    row-gap: 14px;
    align-content: start;
  }
  .cell--flagship .cell__head, .cell--flagship .cell__foot { grid-column: 1 / -1; }
  .cell--flagship .cell__cover { grid-column: 1; grid-row: 2 / span 4; align-self: start; }
  .cell--flagship .cell__desc, .cell--flagship .cell__facts, .cell--flagship .chips { grid-column: 2; }
}
@media (min-width: 1280px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

- [x] **Step 5: Run the tests to verify green**

Run: `npm test`
Expected: PASS for every file so far (content, prng, bayer, dither2d, index, pointer, Work, Hero).

---

### Task 8: Experience, Numbers, Skills, Credentials, Contact, App composition

**Files:**
- Create: `src/sections/Experience.tsx`, `src/sections/Numbers.tsx`, `src/sections/Skills.tsx`, `src/sections/Credentials.tsx`, `src/sections/Contact.tsx`
- Modify: `src/App.tsx` (replace the shell), `src/styles.css` (append remaining blocks)
- Test: `src/__tests__/App.test.tsx`

**Interfaces:**
- Consumes: `EXPERIENCE`, `ERRORBARS`, `ERRORBARS_FOOT`, `SKILLS`, `CERTS`, `PUBLICATIONS`, `EDUCATION`, `WRITING`, `PROFILE` (Task 1); `SectionHeader`, `Nav`, `Hero`, `Work` (Task 7); `BlobCursor` (Task 6); `useReveal` (Task 5).
- Produces: `<App />` rendering every section in order: Nav, Hero, Work, Experience, Numbers, Skills, Credentials, Contact, BlobCursor.

- [x] **Step 1: Write the failing test**

`src/__tests__/App.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "../App";
import { CERTS, ERRORBARS, EXPERIENCE, PROFILE, SKILLS } from "../content";

describe("App", () => {
  it("renders every section with its content", () => {
    render(<App />);
    for (const id of ["work", "experience", "numbers", "skills", "credentials", "contact"]) {
      expect(document.getElementById(id)).not.toBeNull();
    }
    for (const e of EXPERIENCE) expect(screen.getByText(e.role)).toBeInTheDocument();
    for (const r of ERRORBARS) expect(screen.getByText(r.figure)).toBeInTheDocument();
    for (const g of SKILLS) expect(screen.getByText(g.group)).toBeInTheDocument();
    for (const c of CERTS) expect(screen.getByText(c.title)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: PROFILE.links.email })).toHaveAttribute(
      "href",
      `mailto:${PROFILE.links.email}`,
    );
    expect(screen.getByText(PROFILE.sponsorship)).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Run to verify it fails**

Run: `npm test -- src/__tests__/App.test.tsx`
Expected: FAIL (sections missing: `document.getElementById("experience")` is null).

- [x] **Step 3: Implement the sections**

`src/sections/Experience.tsx`:
```tsx
import { EXPERIENCE } from "../content";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeader n="02" title="Experience" lede="Where the numbers came from." />
      <ol className="xp">
        {EXPERIENCE.map((e, i) => (
          <li key={e.role + e.org} className="xp__item" data-reveal style={{ "--i": i } as React.CSSProperties}>
            <div className="xp__period">{e.period}</div>
            <div>
              <h3 className="xp__role">{e.role}</h3>
              <p className="xp__org">{e.org}</p>
              <ul className="xp__points">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <ul className="chips">
                {e.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
```
(Use `import type { CSSProperties } from "react"` and `as CSSProperties` instead of `React.CSSProperties`; the same pattern applies in every section below.)

`src/sections/Numbers.tsx`:
```tsx
import { ERRORBARS, ERRORBARS_FOOT } from "../content";
import { SectionHeader } from "./SectionHeader";

export function Numbers() {
  return (
    <section id="numbers" className="section">
      <SectionHeader n="03" title="Numbers" lede="Every figure, with what it does not mean." />
      <table className="numbers" data-reveal>
        <thead>
          <tr>
            <th scope="col">Claim</th>
            <th scope="col">Figure</th>
            <th scope="col">What it does not mean</th>
          </tr>
        </thead>
        <tbody>
          {ERRORBARS.map((r) => (
            <tr key={r.claim}>
              <td className="numbers__claim">{r.claim}</td>
              <td className="numbers__figure">{r.figure}</td>
              <td className="numbers__caveat">{r.caveat}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="meta meta--faint numbers__foot">{ERRORBARS_FOOT}</p>
    </section>
  );
}
```

`src/sections/Skills.tsx`:
```tsx
import type { CSSProperties } from "react";
import { SKILLS } from "../content";
import { SectionHeader } from "./SectionHeader";

export function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeader n="04" title="Skills" lede="Categorical. No percentages." />
      <ul className="skills">
        {SKILLS.map((g, i) => (
          <li key={g.group} className="skills__group" data-reveal style={{ "--i": i } as CSSProperties}>
            <span className="label">{g.group}</span>
            <ul className="chips">
              {g.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

`src/sections/Credentials.tsx`:
```tsx
import { CERTS, EDUCATION, PUBLICATIONS, WRITING } from "../content";
import { SectionHeader } from "./SectionHeader";

export function Credentials() {
  return (
    <section id="credentials" className="section">
      <SectionHeader n="05" title="Credentials" lede="Certifications, publications, education, writing." />
      <div className="creds">
        <div className="creds__block" data-reveal>
          <span className="label">Certifications</span>
          <ul className="creds__list">
            {CERTS.map((c) => (
              <li key={c.title} className="creds__item">
                <span className="creds__title">{c.title}</span>
                <span className="creds__meta">
                  {c.issuer} · {c.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="creds__block" data-reveal>
          <span className="label">Publications</span>
          <ul className="creds__list">
            {PUBLICATIONS.map((p) => (
              <li key={p.title} className="creds__item">
                <span className="creds__title">{p.title}</span>
                <span className="creds__meta">
                  {p.venue} · {p.meta} · {p.figure}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="creds__block" data-reveal>
          <span className="label">Education</span>
          <ul className="creds__list">
            {EDUCATION.map((e) => (
              <li key={e.school} className="creds__item">
                <span className="creds__title">{e.degree}</span>
                <span className="creds__meta">
                  {e.school} · {e.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="creds__block" data-reveal>
          <span className="label">Writing</span>
          <ul className="creds__list">
            {WRITING.items.map((w) => (
              <li key={w.title} className="creds__item">
                <a className="creds__title creds__link" href={w.href} target="_blank" rel="noopener">
                  {w.title} ↗
                </a>
                <span className="creds__meta">
                  {w.kind} · {w.handle}
                </span>
                <span className="creds__desc">{w.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

`src/sections/Contact.tsx`:
```tsx
import { useEffect, useState } from "react";
import { PROFILE } from "../content";
import { SectionHeader } from "./SectionHeader";

const nyTime = () =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

function useNYClock(): string {
  const [time, setTime] = useState(nyTime);
  useEffect(() => {
    const id = setInterval(() => setTime(nyTime()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Contact() {
  const time = useNYClock();
  const { links } = PROFILE;
  return (
    <footer>
      <section id="contact" className="contact">
        <SectionHeader n="06" title="Contact" lede="Let's talk." />
        <a className="contact__email" href={`mailto:${links.email}`}>
          {links.email}
        </a>
        <ul className="contact__links">
          <li><a href={links.github} target="_blank" rel="noopener">GitHub ↗</a></li>
          <li><a href={links.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a></li>
          <li><a href={links.medium} target="_blank" rel="noopener">Medium ↗</a></li>
          <li><a href={links.twitter} target="_blank" rel="noopener">X ↗</a></li>
          <li><a href={links.resume} target="_blank" rel="noopener">Resume ↗</a></li>
        </ul>
        <div className="contact__notes">
          <p className="meta meta--dim">{PROFILE.sponsorship}</p>
          <p className="meta meta--dim">Open to relocation: {PROFILE.relocation.join(", ")}</p>
        </div>
      </section>
      <div className="footer">
        <span>{PROFILE.name}, 2026</span>
        <span>New York City · {time}</span>
        <span>Fraunces, Geist Mono, Geist. Dithered with an 8x8 Bayer matrix. No trackers.</span>
      </div>
    </footer>
  );
}
```

`src/App.tsx`:
```tsx
import { BlobCursor } from "./effects/BlobCursor";
import { useReveal } from "./hooks/useReveal";
import { Contact } from "./sections/Contact";
import { Credentials } from "./sections/Credentials";
import { Experience } from "./sections/Experience";
import { Hero } from "./sections/Hero";
import { Nav } from "./sections/Nav";
import { Numbers } from "./sections/Numbers";
import { Skills } from "./sections/Skills";
import { Work } from "./sections/Work";

export function App() {
  useReveal();
  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Numbers />
        <Skills />
        <Credentials />
      </main>
      <Contact />
      <BlobCursor />
    </>
  );
}
```

- [x] **Step 4: Append the remaining CSS**

Append to `src/styles.css`:
```css
/* ---- skip link ---- */
.skip {
  position: absolute;
  left: var(--gutter);
  top: -48px;
  z-index: 30;
  padding: 8px 12px;
  background: var(--paper);
  color: var(--bg);
  font-family: var(--font-mono);
  font-size: 12px;
}
.skip:focus { top: 8px; }

/* ---- experience ---- */
.xp { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line); }
.xp__item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px 40px;
  padding: 24px 0;
  border-bottom: 1px solid var(--line);
}
.xp__period {
  padding-top: 4px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--paper-dim);
}
.xp__role { margin: 0; font-size: 18px; font-weight: 500; line-height: 1.3; }
.xp__org {
  margin: 4px 0 14px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--paper-dim);
}
.xp__points {
  display: grid;
  gap: 6px;
  margin: 0 0 14px;
  padding-left: 18px;
  max-width: 72ch;
  font-size: 15px;
  color: var(--paper-dim);
}
@media (min-width: 760px) {
  .xp__item { grid-template-columns: 200px 1fr; }
}

/* ---- numbers ---- */
.numbers { width: 100%; border-collapse: collapse; border-top: 1px solid var(--line); }
.numbers th {
  padding: 12px 16px 12px 0;
  border-bottom: 1px solid var(--line);
  text-align: left;
  font: 500 11px/1 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--paper-faint);
}
.numbers td { padding: 20px 16px 20px 0; border-bottom: 1px solid var(--line); vertical-align: top; }
.numbers__claim {
  width: 20%;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--paper-dim);
}
.numbers__figure {
  width: 34%;
  font-family: var(--font-display);
  font-variation-settings: "opsz" 40;
  font-size: clamp(22px, 2.2vw, 30px);
  line-height: 1.15;
  letter-spacing: -0.01em;
}
.numbers__caveat { font-size: 15px; color: var(--paper-dim); }
.numbers__foot { margin-top: 16px; text-transform: none; letter-spacing: 0.04em; }
@media (max-width: 759px) {
  .numbers thead { display: none; }
  .numbers tr { display: block; padding: 16px 0; border-bottom: 1px solid var(--line); }
  .numbers td { display: block; width: auto; padding: 4px 0; border: 0; }
}

/* ---- skills ---- */
.skills {
  display: grid;
  grid-template-columns: 1fr;
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
}
.skills__group { display: grid; gap: 10px; padding: 18px 0; border-bottom: 1px solid var(--line); }
@media (min-width: 760px) {
  .skills { grid-template-columns: 1fr 1fr; column-gap: 40px; }
}

/* ---- credentials ---- */
.creds { display: grid; grid-template-columns: 1fr; gap: 0 40px; border-top: 1px solid var(--line); }
.creds__block { padding: 20px 0 8px; border-bottom: 1px solid var(--line); }
.creds__list { list-style: none; margin: 12px 0 0; padding: 0; }
.creds__item { display: grid; gap: 3px; padding: 10px 0; border-top: 1px solid var(--line); }
.creds__title { font-size: 15px; font-weight: 500; }
.creds__link:hover { color: var(--accent); }
.creds__meta { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.04em; color: var(--paper-dim); }
.creds__desc { font-size: 14px; color: var(--paper-dim); }
@media (min-width: 760px) {
  .creds { grid-template-columns: 1fr 1fr; }
}

/* ---- contact ---- */
.contact { padding: 64px var(--gutter) 24px; }
.contact__email {
  display: inline-block;
  margin: 8px 0 32px;
  font-family: var(--font-display);
  font-variation-settings: "opsz" 144;
  font-size: clamp(28px, 5vw, 72px);
  line-height: 1;
  letter-spacing: -0.02em;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.12em;
  text-decoration-color: var(--paper-faint);
  transition: text-decoration-color 0.2s;
  overflow-wrap: anywhere;
}
.contact__email:hover { text-decoration-color: var(--accent); }
.contact__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  list-style: none;
  margin: 0;
  padding: 16px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 13px;
}
.contact__links a { color: var(--paper-dim); transition: color 0.15s; }
.contact__links a:hover { color: var(--paper); }
.contact__notes { display: grid; gap: 6px; margin-top: 16px; }
.contact__notes .meta { text-transform: none; letter-spacing: 0.04em; }
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  padding: 40px var(--gutter) 24px;
  border-top: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--paper-faint);
}
```

- [x] **Step 5: Run all tests, typecheck, build**

Run: `npm test && npm run build`
Expected: all test files PASS; build emits `dist/`.

---

### Task 9: Browser QA, tuning, README

**Files:**
- Modify: `src/effects/heroShader.ts`, `src/lib/dither2d.ts`, `src/styles.css` (tuning constants only, if the browser pass demands it)
- Create: `README.md`

- [x] **Step 1: Start the dev server and open it**

Create `.claude/launch.json`:
```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "portfolio", "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev", "--", "--port", "5173", "--strictPort"], "port": 5173 }
  ]
}
```
Open the Browser pane on it (`preview_start` with name `portfolio`).

- [x] **Step 2: Desktop pass at 1440 wide**

Check, fixing anything that fails before moving on:
1. Wordmark "Bharath" fills the content width exactly after fonts load; no overflow, no wrap.
2. Hero field: contour lines visible under the cursor, near-black away from it, pure 1-bit (zoom to confirm no grey pixels). Light drifts when the cursor leaves the window.
3. Blob follows with lag, grows over links and cells, uses difference blending (paper over black, black over paper).
4. Pills filter the grid; numbers stay stable; Featured shows 9; the roadmap cell is last, dashed, badged ROADMAP; downgrade badged IN PROGRESS.
5. Covers are unique per project, animate on hover only, flagship cover is gold.
6. Every section renders its content; hairlines align; no horizontal scroll.
7. Tab through the page: skip link appears, focus rings visible, pills operable with keyboard.
8. Console has no errors or warnings.

- [x] **Step 3: 1024 and 400 wide**

Resize the pane (tablet, then mobile preset). Check: 2 columns then 1; flagship cell falls back to a stacked layout at 1 column; nav hides links below 760; pills scroll horizontally; numbers table stacks; footer wraps; no horizontal scroll; body gutter 24px; hero field visible at base brightness with drift (no fine pointer); blob absent.

- [x] **Step 4: Reduced motion and fallback**

Emulate `prefers-reduced-motion: reduce` (DevTools or `resize_window` cannot; use the Chrome rendering emulation via the browser's JS: `matchMedia` cannot be forced, so temporarily flip `reducedMotion()` to return true, reload, verify: field static with light at center, no entrance animation, all sections visible without scrolling, covers static on hover). Revert. Then force `hasWebGL()` to return false, reload, verify the CSS dot fallback shows behind the hero. Revert.

- [x] **Step 5: README**

`README.md`:
```markdown
# thebharath.co

Portfolio for Bharath Kumar Rajesh, AI Engineer. Single page, dark, editorial.

Design: docs/superpowers/specs/2026-09-21-portfolio-index-design.md

## Stack

Vite, React 19, TypeScript, Vitest. No UI or animation libraries. The hero is a
hand-written WebGL1 shader; project covers are Canvas2D. Fonts from Google
Fonts: Fraunces, Geist, Geist Mono.

## Develop

    npm install
    npm run dev        # http://localhost:5173
    npm test           # vitest
    npm run build      # tsc + vite build -> dist/

All copy, projects, experience, certs and links live in `src/content.ts`.
Tests in `src/__tests__/content.test.ts` enforce the house rules (no invented
metrics, Artie PRs opened not merged, MCP Trust Scanner is roadmap, loopcheck
recall ships with its caveat, no em dashes).

## Deploy

Vercel: import the repo; `vercel.json` sets the build and cache headers.
Assets under `/assets/` are content-hashed by Vite and cached immutable for a
year; `/` and `/index.html` always revalidate. Never put `immutable` on a
path whose contents can change.

GitHub Pages: use the official `actions/deploy-pages` workflow on `dist/`.

`public/resume.pdf` is served at `/resume.pdf`. The committed PDF predates
ForgeSync, loopcheck, costfloor and downgrade; replace the file, the link is
stable.

## Effects

- Dither: 1-bit Bayer ordered dithering. Hero uses an 8x8 matrix in GLSL
  (arithmetic form, WebGL1 safe); covers use a 4x4 matrix in JS.
- Flashlight: a uniform in the hero shader. Brightness falloff is expressed
  as dot density, so the output is never grey.
- Blob cursor: one shared eased pointer store drives both the blob and the
  flashlight, so they read as a single light source.
- Reduced motion: static field, no drift, no reveals, no entrance. No WebGL:
  CSS dot pattern.
```

- [x] **Step 6: Final verification**

Run: `npm test && npm run build && npm run preview -- --port 4173` then open `http://localhost:4173` and confirm the production build renders identically (fonts, effects, resume link resolves to the PDF).
Expected: all green; `dist/resume.pdf` present; `dist/index.html` references hashed `assets/`.

---

## Plan self-review

- Spec coverage: 3 content rules → Task 1 tests; 4 visual system → Task 1 CSS tokens; 5.1 nav, 5.2 hero, 5.3 work → Task 7; 5.4 to 5.8 → Task 8; 6.1 dither → Tasks 2, 3, 6; 6.2 flashlight → Task 6 (`u_light`, drift, reduced motion); 6.3 blob → Tasks 5, 6; 6.4 reveals → Tasks 5, 6, 8; 7 stack/layout → Task 1; 8 deploy → Task 1 (`vercel.json`), Task 9 README; 9 testing → Tasks 1 to 8, Task 9 browser pass.
- Placeholder scan: the only intentional gaps are the `/* copied verbatim */` markers in Task 1 Step 6, which name the exact source file and the exact edits.
- Type consistency: `IndexedProject { number, project }` used identically in Tasks 4 and 7; `hovered: boolean` prop on `DitherCover` used in Task 7; `FilterId` shared; `startPointer`/`getPointer`/`subscribePointer` names match between Tasks 5 and 6; `FINE_POINTER`/`REDUCED_MOTION` exported in Task 5 and imported in Task 6.
