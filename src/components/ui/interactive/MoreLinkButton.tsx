import Link from 'next/link';
import ArrowButton from './ArrowButton';
import { BookIcon } from '@/components/ui/icons/icons';

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
        <BookIcon />
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
