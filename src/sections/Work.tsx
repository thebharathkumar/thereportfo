import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { DitherCover } from "../effects/DitherCover";
import { Orb } from "../effects/Orb";
import { finePointer } from "../lib/env";
import { FILTER_DEFS, buildIndex, filterIndex, type FilterId, type IndexedProject } from "../lib/index";
import { getPointer, startPointer } from "../lib/pointer";
import { SectionHeader } from "./SectionHeader";

/* Two tiers: featured projects as cover cells, the rest as compact rows whose
   cover floats next to the cursor on hover. Numbers are stable across both. */
export function Work() {
  const index = useMemo(() => buildIndex(), []);
  const [filter, setFilter] = useState<FilterId>("all");
  const [preview, setPreview] = useState<IndexedProject | null>(null);
  const visible = filterIndex(index, filter);
  const featured = visible.filter((e) => e.project.featured);
  const rest = visible.filter((e) => !e.project.featured);

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
      {featured.length > 0 && (
        <div className="grid">
          {featured.map((entry, i) => (
            <ProjectCell key={entry.project.slug} entry={entry} i={i} />
          ))}
        </div>
      )}
      {rest.length > 0 && (
        <div className="rows">
          <p className="label rows__label">Also in the index</p>
          <ol className="rows__list">
            {rest.map((entry, i) => (
              <ProjectRow
                key={entry.project.slug}
                entry={entry}
                i={i}
                onEnter={() => setPreview(entry)}
                onLeave={() => setPreview((cur) => (cur === entry ? null : cur))}
              />
            ))}
          </ol>
        </div>
      )}
      <RowPreview entry={preview} />
    </section>
  );
}

/** Status badge with its agent-state orb: work in progress, or a plan taking shape. */
function Badge({ p, inline = false }: { p: IndexedProject["project"]; inline?: boolean }) {
  if (!p.badgeLabel) return null;
  return (
    <span className={inline ? "badge badge--inline" : "badge"}>
      <Orb state={p.roadmap ? "shaping" : "working"} />
      {p.badgeLabel}
    </span>
  );
}

function ProjectCell({ entry: { number, project: p }, i }: { entry: IndexedProject; i: number }) {
  const [hovered, setHovered] = useState(false);
  const className = ["cell", p.flagship && "cell--flagship"].filter(Boolean).join(" ");

  return (
    <article
      className={className}
      data-cell=""
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
        <Badge p={p} />
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

interface RowProps {
  entry: IndexedProject;
  i: number;
  onEnter: () => void;
  onLeave: () => void;
}

function ProjectRow({ entry: { number, project: p }, i, onEnter, onLeave }: RowProps) {
  return (
    <li
      className={p.roadmap ? "row row--roadmap" : "row"}
      data-cell=""
      data-roadmap={p.roadmap ? "true" : undefined}
      data-reveal
      style={{ "--i": i } as CSSProperties}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <span className="cell__num">{number}.</span>
      <h3 className="row__name">
        {p.name}
        <Badge p={p} inline />
      </h3>
      <span className="row__tag">{p.tags[0]}</span>
      <p className="row__desc">{p.desc}</p>
      <a className="row__repo" href={p.repo} target="_blank" rel="noopener">
        Repo ↗
      </a>
    </li>
  );
}

const PREVIEW_W = 220;
const PREVIEW_H = 138;

/** The hovered row's cover, floating beside the cursor. Fine pointers only. */
function RowPreview({ entry }: { entry: IndexedProject | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = finePointer();

  useEffect(() => {
    const el = ref.current;
    if (!el || !entry || !fine) return;
    startPointer();
    const place = (x: number, y: number) => {
      const left = x + 24 + PREVIEW_W > window.innerWidth ? x - 24 - PREVIEW_W : x + 24;
      const top = Math.min(Math.max(8, y - PREVIEW_H / 2), window.innerHeight - PREVIEW_H - 8);
      el.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    };
    const t = getPointer().target;
    place(t.x, t.y);
    const move = (e: PointerEvent) => place(e.clientX, e.clientY);
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [entry, fine]);

  if (!entry || !fine) return null;
  return (
    <div ref={ref} className="preview" aria-hidden="true">
      <DitherCover slug={entry.project.slug} hovered />
    </div>
  );
}
