'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';

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

  // Figma 4211:26259 準拠: trigger w-[279.5px]、popover も同幅。flex-wrap で trigger が縮まないよう min-w 固定。
  return (
    <div className="relative w-[279.5px] shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full h-[56px] px-4 border border-dark-green rounded-lg font-gothic font-medium text-[16px] bg-transparent flex items-center justify-between gap-2"
      >
        <span className={selected.length > 0 ? 'text-dark-green' : 'text-dark-green/40'}>
          {label}
        </span>
        <span className="flex items-center gap-2 shrink-0">
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
        <div className="absolute top-[60px] left-0 w-full bg-cream border border-dark-green/20 rounded-lg shadow-lg z-20 py-2">
          {options.map((option) => {
            const isChecked = selected.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onToggle(option.value)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-light-green text-left whitespace-nowrap"
              >
                <span
                  className={`size-4 inline-flex items-center justify-center rounded border shrink-0 ${
                    isChecked ? 'bg-dark-green border-dark-green' : 'border-dark-green/40'
                  }`}
                >
                  {isChecked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="font-gothic font-medium text-[14px] text-dark-green">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function PropertyFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentStatus = searchParams.get('status') || 'all';
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
      const next = optimisticTypes.includes(value)
        ? optimisticTypes.filter((t) => t !== value)
        : [...optimisticTypes, value];
      setOptimisticTypes(next); // 即時反映（API 待たずチェックマーク表示）
      startTransition(() => {
        router.push(buildUrl({ types: next.length > 0 ? next.join(',') : undefined }), { scroll: false });
      });
    },
    [optimisticTypes, router, buildUrl],
  );

  const toggleRegion = useCallback(
    (value: string) => {
      const next = optimisticRegions.includes(value)
        ? optimisticRegions.filter((r) => r !== value)
        : [...optimisticRegions, value];
      setOptimisticRegions(next); // 即時反映
      startTransition(() => {
        router.push(buildUrl({ regions: next.length > 0 ? next.join(',') : undefined }), { scroll: false });
      });
    },
    [optimisticRegions, router, buildUrl],
  );

  const applyFilters = useCallback(() => {
    router.push(buildUrl({}), { scroll: false });
  }, [router, buildUrl]);

  const clearFilters = () => {
    setOptimisticStatus('all');
    setOptimisticTypes([]);
    setOptimisticRegions([]);
    router.push('/properties', { scroll: false });
  };

  const hasActiveFilters =
    optimisticTypes.length > 0 ||
    optimisticRegions.length > 0 ||
    optimisticStatus !== 'all';

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
              setOptimisticStatus(option.value);
              startTransition(() => {
                router.push(
                  buildUrl({ status: option.value === 'all' ? undefined : option.value }),
                  { scroll: false }
                );
              });
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
      />
      <CheckboxDropdown
        label="地域"
        options={regions.map((r) => ({ value: r, label: r }))}
        selected={optimisticRegions}
        onToggle={toggleRegion}
      />
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={applyFilters}
          className="h-[56px] px-10 bg-dark-green border border-dark-green rounded-lg font-gothic font-medium text-[16px] leading-none text-white transition-opacity hover:opacity-90 shrink-0"
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
