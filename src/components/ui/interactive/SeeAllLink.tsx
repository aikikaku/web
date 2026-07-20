import Link from 'next/link';
import ArrowButton from '@/components/ui/interactive/ArrowButton';

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
        className={`inline-flex items-center justify-between w-[11.625rem] font-gothic font-medium text-[1.125rem] leading-none tracking-[0.00112rem] text-dark-green cursor-not-allowed ${className ?? ''}`}
      >
        <span className="px-6 py-[0.8125rem] whitespace-nowrap opacity-40">{label}</span>
        <ArrowButton variant="disabled" />
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-between w-[11.625rem] font-gothic font-medium text-[1.125rem] leading-none tracking-[0.00112rem] text-dark-green active:scale-95 transition-transform ${className ?? ''}`}
    >
      <span className="px-6 py-[0.8125rem] whitespace-nowrap transition-opacity group-hover:opacity-60">
        {label}
      </span>
      <ArrowButton />
    </Link>
  );
}
