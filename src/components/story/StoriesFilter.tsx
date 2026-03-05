'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

// 地域リスト（配列で管理、API連携時に差し替えやすい）
const regionOptions = [
  'すべて',
  '三島市',
  '長泉町',
  '清水町',
  '函南町',
  '沼津市',
  '裾野市',
  '伊豆の国市',
  'その他の地域',
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

  const handleFilter = () => {
    // Already applied via selects, this is for explicit "絞り込み" action
    router.push(buildUrl({}));
  };

  const handleClear = () => {
    router.push('/stories');
  };

  const hasFilters = !!currentCategory || !!currentRegions;

  return (
    <div className="flex flex-col tablet:flex-row gap-4 items-stretch tablet:items-start">
      <div className="flex flex-1 flex-col tablet:flex-row gap-4">
        {/* カテゴリ選択 */}
        <select
          value={currentCategory || ''}
          onChange={(e) => {
            router.push(
              buildUrl({ category: e.target.value || undefined })
            );
          }}
          className="h-[56px] px-4 bg-light-green border border-dark-green rounded-lg font-gothic font-medium text-[16px] text-dark-green/80 min-w-0 tablet:w-[280px] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%232a363b%22%20d%3D%22M2%204l4%204%204-4%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10"
        >
          <option value="">カテゴリ</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* 地域選択 */}
        <select
          value={currentRegions || ''}
          onChange={(e) => {
            const val = e.target.value === 'すべて' ? '' : e.target.value;
            router.push(buildUrl({ regions: val || undefined }));
          }}
          className="h-[56px] px-4 bg-light-green border border-dark-green rounded-lg font-gothic font-medium text-[16px] text-dark-green/80 min-w-0 tablet:w-[280px] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%232a363b%22%20d%3D%22M2%204l4%204%204-4%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10"
        >
          <option value="">地域</option>
          {regionOptions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* ボタン */}
      <div className="flex gap-2 shrink-0">
        <button
          onClick={handleFilter}
          className="h-[56px] px-10 bg-dark-green text-white rounded-lg font-gothic font-medium text-[16px] leading-none transition-opacity hover:opacity-90"
        >
          絞り込み
        </button>
        {hasFilters && (
          <button
            onClick={handleClear}
            className="h-[56px] w-[63px] border border-dark-green rounded-lg flex items-center justify-center transition-colors hover:bg-cream"
            aria-label="フィルターをクリア"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
