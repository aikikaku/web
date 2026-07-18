interface ArrowButtonProps {
  /** サイズ。`md`=48px (w-12 h-12) / `sm`=44px (w-11 h-11)。省略時は md */
  size?: 'md' | 'sm';
  /**
   * 配色 variant。
   * - `default`: 背景 accent-blue / 矢印 白（hover で 背景 light-blue / 矢印 accent-blue）
   * - `cream`:   背景 cream / 矢印 accent-blue（hover で 背景 light-blue / 矢印 accent-blue）
   * - `disabled`: 背景 dark-green/20 / 矢印 白（hover なし）
   */
  variant?: 'default' | 'cream' | 'disabled';
  /**
   * 旧 API 互換用。`w-12 h-12` などサイズ用クラスを直接指定したい場合に使う。
   * 指定時は `size` より優先。
   */
  sizeClassName?: string;
  /** 追加クラス */
  className?: string;
}

/**
 * 円形の矢印ボタン（装飾要素）。Figma 4211:26021 / 26037(hover) 準拠。
 * **サイト内の「→ 円ボタン」の唯一の実装（SSOT）**。ページ側でインライン SVG を
 * 書かず、必ずこのコンポーネントを使うこと。
 *
 * 親要素に `group` を付けて使うと、ホバー時に配色が切り替わる（透過ではなく色変更）。
 *
 * - Default: 背景 accent-blue (#3cb1ff) / 矢印 白
 *   → Hover(group): 背景 light-blue (#d9e9f4) / 矢印 accent-blue（拡大はしない）
 * - Cream:   背景 cream (#fcfff7) / 矢印 accent-blue
 *   → Hover(group): 背景 light-blue / 矢印 accent-blue
 *
 * 矢印は currentColor 描画なので text 色の切替でリカラーされる。
 */
export default function ArrowButton({
  size = 'md',
  variant = 'default',
  sizeClassName,
  className = '',
}: ArrowButtonProps) {
  const sizeClass = sizeClassName ?? (size === 'sm' ? 'w-11 h-11' : 'w-12 h-12');
  const iconSize = size === 'sm' ? 20 : 24;

  const variantClass =
    variant === 'disabled'
      ? 'bg-dark-green/20 text-white'
      : variant === 'cream'
        ? 'bg-cream text-accent-blue transition-colors group-hover:bg-light-blue group-hover:text-accent-blue'
        : 'bg-accent-blue text-white transition-colors group-hover:bg-light-blue group-hover:text-accent-blue';

  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center rounded-full shrink-0 ${variantClass} ${sizeClass} ${className}`}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
