interface Props {
  onClick: () => void;
  visible: boolean;
  ariaLabel: string;
  children: React.ReactNode;
  /** レイアウト差分(padding/justify/shadow等)は呼び出し側で追加する */
  className?: string;
}

/**
 * SP用フローティングピルボタンの共通殻。Figma 4211:10780 (filter) / 4211:10920 (page nav) 準拠。
 * MobileFilterNav.tsx / MobileStoriesFilter.tsx / PageNavSP.tsx で共通利用。
 */
export default function SpFloatingTrigger({ onClick, visible, ariaLabel, children, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#f4faf0] border border-dark-green/10 rounded-full w-[21.375rem] h-14 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${className}`}
    >
      {children}
    </button>
  );
}
