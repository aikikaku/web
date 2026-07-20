import Link from 'next/link';

interface Props {
  href: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * SP用テキストリンク(テキスト+シェブロン)。Figma Textlink-sp 4211:26195
 * (Default/Hover/Pressed/Disabled)準拠。PC版の`Textlink`よりフォントサイズが小さい(caption)。
 */
export default function TextlinkSp({ href, label = 'テキストリンク', disabled = false, className }: Props) {
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
        className={`inline-flex items-center gap-1 font-gothic text-[0.75rem] leading-[1.8] text-dark-green opacity-40 cursor-not-allowed ${className ?? ''}`}
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1 font-gothic text-[0.75rem] leading-[1.8] text-dark-green transition-opacity hover:opacity-60 hover:underline ${className ?? ''}`}
    >
      {content}
    </Link>
  );
}
