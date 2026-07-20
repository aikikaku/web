interface Props {
  onClick: () => void;
  disabled: boolean;
  label?: string;
}

/**
 * フィルターの「絞り込み」適用ボタン（PC）。Figma Sort 4211:26067 準拠。
 * PropertyFilter.tsx / StoriesFilter.tsx で共通利用。
 */
export default function Sort({ onClick, disabled, label = '絞り込み' }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-[3.5rem] px-10 bg-dark-green rounded-lg font-gothic font-medium text-[1rem] leading-none text-white shrink-0 transition-opacity hover:opacity-60 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
}
