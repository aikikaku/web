interface Props {
  onClick: () => void;
  className?: string;
}

/** SP全画面モーダルの閉じるボタン(円形×)。MobileFilterNav.tsx / MobileStoriesFilter.tsx / PageNavSp.tsx で共通利用。 */
export default function SpModalCloseButton({ onClick, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="閉じる"
      className={`size-11 rounded-full bg-dark-green flex items-center justify-center shrink-0 ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4l8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
