/* ============================================================
   gta_skills_exp.jsx  ::  Stat Panel (skills) + Mission Log
   ============================================================ */

/* reusable section header */
function SecHead({ kicker, title, em, note }) {
  return (
    <Reveal className="sec-head">
      <div>
        <div className="sec-kicker">
          <span className="tick"></span>
          <span className="hud hud-acc">{kicker}</span>
        </div>
        <h2 className="sec-title">
          {title} {em && <em>{em}</em>}
        </h2>
      </div>
      {note && <div className="sec-note">{note}</div>}
    </Reveal>
  );
}

/* ---------------- STAT PANEL :: skills ---------------- */
function StatPanel() {
  return (
    <section className="section" id="loadout">
      <div className="wrap">
        <SecHead
          kicker="Stat Panel // Loadout"
          title="Capabilities,"
          em="equipped."
          note="Grouped by domain. No proficiency scores, the work in the garage speaks for itself."
        />
        <div className="stat-grid">
          {SKILLS.map((cat, i) => (
            <Reveal className="stat-cell" key={cat.group} d={String((i % 4) + 1)}>
              <div className="sc-top">
                <span className="sc-idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="sc-name">{cat.group}</span>
              </div>
              <div className="stat-blocks" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, k) => (<i key={k}></i>))}
              </div>
              <div className="stat-items">
                {cat.items.map((s) => (<span key={s}>{s}</span>))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MISSION LOG :: experience ---------------- */
function MissionLog() {
  return (
    <section className="section" id="missions">
      <div className="wrap">
        <SecHead
          kicker="Mission Log // Experience"
          title="Roles"
          em="cleared."
          note="From production agent platforms to open-source governance work across the CNCF ecosystem."
        />
        <div className="missions">
          {EXPERIENCE.map((m, i) => {
            const sCls = m.status === "ACTIVE" ? "active" : m.status === "ONGOING" ? "ongoing" : "";
            return (
              <Reveal className="mission" key={m.code} d={String(Math.min(i, 3))}>
                <div className="m-side">
                  <span className="m-code">{m.code}</span>
                  <span className={`m-status ${sCls}`}>{m.status}</span>
                  <span className="m-period">{m.period}</span>
                </div>
                <div className="m-body">
                  <div className="m-role">{m.role}</div>
                  <div className="m-org">{m.org}</div>
                  <ul className="m-points">
                    {m.points.map((p, k) => (<li key={k}>{p}</li>))}
                  </ul>
                  <div className="chip-row">
                    {m.stack.map((s) => (<span className="chip" key={s}>{s}</span>))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ERROR BARS :: what the numbers do not mean ----------------
   Sits between the Mission Log and the Heist Board. Every row is a figure
   claimed elsewhere on this page, next to the reading it does not support. */
function ErrorBars() {
  return (
    <section className="section" id="errorbars">
      <div className="wrap">
        <SecHead
          kicker="Dossier // Disclosure"
          title="Numbers, with their"
          em="error bars."
          note="Each figure on this page, and the thing it does not mean."
        />
        <Reveal className="eb-table">
          <div className="eb-row eb-head" role="presentation">
            <span className="eb-claim">Claim</span>
            <span className="eb-figure">Figure</span>
            <span className="eb-caveat">What it does not mean</span>
          </div>
          {ERRORBARS.map((r, i) => (
            <div className="eb-row" key={i}>
              <span className="eb-claim">
                <i className="eb-idx">{String(i + 1).padStart(2, "0")}</i>
                {r.claim}
              </span>
              <span className="eb-figure">{r.figure}</span>
              <span className="eb-caveat">{r.caveat}</span>
            </div>
          ))}
        </Reveal>
        <Reveal className="eb-foot" d="1">
          <span className="tick"></span> {ERRORBARS_FOOT}
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { SecHead, StatPanel, MissionLog, ErrorBars });
