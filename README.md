# thebharath.co

Personal portfolio for **Bharath Kumar Rajesh, AI Engineer**.

A dark, technical-editorial single page with a confident GTA structural homage
(mission briefing terminal, not video-game cosplay). The narrative spine: agents
in production are unreliable, and Bharath builds the triage, eval, observability,
and governance tooling that makes them trustworthy. The keystone is ForgeSync,
reconciliation infrastructure for construction finance. The MCP Trust Scanner is
a roadmap card, labelled as not built, and never presented as shipped.

## Stack

Static site, no framework runtime build required to view.

- React 18 (loaded from CDN as global UMD).
- Source written as JSX in `src/`, precompiled to a single `bundle.js` by
  [esbuild](https://esbuild.github.io/) so the browser never ships an in-page
  transpiler.
- One stylesheet (`src/gta.css`), minified to `gta.css` on build.
- Fonts: Instrument Serif (display), Hanken Grotesk (body), JetBrains Mono (HUD).

## Project layout

```
index.html              deploy entry (loads gta.css + bundle.js + React CDN)
src/
  content.js            single source of truth for all copy, projects, links
  gta.css               stylesheet source
  gta_components.jsx    shared utils, icons, boot sequence, nav, HUD, easter eggs
  gta_hero.jsx          "Now Entering" hero
  gta_skills_exp.jsx    Stat Panel (skills), Mission Log (experience), Error Bars
  gta_projects.jsx      Heist Board (keystone + featured + roadmap) + Garage
  gta_trophy_contact.jsx Trophy Case (certs/pubs) + Writing + Safehouse + footer
  gta_app.jsx           root composition
build.mjs               esbuild build: src/ -> bundle.js + gta.css (root)
bundle.js, gta.css      built artifacts, committed for GitHub Pages
CNAME, .nojekyll        GitHub Pages config for thebharath.co
```

## Develop

Edit anything in `src/`. All copy, projects, skills, experience, certs, and links
live in `src/content.js`, so most updates need no component changes.

After editing, rebuild the artifacts:

```bash
npm install   # first time only, installs esbuild (dev dependency)
npm run build # regenerates bundle.js and gta.css at the repo root
```

Preview locally by serving the root over http (the CDN scripts need it):

```bash
npx serve .   # or: python3 -m http.server
```

## Deploy

The site deploys to either platform with no extra setup.

### Vercel

`vercel.json` sets `buildCommand: npm run build` and `outputDirectory: dist`.
On import, Vercel installs dependencies, runs the build, and serves the
self-contained `dist/` (so `node_modules` and source are never served). Add
`thebharath.co` as a custom domain in the Vercel project settings. `dist/` is
git-ignored and built fresh on each deploy.

### GitHub Pages

Pages serves the repo root. `index.html`, `gta.css`, and `bundle.js` are
committed at the root, with `CNAME` pointing at `thebharath.co` and `.nojekyll`
so Pages serves the files verbatim. Push to the default branch and enable Pages
(source: root) once.

The same `npm run build` produces both the root artifacts (Pages) and `dist/`
(Vercel), so they never drift.

## Notes

- No invented metrics: skills are categorical with no proficiency percentages,
  and only verified facts appear. Every figure on the page is published in a
  public README or came off a committed benchmark report.
- The "Numbers, with their error bars" section (`#errorbars`) pairs each headline
  figure with what it does not mean. Any new figure added to the page should get
  a row there, or a reason why it does not need one.
- Compsoft Technologies is NLP sentiment work only; the CNN work is the separate
  Springer Nature plant-classification paper.
- Artie Labs pull requests are opened, not merged. The word "merged" must never
  appear in the Artie Labs line.
- The MCP Trust Scanner is not built. It renders as a roadmap card, visually
  distinct (dashed border, muted status) from the shipped work.
- loopcheck's recall figure (0.33) and its small-sample caveat always ship
  together, in the project copy and in the error-bars table.
- The `downgrade` repo publishes no test count and no coverage figure.
- Accessibility and `prefers-reduced-motion` are respected: the boot sequence
  and heavy motion are skipped when reduced motion is set, and scroll reveals
  fail open so content is never stuck hidden.
- Easter eggs: the Konami code (up up down down left right left right B A)
  toggles an alternate accent theme, and a "MISSION PASSED" toast fires on
  reaching the contact section. Neither blocks content.

## To wire up later

- `Bharath_Kumar_Rajesh_Master_Resume.pdf` is served at `/resume.pdf` by the
  build. The committed PDF predates ForgeSync, loopcheck, costfloor and
  downgrade; replacing that file is all that is needed, the link is stable.
- `window.WRITING` in `src/content.js` carries the Medium profile and the
  mcp-otel-audit writeup. Individual post links are not wired yet.
- Garage-only repo links assume `github.com/thebharathkumar/<repo>`; confirm
  each slug.
