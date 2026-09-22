import { ERRORBARS, ERRORBARS_FOOT } from "../content";
import { SectionHeader } from "./SectionHeader";

export function Numbers() {
  return (
    <section id="numbers" className="section">
      <SectionHeader n="03" title="Numbers" lede="Every figure, with what it does not mean." />
      <table className="numbers" data-reveal>
        <thead>
          <tr>
            <th scope="col">Claim</th>
            <th scope="col">Figure</th>
            <th scope="col">What it does not mean</th>
          </tr>
        </thead>
        <tbody>
          {ERRORBARS.map((r) => (
            <tr key={r.claim}>
              <td className="numbers__claim">{r.claim}</td>
              <td className="numbers__figure">{r.figure}</td>
              <td className="numbers__caveat">{r.caveat}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="meta meta--faint numbers__foot">{ERRORBARS_FOOT}</p>
    </section>
  );
}
