interface Props {
  section: string;
  headline: string;
  className?: string;
}

/**
 * セクション見出し(Section eyebrow + H2)。Figma section-heading 4211:24920 準拠。
 * H2相当は globals.css の `h2` をそのまま利用(tablet:text-[3rem])。
 */
export default function SectionHeading({ section, headline, className = '' }: Props) {
  return (
    <div className={`flex flex-col gap-2 text-dark-green ${className}`}>
      <p className="font-gothic text-body-m">{section}</p>
      <h2>{headline}</h2>
    </div>
  );
}
