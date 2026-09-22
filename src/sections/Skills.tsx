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
