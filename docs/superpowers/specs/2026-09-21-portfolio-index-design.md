# thebharath.co redesign: "The Index"

Date: 2026-09-21
Status: approved by Bharath (direction, stack, effects, content answers)

## 1. Goal

Replace the GTA-homage portfolio at thebharath.co with a single-page, dark,
editorial site for Bharath Kumar Rajesh (AI Engineer, actively job-seeking).
It must read as crafted and current to a recruiter or hiring engineer in the
first five seconds, load fast on a phone, and surface the four things a
recruiter needs without scrolling: name, role, thesis, and links (GitHub,
LinkedIn, email, resume).

The design synthesizes three references, each contributing one structural idea:

- constraint.systems: a numbered, hairline-bordered monospace grid that
  catalogues work as an index ("01." name, one-liner, link).
- rebrand.gallery: a giant high-contrast serif wordmark filling the viewport
  width, muted grey body copy, restrained editorial layout.
- recent.design: pill filter chips above a gallery grid.

Three signature effects, each with one job: a 1-bit Bayer dither, a
flashlight reveal, and a blob cursor.

## 2. Non-goals

No CMS, blog, routing, analytics, contact form, photo, light theme, easter
eggs, boot sequence, three.js, or OG image generation (follow-up). No new
facts: every figure and claim comes from the existing content file.

## 3. Content

`src/content.ts` is a typed, verbatim port of the old `src/content.js`
(PROFILE, SKILLS, EXPERIENCE, ERRORBARS, PROJECTS, WRITING, EDUCATION, CERTS,
PUBLICATIONS). Confirmed with Bharath on 2026-09-21: GPA 3.87, experience kept
as-is, public email bharath.kr702@gmail.com, no photo.

Rules carried over from the old site and enforced by tests:

- No invented metrics. Skills are categorical, no proficiency numbers.
- Artie Labs pull requests are "opened"; the word "merged" never appears in
  that line.
- MCP Trust Scanner is roadmap: rendered with a dashed border and a ROADMAP
  badge, its description starts "Roadmap, not built", listed last in the index.
- `downgrade` carries an IN PROGRESS badge and publishes no test count.
- loopcheck's recall figure (0.33) and its small-sample caveat ship together.
- Compsoft Technologies is NLP sentiment work only; the CNN work is the
  Springer publication.
- No em dashes anywhere in copy (old house rule, kept for voice consistency).

GTA flavor is dropped: no mission codes, no CLEARED/ONGOING status, no boot
lines, no Konami code, no "MISSION PASSED" toast, no Heist/Garage/Safehouse
naming.

Copy written new for this site (section ledes, badges, labels) is descriptive
only and asserts nothing not already in the content file.

## 4. Visual system

Tokens (CSS custom properties in `src/styles.css`):

| token          | value                          | use                              |
|----------------|--------------------------------|----------------------------------|
| `--bg`         | `#0f0f0e`                      | page background, canvas "off"    |
| `--paper`      | `#ebe7dc`                      | primary text, canvas "on"        |
| `--paper-dim`  | `rgba(235,231,220,0.62)`       | secondary text                   |
| `--paper-faint`| `rgba(235,231,220,0.35)`       | tertiary text, disabled          |
| `--line`       | `rgba(235,231,220,0.14)`       | all hairlines                    |
| `--lift`       | `rgba(235,231,220,0.035)`      | hover background on grid cells   |
| `--accent`     | `#e0b84c`                      | numbers, active states, `Repo ↗` |

Dark only. Contrast: paper on bg > 14:1, paper-dim > 6:1, accent > 9:1.

Type (Google Fonts, `display=swap`, preconnect):

- `--font-display`: "Fraunces" variable (opsz 9..144, wght 300..700, italic).
  Used for the wordmark, section titles, the thesis line, the contact email,
  and the large figures in the Numbers table.
- `--font-mono`: "Geist Mono" 400/500. Nav, index numbers, project names,
  labels, meta, chips, table headers, footer.
- `--font-sans`: "Geist" 400/500. Paragraphs only (project descriptions,
  experience points, caveats).
- Fallbacks: Georgia / ui-monospace, Menlo / system-ui. If Geist is not
  served by Google Fonts at build time, substitute JetBrains Mono and Inter and
  note it in the README.

Scale: mono labels 11-12px uppercase, letter-spacing 0.08em; body 15-16px,
line-height 1.55; section titles Fraunces 40-64px (clamp); wordmark fitted to
container width by measurement (see Hero).

Structure: full-bleed page, 1px hairline grid everywhere (`--line`), 24px
gutters on mobile, 40px on desktop. No shadows, no border radius above 2px
(except the filter pills, which are fully rounded), no gradients other than
the effects.

## 5. Page structure (single page, top to bottom)

### 5.1 Nav (`<header>`)
Sticky, 56px, bottom hairline, `backdrop-filter: blur(12px)` over
`rgba(15,15,14,0.7)`. Left: "Bharath Kumar Rajesh" (mono). Center: Work,
Experience, Numbers, Skills, Credentials, Contact (anchor links). Right:
`Resume ↗` in accent, linking `/resume.pdf` (new tab). Below 760px, only the
name and Resume show.

### 5.2 Hero (`<section id="top">`)
`min-height: 100svh`, hairline grid. Layers, back to front:

1. HeroField canvas (WebGL): the dithered contour field, lit by the
   flashlight. `aria-hidden`, `position: absolute; inset: 0`.
2. Content, `position: relative`:
   - Wordmark `<h1>`: "Bharath" set in Fraunces (opsz 144, wght 500,
     letter-spacing -0.03em), fitted to the container width via a
     `useFitText` hook (measure at 100px, scale to container, re-run on
     `document.fonts.ready` and ResizeObserver). The `<h1>` accessible name is
     the full name: a visible span "Bharath" plus a visually-hidden span
     " Kumar Rajesh" (the full name is also visible in the nav).
   - Hairline.
   - Two-column row (stacks below 760px). Left: mono meta line
     `AI Engineer · New York City · 40.7128 N, 74.0060 W`, then the thesis
     `PROFILE.thesis` in Fraunces italic at clamp(22px, 2.6vw, 34px), then
     `Open to: AI Engineer, Forward Deployed Engineer, Software Engineer`
     (mono, dim). Right: a mono link list, one per row with hairlines:
     GitHub ↗, LinkedIn ↗, Email, Resume ↗.
   - Bottom row: `Scroll` hint (mono, faint) left; `Index of 24 repositories`
     right (count derived from content, not typed).

Entrance (motion allowed only): the wordmark fades from opacity 0 and
`filter: blur(8px)` to sharp over 700ms; rows follow with a 80ms stagger.

### 5.3 Work (`<section id="work">`)
Section header row: mono label `01 / Work` left, Fraunces lede right:
"Twenty-four repositories, indexed." (the count is derived).

Filter pills (horizontally scrollable row, hairline top/bottom):
`All (24) · Featured (9) · Agents · Evals and Observability · RAG ·
Governance and Trust · Integration · ML and Research`, counts derived.
Active pill: paper background, bg text. Inactive: hairline border, paper-dim
text, hover to paper. Keyboard: buttons with `aria-pressed`.

Index ordering (stable numbers 01..24, unaffected by filtering):
flagship first, then `featured` in content order, then remaining shipped
projects in content order, then roadmap last. Filtering hides cells; numbers
never renumber. "Featured" shows `featured: true` (9 including ForgeSync).
Category pills match `tags`.

Grid: CSS grid with 1px gaps painted by `--line` (gap on a `--line`
background). Columns: 1 below 760px, 2 from 760px, 3 from 1280px. ForgeSync
spans 2 columns whenever 2+ columns exist.

Cell anatomy (top to bottom, 20px padding):
1. Header row: `NN.` (mono, accent) + name (mono 500, paper); right: primary
   tag (mono, dim).
2. Cover: DitherCover canvas, 16:10, hairline border, `image-rendering:
   pixelated`. Badge overlay top-right for `ROADMAP` / `IN PROGRESS`
   (mono 10px, hairline box).
3. Description (sans, dim). Flagship additionally lists `facts` as a mono
   list and `perf` as a sans paragraph.
4. Stack chips (mono 11px, hairline boxes, wrap).
5. Footer row: `Repo ↗` (mono, accent) left; `pip install agent-triage`
   (mono code) right when `pypi` is set.

Roadmap cell: dashed `--line` outline inset 1px, cover at 50% opacity,
`data-roadmap="true"`. Hover on any cell: background `--lift`, number stays
accent, cover animates (see Effects). Whole cell is not a link; the `Repo ↗`
anchor is, with the cell's `Repo ↗` reachable by keyboard.

### 5.4 Experience (`<section id="experience">`)
Header: `02 / Experience`, lede "Where the numbers came from."
Six entries from EXPERIENCE, hairline-separated. Two columns from 760px:
left (mono, dim) period; right: role (sans 500, paper), org (mono, dim),
points as a sans list, stack chips. Mobile stacks. No codes, no status.

### 5.5 Numbers (`<section id="numbers">`)
Header: `03 / Numbers`, lede "Every figure, with what it does not mean."
Table from ERRORBARS: columns Claim (mono) / Figure (Fraunces 28px) / What it
does not mean (sans, dim). Below 760px each row stacks as a block. Footer
note `ERRORBARS_FOOT` in mono faint.

### 5.6 Skills (`<section id="skills">`)
Header: `04 / Skills`, lede "Categorical. No percentages."
Eight groups from SKILLS in a 2-column list (1 below 760px): group label
(mono, dim, uppercase) and chips.

### 5.7 Credentials (`<section id="credentials">`)
Header: `05 / Credentials`. Four hairline-separated blocks, each a mono
label plus rows: Certifications (CERTS: title, issuer, date),
Publications (PUBLICATIONS: title, venue, meta, figure), Education
(EDUCATION), Writing (WRITING.items as links; the "post links pending" stub
is not shown).

### 5.8 Contact (`<section id="contact">` inside `<footer>`)
Header: `06 / Contact`, lede "Let's talk."
Email as a Fraunces link at clamp(28px, 5vw, 72px), underline on hover.
Row of mono links: GitHub, LinkedIn, Medium, X, Resume. Then two mono lines:
`PROFILE.sponsorship` and `Open to relocation: Bay Area, Dallas, Orlando,
Seattle`. Footer bar: left "Bharath Kumar Rajesh, 2026"; center a live NYC
clock (mono, `America/New_York`, updated each minute); right colophon
"Fraunces, Geist Mono, Geist. Dithered with an 8x8 Bayer matrix. No trackers."

## 6. Effects

All three read one shared pointer store (`src/lib/pointer.ts`): a module
singleton holding `target`, `blob` (lerp 0.18) and `light` (lerp 0.08)
positions, an `active` flag (false until the first pointer move, false again
on `pointerleave` of the document), and `hoverKind` ("link" | "cell" | null)
set by a delegated `pointerover` listener matching `a, button, [data-cell]`.
One `requestAnimationFrame` loop advances both lerps; React never re-renders
per frame.

Capability flags (`src/lib/env.ts`): `finePointer = matchMedia("(hover:
hover) and (pointer: fine)")`, `reducedMotion = matchMedia("(prefers-reduced-
motion: reduce)")`, both live (listeners), plus `webgl` detection.

### 6.1 Dither (HeroField and DitherCover)
Hero: a WebGL1 canvas, one full-screen triangle, fragment shader in
`src/effects/heroShader.ts`. Internal resolution = CSS size / 2 (one fragment
per 2x2 device pixel cell, DPR capped at 1), which keeps the 1-bit cells crisp
and cuts fill cost 4x. Per fragment:

1. `uv` from `gl_FragCoord`, aspect-corrected.
2. Domain-warped value noise, 3 octaves: `n = fbm(uv * 2.2 + 0.35 *
   vec2(noise(uv + t*0.05), noise(uv - t*0.05)))`.
3. Contours: `c = abs(fract(n * 7.0) - 0.5) * 2.0`; `line = smoothstep(0.80,
   1.0, c)`; `shade = 0.18 * n + 0.82 * line` so the field reads as a
   dithered topographic map (thin lines plus soft interiors).
4. Flashlight: `d = distance(fragPx, u_light)`; `light = smoothstep(u_radius,
   0.0, d)` with `u_radius` = 320 CSS px; `v = shade * (u_base + (1.0 -
   u_base) * light)` where `u_base` = 0.07 (0.35 when no fine pointer or
   reduced motion so the hero is never empty).
5. 1-bit quantization: `on = v > bayer8(gl_FragCoord.xy)` where `bayer8` is
   the arithmetic (no bit ops, WebGL1-safe) recursive Bayer:
   `b2(a)=fract(a.x/2 + a.y*a.y*0.75)`, `b4(a)=b2(a/2)/4 + b2(a)`,
   `b8(a)=b4(a/2)/4 + b2(a)` on floored coordinates.
6. `gl_FragColor = mix(bg, paper, on)`. No intermediate greys exist: the
   flashlight falloff is expressed as dot density, like a printed spotlight.

Uniforms: `u_res`, `u_time`, `u_light`, `u_radius`, `u_base`. Time advances
only when motion is allowed and the hero is on screen (IntersectionObserver)
and the tab is visible. With reduced motion the field renders once and on
resize. If WebGL is unavailable the canvas is replaced by a static CSS
background: a repeating 2px dot pattern at 6% opacity.

Covers: `src/lib/dither2d.ts` renders a `Uint8Array` mask of w*h (96x60)
from `coverField(seed, x, y, t)`: two rotated sine bands plus value noise,
parameters (frequencies, rotation, warp amount, band count) drawn from a
`mulberry32` PRNG seeded by `hashString(slug)`, thresholded with a 4x4 Bayer
matrix from `src/lib/bayer.ts`. `DitherCover.tsx` paints the mask into an
`ImageData` (paper on bg) once on mount; while the parent cell is hovered it
re-renders each frame with `t` advancing, and stops on leave. Flagship cover
uses accent instead of paper.

### 6.2 Flashlight
Hero only, implemented entirely as the `u_light` uniform above, so the light
and the dither are one system. Position = the `light` lerp of the pointer
store, mapped to canvas pixels. When `active` is false (pointer left, or no
fine pointer) the light drifts on a slow Lissajous path
(`x = 0.5 + 0.35 sin(0.11 t)`, `y = 0.5 + 0.30 cos(0.07 t)`) so the hero still
lives on touch devices; with reduced motion it sits at the wordmark's center.

### 6.3 Blob cursor
`BlobCursor.tsx`: a fixed 20px circle, `background: var(--paper)`,
`mix-blend-mode: difference`, `pointer-events: none`, `z-index` above all,
transform updated from the store's `blob` position each frame. Scale 3.2 over
`hoverKind === "link"`, 1.8 over `"cell"`, with a 200ms transform transition
on scale only. Hidden (`display: none`) when `finePointer` is false or
`active` is false; the native cursor stays visible. In the hero the light and
the blob share the pointer target, so they read as one light source.

### 6.4 Scroll reveals
`useReveal` attaches an IntersectionObserver that adds `.in` to
`[data-reveal]` elements (section headers, grid cells, list rows). CSS: start
`opacity: 0; transform: translateY(12px)`, 500ms ease to visible, stagger via
`--i` index within a section. Fail-open: without JS or with reduced motion,
elements are visible from the start (the initial hidden state is applied by a
class the hook adds, never by default CSS).

## 7. Stack and project layout

Vite 6 + React 19 + TypeScript (strict) + Vitest + @testing-library/react
(jsdom). No UI or animation libraries; shaders are inline strings.

```
index.html                 meta, OG tags, JSON-LD Person, font links, #root
package.json               scripts: dev, build, preview, test, typecheck
tsconfig.json  vite.config.ts  vercel.json  .gitignore  README.md
public/resume.pdf          copied from the old repo (predates ForgeSync; Bharath replaces)
public/favicon.svg         black square, paper "B" in serif
src/main.tsx               mounts <App/>
src/App.tsx                Nav, Hero, Work, Experience, Numbers, Skills, Credentials, Contact, BlobCursor
src/content.ts             typed facts (verbatim port)
src/styles.css             tokens, base, layout, sections, effects
src/lib/prng.ts            hashString (FNV-1a 32) and mulberry32
src/lib/bayer.ts           bayerMatrix(n) for n in {2,4,8}, threshold(n)
src/lib/dither2d.ts        coverField, renderCoverMask
src/lib/pointer.ts         shared eased pointer store
src/lib/env.ts             finePointer, reducedMotion, webgl flags
src/lib/index.ts           buildIndex(PROJECTS), filterProjects, FILTER_DEFS
src/hooks/useFitText.ts    fit a line of text to its container width
src/hooks/useReveal.ts     IntersectionObserver reveals
src/effects/heroShader.ts  GLSL source strings
src/effects/HeroField.tsx  WebGL canvas component
src/effects/DitherCover.tsx
src/effects/BlobCursor.tsx
src/sections/Nav.tsx Hero.tsx Work.tsx Experience.tsx Numbers.tsx Skills.tsx Credentials.tsx Contact.tsx
src/__tests__/             see section 9
```

`index.html` metadata reuses the old title, description, OG and Twitter tags,
canonical `https://thebharath.co`, `theme-color #0f0f0e`, and adds a JSON-LD
`Person` (name, jobTitle, url, sameAs: GitHub, LinkedIn, Medium, X).

## 8. Deploy

Vercel: `vercel.json` with `buildCommand: npm run build`, `outputDirectory:
dist`, `cleanUrls: true`, headers `Cache-Control: public, max-age=31536000,
immutable` for `/assets/(.*)` (Vite content-hashes everything under
`assets/`) and `max-age=0, must-revalidate` for `/` and `/index.html`. The
README repeats the old lesson: never `immutable` on a stable path. GitHub
Pages is documented as an alternative (official `actions/deploy-pages`
workflow on `dist/`); no workflow file is shipped.

No git operations are performed unless Bharath asks.

## 9. Testing

Unit (Vitest, node environment):
- `prng.test.ts`: `hashString` deterministic and distinct across slugs;
  `mulberry32(seed)` reproducible, values in [0,1).
- `bayer.test.ts`: `bayerMatrix(2)` equals `[[0,2],[3,1]]`; `bayerMatrix(4)`
  equals the standard matrix; `bayerMatrix(8)` is a permutation of 0..63;
  `threshold(n)[y][x] === (m[y][x] + 0.5) / (n*n)`.
- `dither2d.test.ts`: mask length w*h, values only 0 or 1, deterministic per
  seed, different for different slugs, changes with `t`.
- `index.test.ts`: 24 entries numbered "01".."24"; ForgeSync is 01; the
  roadmap project is 24; Featured filter returns 9; category filter matches
  tags; numbers unchanged after filtering.
- `content.test.ts`: the Artie line contains "opened" and never "merged";
  MCP Trust Scanner has `roadmap: true` and its desc starts with
  "Roadmap, not built"; loopcheck desc contains both "0.33" and "too small";
  downgrade desc matches no `/\d+ tests/`; the Compsoft entry never mentions
  CNN; no string in content contains an em dash.

Component (Vitest, jsdom):
- `Work.test.tsx`: renders 24 cells; the roadmap cell has
  `data-roadmap="true"` and the text ROADMAP; downgrade shows IN PROGRESS;
  clicking Featured leaves 9 cells with their original numbers; the
  agent-triage cell shows `pip install agent-triage`.
- `Hero.test.tsx`: h1 accessible name is "Bharath Kumar Rajesh"; the four
  links resolve to PROFILE.links.

Manual browser pass (recorded in the plan): desktop 1440, 1024, and 400px;
hover states; keyboard tab order; reduced-motion emulation; WebGL fallback by
forcing `webgl=false`; Lighthouse-style checks: no layout shift from font
swap on the wordmark (fit re-runs after `fonts.ready`).

## 10. Follow-ups (not in this spec)

OG image (1200x630) generated from the dither code; replacing `resume.pdf`
with a current one; Medium post links; GitHub Pages workflow if wanted.

## 11. Implementation notes (2026-09-21, after the browser pass)

Deltas from the sections above, all made while tuning in the browser:

- 6.1 Hero field: `u_base` is 0.0 with a fine pointer (the far field is pure
  black), 0.09 on touch devices (the drifting light supplies the life), 0.2
  with reduced motion. The light adds a faint halo (4.5% at the center,
  fading to zero at 2x the radius) so the reveal has a soft outer edge.
  Radius 360px. Contours: 9 bands, lines from `smoothstep(0.86, 1.0, c)`,
  `shade = 0.12n + 0.88 line`.
- 5.2 Hero: a bottom gradient scrim (transparent to 92% bg) sits between the
  field and the copy so the meta line, thesis and links stay readable at every
  width; the field is strongest around the wordmark.
- 6.1 Covers: bolder parameters (frequencies 0.5..1.6, 1..3 bands, warp
  0.3..0.9) plus a contrast curve before quantization, so each cover is solid
  shapes with dithered edges rather than a dithered gradient. Mean paper
  coverage is 37%, so black dominates. Hover animation runs at 0.35x.
- 6.4 Reveals use a scroll/resize check over the not-yet-revealed elements
  instead of IntersectionObserver: simpler, and it never leaves content hidden
  when observer delivery is paused (hidden documents, some embedded views).
- 5.1 Nav: section links show from 1024px (not 760px), so the name and
  "Resume" never wrap.
- 5.3 Grid hairlines are per-cell borders, not a gap-painted background, so an
  empty trailing slot stays black.
- HeroField never throws: shader or program failures log a warning and fall
  back to the CSS pattern. The WebGL context is not released on unmount
  (StrictMode re-runs the effect on the same canvas).
- `useFitText` corrects itself with a second measurement and re-fits on
  `document.fonts` `loadingdone`, so a late font load cannot leave the
  wordmark overflowing.
- Toolchain: npm 10 fails to resolve vitest 5's peer set; `.npmrc` sets
  `legacy-peer-deps=true`.

## 12. Revision (2026-09-21, after Bharath's scrolling feedback)

- 5.3 Work is two-tier. Featured (9) keep the cover cells: ForgeSync spans the
  full width with the cover in the first third and copy in the rest; the other
  8 sit in 2 / 3 / 4 columns at 760 / 1024 / 1280px. The remaining 15 are
  compact hairline rows ("Also in the index": number, name, badge, category,
  one-line description, Repo). Hovering a row floats its dither cover beside
  the cursor (fine pointers only). Numbers stay stable across both tiers.
  Desktop Work height went from about 4,500px to 2,700px; a phone page from
  about 15,000px to 9,600px.
- 5.1 Below 1024px the header gains a horizontally scrollable strip of section
  links under the bar (`--nav-h` becomes 86px there); sections carry
  `scroll-margin-top` so anchors land below the sticky header.
- 5.2 Below 760px the hero is content-height (no forced 100svh); the four
  links are a 2x2 button grid showing label and arrow only; the "Scroll" foot
  is hidden.
- 5.3 Below 760px the featured cells are a horizontal scroll-snap carousel
  (cards `min(78vw, 360px)`), descriptions clamp to 5 lines, and the flagship's
  facts and perf paragraph are hidden; rows show a 2-line description.
- 6.3 Blob cursor fix: the CSS `scale` property is applied before `transform`,
  so scaling the blob also scaled its translation. The blob now has an inner
  dot that carries the scale; the outer element only translates.

## 13. Loader (2026-09-21, requested by Bharath)

A full-screen intro shown once per session (`sessionStorage`), only when
WebGL is available and motion is allowed; any failure removes it. The
flashlight opens like an iris from the pointer (or screen center) as a mono
counter ticks `01 / 24` to `24 / 24` over 1.3s; the base brightness ramps
with `p^5` so the whole contour field is lit only at the end. The overlay
then dissolves in Bayer order over 0.45s (a `u_out` uniform drops fragment
alpha in threshold order) onto the hero. Click, key, wheel, or touch skips to
the dissolve; a 2s hard cap from mount finishes it regardless. The hero's
entrance animations are paused (`html.is-loading`) until the loader is gone.
The WebGL setup is shared with the hero through `src/effects/field.ts`.

## 14. Thinking Orbs (2026-09-21, requested by Bharath)

Dependency added: `thinking-orbs` (MIT, Jakub Antalik), dotted 2D-canvas
agent-status indicators, wrapped in `src/effects/Orb.tsx` with `theme="dark"`,
`speed={0.8}` and `aria-hidden` (decorative; the adjacent text carries the
meaning). Exactly four placements, each with a semantic state:

- Hero "Open to" line: `breathing`, 20px (available).
- Work badges: `working` inside IN PROGRESS, `shaping` inside ROADMAP, 20px.
- Contact: `listening`, 64px, beside the email.
- Loader: `searching`, 20px, beside the index counter.

The library respects reduced motion and pauses offscreen on its own.

## 15. Hero revision (2026-09-21, requested by Bharath)

- Headline: `PROFILE.headline` ("AI Engineer building reliable agentic
  systems.") set in Fraunces under the wordmark, the role in paper and the
  rest in paper-dim; the thesis becomes a sans paragraph beneath it. The meta
  line keeps only city and coordinates.
- Quick facts (`PROFILE.quickFacts` minus the city) render as chips between
  the thesis and the "Open to" line.
- GitHub is the primary CTA: a paper-on-black button showing the handle at
  the top of the hero links (full width on phone, where the three secondary
  links share one row), and a `GitHub ↗` link beside `Resume ↗` in the nav.
- Phone scrim starts at 18% so the headline reads over the field.
