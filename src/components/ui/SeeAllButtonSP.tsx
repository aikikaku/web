import Link from 'next/link';
import { BookIcon } from '@/components/ui/icons';

interface Props {
  href: string;
  label?: string;
  /** book アイコンを左に表示するか（Figma 4211:26130 と同じ） */
  showBookIcon?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * SP「すべて見る」プライマリボタン。Figma 4211:26130 (default) /
 * 26133 (pressed) / 26138 (disabled) 準拠。
 *
 * - Default: bg-blue, white text, rounded-full, w-[22.375rem] h-[3rem]
 * - Pressed (active): opacity-60
 * - Disabled: bg-dark-green opacity-20
 */
export default function SeeAllButtonSP({
  href,
  label = 'すべて見る',
  showBookIcon = true,
  disabled = false,
  className,
}: Props) {
  // Figma 4211:11872 = 358 wide (390 viewport - 16 margin × 2). max-w 制限を外して
  // 親要素 (px-4 など) の inner 幅に追従させる ため w-full のみで運用
  const baseInner =
    'flex items-center justify-center gap-2 w-full h-12 rounded-full font-gothic font-medium text-[1rem] leading-none text-white px-6 py-4';
  const icon = showBookIcon ? <BookIcon /> : null;

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`${baseInner} bg-dark-green opacity-20 cursor-not-allowed ${className ?? ''}`}
      >
        {icon}
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseInner} bg-accent-blue active:opacity-60 transition-opacity ${className ?? ''}`}
    >
      {icon}
      {label}
    </Link>
  );
}
