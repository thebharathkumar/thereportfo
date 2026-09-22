import { ThinkingOrb, type OrbState } from "thinking-orbs";

interface Props {
  state: OrbState;
  size?: 20 | 64;
}

/* Thinking Orbs (MIT, Jakub Antalik): dotted agent-status indicators. Always
   light ink (the site is dark only), slightly slowed to sit with the dither,
   and decorative: the text beside each orb carries the meaning. */
export function Orb({ state, size = 20 }: Props) {
  return <ThinkingOrb state={state} size={size} theme="dark" speed={0.8} className="orb" aria-hidden="true" />;
}
