import Link from 'next/link';
import Arrow from '@/components/ui/interactive/Arrow';

interface ButtonPrimaryProps {
  href: string;
  label?: string;
  disabled?: boolean;
  /** テキスト色。dark-green 背景など明るい文字が必要な箇所は 'cream'。既定 'dark-green' */
  color?: 'dark-green' | 'cream';
  className?: string;
}

/**
 * PC用プライマリボタン(ラベル+円矢印)。Figma Button Primary 4211:26034 (default) /
 * 26037 (hover) / 26040 (pressed) / 26043 (disabled) 準拠。
 * 「もっと知る」「すべて見る」など、文字 + 円矢印のリンクはすべてこのコンポーネントを使う。
 *
 * - Default: text-dark-green、円 bg-blue
 * - Hover: content opacity-60、円 bg-light-blue
 * - Pressed (active): scale-95
 * - Disabled: content opacity-40、円 bg-dark-green opacity-20
 * - color='cream': dark-green 背景向けに text-cream + Arrow cream(hover で円 cream)
 */
export default function ButtonPrimary({
  href,
  label = 'すべて見る',
  disabled = false,
  color = 'dark-green',
  className,
}: ButtonPrimaryProps) {
  const textColor = color === 'cream' ? 'text-cream' : 'text-dark-green';

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`inline-flex items-center justify-between w-[11.625rem] font-gothic font-medium text-[1.125rem] leading-none tracking-[0.00112rem] ${textColor} cursor-not-allowed ${className ?? ''}`}
      >
        <span className="px-6 py-[0.8125rem] whitespace-nowrap opacity-40">{label}</span>
        <Arrow variant="disabled" />
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-between w-[11.625rem] font-gothic font-medium text-[1.125rem] leading-none tracking-[0.00112rem] ${textColor} active:scale-95 transition-transform ${className ?? ''}`}
    >
      <span className="px-6 py-[0.8125rem] whitespace-nowrap transition-opacity group-hover:opacity-60">
        {label}
      </span>
      <Arrow variant={color === 'cream' ? 'cream' : 'default'} />
    </Link>
  );
}
