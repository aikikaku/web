'use client';

import Link from 'next/link';
import SeeAllButtonSP from '@/components/ui/SeeAllButtonSP';

interface Props {
  /** PC active ページ (0-indexed) */
  activePage: number;
  /** PC total ページ数 */
  totalPages: number;
  /** PC ページ移動コールバック (0-indexed) */
  onPageChange: (page: number) => void;
  /** SP 専用 active ページ (省略時は activePage) */
  spActivePage?: number;
  /** SP 専用 total ページ数 (省略時は totalPages) */
  spTotalPages?: number;
  /** SP 専用 ページ移動コールバック (省略時は onPageChange) */
  onSpPageChange?: (page: number) => void;
  /** 「すべて見る」リンク先。省略時は表示しない */
  href?: string;
  /** 「すべて見る」ラベル */
  label?: string;
  /** dark テーマ (cream text + arrow) */
  variant?: 'light' | 'dark';
}

/**
 * Figma 4211:11501 「Navigation-Slideshow」コンポーネント。
 *
 * - PC: 左に「< • • • • >」(矢印 + dots + 矢印)、右に「すべて見る → (青い円)」を justify-between
 * - SP: 中央に「< • • • • >」のみ、その下に全幅「すべて見るボタン」
 *
 * MoreProperties / VoiceCarousel / PropertyCarousel など複数の carousel から再利用する想定。
 */
export default function SlideshowNav({
  activePage,
  totalPages,
  onPageChange,
  spActivePage,
  spTotalPages,
  onSpPageChange,
  href,
  label = 'すべて見る',
  variant = 'light',
}: Props) {
  const textColor = variant === 'dark' ? 'text-cream' : 'text-dark-green';
  const dotColor = variant === 'dark' ? 'bg-cream' : 'bg-dark-green';
  const dotInactive = variant === 'dark' ? 'bg-cream/30' : 'bg-dark-green/30';
  const arrowColor = variant === 'dark' ? 'text-cream' : 'text-dark-green';

  // SP は専用 props があればそれを使い、なければ PC と同じ
  const spActive = spActivePage ?? activePage;
  const spTotal = spTotalPages ?? totalPages;
  const spChange = onSpPageChange ?? onPageChange;

  const handlePrev = () => onPageChange(Math.max(0, activePage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages - 1, activePage + 1));
  const handleSpPrev = () => spChange(Math.max(0, spActive - 1));
  const handleSpNext = () => spChange(Math.min(spTotal - 1, spActive + 1));

  return (
    <>
      {/* PC ナビ: 矢印 + dots(左) + すべて見る(右) を justify-between */}
      <div className="hidden tablet:flex items-center justify-between">
        {totalPages > 1 ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activePage === 0}
              aria-label="前へ"
              className={`size-6 inline-flex items-center justify-center ${arrowColor} hover:opacity-70 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`ページ${i + 1}`}
                  onClick={() => onPageChange(i)}
                  className={`size-2 rounded-full transition-colors ${i === activePage ? dotColor : dotInactive}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={activePage >= totalPages - 1}
              aria-label="次へ"
              className={`size-6 inline-flex items-center justify-center ${arrowColor} hover:opacity-70 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : (
          <div />
        )}
        {href && (
          <Link
            href={href}
            className={`inline-flex items-center gap-2 font-gothic font-medium text-[18px] leading-none ${textColor} hover:opacity-70 transition-opacity`}
          >
            {label}
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        )}
      </div>

      {/* SP ナビ: 中央 dots + その下に全幅「すべて見るボタン」 */}
      <div className="tablet:hidden">
        {spTotal > 1 && (
          <div className="flex items-center justify-center pb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSpPrev}
                disabled={spActive === 0}
                aria-label="前へ"
                className={`size-6 inline-flex items-center justify-center ${arrowColor} disabled:opacity-50`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: spTotal }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`スライド${i + 1}`}
                    onClick={() => spChange(i)}
                    className={`size-1 rounded-full transition-colors ${i === spActive ? dotColor : dotInactive}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleSpNext}
                disabled={spActive >= spTotal - 1}
                aria-label="次へ"
                className={`size-6 inline-flex items-center justify-center ${arrowColor} disabled:opacity-50`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}
        {href && (
          <div className="mt-8 px-4">
            <SeeAllButtonSP href={href} label={label} />
          </div>
        )}
      </div>
    </>
  );
}
