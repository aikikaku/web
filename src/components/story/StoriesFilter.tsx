'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import Dropdown from '@/components/ui/interactive/Dropdown';
import Sort from '@/components/ui/interactive/Sort';
import SortClear from '@/components/ui/interactive/SortClear';
import { REGION_OPTIONS, countStories, sameSet, sortLabel, type StoryCountItem } from '@/lib/filterOptions';


interface StoriesFilterProps {
  categories: { value: string; label: string }[];
  currentCategory?: string;
  currentRegions?: string;
  /** 「絞り込み」ボタンに出す該当件数を数えるための全ストーリーの絞り込み項目 */
  countItems?: StoryCountItem[];
}


/**
 * 暮らしを知るの絞り込み（PC）。挙動は /properties の PropertyFilter に揃えている:
 * - 何も選んでいない時はドロップダウンの「すべて」にチェック。「すべて」を押すとその項目を全解除して即反映
 * - チェックの追加は「絞り込み」ボタン待ち、解除は即時反映
 * - 「絞り込み」は URL に未反映の変更がある時だけ押せる。押してから結果が出るまで「絞り込み中…」
 */
export default function StoriesFilter({
  categories,
  currentCategory,
  currentRegions,
  countItems,
}: StoriesFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlCategories = useMemo(() => (currentCategory ? [currentCategory] : []), [currentCategory]);
  const urlRegions = useMemo(
    () => (currentRegions ? currentRegions.split(',').filter(Boolean) : []),
    [currentRegions],
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>(urlCategories);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(urlRegions);
  // URL が変わったら（戻る・クリア等）選択状態を合わせる
  useEffect(() => setSelectedCategories(urlCategories), [urlCategories]);
  useEffect(() => setSelectedRegions(urlRegions), [urlRegions]);

  const applyWith = useCallback(
    (categoriesSel: string[], regionsSel: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('page');
      if (categoriesSel[0]) params.set('category', categoriesSel[0]);
      else params.delete('category');
      if (regionsSel.length > 0) params.set('regions', regionsSel.join(','));
      else params.delete('regions');
      const qs = params.toString();
      startTransition(() => router.push(qs ? `/stories?${qs}` : '/stories', { scroll: false }));
    },
    [router, searchParams],
  );

  // チェックの追加は「絞り込み」ボタン待ち、解除は即時反映（/properties #69 と同じ）
  const toggleCategory = (value: string) => {
    const isRemoval = selectedCategories.includes(value);
    const next = isRemoval ? [] : [value];
    setSelectedCategories(next);
    if (isRemoval) applyWith(next, selectedRegions);
  };

  const toggleRegion = (value: string) => {
    const isRemoval = selectedRegions.includes(value);
    const next = isRemoval ? selectedRegions.filter((v) => v !== value) : [...selectedRegions, value];
    setSelectedRegions(next);
    if (isRemoval) applyWith(selectedCategories, next);
  };

  const clearCategories = () => {
    setSelectedCategories([]);
    applyWith([], selectedRegions);
  };

  const clearRegions = () => {
    setSelectedRegions([]);
    applyWith(selectedCategories, []);
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedRegions([]);
    startTransition(() => router.push('/stories', { scroll: false }));
  };

  const hasPendingChange =
    !sameSet(selectedCategories, urlCategories) || !sameSet(selectedRegions, urlRegions);
  const hasFilters = selectedCategories.length > 0 || selectedRegions.length > 0;

  return (
    <div className="flex flex-col tablet:flex-row gap-4 items-stretch tablet:items-start tablet:justify-between">
      <div className="flex flex-col tablet:flex-row gap-4">
        <Dropdown
          label="カテゴリ"
          options={categories}
          selected={selectedCategories}
          onToggle={toggleCategory}
          onClear={clearCategories}
          variant="light-green"
        />
        <Dropdown
          label="地域"
          options={REGION_OPTIONS}
          selected={selectedRegions}
          onToggle={toggleRegion}
          onClear={clearRegions}
          variant="light-green"
        />
      </div>

      <div className="flex gap-2 shrink-0">
        <Sort
          onClick={() => applyWith(selectedCategories, selectedRegions)}
          disabled={!hasPendingChange}
          pending={isPending}
          // 押せる時だけ、押した後の該当件数を出す（コメント f4RwHBCdJbD5）
          label={sortLabel(
            hasPendingChange && countItems
              ? countStories(countItems, { category: selectedCategories[0] ?? '', regions: selectedRegions })
              : undefined,
          )}
        />
        <SortClear onClick={handleClear} disabled={!hasFilters && urlCategories.length === 0 && urlRegions.length === 0} />
      </div>
    </div>
  );
}
