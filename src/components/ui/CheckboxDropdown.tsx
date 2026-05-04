'use client';

import { useState, useEffect, useRef } from 'react';

interface CheckboxDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  variant?: 'default' | 'light-green';
}

/**
 * Figma 4211:26259 (default) / 26263 (hover) / 26267 (pressed) / 26286 (selected) 準拠の
 * チェックボックス付きドロップダウン。
 *
 * - Default: bg 透明、border dark-green、placeholder opacity-20
 * - Hover: bg light-green、それ以外同じ
 * - Pressed: bg light-green + 下にオプションパネル展開
 * - Selected: bg light-green、選択肢を chip 化（先頭は dark-green pill + ✕、残りは「+N」バッジ）
 */
export default function CheckboxDropdown({
  label,
  options,
  selected,
  onToggle,
}: CheckboxDropdownProps) {
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

  const hasSelection = selected.length > 0;
  // hover/pressed/selected で bg-light-green を当てる
  const triggerBg = isOpen || hasSelection ? 'bg-light-green' : 'bg-transparent hover:bg-light-green';
  const firstSelectedLabel = hasSelection
    ? options.find((o) => o.value === selected[0])?.label ?? selected[0]
    : null;

  return (
    <div className="relative w-full tablet:w-[280px]" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`w-full h-[56px] px-4 border border-dark-green rounded-lg font-gothic font-medium text-[16px] flex items-center justify-between gap-2 cursor-pointer transition-colors ${triggerBg}`}
      >
        {/* placeholder or selected chips */}
        {hasSelection ? (
          <div className="flex-1 min-w-0 flex items-center gap-1 overflow-hidden">
            {/* 1 番目の選択を chip 表示（dark-green pill + ✕） */}
            <span
              className="inline-flex items-center gap-1 bg-dark-green text-white rounded-full pl-3 pr-2 py-1 text-[14px] leading-none shrink-0 max-w-[160px]"
            >
              <span className="truncate">{firstSelectedLabel}</span>
              <span
                role="button"
                tabIndex={0}
                aria-label={`${firstSelectedLabel} を除外`}
                className="size-4 inline-flex items-center justify-center shrink-0 hover:opacity-70"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(selected[0]);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggle(selected[0]);
                  }
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 3l6 6M9 3l-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
            {/* 残り選択数 */}
            {selected.length > 1 && (
              <span className="inline-flex items-center bg-dark-green text-white rounded-full px-3 py-1.5 text-[12px] leading-[1.8] shrink-0">
                +{selected.length - 1}
              </span>
            )}
          </div>
        ) : (
          <span className="flex-1 min-w-0 text-left text-black opacity-20">{label}</span>
        )}
        {/* arrow_down */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M3 5l5 6 5-6" fill="#2a363b" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute top-[64px] left-0 w-full bg-cream rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.16)] z-20 px-6 py-4"
        >
          {options.map((option) => {
            const checked = selected.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={checked}
                onClick={() => onToggle(option.value)}
                className="flex items-center gap-2 h-[40px] w-full text-left cursor-pointer"
              >
                <span
                  className={`size-[18px] shrink-0 inline-flex items-center justify-center rounded-[3px] border ${
                    checked ? 'bg-dark-green border-dark-green' : 'bg-transparent border-dark-green/40'
                  }`}
                >
                  {checked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="font-gothic font-medium text-[16px] leading-[2] text-black">
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
