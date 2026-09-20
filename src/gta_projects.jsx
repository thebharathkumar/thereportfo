/* ============================================================
   gta_projects.jsx  ::  Heist Board (featured) + Garage (grid)
   ============================================================ */

/* ---- copyable install command (PyPI verifiability signal) ----
   Lives inside a card whose whole surface is a link, so it stops
   the click from following the card's href.                    */
function CopyCmd({ cmd }) {
  const [done, setDone] = useState(false);
  const copy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = () => { setDone(true); setTimeout(() => setDone(false), 1400); };
    // execCommand path: still the only one that works without clipboard
    // permission or a secure context, so it backs up the async API rather
    // than only standing in when that API is missing.
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = cmd;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { if (document.execCommand("copy")) ok(); } catch (err) { /* no clipboard available */ }
      document.body.removeChild(ta);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cmd).then(ok, fallback);
      return;
    }
    fallback();
  };
  return (
    <button type="button" className={`copycmd ${done ? "done" : ""}`} onClick={copy}
      aria-label={`Copy ${cmd} to clipboard`} title="Copy to clipboard">
      <span className="cc-src">PyPI</span>
      <code>{cmd}</code>
      <span className="cc-act">{done ? "copied" : "copy"}</span>
    </button>
  );
}

/* ---------------- HEIST BOARD :: featured ---------------- */
function Flagship({ p }) {
  return (
    <Reveal className="heist-flag">
      <div className="flagship" style={{ "--cardc": catColor(p.tags[0]) }}>
        <div className="fl-l">
          <a className="fl-hit" href={p.repo} target="_blank" rel="noopener" aria-label={`${p.name} on GitHub`}></a>
          <span className="fl-tag">
            <span className="keystone">Keystone</span> Flagship Project
          </span>
          <h3 className="fl-name">{p.name}</h3>
          <p className="fl-desc">{p.desc}</p>
          <div className="chip-row" style={{ marginTop: 22 }}>
            {p.stack.map((s) => (<span className="chip" key={s}>{s}</span>))}
          </div>
        </div>
        <div className="fl-r">
          {p.facts && (
            <div className="fl-facts">
              <span className="hud hud-acc">Test surface</span>
              <ul>
                {p.facts.map((f, k) => (<li key={k}>{f}</li>))}
              </ul>
            </div>
          )}
          {p.perf && (
            <div className="fl-perf">
              <span className="hud">Measured</span>
              <p>{p.perf}</p>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- ROADMAP :: declared, not shipped ---------------- */
function RoadmapCard({ p }) {
  return (
    <Reveal className="heist-flag" d="1">
      <div className="roadmap">
        <div className="rm-head">
          <span className="rm-tag">Roadmap</span>
          <span className="rm-status"><span className="pulse"></span> STATUS: NOT BUILT YET</span>
        </div>
        <h3 className="rm-name">
          <a href={p.repo} target="_blank" rel="noopener">{p.name}</a>
        </h3>
        <p className="rm-desc">{p.desc}</p>
        <div className="chip-row" style={{ marginTop: 16 }}>
          {p.stack.map((s) => (<span className="chip" key={s}>{s}</span>))}
        </div>
        <div className="rm-diagram" aria-hidden="true">
          <div><span className="node">agent-triage</span> <span className="arrow">+</span></div>
          <div><span className="node">mcp-otel-audit</span> <span className="arrow">+</span></div>
          <div><span className="node">super-mcp-eval</span> <span className="arrow">+</span></div>
          <div><span className="node">obindoc</span></div>
          <div className="arrow">&nbsp;&nbsp;&nbsp;&darr;</div>
          <div><span className="node">&#9656; MCP Trust Scanner</span></div>
          <div className="arrow" style={{ marginTop: 8 }}>scan &middot; score &middot; rank</div>
        </div>
        <span className="hud">Would unify the observability and governance work into one public audit tool.</span>
      </div>
    </Reveal>
  );
}

function PCard({ p, i }) {
  const c = catColor(p.tags[0]);
  return (
    <Reveal d={String((i % 3) + 1)} style={{ display: "flex" }}>
      <div className="pcard" style={{ "--cardc": c, flex: 1 }}>
        <a className="pc-hit" href={p.repo} target="_blank" rel="noopener" aria-label={`${p.name} on GitHub`}></a>
        <div className="pc-top">
          <span className="pc-cat">{p.tags[0]}</span>
          <span className="pc-link"><Icon.github /></span>
        </div>
        <div className="pc-name">{p.name}{p.inDev && <span className="pc-dev">{p.badgeLabel || "IN DEV"}</span>}</div>
        <p className="pc-desc">{p.desc}</p>
        <div className="pc-foot">
          {p.pypi && <CopyCmd cmd={p.pypi} />}
          <div className="chip-row pc-stack">
            {p.stack.map((s) => (<span className="chip" key={s}>{s}</span>))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function HeistBoard() {
  const flagship = PROJECTS.find((p) => p.flagship);
  const roadmap = PROJECTS.filter((p) => p.roadmap);
  const featured = PROJECTS.filter((p) => p.featured && !p.flagship && !p.roadmap);
  return (
    <section className="section" id="heist">
      <div className="wrap">
        <SecHead
          kicker="Heist Board // Featured"
          title="The"
          em="crew."
          note="The reliability-tooling thesis, shipped. Every artifact ladders up to trustworthy agents in production."
        />
        <div style={{ display: "grid", gap: 14 }}>
          {flagship && <Flagship p={flagship} />}
          <div className="heist-grid">
            {featured.map((p, i) => (<PCard p={p} i={i} key={p.slug} />))}
          </div>
          {roadmap.map((p) => (<RoadmapCard p={p} key={p.slug} />))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- GARAGE :: filterable / searchable ---------------- */
function Garage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const inCat = cat === "All" || p.tags.includes(cat) || (cat === "Flagship" && p.flagship);
      const inQ = !query || (p.name + " " + p.desc + " " + p.stack.join(" ")).toLowerCase().includes(query);
      return inCat && inQ;
    });
  }, [q, cat]);

  return (
    <section className="section" id="garage">
      <div className="wrap">
        <SecHead
          kicker="The Garage // Full Index"
          title="Every"
          em="build."
          note="Search and filter the full repository index. Cards link out to source."
        />
        <Reveal className="garage-bar">
          <label className="search">
            <Icon.search />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search builds, stacks, descriptions..."
              aria-label="Search projects"
            />
          </label>
          <span className="garage-count">{String(filtered.length).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
        </Reveal>
        <Reveal className="filters" d="1">
          {FILTERS.map((f) => (
            <button key={f} className={`filter ${cat === f ? "on" : ""}`} onClick={() => setCat(f)}>
              {f}
            </button>
          ))}
        </Reveal>
        <div className="garage-grid" style={{ marginTop: 22 }}>
          {filtered.map((p, i) => {
            const c = catColor(p.tags[0]);
            return (
              <Reveal d={String((i % 3) + 1)} key={p.slug} style={{ display: "flex" }}>
                <a className="gcard" href={p.repo} target="_blank" rel="noopener" style={{ "--cardc": c, flex: 1 }}>
                  <div className="gc-top">
                    <span className="gc-name">{p.name}{p.inDev && <span className="pc-dev">{p.badgeLabel || "IN DEV"}</span>}</span>
                    <span className="gc-link"><Icon.ext /></span>
                  </div>
                  <span className="gc-cat">{p.tags.join(" · ")}</span>
                  <p className="gc-desc">{p.desc}</p>
                  <div className="chip-row gc-stack">
                    {p.stack.slice(0, 4).map((s) => (<span className="chip" key={s}>{s}</span>))}
                  </div>
                </a>
              </Reveal>
            );
          })}
          {filtered.length === 0 && <div className="garage-empty">// no builds match that query</div>}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CopyCmd, Flagship, RoadmapCard, PCard, HeistBoard, Garage });
