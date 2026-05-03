'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

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

function CheckboxDropdown({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[56px] px-4 border border-dark-green rounded-lg font-gothic font-medium text-[16px] bg-white flex items-center justify-between"
      >
        <span className={selected.length > 0 ? 'text-dark-green' : 'text-black/30'}>
          {label}
        </span>
        <span className="flex items-center gap-2">
          {selected.length > 0 && (
            <span className="bg-dark-green text-white text-[12px] w-5 h-5 rounded-full flex items-center justify-center">
              {selected.length}
            </span>
          )}
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="M3 5l5 6 5-6" fill="#2a363b" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-white border border-dark-green/20 rounded-lg shadow-lg z-20 py-2">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-cream cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => onToggle(option.value)}
                className="w-4 h-4 accent-dark-green"
              />
              <span className="font-gothic font-medium text-[14px] text-dark-green">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PropertyFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') || 'all';
  const selectedTypes = searchParams.get('types')?.split(',').filter(Boolean) || [];
  const selectedRegions = searchParams.get('regions')?.split(',').filter(Boolean) || [];

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
      return qs ? `/properties?${qs}` : '/properties';
    },
    [searchParams]
  );

  const toggleType = useCallback(
    (value: string) => {
      const next = selectedTypes.includes(value)
        ? selectedTypes.filter((t) => t !== value)
        : [...selectedTypes, value];
      router.push(buildUrl({ types: next.length > 0 ? next.join(',') : undefined }));
    },
    [selectedTypes, router, buildUrl]
  );

  const toggleRegion = useCallback(
    (value: string) => {
      const next = selectedRegions.includes(value)
        ? selectedRegions.filter((r) => r !== value)
        : [...selectedRegions, value];
      router.push(buildUrl({ regions: next.length > 0 ? next.join(',') : undefined }));
    },
    [selectedRegions, router, buildUrl]
  );

  const applyFilters = useCallback(() => {
    router.push(buildUrl({}));
  }, [router, buildUrl]);

  const clearFilters = () => {
    router.push('/properties');
  };

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedRegions.length > 0 ||
    currentStatus !== 'all';

  return (
    <div className="hidden tablet:flex items-center gap-2">
      {/* ステータス切替トグル */}
      <div className="flex rounded-[50px] overflow-hidden border border-dark-green shrink-0 mr-4">
        {[
          { value: 'all', label: 'すべて' },
          { value: 'available', label: 'ご案内中の物件' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() =>
              router.push(buildUrl({ status: option.value === 'all' ? undefined : option.value }))
            }
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

      <CheckboxDropdown
        label="物件"
        options={propertyTypes}
        selected={selectedTypes}
        onToggle={toggleType}
      />
      <CheckboxDropdown
        label="地域"
        options={regions.map((r) => ({ value: r, label: r }))}
        selected={selectedRegions}
        onToggle={toggleRegion}
      />

      <button
        onClick={applyFilters}
        className="h-[56px] px-10 bg-dark-green border border-dark-green rounded-lg font-gothic font-medium text-[16px] leading-none text-white transition-opacity hover:opacity-90 shrink-0"
      >
        絞り込み
      </button>
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-[56px] h-[56px] border border-dark-green rounded-lg flex items-center justify-center hover:bg-cream transition-colors shrink-0"
          aria-label="フィルターをクリア"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
