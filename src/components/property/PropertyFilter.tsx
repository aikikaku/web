'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

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

export default function PropertyFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') || 'all';

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== 'all') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete('page');
      router.push(`/properties?${params.toString()}`);
    },
    [router, searchParams]
  );

  const selectedTypes = searchParams.get('types')?.split(',').filter(Boolean) || [];
  const selectedRegions = searchParams.get('regions')?.split(',').filter(Boolean) || [];

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      updateParams('regions', value);
    } else {
      updateParams('regions', '');
    }
  };

  const clearFilters = () => {
    router.push('/properties');
  };

  const hasActiveFilters = selectedTypes.length > 0 || selectedRegions.length > 0 || currentStatus !== 'all';

  return (
    <div className="hidden tablet:flex items-center gap-[30px]">
      {/* ステータス切替トグル - pill shape */}
      <div className="flex rounded-[50px] overflow-hidden border border-dark-green shrink-0">
        {[
          { value: 'all', label: 'すべて' },
          { value: 'available', label: 'ご案内中の物件' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => updateParams('status', option.value)}
            className={`h-[56px] px-6 font-gothic font-medium text-[16px] leading-none transition-colors ${
              currentStatus === option.value
                ? 'bg-dark-green text-white rounded-[50px]'
                : 'bg-transparent text-dark-green'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* ドロップダウン群 */}
      <div className="flex flex-1 gap-2">
        {/* 物件種別ドロップダウン */}
        <select
          value={selectedTypes[0] || ''}
          onChange={(e) => {
            if (e.target.value) {
              updateParams('types', e.target.value);
            } else {
              updateParams('types', '');
            }
          }}
          className="flex-1 h-[56px] px-4 border border-dark-green rounded-lg font-gothic font-medium text-[16px] bg-white appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%232a363b%22%20d%3D%22M3%205l5%206%205-6%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat pr-10 text-black/20"
        >
          <option value="">物件</option>
          {propertyTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        {/* 地域ドロップダウン */}
        <select
          value={selectedRegions[0] || ''}
          onChange={handleRegionChange}
          className="flex-1 h-[56px] px-4 border border-dark-green rounded-lg font-gothic font-medium text-[16px] bg-white appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%232a363b%22%20d%3D%22M3%205l5%206%205-6%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat pr-10 text-black/20"
        >
          <option value="">地域</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* 絞り込みボタン + クリア */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => {
            // trigger filter application (already applied via URL params)
            const params = new URLSearchParams(searchParams.toString());
            params.delete('page');
            router.push(`/properties?${params.toString()}`);
          }}
          className="h-[56px] px-10 bg-dark-green border border-dark-green rounded-lg font-gothic font-medium text-[16px] leading-none text-white transition-opacity hover:opacity-90"
        >
          絞り込み
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="w-[56px] h-[56px] border border-dark-green rounded-lg flex items-center justify-center hover:bg-cream transition-colors"
            aria-label="フィルターをクリア"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
