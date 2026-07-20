'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import Dropdown from '@/components/ui/interactive/Dropdown';
import Sort from '@/components/ui/interactive/Sort';
import SortClear from '@/components/ui/interactive/SortClear';

const regionOptions = [
  { value: 'すべて', label: 'すべて' },
  { value: '三島市', label: '三島市' },
  { value: '長泉町', label: '長泉町' },
  { value: '清水町', label: '清水町' },
  { value: '函南町', label: '函南町' },
  { value: '沼津市', label: '沼津市' },
  { value: '裾野市', label: '裾野市' },
  { value: '伊豆の国市', label: '伊豆の国市' },
  { value: 'その他の地域', label: 'その他の地域' },
];

interface StoriesFilterProps {
  categories: { value: string; label: string }[];
  currentCategory?: string;
  currentRegions?: string;
}

export default function StoriesFilter({
  categories,
  currentCategory,
  currentRegions,
}: StoriesFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    currentCategory ? [currentCategory] : []
  );
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    currentRegions ? currentRegions.split(',') : []
  );

  const buildUrl = useCallback(
    (overrides: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('page');
      for (const [key, value] of Object.entries(overrides)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      const qs = params.toString();
      return qs ? `/stories?${qs}` : '/stories';
    },
    [searchParams]
  );

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [value]
    );
  };

  const toggleRegion = (value: string) => {
    if (value === 'すべて') {
      setSelectedRegions([]);
      return;
    }
    setSelectedRegions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    router.push(
      buildUrl({
        category: selectedCategories[0] || undefined,
        regions: selectedRegions.length > 0 ? selectedRegions.join(',') : undefined,
      }),
      { scroll: false }
    );
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedRegions([]);
    router.push('/stories', { scroll: false });
  };

  const hasFilters = selectedCategories.length > 0 || selectedRegions.length > 0;

  return (
    <div className="flex flex-col tablet:flex-row gap-4 items-stretch tablet:items-start tablet:justify-between">
      <div className="flex flex-col tablet:flex-row gap-4">
        <Dropdown
          label="カテゴリ"
          options={categories}
          selected={selectedCategories}
          onToggle={toggleCategory}
          variant="light-green"
        />
        <Dropdown
          label="地域"
          options={regionOptions}
          selected={selectedRegions}
          onToggle={toggleRegion}
          variant="light-green"
        />
      </div>

      <div className="flex gap-2 shrink-0">
        <Sort onClick={applyFilter} disabled={!hasFilters} />
        <SortClear onClick={handleClear} disabled={!hasFilters} />
      </div>
    </div>
  );
}
