'use client';

import { useState, useEffect, useRef } from 'react';

interface CheckboxDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  variant?: 'default' | 'light-green';
}

export default function CheckboxDropdown({
  label,
  options,
  selected,
  onToggle,
  variant = 'default',
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

  const triggerBg = variant === 'light-green' ? 'bg-light-green' : 'bg-white';
  const displayLabel = selected.length > 0
    ? options.find(o => o.value === selected[0])?.label || label
    : label;

  return (
    <div className="relative w-full tablet:w-[280px]" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[56px] px-4 border border-dark-green rounded-lg font-gothic font-medium text-[16px] ${triggerBg} flex items-center justify-between cursor-pointer`}
      >
        <span className={selected.length > 0 ? 'text-dark-green' : 'text-black/20'}>
          {displayLabel}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M3 5l5 6 5-6" fill="#2a363b" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-[64px] left-0 w-full bg-cream rounded-lg shadow-[0_0_16px_rgba(0,0,0,0.16)] z-20 px-6 py-4">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 h-[40px] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => onToggle(option.value)}
                className="w-[18px] h-[18px] accent-dark-green shrink-0"
              />
              <span className="font-gothic font-medium text-[16px] leading-[2] text-black">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
