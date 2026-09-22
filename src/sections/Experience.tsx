import type { CSSProperties } from "react";
import { EXPERIENCE } from "../content";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeader n="02" title="Experience" lede="Where the numbers came from." />
      <ol className="xp">
        {EXPERIENCE.map((e, i) => (
          <li key={e.role + e.org} className="xp__item" data-reveal style={{ "--i": i } as CSSProperties}>
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
