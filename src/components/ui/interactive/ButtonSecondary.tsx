import Link from 'next/link';
import { BookIcon } from '@/components/ui/icons/icons';

interface Props {
  href: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * PC用セカンダリボタン(アウトライン+book アイコン+テキスト)。
 * Figma Button-secondary 4211:26046(Default/Hover/Pressed/Disabled)準拠。
 */
export default function ButtonSecondary({ href, label = 'テキスト', disabled = false, className }: Props) {
  const inner =
    'inline-flex items-center gap-1 h-11 px-3 border border-dark-green rounded-full font-gothic font-medium text-[1rem] leading-none transition-colors';

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
      className={`${inner} text-dark-green hover:bg-dark-green hover:border-cream/30 hover:text-white ${className ?? ''}`}
    >
      <BookIcon />
      {label}
    </Link>
  );
}
