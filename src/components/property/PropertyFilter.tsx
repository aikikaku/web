'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

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
  const currentKeyword = searchParams.get('q') || '';
  const [keyword, setKeyword] = useState(currentKeyword);

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

  const toggleArrayParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.get(key)?.split(',').filter(Boolean) || [];
      const index = current.indexOf(value);
      if (index >= 0) {
        current.splice(index, 1);
      } else {
        current.push(value);
      }
      if (current.length > 0) {
        params.set(key, current.join(','));
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

  return (
    <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
      {/* ステータス切替 */}
      <div>
        <h3 className="font-bold mb-2 text-sm">ステータス</h3>
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'すべて' },
            { value: 'available', label: 'ご案内中の物件' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateParams('status', option.value)}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                currentStatus === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 物件種別 */}
      <div>
        <h3 className="font-bold mb-2 text-sm">物件種別</h3>
        <div className="flex flex-wrap gap-2">
          {propertyTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => toggleArrayParam('types', type.value)}
              className={`px-4 py-2 rounded text-sm transition-colors ${
                selectedTypes.includes(type.value)
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border hover:bg-gray-100'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* 地域 */}
      <div>
        <h3 className="font-bold mb-2 text-sm">地域</h3>
        <div className="flex flex-wrap gap-2">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => toggleArrayParam('regions', region)}
              className={`px-3 py-1.5 rounded text-sm transition-colors ${
                selectedRegions.includes(region)
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border hover:bg-gray-100'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* キーワード検索 */}
      <div>
        <h3 className="font-bold mb-2 text-sm">キーワード検索</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateParams('q', keyword);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="物件名、所在地など"
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            検索
          </button>
        </form>
      </div>
    </div>
  );
}
