import { PROFILE } from "../content";

const LINKS = [
  ["work", "Work"],
  ["experience", "Experience"],
  ["numbers", "Numbers"],
  ["skills", "Skills"],
  ["credentials", "Credentials"],
  ["contact", "Contact"],
] as const;

const links = LINKS.map(([id, label]) => (
  <a key={id} href={`#${id}`}>
    {label}
  </a>
));

/* One header, two link rows: inline on wide screens, a scrollable strip below
   the bar on narrow ones. CSS shows exactly one of them. */
export function Nav() {
  return (
    <header className="nav">
      <div className="nav__bar">
        <a className="nav__name" href="#top">
          {PROFILE.name}
        </a>
        <nav className="nav__links" aria-label="Sections">
          {links}
        </nav>
        <div className="nav__cta">
          <a href={PROFILE.links.github} target="_blank" rel="noopener">
            GitHub ↗
          </a>
          <a href={PROFILE.links.resume} target="_blank" rel="noopener">
            Resume ↗
          </a>
        </div>
      </div>
      <nav className="nav__strip" aria-label="Sections">
        {links}
      </nav>
    </header>
  );
}
