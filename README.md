# thebharath.co

Portfolio for Bharath Kumar Rajesh, AI Engineer. Single page, dark, editorial:
a numbered hairline index of 24 repositories, a viewport-wide serif wordmark,
and three effects (1-bit Bayer dither, flashlight, blob cursor).

Design spec: `docs/superpowers/specs/2026-09-21-portfolio-index-design.md`
Implementation plan: `docs/superpowers/plans/2026-09-21-portfolio-index.md`

## Stack

Vite, React 19, TypeScript (strict), Vitest. One UI dependency:
[thinking-orbs](https://github.com/Jakubantalik/thinking-orbs) (MIT), the
dotted agent-status orbs on the hero status line, the IN PROGRESS / ROADMAP
badges, the contact email and the loader. The hero is a hand-written WebGL1
shader; project covers are Canvas2D. Fonts from Google Fonts: Fraunces
(display), Geist Mono (labels), Geist (paragraphs).

## Develop

    npm install
    npm run dev        # http://localhost:5173
    npm test           # vitest, 32 tests
    npm run typecheck  # tsc
    npm run build      # tsc + vite build -> dist/
    npm run preview    # serve dist/ locally

`.npmrc` sets `legacy-peer-deps=true` to work around an npm 10 resolver bug
with vitest 5; plain `npm install` works everywhere.

## Content

All copy, projects, experience, certifications, publications and links live in
`src/content.ts`, a verbatim port of the previous site's content file. Tests in
`src/__tests__/content.test.ts` enforce the house rules:

- No invented metrics. Skills are categorical, no proficiency numbers.
- Artie Labs pull requests are opened, never "merged".
- MCP Trust Scanner is roadmap: dashed border, ROADMAP badge, last in the index.
- `downgrade` is IN PROGRESS and publishes no test count.
- loopcheck's recall figure (0.33) ships with its small-sample caveat.
- Compsoft Technologies is NLP sentiment work only.
- No em dashes anywhere.

Project order in the index: flagship (ForgeSync), then featured, then the rest
in content order, roadmap last. Numbers are stable identities and never change
when the grid is filtered.

## Deploy

Vercel: import the repo. `vercel.json` sets the build command, `dist/` as the
output, and cache headers: `/assets/*` (content-hashed by Vite) is cached
immutable for a year, `/` and `/index.html` always revalidate. Never put
`immutable` on a path whose contents can change.

GitHub Pages: use the official `actions/deploy-pages` workflow on `dist/`.

`public/resume.pdf` is served at `/resume.pdf`. The committed PDF predates
ForgeSync, loopcheck, costfloor and downgrade; replace the file, the link is
stable.

## Effects

- Dither: 1-bit Bayer ordered dithering. The hero uses an 8x8 matrix in GLSL
  (arithmetic form, WebGL1 safe); covers use a 4x4 matrix in JS
  (`src/lib/bayer.ts`, `src/lib/dither2d.ts`). Every cover is generated from
  the project slug, so no two are alike and none is a fake screenshot.
- Flashlight: a uniform in the hero shader. Brightness falloff is expressed as
  dot density, so the output is never grey. Away from a fine pointer the light
  drifts on its own.
- Blob cursor: one shared eased pointer store (`src/lib/pointer.ts`) drives
  both the blob and the flashlight, so they read as a single light source. The
  native cursor stays visible; the blob is hidden on touch devices.
- Loader: once per session, the flashlight opens like an iris while a counter
  ticks through the 24 repositories, then the overlay dissolves in Bayer
  order onto the hero. Skippable by any input, capped at 2s, skipped under
  reduced motion or without WebGL.
- Reduced motion: static field, no drift, no reveals, no entrance animation,
  no loader. No WebGL: CSS dot pattern behind the hero, no loader.
