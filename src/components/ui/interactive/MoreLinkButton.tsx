import Link from 'next/link';
import Arrow from '@/components/ui/interactive/Arrow';
import ButtonPrimarySmallSp from '@/components/ui/interactive/ButtonPrimarySmallSp';

interface MoreLinkButtonProps {
  href: string;
  /** SP: `ButtonPrimarySmallSp`に委譲 / PC: テキスト + Arrow。呼び出し側の
   * SP専用/PC専用ラッパー内にそれぞれ配置する想定のため、自身では breakpoint を切り替えない。 */
  mode: 'sp' | 'pc';
  /** PC版のテキスト色。SP版は常に白(bg-accent-blueのpill)。 */
  pcColor?: 'dark-green' | 'cream';
  label?: string;
}

/**
 * 「もっと知る」リンク。about(ご挨拶/スタッフインタビュー)・TOP(about導線)で
 * 個別に実装されていたSP/PCパターンを共通化。
 * SP は `ButtonPrimarySmallSp`(Figma Button Primary Small Sp 4211:26143)そのもの。
 * PC はテキスト+Arrow(円矢印)だが、幅・hover挙動が`ButtonPrimary`(Figma Button Primary)と異なる
 * ため独立実装のまま維持(呼び出し元の幅制約が異なるため統合は見送り)。
 */
export default function MoreLinkButton({ href, mode, pcColor = 'dark-green', label = 'もっと知る' }: MoreLinkButtonProps) {
  if (mode === 'sp') {
    return <ButtonPrimarySmallSp href={href} label={label} />;
  }

  const pcColorClass = pcColor === 'cream' ? 'text-cream' : 'text-dark-green';

  return (
    <Link href={href} className={`inline-flex items-center gap-2 group font-gothic font-medium text-[1.125rem] ${pcColorClass}`}>
      {label}
      <Arrow />
    </Link>
  );
}
