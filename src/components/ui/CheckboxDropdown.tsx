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

  const bgClass = variant === 'light-green' ? 'bg-light-green' : 'bg-white';
  const displayLabel = selected.length > 0
    ? options.find(o => o.value === selected[0])?.label || label
    : label;

  return (
    <div className="relative flex-1" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[56px] px-4 border border-dark-green rounded-lg font-gothic font-medium text-[16px] ${bgClass} flex items-center justify-between cursor-pointer`}
      >
        <span className={selected.length > 0 ? 'text-dark-green' : 'text-black/30'}>
          {displayLabel}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M3 5l5 6 5-6" fill="#2a363b" />
        </svg>
      </button>
      {isOpen && (
        <div className={`absolute top-[60px] left-0 w-full ${bgClass} border border-dark-green/20 rounded-lg shadow-lg z-20 py-2`}>
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
