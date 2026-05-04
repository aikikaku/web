'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
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

export default function MobileStoriesFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentRegions = searchParams.get('regions')?.split(',').filter(Boolean) || [];

  const [localCategory, setLocalCategory] = useState(currentCategory);
  const [localRegions, setLocalRegions] = useState<string[]>(currentRegions);

  // データ属性で範囲を制御
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
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, [currentCategory, currentRegions]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
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

  return (
    <div className="tablet:hidden">
      {/* フローティングバー */}
      <button
        onClick={openModal}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-cream rounded-full pl-6 pr-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-opacity duration-300 ${showBar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <span className="font-gothic font-medium text-[14px] leading-none text-dark-green whitespace-nowrap">
          ストーリーを絞り込む
        </span>
        <span className="w-10 h-10 rounded-full bg-light-green flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2.25 4.5H15.75" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4.5 9H13.5" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6.75 13.5H11.25" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* モーダル */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closeModal}
          />
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-dark-green flex items-center justify-center"
            aria-label="閉じる"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div className="relative bg-white rounded-3xl px-6 py-8 w-full max-w-[340px] max-h-[80vh] overflow-y-auto">
            <div className="mb-6">
              <p className="font-gothic font-medium text-[12px] text-dark-green/50 mb-2">カテゴリ</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setLocalCategory(localCategory === cat.value ? '' : cat.value)}
                    className={`px-3 py-2.5 rounded-lg border text-left transition-colors ${
                      localCategory === cat.value
                        ? 'border-dark-green bg-dark-green/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <span className="font-gothic font-medium text-[13px] text-dark-green">
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="font-gothic font-medium text-[12px] text-dark-green/50 mb-2">地域</p>
              <div className="grid grid-cols-2 gap-2">
                {regions.map((region) => (
                  <label
                    key={region}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                      localRegions.includes(region)
                        ? 'border-dark-green bg-dark-green/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={localRegions.includes(region)}
                      onChange={() => toggleRegion(region)}
                      className="w-4 h-4 accent-dark-green"
                    />
                    <span className="font-gothic font-medium text-[13px] text-dark-green">
                      {region}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={applyFilters}
                className="flex-1 h-[48px] bg-dark-green text-white rounded-full font-gothic font-medium text-[14px] leading-none"
              >
                絞り込み
              </button>
              <button
                onClick={clearFilters}
                className="w-[48px] h-[48px] border border-gray-200 rounded-full flex items-center justify-center shrink-0"
                aria-label="条件をクリア"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
