import { useEffect, useState } from "react";
import { PROFILE } from "../content";
import { Orb } from "../effects/Orb";
import { SectionHeader } from "./SectionHeader";

const nyTime = () =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

function useNYClock(): string {
  const [time, setTime] = useState(nyTime);
  useEffect(() => {
    const id = setInterval(() => setTime(nyTime()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Contact() {
  const time = useNYClock();
  const { links } = PROFILE;
  return (
    <footer>
      <section id="contact" className="contact">
        <SectionHeader n="06" title="Contact" lede="Let's talk." />
        <div className="contact__row">
          <Orb state="listening" size={64} />
          <a className="contact__email" href={`mailto:${links.email}`}>
            {links.email}
          </a>
        </div>
        <ul className="contact__links">
          <li><a href={links.github} target="_blank" rel="noopener">GitHub ↗</a></li>
          <li><a href={links.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a></li>
          <li><a href={links.medium} target="_blank" rel="noopener">Medium ↗</a></li>
          <li><a href={links.twitter} target="_blank" rel="noopener">X ↗</a></li>
          <li><a href={links.resume} target="_blank" rel="noopener">Resume ↗</a></li>
        </ul>
        <div className="contact__notes">
          <p className="meta meta--dim">{PROFILE.sponsorship}</p>
          <p className="meta meta--dim">Open to relocation: {PROFILE.relocation.join(", ")}</p>
        </div>
      </section>
      <div className="footer">
        <span>{PROFILE.name}, 2026</span>
        <span>New York City · {time}</span>
        <span>Fraunces, Geist Mono, Geist. Dithered with an 8x8 Bayer matrix. No trackers.</span>
      </div>
    </footer>
  );
}
