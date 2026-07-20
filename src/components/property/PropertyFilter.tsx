'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DropdownPC from '@/components/ui/interactive/DropdownPC';
import SortApplyButton from '@/components/ui/interactive/SortApplyButton';
import SortClearButton from '@/components/ui/interactive/SortClearButton';
import Toggle from '@/components/ui/interactive/Toggle';

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
      <Toggle
        options={statusOptions}
        value={optimisticStatus}
        onChange={(next) => {
          // ステータス切替は即時反映（解除=自動更新 #69 と整合）。
          // これにより pending 状態にならず「絞り込み」ボタンが無用に点灯しない (#29)
          setOptimisticStatus(next);
          applyWith(next, optimisticTypes, optimisticRegions);
        }}
        className="shrink-0 mr-4"
      />

      <DropdownPC
        label="物件"
        options={propertyTypes}
        selected={optimisticTypes}
        onToggle={toggleType}
        onClear={clearTypes}
      />
      <DropdownPC
        label="地域"
        options={regions.map((r) => ({ value: r, label: r }))}
        selected={optimisticRegions}
        onToggle={toggleRegion}
        onClear={clearRegions}
      />
      </div>

      <div className="flex gap-2 shrink-0">
        <SortApplyButton onClick={applyFilters} disabled={!hasPendingChange} />
        <SortClearButton onClick={clearFilters} disabled={!hasActiveFilters} />
      </div>
    </div>
  );
}
