import Link from 'next/link';
import ArrowButton from './ArrowButton';

interface MoreLinkButtonProps {
  href: string;
  /** SP: 内容幅pill(bg-accent-blue) / PC: テキスト + ArrowButton。呼び出し側の
   * SP専用/PC専用ラッパー内にそれぞれ配置する想定のため、自身では breakpoint を切り替えない。 */
  mode: 'sp' | 'pc';
  /** PC版のテキスト色。SP版は常に白(bg-accent-blueのpill)。 */
  pcColor?: 'dark-green' | 'cream';
  label?: string;
}

/**
 * 「もっと知る」リンク。about(ご挨拶/スタッフインタビュー)・TOP(about導線)で
 * 個別に実装されていたSP/PCパターンを共通化。
 * - SP: 内容幅pill(bg-accent-blue, Figma Button Primary Small Sp 4211:26143)
 * - PC: テキスト + ArrowButton(円矢印)
 */
export default function MoreLinkButton({ href, mode, pcColor = 'dark-green', label = 'もっと知る' }: MoreLinkButtonProps) {
  if (mode === 'sp') {
    return (
      <Link
        href={href}
        className="self-start inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-blue rounded-full font-gothic font-medium text-[1rem] leading-none text-white active:opacity-60 transition-opacity"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z" />
        </svg>
        {label}
      </Link>
    );
  }

  const pcColorClass = pcColor === 'cream' ? 'text-cream' : 'text-dark-green';

  return (
    <Link href={href} className={`inline-flex items-center gap-2 group font-gothic font-medium text-[1.125rem] ${pcColorClass}`}>
      {label}
      <ArrowButton />
    </Link>
  );
}
