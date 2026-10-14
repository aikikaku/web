'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DropdownSp from '@/components/ui/interactive/DropdownSp';
import SortSp from '@/components/ui/interactive/SortSp';
import SortClearSp from '@/components/ui/interactive/SortClearSp';
import SpFloatingTrigger from '@/components/ui/popup/SpFloatingTrigger';
import SpModalBackdrop from '@/components/ui/popup/SpModalBackdrop';
import SpModalCloseButton from '@/components/ui/popup/SpModalCloseButton';
import { useScrollVisibility } from '@/lib/useScrollVisibility';
import { REGION_OPTIONS, sameSet } from '@/lib/filterOptions';

const categories = [
  { value: 'daily', label: '日々のこと' },
  { value: 'regional', label: '地域のこと' },
  { value: 'property', label: '物件のつづき' },
];

/**
 * /stories SP 用フィルター（Figma 4211:11098 floating button + 4211:11572 popup）
 * - floating: cream rounded-50 + 内側 drop-shadow + 右に filter icon
 * - popup: cream rounded-24 + drop-shadow、ドロップダウン式 trigger でクリックすると inline で list を展開、絞り込み + × clear ボタン
 * - 挙動は /properties の MobileFilterNav に揃えている（共通 DropdownSp・「すべて」はチェック方式・
 *   「絞り込み」は未反映の変更がある時だけ押せる）
 */
export default function MobileStoriesFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<'category' | 'region' | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentRegionsParam = searchParams.get('regions') || '';
  const currentRegions = useMemo(() => currentRegionsParam.split(',').filter(Boolean), [currentRegionsParam]);

  const [localCategory, setLocalCategory] = useState(currentCategory);
  const [localRegions, setLocalRegions] = useState<string[]>(currentRegions);

  const showBar = useScrollVisibility('[data-stories-filter-start]', '[data-stories-filter-end]');

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

  // 絞り込みボタン: URL に対し未適用の変更があるとき有効（/properties と同じ）
  const hasPendingChange = localCategory !== currentCategory || !sameSet(localRegions, currentRegions);
  // × クリアボタン: 絞り込みなしと異なるとき有効
  const hasActiveFilters = !!localCategory || localRegions.length > 0;

  return (
    <div className="tablet:hidden">
      {/* floating button: Figma 4211:11098 / 4211:10780 (Column 342×56, pl-40 pr-20 py-8) */}
      <SpFloatingTrigger
        onClick={openModal}
        visible={showBar}
        ariaLabel="記事を絞り込む"
        className="flex items-center justify-between gap-3 pl-10 pr-5 py-2 shadow-[0_-1px_4px_rgba(0,0,0,0.1)]"
      >
        <span className="flex-1 text-center font-gothic font-medium text-body-s text-dark-green">
          記事を絞り込む
        </span>
        <span className="size-5 inline-flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14" className="stroke-dark-green" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 10h14" className="stroke-dark-green" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 15h14" className="stroke-dark-green" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="5" r="1.5" className="fill-cream stroke-dark-green" strokeWidth="1.5" />
            <circle cx="13" cy="10" r="1.5" className="fill-cream stroke-dark-green" strokeWidth="1.5" />
            <circle cx="9" cy="15" r="1.5" className="fill-cream stroke-dark-green" strokeWidth="1.5" />
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

              {/* modal box: height 固定、内部 overflow scroll */}
              <div className="bg-cream rounded-3xl shadow-[0_0_8px_rgba(0,0,0,0.16)] w-full h-[30rem] max-h-[calc(100vh-120px)] px-6 py-8 flex flex-col gap-8 overflow-y-auto">
              <div className="flex flex-col gap-4">
                {/* category dropdown (共通 DropdownSp。カテゴリは1つだけ選べる) */}
                <DropdownSp
                  isOpen={openSection === 'category'}
                  onToggle={() => setOpenSection(openSection === 'category' ? null : 'category')}
                  options={categories}
                  selected={localCategory ? [localCategory] : []}
                  onChange={(value) => setLocalCategory((prev) => (prev === value ? '' : value))}
                  onClear={() => setLocalCategory('')}
                  placeholder="カテゴリ"
                />

                {/* region dropdown (Figma 4211:26323 共通 DropdownSp) */}
                <DropdownSp
                  isOpen={openSection === 'region'}
                  onToggle={() => setOpenSection(openSection === 'region' ? null : 'region')}
                  options={REGION_OPTIONS}
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
