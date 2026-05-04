'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
  { value: '', label: 'すべて' },
  { value: 'daily', label: '日々のこと' },
  { value: 'regional', label: '地域のこと' },
  { value: 'property', label: '物件のつづき' },
];

const regions = [
  '三島市',
  '長泉町',
  '清水町',
  '沼津市',
  '裾野市',
  '函南町',
  '伊豆の国市',
  'そのほかの地域',
];

/**
 * /stories SP 用フィルター（Figma 4211:11098 floating button + 4211:11572 popup）
 * - floating: cream rounded-50 + 内側 drop-shadow + 右に filter icon
 * - popup: cream rounded-24 + drop-shadow、ドロップダウン式 trigger でクリックすると inline で list を展開、絞り込み + × clear ボタン
 */
export default function MobileStoriesFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [openSection, setOpenSection] = useState<'category' | 'region' | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentRegions = searchParams.get('regions')?.split(',').filter(Boolean) || [];

  const [localCategory, setLocalCategory] = useState(currentCategory);
  const [localRegions, setLocalRegions] = useState<string[]>(currentRegions);

  useEffect(() => {
    const start = document.querySelector('[data-stories-filter-start]');
    const end = document.querySelector('[data-stories-filter-end]');
    if (!start) return;

    const checkVisibility = () => {
      const startRect = start.getBoundingClientRect();
      const isPastStart = startRect.top < window.innerHeight * 0.8;
      let isBeforeEnd = true;
      if (end) {
        const endRect = end.getBoundingClientRect();
        isBeforeEnd = endRect.top > window.innerHeight * 0.5;
      }
      setShowBar(isPastStart && isBeforeEnd);
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  const openModal = useCallback(() => {
    setLocalCategory(currentCategory);
    setLocalRegions(currentRegions);
    setOpenSection(null);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, [currentCategory, currentRegions]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setOpenSection(null);
    document.body.style.overflow = '';
  }, []);

  const toggleRegion = (value: string) => {
    setLocalRegions((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (localCategory) params.set('category', localCategory);
    if (localRegions.length > 0) params.set('regions', localRegions.join(','));
    const qs = params.toString();
    router.push(qs ? `/stories?${qs}` : '/stories', { scroll: false });
    closeModal();
  }, [router, localCategory, localRegions, closeModal]);

  const clearFilters = useCallback(() => {
    setLocalCategory('');
    setLocalRegions([]);
  }, []);

  const categoryLabel = categories.find((c) => c.value === localCategory)?.label || 'カテゴリ';
  const regionLabel = localRegions.length > 0 ? localRegions.join('・') : '地域';

  return (
    <div className="tablet:hidden">
      {/* floating button: Figma 4211:11098 */}
      <button
        onClick={openModal}
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between gap-3 bg-cream border border-dark-green/20 rounded-full pl-10 pr-5 py-2 shadow-[0_-1px_4px_rgba(0,0,0,0.1)] w-[284px] h-10 transition-opacity duration-300 ${showBar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="記事を絞り込む"
      >
        <span className="flex-1 text-center font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
          記事を絞り込む
        </span>
        <span className="size-5 inline-flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 10h14" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 15h14" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="5" r="1.5" fill="#fcfff7" stroke="#2a363b" strokeWidth="1.5" />
            <circle cx="13" cy="10" r="1.5" fill="#fcfff7" stroke="#2a363b" strokeWidth="1.5" />
            <circle cx="9" cy="15" r="1.5" fill="#fcfff7" stroke="#2a363b" strokeWidth="1.5" />
          </svg>
        </span>
      </button>

      {/* modal: Figma 4211:11572 */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="absolute top-[111px] left-6 right-6 flex flex-col items-end gap-2">
            {/* close button (modal の外、上端右寄せ) */}
            <button
              onClick={closeModal}
              className="size-11 rounded-full bg-dark-green flex items-center justify-center"
              aria-label="閉じる"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* modal box */}
            <div className="bg-cream rounded-3xl shadow-[0_0_8px_rgba(0,0,0,0.16)] w-full px-6 py-8 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                {/* category dropdown */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenSection(openSection === 'category' ? null : 'category')}
                    className={`flex items-center gap-2 h-14 px-4 rounded-lg border border-dark-green w-full ${
                      openSection === 'category' ? 'bg-light-green' : 'bg-cream'
                    }`}
                  >
                    <span className={`flex-1 text-left font-gothic font-medium text-[16px] leading-[2] ${localCategory ? 'text-dark-green' : 'text-dark-green/40'}`}>
                      {categoryLabel}
                    </span>
                    <svg
                      width="21" height="21" viewBox="0 0 21 21" fill="none"
                      className={`shrink-0 transition-transform ${openSection === 'category' ? 'rotate-180' : ''}`}
                    >
                      <path d="M5.5 8L10.5 13L15.5 8" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openSection === 'category' && (
                    <div className="bg-cream rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.16)] py-4 flex flex-col">
                      {categories.map((cat) => {
                        const isChecked = localCategory === cat.value;
                        return (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => {
                              setLocalCategory(cat.value);
                              setOpenSection(null);
                            }}
                            className="flex items-center gap-2 h-8 pl-4 pr-2 hover:bg-light-green/50 text-left"
                          >
                            <span
                              className={`size-[18px] inline-flex items-center justify-center rounded border shrink-0 ${
                                isChecked ? 'bg-dark-green border-dark-green' : 'border-dark-green/40'
                              }`}
                            >
                              {isChecked && (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                  <path d="M3 7l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                            <span className="font-gothic font-medium text-[14px] leading-[1.8] text-black">
                              {cat.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* region dropdown */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenSection(openSection === 'region' ? null : 'region')}
                    className={`flex items-center gap-2 h-14 px-4 rounded-lg border border-dark-green w-full ${
                      openSection === 'region' ? 'bg-light-green' : 'bg-cream'
                    }`}
                  >
                    <span className={`flex-1 text-left font-gothic font-medium text-[16px] leading-[2] truncate ${localRegions.length > 0 ? 'text-dark-green' : 'text-dark-green/40'}`}>
                      {regionLabel}
                    </span>
                    <svg
                      width="21" height="21" viewBox="0 0 21 21" fill="none"
                      className={`shrink-0 transition-transform ${openSection === 'region' ? 'rotate-180' : ''}`}
                    >
                      <path d="M5.5 8L10.5 13L15.5 8" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openSection === 'region' && (
                    <div className="bg-cream rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.16)] py-4 flex flex-col">
                      {regions.map((region) => {
                        const isChecked = localRegions.includes(region);
                        return (
                          <button
                            key={region}
                            type="button"
                            onClick={() => toggleRegion(region)}
                            className="flex items-center gap-2 h-8 pl-4 pr-2 hover:bg-light-green/50 text-left"
                          >
                            <span
                              className={`size-[18px] inline-flex items-center justify-center rounded border shrink-0 ${
                                isChecked ? 'bg-dark-green border-dark-green' : 'border-dark-green/40'
                              }`}
                            >
                              {isChecked && (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                  <path d="M3 7l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                            <span className="font-gothic font-medium text-[14px] leading-[1.8] text-black">
                              {region}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* action: 絞り込み + × clear */}
              <div className="flex gap-2 h-10">
                <button
                  onClick={applyFilters}
                  className="flex-1 h-full bg-dark-green text-white rounded-lg font-gothic font-medium text-[14px] leading-none"
                >
                  絞り込み
                </button>
                <button
                  onClick={clearFilters}
                  className="w-[61px] h-full border border-dark-green rounded-lg flex items-center justify-center shrink-0"
                  aria-label="条件をクリア"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
