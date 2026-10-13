import Link from 'next/link';
import { BookIcon } from '@/components/ui/icons/icons';

interface Props {
  href: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * SP用セカンダリボタン(アウトライン+book アイコン+テキスト)。
 * Figma button-secondary-small-sp 4211:26159(Default/Pressed/Disabled)準拠。
 */
export default function ButtonSecondarySmallSp({ href, label = 'テキスト', disabled = false, className }: Props) {
  const inner =
    'inline-flex items-center justify-center gap-2 h-11 px-4 border border-dark-green rounded-full font-gothic font-medium text-[1rem] leading-none transition-colors';

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`${inner} text-dark-green opacity-40 cursor-not-allowed ${className ?? ''}`}
      >
        <BookIcon />
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`${inner} text-dark-green active:bg-dark-green active:border-cream/30 active:text-white ${className ?? ''}`}
    >
      <BookIcon />
      {label}
    </Link>
  );
}
