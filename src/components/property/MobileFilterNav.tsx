'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
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

/**
 * /properties SP 用フィルター（Figma 4211:11098 floating button + 4211:11572 popup）
 * - floating: cream rounded-50 + drop-shadow + filter icon
 * - popup: cream rounded-24 + drop-shadow、ステータストグル + ドロップダウン (inline 展開) + 絞り込み/× clear
 */
export default function MobileFilterNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [openSection, setOpenSection] = useState<'types' | 'regions' | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const openModal = useCallback(() => {
    setLocalStatus(currentStatus);
    setLocalTypes(currentTypes);
    setLocalRegions(currentRegions);
    setOpenSection(null);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, [currentStatus, currentTypes, currentRegions]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setOpenSection(null);
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

  return (
    <div className="tablet:hidden">
      {/* floating button: Figma 4211:11098 / 4211:10780 */}
      <button
        onClick={openModal}
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between gap-3 bg-cream border border-dark-green/20 rounded-full pl-10 pr-5 py-2 shadow-[0_-1px_4px_rgba(0,0,0,0.1)] w-[284px] h-10 transition-opacity duration-300 ${showBar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="物件を絞り込む"
      >
        <span className="flex-1 text-center font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
          物件を絞り込む
        </span>
        <span className="size-5 inline-flex items-center justify-center text-dark-green shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="5" r="1.5" fill="#fcfff7" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="13" cy="10" r="1.5" fill="#fcfff7" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="9" cy="15" r="1.5" fill="#fcfff7" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </button>

      {/* modal: Figma 4211:11572 */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeModal} />
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
            <div className="bg-cream rounded-3xl shadow-[0_0_8px_rgba(0,0,0,0.16)] w-full px-6 py-8 flex flex-col gap-8 max-h-[80vh] overflow-y-auto">
              {/* status toggle */}
              <div className="border border-dark-green rounded-full h-13 w-full flex items-stretch overflow-hidden p-[2px]">
                {[
                  { value: 'all', label: 'すべて' },
                  { value: 'available', label: 'ご案内中の物件' },
                ].map((option) => {
                  const active = localStatus === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setLocalStatus(option.value)}
                      className={`flex-1 h-full font-gothic font-medium text-[14px] leading-none rounded-full transition-colors ${
                        active ? 'bg-dark-green text-white' : 'bg-cream text-dark-green'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {/* dropdowns inline expansion */}
              <div className="flex flex-col gap-4">
                {/* 物件種別 */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenSection(openSection === 'types' ? null : 'types')}
                    className={`flex items-center gap-2 h-14 px-4 rounded-lg border border-dark-green w-full ${
                      openSection === 'types' ? 'bg-light-green' : 'bg-cream'
                    }`}
                  >
                    <span className={`flex-1 text-left font-gothic font-medium text-[16px] leading-[2] truncate ${
                      localTypes.length === 0 ? 'text-dark-green/40' : 'text-dark-green'
                    }`}>
                      {localTypes.length === 0
                        ? '物件'
                        : localTypes.map((v) => propertyTypes.find((p) => p.value === v)?.label).filter(Boolean).join('・')}
                    </span>
                    <svg
                      width="21" height="21" viewBox="0 0 21 21" fill="none"
                      className={`shrink-0 transition-transform ${openSection === 'types' ? 'rotate-180' : ''}`}
                    >
                      <path d="M5.5 8L10.5 13L15.5 8" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openSection === 'types' && (
                    <div className="bg-cream rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.16)] py-4 flex flex-col">
                      {propertyTypes.map((t) => {
                        const checked = localTypes.includes(t.value);
                        return (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => toggleType(t.value)}
                            className="flex items-center gap-2 h-8 pl-4 pr-2 hover:bg-light-green/50 text-left"
                          >
                            <span
                              className={`size-[18px] inline-flex items-center justify-center rounded border shrink-0 ${
                                checked ? 'bg-dark-green border-dark-green' : 'border-dark-green/40'
                              }`}
                            >
                              {checked && (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                  <path d="M3 7l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                            <span className="font-gothic font-medium text-[14px] leading-[1.8] text-black">
                              {t.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 地域 */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenSection(openSection === 'regions' ? null : 'regions')}
                    className={`flex items-center gap-2 h-14 px-4 rounded-lg border border-dark-green w-full ${
                      openSection === 'regions' ? 'bg-light-green' : 'bg-cream'
                    }`}
                  >
                    <span className={`flex-1 text-left font-gothic font-medium text-[16px] leading-[2] truncate ${
                      localRegions.length === 0 ? 'text-dark-green/40' : 'text-dark-green'
                    }`}>
                      {localRegions.length === 0 ? '地域' : localRegions.join('・')}
                    </span>
                    <svg
                      width="21" height="21" viewBox="0 0 21 21" fill="none"
                      className={`shrink-0 transition-transform ${openSection === 'regions' ? 'rotate-180' : ''}`}
                    >
                      <path d="M5.5 8L10.5 13L15.5 8" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openSection === 'regions' && (
                    <div className="bg-cream rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.16)] py-4 flex flex-col">
                      {regions.map((r) => {
                        const checked = localRegions.includes(r);
                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => toggleRegion(r)}
                            className="flex items-center gap-2 h-8 pl-4 pr-2 hover:bg-light-green/50 text-left"
                          >
                            <span
                              className={`size-[18px] inline-flex items-center justify-center rounded border shrink-0 ${
                                checked ? 'bg-dark-green border-dark-green' : 'border-dark-green/40'
                              }`}
                            >
                              {checked && (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                  <path d="M3 7l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                            <span className="font-gothic font-medium text-[14px] leading-[1.8] text-black">
                              {r}
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
