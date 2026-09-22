import { useRef } from "react";
import { PROFILE, PROJECTS } from "../content";
import { HeroField } from "../effects/HeroField";
import { Orb } from "../effects/Orb";
import { useFitText } from "../hooks/useFitText";

export function Hero() {
  const mark = useRef<HTMLSpanElement>(null);
  useFitText(mark);
  const first = PROFILE.name.split(" ")[0];
  const { links } = PROFILE;
  const headlineRest = PROFILE.headline.startsWith(PROFILE.title)
    ? PROFILE.headline.slice(PROFILE.title.length)
    : ` ${PROFILE.headline}`;
  const facts = PROFILE.quickFacts.filter((f) => f !== PROFILE.city);
  const githubHandle = new URL(links.github).pathname.replace(/^\//, "");

  return (
    <section id="top" className="hero" aria-label="Introduction">
      <HeroField />
      <div className="hero__inner">
        <h1 className="hero__title">
          <span ref={mark} className="wordmark" aria-hidden="true">
            {first}
          </span>
          <span className="sr-only">{PROFILE.name}</span>
        </h1>
        <div className="hero__row">
          <div className="hero__lead">
            <p className="meta">
              {PROFILE.city} · {PROFILE.coords}
            </p>
            <h2 className="hero__role">
              <strong>{PROFILE.title}</strong>
              {headlineRest}
            </h2>
            <p className="thesis">{PROFILE.thesis}</p>
            <ul className="chips hero__facts">
              {facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="meta meta--dim hero__open">
              <Orb state="breathing" />
              <span>Open to: {PROFILE.roles.join(", ")}</span>
            </p>
          </div>
          <ul className="hero__links">
            <li className="hero__primary">
              <a href={links.github} target="_blank" rel="noopener">
                <span>GitHub</span>
                <span>
                  <span className="hero__linkmeta">{githubHandle} </span>↗
                </span>
              </a>
            </li>
            <li>
              <a href={links.linkedin} target="_blank" rel="noopener">
                <span>LinkedIn</span>
                <span>↗</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${links.email}`}>
                <span>Email</span>
                <span>
                  <span className="hero__linkmeta">{links.email} </span>↗
                </span>
              </a>
            </li>
            <li>
              <a href={links.resume} target="_blank" rel="noopener">
                <span>Resume</span>
                <span>
                  <span className="hero__linkmeta">PDF </span>↗
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="hero__foot">
          <span className="meta meta--faint">Scroll</span>
          <span className="meta meta--faint">Index of {PROJECTS.length} repositories</span>
        </div>
      </div>
    </section>
  );
}
