interface Props {
  section: string;
  headline: string;
  className?: string;
}

/**
 * サブ見出し2(Section eyebrow + H4)。Figma sub-heading-2 4211:24926 準拠。
 * H4相当は globals.css の `h4` をそのまま利用(tablet:text-[1.5rem])。
 */
export default function SubHeading2({ section, headline, className = '' }: Props) {
  return (
    <div className={`flex flex-col gap-2 text-dark-green ${className}`}>
      <p className="font-gothic text-body-s">{section}</p>
      <h4>{headline}</h4>
    </div>
  );
}
