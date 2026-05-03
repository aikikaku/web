'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const propertyTypes = [
  { value: 'sell_property', label: '売物件' },
  { value: 'sell_land', label: '売土地' },
  { value: 'rent_property', label: '貸物件' },
  { value: 'rent_land', label: '貸土地' },
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

export default function MobileFilterNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // ピックアップ表示〜ページネーション間で表示/非表示
  useEffect(() => {
    const pickup = document.querySelector('[data-mobile-filter-start]');
    const paginationEl = document.querySelector('[data-mobile-filter-end]');
    if (!pickup) return;

    const checkVisibility = () => {
      const pickupRect = pickup.getBoundingClientRect();
      const isPastStart = pickupRect.top < window.innerHeight * 0.8;
      let isBeforeEnd = true;
      if (paginationEl) {
        const endRect = paginationEl.getBoundingClientRect();
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

  const currentStatus = searchParams.get('status') || 'all';
  const currentTypes = searchParams.get('types')?.split(',').filter(Boolean) || [];
  const currentRegions = searchParams.get('regions')?.split(',').filter(Boolean) || [];

  const [localStatus, setLocalStatus] = useState(currentStatus);
  const [localTypes, setLocalTypes] = useState<string[]>(currentTypes);
  const [localRegions, setLocalRegions] = useState<string[]>(currentRegions);

  const openModal = useCallback(() => {
    setLocalStatus(currentStatus);
    setLocalTypes(currentTypes);
    setLocalRegions(currentRegions);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, [currentStatus, currentTypes, currentRegions]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleType = (value: string) => {
    setLocalTypes((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  const toggleRegion = (value: string) => {
    setLocalRegions((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (localStatus && localStatus !== 'all') {
      params.set('status', localStatus);
    }
    if (localTypes.length > 0) {
      params.set('types', localTypes.join(','));
    }
    if (localRegions.length > 0) {
      params.set('regions', localRegions.join(','));
    }
    const qs = params.toString();
    router.push(qs ? `/properties?${qs}` : '/properties', { scroll: false });
    closeModal();
  }, [router, localStatus, localTypes, localRegions, closeModal]);

  const clearFilters = useCallback(() => {
    setLocalStatus('all');
    setLocalTypes([]);
    setLocalRegions([]);
  }, []);

  return (
    <div className="tablet:hidden">
      {/* フローティングバー（pickup top〜pagination 間で表示） */}
      <button
        onClick={openModal}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-cream rounded-full pl-6 pr-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-opacity duration-300 ${showBar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <span className="font-gothic font-medium text-[14px] leading-none text-dark-green whitespace-nowrap">
          物件を絞り込む
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
            {/* ステータストグル */}
            <div className="flex rounded-full border border-dark-green mb-6 h-[48px] overflow-hidden">
              {[
                { value: 'all', label: 'すべて' },
                { value: 'available', label: 'ご案内中の物件' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLocalStatus(option.value)}
                  className={`flex-1 font-gothic font-medium text-[14px] leading-none transition-colors ${
                    localStatus === option.value
                      ? 'bg-dark-green text-white rounded-full'
                      : 'bg-white text-dark-green'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* 物件種別チェックボックス */}
            <div className="mb-6">
              <p className="font-gothic font-medium text-[12px] text-dark-green/50 mb-2">物件種別</p>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                      localTypes.includes(type.value)
                        ? 'border-dark-green bg-dark-green/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={localTypes.includes(type.value)}
                      onChange={() => toggleType(type.value)}
                      className="w-4 h-4 accent-dark-green"
                    />
                    <span className="font-gothic font-medium text-[13px] text-dark-green">
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 地域チェックボックス */}
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

            {/* アクションボタン */}
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
