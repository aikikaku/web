'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CheckboxDropdown from '@/components/ui/CheckboxDropdown';

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

export default function PropertyFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // デフォルトは「ご案内中」。status=all の時のみ全件 (#65)
  const currentStatus = searchParams.get('status') || 'available';
  const urlTypes = useMemo(
    () => searchParams.get('types')?.split(',').filter(Boolean) || [],
    [searchParams],
  );
  const urlRegions = useMemo(
    () => searchParams.get('regions')?.split(',').filter(Boolean) || [],
    [searchParams],
  );

  // 楽観更新: チェックの即時反映用ローカル state。URL の更新を待たずトリガーで切替。URL が変われば同期する。
  const [optimisticStatus, setOptimisticStatus] = useState(currentStatus);
  const [optimisticTypes, setOptimisticTypes] = useState<string[]>(urlTypes);
  const [optimisticRegions, setOptimisticRegions] = useState<string[]>(urlRegions);
  useEffect(() => { setOptimisticStatus(currentStatus); }, [currentStatus]);
  useEffect(() => { setOptimisticTypes(urlTypes); }, [urlTypes]);
  useEffect(() => { setOptimisticRegions(urlRegions); }, [urlRegions]);

  const toggleRef = useRef<HTMLDivElement>(null);
  const allBtnRef = useRef<HTMLButtonElement>(null);
  const availableBtnRef = useRef<HTMLButtonElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const el = optimisticStatus === 'available' ? availableBtnRef.current : allBtnRef.current;
    const container = toggleRef.current;
    if (!el || !container) return;
    setIndicator({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  }, [optimisticStatus]);

  // 指定の条件で URL を更新（フィルタ適用）
  const applyWith = useCallback(
    (status: string, types: string[], regions: string[]) => {
      const params = new URLSearchParams();
      // available はデフォルトなので param 不要。all のときだけ status=all を付与 (#65)
      if (status === 'all') params.set('status', 'all');
      if (types.length > 0) params.set('types', types.join(','));
      if (regions.length > 0) params.set('regions', regions.join(','));
      const qs = params.toString();
      router.push(qs ? `/properties?${qs}` : '/properties', { scroll: false });
    },
    [router],
  );

  // dropdown チェック: 追加は「絞り込み」ボタン待ち。解除(deselect)は即時反映 (#69)
  const toggleType = useCallback(
    (value: string) => {
      const isRemoval = optimisticTypes.includes(value);
      const next = isRemoval
        ? optimisticTypes.filter((t) => t !== value)
        : [...optimisticTypes, value];
      setOptimisticTypes(next);
      if (isRemoval) applyWith(optimisticStatus, next, optimisticRegions);
    },
    [applyWith, optimisticTypes, optimisticStatus, optimisticRegions],
  );

  const toggleRegion = useCallback(
    (value: string) => {
      const isRemoval = optimisticRegions.includes(value);
      const next = isRemoval
        ? optimisticRegions.filter((r) => r !== value)
        : [...optimisticRegions, value];
      setOptimisticRegions(next);
      if (isRemoval) applyWith(optimisticStatus, optimisticTypes, next);
    },
    [applyWith, optimisticRegions, optimisticStatus, optimisticTypes],
  );

  const applyFilters = useCallback(() => {
    applyWith(optimisticStatus, optimisticTypes, optimisticRegions);
  }, [applyWith, optimisticStatus, optimisticTypes, optimisticRegions]);

  // ドロップダウンの「すべて」: その項目だけ全解除して即反映（解除＝自動更新 #69 と整合）
  const clearTypes = useCallback(() => {
    setOptimisticTypes([]);
    applyWith(optimisticStatus, [], optimisticRegions);
  }, [applyWith, optimisticStatus, optimisticRegions]);

  const clearRegions = useCallback(() => {
    setOptimisticRegions([]);
    applyWith(optimisticStatus, optimisticTypes, []);
  }, [applyWith, optimisticStatus, optimisticTypes]);

  const clearFilters = () => {
    setOptimisticStatus('available');
    setOptimisticTypes([]);
    setOptimisticRegions([]);
    router.push('/properties', { scroll: false });
  };

  // 絞り込みボタン: URL に対し未適用の変更があるとき有効（戻し操作も適用できる）
  const hasPendingChange =
    optimisticStatus !== currentStatus ||
    !sameSet(optimisticTypes, urlTypes) ||
    !sameSet(optimisticRegions, urlRegions);

  // × クリアボタン: 既定（ご案内中・絞り込みなし）と異なるとき有効
  const hasActiveFilters =
    optimisticStatus !== 'available' ||
    optimisticTypes.length > 0 ||
    optimisticRegions.length > 0;

  return (
    <div className="hidden tablet:flex items-center gap-2 justify-between">
      <div className="flex items-center gap-2 min-w-0">
      {/* ステータス切替トグル */}
      <div
        ref={toggleRef}
        className="relative flex rounded-[50px] border border-dark-green shrink-0 mr-4 p-[2px] overflow-hidden"
      >
        {indicator && (
          <span
            aria-hidden
            className="absolute top-[2px] bottom-[2px] bg-dark-green rounded-[50px] transition-all duration-300 ease-out"
            style={{ left: indicator.left, width: indicator.width }}
          />
        )}
        {[
          { value: 'all', label: 'すべて', ref: allBtnRef },
          { value: 'available', label: 'ご案内中の物件', ref: availableBtnRef },
        ].map((option) => (
          <button
            key={option.value}
            ref={option.ref}
            onClick={() => {
              // 即時反映はせず、絞り込みボタンクリックで applyFilters() 経由で URL 更新
              setOptimisticStatus(option.value);
            }}
            className={`relative z-10 h-[52px] px-6 font-gothic font-medium text-[16px] leading-none transition-colors duration-300 rounded-[50px] ${
              optimisticStatus === option.value ? 'text-white' : 'text-dark-green'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <CheckboxDropdown
        label="物件"
        options={propertyTypes}
        selected={optimisticTypes}
        onToggle={toggleType}
        onClear={clearTypes}
      />
      <CheckboxDropdown
        label="地域"
        options={regions.map((r) => ({ value: r, label: r }))}
        selected={optimisticRegions}
        onToggle={toggleRegion}
        onClear={clearRegions}
      />
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={applyFilters}
          disabled={!hasPendingChange}
          className="h-[56px] px-10 bg-dark-green border border-dark-green rounded-lg font-gothic font-medium text-[16px] leading-none text-white transition-opacity hover:opacity-90 shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          絞り込み
        </button>
        <button
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className="w-[56px] h-[56px] border border-dark-green rounded-lg flex items-center justify-center hover:bg-cream transition-colors shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="フィルターをクリア"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
