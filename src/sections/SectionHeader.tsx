interface Props {
  n: string;
  title: string;
  lede?: string;
}

export function SectionHeader({ n, title, lede }: Props) {
  return (
    <div className="section__head" data-reveal>
      <h2 className="section__title">
        <span className="section__n">{n} /</span> {title}
      </h2>
      {lede && <p className="section__lede">{lede}</p>}
    </div>
  );
}
