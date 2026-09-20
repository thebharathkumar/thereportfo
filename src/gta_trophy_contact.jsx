/* ============================================================
   gta_trophy_contact.jsx  ::  Trophy Case + Safehouse + Footer
   ============================================================ */

/* ---------------- TROPHY CASE :: certs + publications ---------------- */
function TrophyCase() {
  return (
    <section className="section" id="trophies">
      <div className="wrap">
        <SecHead
          kicker="Trophy Case // Credentials"
          title="Certified,"
          em="published."
          note="Recent certifications and peer-reviewed publications."
        />

        {/* education dossier strip */}
        <Reveal className="hero-facts" style={{ marginBottom: 28, width: "100%" }}>
          {EDUCATION.map((e, i) => (
            <span className="f" key={i} style={{ flex: "1 1 280px" }}>
              <b>{e.school}</b><br />
              {e.degree}. {e.detail}
            </span>
          ))}
        </Reveal>

        <div className="trophy-grid">
          <Reveal className="trophy-col">
            <h3><span className="tick"></span> Certifications</h3>
            {CERTS.map((c) => (
              <div className="cert" key={c.title}>
                <span className="badge">{c.badge}</span>
                <div>
                  <div className="c-t">{c.title}</div>
                  <div className="c-s">{c.issuer} · {c.date}</div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="trophy-col" d="1">
            <h3><span className="tick"></span> Publications</h3>
            {PUBLICATIONS.map((p) => (
              <div className="pub" key={p.title}>
                <div className="p-top">
                  <span className="p-peer">Peer Reviewed</span>
                  <span className="p-venue">{p.venue}</span>
                </div>
                <div className="p-title">{p.title}</div>
                {p.figure && <div className="p-figure">{p.figure}</div>}
                <div className="p-meta">{p.meta}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WRITING :: field notes ---------------- */
function Writing() {
  return (
    <section className="section" id="writing">
      <div className="wrap">
        <SecHead
          kicker="Field Notes // Writing"
          title="Written"
          em="up."
          note={WRITING.stub}
        />
        <div className="writing-grid">
          {WRITING.items.map((w, i) => (
            <Reveal d={String((i % 3) + 1)} key={w.title} style={{ display: "flex" }}>
              <a className="wcard" href={w.href} target="_blank" rel="noopener" style={{ flex: 1 }}>
                <div className="wc-top">
                  <span className="wc-kind">{w.kind}</span>
                  <span className="wc-link"><Icon.ext /></span>
                </div>
                <div className="wc-title">{w.title}</div>
                <div className="wc-handle">{w.handle}</div>
                <p className="wc-desc">{w.desc}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SAFEHOUSE :: contact ---------------- */
function Safehouse() {
  const L = PROFILE.links;
  const items = [
    { k: "Email", v: L.email, href: `mailto:${L.email}`, ic: "mail" },
    { k: "GitHub", v: "github.com/thebharathkumar", href: L.github, ic: "github" },
    { k: "LinkedIn", v: "in/thebharathkumar", href: L.linkedin, ic: "linkedin" },
    { k: "Medium", v: "@thebharathkumar", href: L.medium, ic: "medium" },
    { k: "Twitter", v: "@passdweed", href: L.twitter, ic: "twitter" },
    { k: "Location", v: PROFILE.city, href: null, ic: "pin" },
  ];
  return (
    <section className="section" id="safehouse">
      <div className="wrap">
        <Reveal className="safehouse-in">
          <div className="safehouse-grid">
            <div>
              <div className="sec-kicker">
                <span className="tick"></span>
                <span className="hud hud-acc">Safehouse // Contact</span>
              </div>
              <h2 className="safe-title">Let's build trustworthy agents.</h2>
              <div className="safe-roles">
                {PROFILE.roles.map((r) => (<span className="chip" key={r}>{r}</span>))}
              </div>
              <p className="safe-p">
                Open to {PROFILE.roles[0]}, {PROFILE.roles[1]}, and {PROFILE.roles[2]} roles. If you are
                building production AI and care about evals, observability, and governance, my inbox is open.
              </p>
              <div className="safe-spon">
                <span className="vi">i</span> {PROFILE.sponsorship}
              </div>
              <a href={`mailto:${L.email}`} className="btn btn-primary"><Icon.mail className="ic" /> Send a message</a>
            </div>
            <div className="contact-list">
              {items.map((it) => {
                const inner = (
                  <React.Fragment>
                    <span className="cl-ic">{Icon[it.ic]()}</span>
                    <div>
                      <div className="cl-k">{it.k}</div>
                      <div className="cl-v">{it.v}</div>
                    </div>
                  </React.Fragment>
                );
                return it.href ? (
                  <a className="cl" key={it.k} href={it.href} target="_blank" rel="noopener">{inner}</a>
                ) : (
                  <div className="cl" key={it.k}>{inner}</div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Foot() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <span>© 2026 Bharath Kumar Rajesh. Built as an original homage, no trademarks used.</span>
        <span>
          <a href={PROFILE.links.github} target="_blank" rel="noopener">GitHub</a>
          {"  ·  "}
          <a href={PROFILE.links.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          {"  ·  "}thebharath.co
        </span>
      </div>
    </footer>
  );
}

Object.assign(window, { TrophyCase, Writing, Safehouse, Foot });
