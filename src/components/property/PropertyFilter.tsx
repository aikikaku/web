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
    <div className="hidden tablet:flex flex-wrap items-center gap-3 tablet:gap-4">
      {/* ステータス切替トグル */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200 w-full tablet:w-auto">
        {[
          { value: 'all', label: 'すべて' },
          { value: 'available', label: 'ご案内中の物件' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => updateParams('status', option.value)}
            className={`flex-1 tablet:flex-none px-5 py-3 text-body-s font-gothic font-medium transition-colors ${
              currentStatus === option.value
                ? 'bg-dark-green text-white'
                : 'bg-white text-dark-green hover:bg-cream'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

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
        className="flex-1 tablet:flex-none px-4 py-3 border border-gray-200 rounded-lg text-body-s font-gothic bg-white min-w-0 tablet:min-w-[180px] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%232a363b%22%20d%3D%22M2%204l4%204%204-4%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-8"
      >
        <option value="">物件種別</option>
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
        className="flex-1 tablet:flex-none px-4 py-3 border border-gray-200 rounded-lg text-body-s font-gothic bg-white min-w-0 tablet:min-w-[180px] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%232a363b%22%20d%3D%22M2%204l4%204%204-4%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-8"
      >
        <option value="">エリア</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      {/* 並び替え・クリア */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={() => updateParams('orders', '-publishedAt')}
          className="px-4 py-3 border border-gray-200 rounded-lg text-body-s font-gothic bg-white hover:bg-cream transition-colors"
        >
          新着順
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="p-3 border border-dark-green rounded-lg text-body-s font-gothic bg-white hover:bg-cream transition-colors"
            aria-label="フィルターをクリア"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
