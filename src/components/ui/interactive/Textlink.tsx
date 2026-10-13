import Link from 'next/link';

interface Props {
  href: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * PC用テキストリンク(テキスト+シェブロン)。Figma Textlink 4211:26089
 * (Default/Hover/Pressed/Disabled)準拠。
 */
export default function Textlink({ href, label = 'テキストリンク', disabled = false, className }: Props) {
  const content = (
    <>
      <span>{label}</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`inline-flex items-center gap-1 font-gothic font-medium text-[0.875rem] leading-none text-dark-green opacity-40 cursor-not-allowed ${className ?? ''}`}
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1 font-gothic font-medium text-[0.875rem] leading-none text-dark-green transition-opacity hover:opacity-60 hover:underline ${className ?? ''}`}
    >
      {content}
    </Link>
  );
}
