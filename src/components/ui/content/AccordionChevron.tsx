interface AccordionChevronProps {
  isOpen: boolean;
  className?: string;
}

/** アコーディオンの開閉シェブロン。FaqAccordion/NewsAccordion/VoiceContentで共通利用。 */
export default function AccordionChevron({ isOpen, className = '' }: AccordionChevronProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : ''} ${className}`}
    >
      <path d="M6 9l6 6 6-6" className="stroke-dark-green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
