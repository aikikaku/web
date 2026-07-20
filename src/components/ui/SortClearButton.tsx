interface Props {
  onClick: () => void;
  disabled: boolean;
}

/**
 * フィルターの「クリア」ボタン（PC）。Figma Sort Clear 4211:26076 準拠。
 * PropertyFilter.tsx / StoriesFilter.tsx で共通利用。
 */
export default function SortClearButton({ onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label="フィルターをクリア"
      className="h-[3.5rem] w-[3.9375rem] border border-dark-green text-dark-green rounded-lg flex items-center justify-center shrink-0 transition-colors hover:bg-dark-green hover:border-[rgba(252,255,247,0.3)] hover:text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  );
}
