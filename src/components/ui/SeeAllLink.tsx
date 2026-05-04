import Link from 'next/link';

interface SeeAllLinkProps {
  href: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * 「すべて見る」共通リンクコンポーネント（PC）。Figma 4211:26034 (default) /
 * 26037 (hover) / 26040 (pressed) / 26043 (disabled) 準拠。
 *
 * - Default: text-dark-green、円 bg-blue
 * - Hover: content opacity-60、円 bg-light-blue
 * - Pressed (active): scale-95
 * - Disabled: content opacity-40、円 bg-dark-green opacity-20
 */
export default function SeeAllLink({
  href,
  label = 'すべて見る',
  disabled = false,
  className,
}: SeeAllLinkProps) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`inline-flex items-center justify-between w-[186px] font-gothic font-medium text-[18px] leading-none tracking-[0.018px] text-dark-green cursor-not-allowed ${className ?? ''}`}
      >
        <span className="px-6 py-[13px] whitespace-nowrap opacity-40">{label}</span>
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dark-green/20 shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-between w-[186px] font-gothic font-medium text-[18px] leading-none tracking-[0.018px] text-dark-green active:scale-95 transition-transform ${className ?? ''}`}
    >
      <span className="px-6 py-[13px] whitespace-nowrap transition-opacity group-hover:opacity-60">
        {label}
      </span>
      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue group-hover:bg-light-blue shrink-0 transition-colors text-white group-hover:text-accent-blue">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
