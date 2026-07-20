interface Props {
  /** ドット総数 */
  count: number;
  /** アクティブなドット (0-indexed) */
  activeIndex: number;
  /** ドットクリック時 (0-indexed) */
  onDotClick: (index: number) => void;
  /** ドットサイズ。sm=4px / md=8px(Figma「Slider Dots」= 8px)。既定 md */
  size?: 'sm' | 'md';
  /** dark テーマ (cream ドット) */
  variant?: 'light' | 'dark';
  /** aria-label の接頭辞(例「スライド」「ページ」)。既定「スライド」 */
  labelPrefix?: string;
  className?: string;
}

/**
 * スライダー/カルーセルのドットページャー。Figma「Slider Dots」4211:25262 準拠。
 * [[NavigationSlideshow]] が内部で利用するほか、HeroSlideshowSP など
 * 矢印・「すべて見る」を伴わない単独のドット表示にも使う。
 */
export default function SliderDots({
  count,
  activeIndex,
  onDotClick,
  size = 'md',
  variant = 'light',
  labelPrefix = 'スライド',
  className = '',
}: Props) {
  const dotSize = size === 'sm' ? 'size-1' : 'size-2';
  const active = variant === 'dark' ? 'bg-cream' : 'bg-dark-green';
  const inactive = variant === 'dark' ? 'bg-cream/30' : 'bg-dark-green/30';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${labelPrefix}${i + 1}`}
          onClick={() => onDotClick(i)}
          className={`${dotSize} rounded-full transition-colors ${i === activeIndex ? active : inactive}`}
        />
      ))}
    </div>
  );
}
