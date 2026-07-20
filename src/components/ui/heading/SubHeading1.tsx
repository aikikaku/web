interface Props {
  section: string;
  headline: string;
  className?: string;
}

/**
 * サブ見出し1(Section eyebrow + H3)。Figma sub-heading-1 4211:24923 準拠。
 * H3相当は globals.css の `h3` をそのまま利用(tablet:text-[2rem])。
 */
export default function SubHeading1({ section, headline, className = '' }: Props) {
  return (
    <div className={`flex flex-col gap-2 text-dark-green ${className}`}>
      <p className="font-gothic text-body-m">{section}</p>
      <h3>{headline}</h3>
    </div>
  );
}
