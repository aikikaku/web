import ButtonPrimary from '@/components/ui/interactive/ButtonPrimary';
import ButtonPrimarySmallSp from '@/components/ui/interactive/ButtonPrimarySmallSp';

interface MoreLinkButtonProps {
  href: string;
  /** SP: `ButtonPrimarySmallSp`に委譲 / PC: `ButtonPrimary`に委譲。呼び出し側の
   * SP専用/PC専用ラッパー内にそれぞれ配置する想定のため、自身では breakpoint を切り替えない。 */
  mode: 'sp' | 'pc';
  /** PC版のテキスト色。SP版は常に白(bg-accent-blueのpill)。 */
  pcColor?: 'dark-green' | 'cream';
  label?: string;
}

/**
 * 「もっと知る」リンク。about(ご挨拶/スタッフインタビュー)・TOP(about導線)で
 * 個別に実装されていたSP/PCパターンの薄いラッパー。
 * - SP: `ButtonPrimarySmallSp`(Figma Button Primary Small Sp 4211:26143)
 * - PC: `ButtonPrimary`(Figma Button-primary 4211:9981 等)。文字 + 円矢印の
 *   リンクは Figma 上すべて Button-primary のため、独自実装をやめて委譲する(2026-07-22)。
 */
export default function MoreLinkButton({ href, mode, pcColor = 'dark-green', label = 'もっと知る' }: MoreLinkButtonProps) {
  if (mode === 'sp') {
    return <ButtonPrimarySmallSp href={href} label={label} />;
  }

  return <ButtonPrimary href={href} label={label} color={pcColor} />;
}
