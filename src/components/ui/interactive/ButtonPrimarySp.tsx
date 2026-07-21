import Link from 'next/link';

interface Props {
  href: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * SP用プライマリボタン(全幅)。Figma「button-primary-sp」4211:10627 /
 * 4211:26130 (default) / 26133 (pressed) / 26138 (disabled) 準拠。
 * 「もっと知る」「すべて見る」等の SP 全幅ボタンはこれを使う。
 *
 * - Default: bg-blue, white text, rounded-full, 全幅 h-12。**アイコンは無し**
 *   (Figma の button-primary-sp インスタンスはアイコン非表示。アイコン付きは
 *   別コンポーネント [[ButtonPrimarySmallSp]](button-primary-small-sp)を使う)
 * - Pressed (active): opacity-60
 * - Disabled: bg-dark-green opacity-20
 */
export default function ButtonPrimarySp({
  href,
  label = 'すべて見る',
  disabled = false,
  className,
}: Props) {
  // 親要素 (px-4 など) の inner 幅に追従させるため w-full で運用
  const baseInner =
    'flex items-center justify-center w-full h-12 rounded-full font-gothic font-medium text-[1rem] leading-none text-white px-6 py-4';

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`${baseInner} bg-dark-green opacity-20 cursor-not-allowed ${className ?? ''}`}
      >
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseInner} bg-accent-blue active:opacity-60 transition-opacity ${className ?? ''}`}
    >
      {label}
    </Link>
  );
}
