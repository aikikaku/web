'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
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
  const currentTypesParam = searchParams.get('types') || '';
  const currentRegionsParam = searchParams.get('regions') || '';
  const currentTypes = useMemo(
    () => currentTypesParam.split(',').filter(Boolean),
    [currentTypesParam],
  );
  const currentRegions = useMemo(
    () => currentRegionsParam.split(',').filter(Boolean),
    [currentRegionsParam],
  );

  const [localStatus, setLocalStatus] = useState(currentStatus);
  const [localTypes, setLocalTypes] = useState<string[]>(currentTypes);
  const [localRegions, setLocalRegions] = useState<string[]>(currentRegions);

  const [typesOpen, setTypesOpen] = useState(false);
  const [regionsOpen, setRegionsOpen] = useState(false);

  const openModal = useCallback(() => {
    setLocalStatus(currentStatus);
    setLocalTypes(currentTypes);
    setLocalRegions(currentRegions);
    setTypesOpen(false);
    setRegionsOpen(false);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, [currentStatus, currentTypes, currentRegions]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleType = (value: string) => {
    setLocalTypes((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value],
    );
  };

  const toggleRegion = (value: string) => {
    setLocalRegions((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value],
    );
  };

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (localStatus && localStatus !== 'all') params.set('status', localStatus);
    if (localTypes.length > 0) params.set('types', localTypes.join(','));
    if (localRegions.length > 0) params.set('regions', localRegions.join(','));
    const qs = params.toString();
    router.push(qs ? `/properties?${qs}` : '/properties', { scroll: false });
    closeModal();
  }, [router, localStatus, localTypes, localRegions, closeModal]);

  const clearFilters = useCallback(() => {
    setLocalStatus('all');
    setLocalTypes([]);
    setLocalRegions([]);
  }, []);

  // ドロップダウンの外クリックで閉じる
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!typesOpen && !regionsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setTypesOpen(false);
        setRegionsOpen(false);
      }
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [typesOpen, regionsOpen]);

  return (
    <div className="tablet:hidden">
      {/* フローティングバー: Figma 4211:10780 準拠 */}
      <button
        onClick={openModal}
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between gap-3 bg-[#f4faf0] border border-dark-green/20 rounded-full pl-10 pr-5 py-2 shadow-[0_-1px_4px_rgba(0,0,0,0.1)] w-[284px] h-[40px] transition-opacity duration-300 ${showBar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <span className="flex-1 font-gothic font-medium text-[14px] leading-[1.8] text-dark-green text-center">
          物件を絞り込む
        </span>
        <span className="size-5 inline-flex items-center justify-center text-dark-green shrink-0">
          {/* スライダー/フィルターアイコン: 3本線+つまみ */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 6h14M3 12h14M3 17h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="6" r="2" fill="white" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="13" cy="12" r="2" fill="white" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="9" cy="17" r="2" fill="white" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </button>

      {/* モーダル: Figma 4211:10793 準拠 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-end justify-center px-4 gap-2">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeModal} />

          {/* 閉じる（右上の dark-green 円） */}
          <button
            onClick={closeModal}
            className="relative size-11 rounded-full bg-dark-green inline-flex items-center justify-center"
            aria-label="閉じる"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* ポップアップ: cream bg, 大きな影付き */}
          <div className="relative bg-cream rounded-3xl px-6 py-8 w-full max-w-[358px] shadow-[0_0_8px_rgba(0,0,0,0.16)] flex flex-col gap-8 items-center">
            {/* ステータストグル: w-294 h-56 rounded-50 split */}
            <div className="border border-dark-green rounded-full h-14 w-full flex items-stretch overflow-hidden p-0">
              {[
                { value: 'all', label: 'すべて' },
                { value: 'available', label: 'ご案内中の物件' },
              ].map((option, idx) => {
                const active = localStatus === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setLocalStatus(option.value)}
                    className={`flex-1 font-gothic font-medium text-[14px] leading-none transition-colors ${
                      active
                        ? 'bg-dark-green text-white rounded-full'
                        : 'bg-cream text-dark-green'
                    } ${active && idx === 0 ? '-mr-px' : ''}`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            {/* ドロップダウン2つ: 物件種別 / 地域 */}
            <div ref={dropdownRef} className="flex flex-col gap-2 w-full">
              {/* 物件種別 */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setTypesOpen((v) => !v);
                    setRegionsOpen(false);
                  }}
                  className="w-full h-14 px-4 rounded-lg border border-dark-green bg-cream flex items-center gap-2 font-gothic font-medium text-[16px] leading-[2] text-left"
                >
                  <span className={`flex-1 ${localTypes.length === 0 ? 'text-dark-green/30' : 'text-dark-green'}`}>
                    {localTypes.length === 0
                      ? '物件'
                      : localTypes.map((v) => propertyTypes.find((p) => p.value === v)?.label).filter(Boolean).join('・')}
                  </span>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    className={`shrink-0 transition-transform ${typesOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M5 8L10.5 13L16 8" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {typesOpen && (
                  <div className="absolute z-10 left-0 right-0 mt-1 bg-cream rounded-lg border border-dark-green shadow-md overflow-hidden">
                    {propertyTypes.map((t) => {
                      const checked = localTypes.includes(t.value);
                      return (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => toggleType(t.value)}
                          className={`w-full px-4 py-3 text-left font-gothic font-medium text-[14px] flex items-center gap-2 ${checked ? 'text-dark-green' : 'text-dark-green/70'}`}
                        >
                          <span className={`size-4 inline-flex items-center justify-center rounded border ${checked ? 'bg-dark-green border-dark-green' : 'border-dark-green/30'}`}>
                            {checked && (
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 地域 */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setRegionsOpen((v) => !v);
                    setTypesOpen(false);
                  }}
                  className="w-full h-14 px-4 rounded-lg border border-dark-green bg-cream flex items-center gap-2 font-gothic font-medium text-[16px] leading-[2] text-left"
                >
                  <span className={`flex-1 truncate ${localRegions.length === 0 ? 'text-dark-green/30' : 'text-dark-green'}`}>
                    {localRegions.length === 0 ? '地域' : localRegions.join('・')}
                  </span>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    className={`shrink-0 transition-transform ${regionsOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M5 8L10.5 13L16 8" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {regionsOpen && (
                  <div className="absolute z-10 left-0 right-0 mt-1 bg-cream rounded-lg border border-dark-green shadow-md overflow-hidden max-h-[260px] overflow-y-auto">
                    {regions.map((r) => {
                      const checked = localRegions.includes(r);
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => toggleRegion(r)}
                          className={`w-full px-4 py-3 text-left font-gothic font-medium text-[14px] flex items-center gap-2 ${checked ? 'text-dark-green' : 'text-dark-green/70'}`}
                        >
                          <span className={`size-4 inline-flex items-center justify-center rounded border ${checked ? 'bg-dark-green border-dark-green' : 'border-dark-green/30'}`}>
                            {checked && (
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          {r}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* アクション: 絞り込み (left, w-225) + clear x (right, w-61) */}
            <div className="flex items-center gap-2 w-full">
              <button
                onClick={applyFilters}
                className="flex-1 h-10 bg-dark-green text-white rounded-lg font-gothic font-medium text-[14px] leading-none"
              >
                絞り込み
              </button>
              <button
                onClick={clearFilters}
                className="w-[61px] h-10 border border-dark-green rounded-lg flex items-center justify-center shrink-0"
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
