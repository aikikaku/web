interface Props {
  onClick: () => void;
  disabled: boolean;
  label?: string;
  className?: string;
}

/**
 * フィルターの「絞り込み」適用ボタン(SP)。Figma Sort-sp 4211:26175 準拠。
 * MobileFilterNav.tsx / MobileStoriesFilter.tsx で共通利用。
 */
export default function SortSp({ onClick, disabled, label = '絞り込み', className }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 h-full bg-dark-green text-white rounded-lg font-gothic font-medium text-[0.875rem] leading-none transition-opacity disabled:opacity-20 disabled:cursor-not-allowed ${className ?? ''}`}
    >
      {label}
    </button>
  );
}
