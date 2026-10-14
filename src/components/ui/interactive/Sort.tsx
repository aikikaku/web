interface Props {
  onClick: () => void;
  disabled: boolean;
  label?: string;
  /** 絞り込みを適用して結果を読み込んでいる間。押せなくし「絞り込み中…」と表示する */
  pending?: boolean;
}

/**
 * フィルターの「絞り込み」適用ボタン（PC）。Figma Sort 4211:26067 準拠。
 * PropertyFilter.tsx / StoriesFilter.tsx で共通利用。
 */
export default function Sort({ onClick, disabled, label = '絞り込み', pending = false }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || pending}
      aria-busy={pending}
      className={`h-[3.5rem] px-10 bg-dark-green rounded-lg font-gothic font-medium text-[1rem] leading-none text-white shrink-0 transition-opacity ${
        pending
          ? 'opacity-60 cursor-wait animate-pulse'
          : 'hover:opacity-60 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed'
      }`}
    >
      {pending ? '絞り込み中…' : label}
    </button>
  );
}
