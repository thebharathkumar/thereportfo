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
