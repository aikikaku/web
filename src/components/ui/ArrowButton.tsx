interface ArrowButtonProps {
  /** サイズ用の Tailwind クラス（例: "w-12 h-12"）。省略時は 48px */
  sizeClassName?: string;
  /** 追加クラス */
  className?: string;
}

/**
 * 円形の矢印ボタン（装飾要素）。Figma 4211:26021 準拠。
 * 親要素に `group` を付けて使うと、ホバー時に配色が切り替わる。
 *
 * - Default: 背景 accent-blue (#3cb1ff) / 矢印 白
 * - Hover(group): 背景 light-blue (#d9e9f4) / 矢印 accent-blue（拡大はしない）
 *
 * 矢印は currentColor 描画なので text 色の切替でリカラーされる。
 */
export default function ArrowButton({
  sizeClassName = 'w-12 h-12',
  className = '',
}: ArrowButtonProps) {
  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center rounded-full shrink-0 bg-accent-blue text-white transition-colors group-hover:bg-light-blue group-hover:text-accent-blue ${sizeClassName} ${className}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
