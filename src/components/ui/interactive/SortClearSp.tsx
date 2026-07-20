interface Props {
  onClick: () => void;
  disabled: boolean;
  className?: string;
}

/**
 * フィルターの「クリア」ボタン(SP)。Figma Sort Clear Sp 4211:26185 準拠。
 * MobileFilterNav.tsx / MobileStoriesFilter.tsx で共通利用。
 */
export default function SortClearSp({ onClick, disabled, className }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-[3.8125rem] h-full border border-dark-green rounded-lg flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${className ?? ''}`}
      aria-label="条件をクリア"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9" className="stroke-dark-green" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
