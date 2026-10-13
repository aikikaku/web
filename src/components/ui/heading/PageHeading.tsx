interface Props {
  section: string;
  headline: string;
  className?: string;
}

/**
 * ページ見出し(Section eyebrow + H1)。Figma page-heading 4211:24917 準拠。
 * H1相当は globals.css の `h1` をそのまま利用(tablet:text-[3.5rem])。
 */
export default function PageHeading({ section, headline, className = '' }: Props) {
  return (
    <div className={`flex flex-col gap-2 text-dark-green ${className}`}>
      <p className="font-gothic text-body-m">{section}</p>
      <h1>{headline}</h1>
    </div>
  );
}
