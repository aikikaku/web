'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DropdownSp from '@/components/ui/interactive/DropdownSp';
import Toggle from '@/components/ui/interactive/Toggle';
import SortSp from '@/components/ui/interactive/SortSp';
import SortClearSp from '@/components/ui/interactive/SortClearSp';
import SpFloatingTrigger from '@/components/ui/popup/SpFloatingTrigger';
import SpModalBackdrop from '@/components/ui/popup/SpModalBackdrop';
import SpModalCloseButton from '@/components/ui/popup/SpModalCloseButton';
import { useScrollVisibility } from '@/lib/useScrollVisibility';

const statusOptions = [
  { value: 'all', label: 'すべて' },
  { value: 'available', label: 'ご案内中の物件' },
];

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

/** 2つの文字列配列が同じ要素集合かどうか（順序無視） */
function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sb = new Set(b);
  return a.every((x) => sb.has(x));
}

/**
 * /properties SP 用フィルター（Figma 4211:11098 floating button + 4211:11572 popup）
 * - floating: cream rounded-50 + drop-shadow + filter icon
 * - popup: cream rounded-24 + drop-shadow、ステータストグル + ドロップダウン (inline 展開) + 絞り込み/× clear
 */
export default function MobileFilterNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<'types' | 'regions' | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const showBar = useScrollVisibility('[data-mobile-filter-start]', '[data-mobile-filter-end]');

  // デフォルトは「ご案内中」。status=all の時のみ全件 (#65)
  const currentStatus = searchParams.get('status') || 'available';
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
    if (localStatus === 'all') params.set('status', 'all');
    if (localTypes.length > 0) params.set('types', localTypes.join(','));
    if (localRegions.length > 0) params.set('regions', localRegions.join(','));
    const qs = params.toString();
    router.push(qs ? `/properties?${qs}` : '/properties', { scroll: false });
    closeModal();
  }, [router, localStatus, localTypes, localRegions, closeModal]);

  const clearFilters = useCallback(() => {
    setLocalStatus('available');
    setLocalTypes([]);
    setLocalRegions([]);
  }, []);

  // 絞り込みボタン: URL に対し未適用の変更があるとき有効（戻し操作も適用できる）
  const hasPendingChange =
    localStatus !== currentStatus ||
    !sameSet(localTypes, currentTypes) ||
    !sameSet(localRegions, currentRegions);

  // × クリアボタン: 既定（ご案内中・絞り込みなし）と異なるとき有効
  const hasActiveFilters =
    localStatus !== 'available' ||
    localTypes.length > 0 ||
    localRegions.length > 0;

  return (
    <div className="tablet:hidden">
      {/* floating button: Figma 4211:10780 (Column 342×56, pl-40 pr-20 py-8) */}
      <SpFloatingTrigger
        onClick={openModal}
        visible={showBar}
        ariaLabel="物件を絞り込む"
        className="flex items-center justify-between gap-3 pl-10 pr-5 py-2 shadow-[0_-1px_4px_rgba(0,0,0,0.1)]"
      >
        <span className="flex-1 text-center font-gothic font-medium text-body-s text-dark-green">
          物件を絞り込む
        </span>
        <span className="size-5 inline-flex items-center justify-center text-dark-green shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="5" r="1.5" className="fill-cream" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="13" cy="10" r="1.5" className="fill-cream" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="9" cy="15" r="1.5" className="fill-cream" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </SpFloatingTrigger>

      {/* modal: Figma 4211:11572 / 4211:10793 (height 固定・上下中央配置・内部スクロール) */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <SpModalBackdrop onClick={closeModal} />
          {/* 上下中央配置のラッパ */}
          <div className="absolute inset-0 flex items-center justify-center px-6 py-12">
            <div className="flex flex-col items-end gap-2 w-full max-w-[21.375rem]">
              {/* close button (modal の外、上端右寄せ) */}
              <SpModalCloseButton onClick={closeModal} />

              {/* modal box: height 固定、内部 overflow scroll で dropdown 開閉によって他要素が圧縮されない */}
              <div className="bg-cream rounded-3xl shadow-[0_0_8px_rgba(0,0,0,0.16)] w-full h-[35rem] max-h-[calc(100vh-120px)] px-6 py-8 flex flex-col gap-8 overflow-y-auto">
                {/* status toggle: dropdown と同じ h-14 で揃える */}
                <Toggle
                  options={statusOptions}
                  value={localStatus}
                  onChange={setLocalStatus}
                  className="h-14 w-full shrink-0 rounded-full"
                  buttonClassName="flex-1 h-full text-[0.875rem]"
                />

              {/* dropdowns inline expansion (Figma 4211:26286 / 4211:26323 共通 DropdownSp) */}
              <div className="flex flex-col gap-4">
                <DropdownSp
                  isOpen={openSection === 'types'}
                  onToggle={() => setOpenSection(openSection === 'types' ? null : 'types')}
                  options={propertyTypes}
                  selected={localTypes}
                  onChange={toggleType}
                  onClear={() => setLocalTypes([])}
                  placeholder="物件"
                />
                <DropdownSp
                  isOpen={openSection === 'regions'}
                  onToggle={() => setOpenSection(openSection === 'regions' ? null : 'regions')}
                  options={regions.map((r) => ({ value: r, label: r }))}
                  selected={localRegions}
                  onChange={toggleRegion}
                  onClear={() => setLocalRegions([])}
                  placeholder="地域"
                />
              </div>

              {/* action: 絞り込み + × clear (shrink-0 で dropdown 開時に潰れない) */}
              <div className="flex gap-2 h-10 shrink-0">
                <SortSp onClick={applyFilters} disabled={!hasPendingChange} />
                <SortClearSp onClick={clearFilters} disabled={!hasActiveFilters} />
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
