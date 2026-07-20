interface Props {
  onClick: () => void;
}

/** SP全画面モーダルの背景。MobileFilterNav.tsx / MobileStoriesFilter.tsx / PageNavSp.tsx で共通利用。 */
export default function SpModalBackdrop({ onClick }: Props) {
  return <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClick} />;
}
