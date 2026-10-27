'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

interface SelectProps {
  id: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
}

/**
 * フォーム用の単一選択。閉じた状態はテキスト入力と同じ見た目（薄い枠・角丸）にそろえ、
 * 開いたパネルは絞り込みの Dropdown と同じクリーム地・影・ホバーで薄緑にする。複数選択は Dropdown を使う。
 * 選択中の項目をもう一度選ぶと選択を外す（任意項目を空に戻せるように）。
 * キーボード: ↑↓ で移動、Enter/Space で決定、Esc で閉じる。
 */
export default function Select({ id, value, options, onChange, placeholder = '選んでください', invalid = false, describedBy }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    function handleMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  function openList() {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  }

  function choose(option: string) {
    onChange(option === value ? '' : option);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === 'Escape' || e.key === 'Tab') {
      if (e.key === 'Escape') e.preventDefault();
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if ((e.key === 'Enter' || e.key === ' ') && active >= 0) {
      e.preventDefault();
      choose(options[active]);
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center justify-between gap-3 px-5 py-4 bg-cream border rounded-xl font-gothic text-body-m text-left outline-none transition-colors ${
          invalid ? 'border-red-400' : open ? 'border-accent-blue' : 'border-dark-green/20 hover:border-dark-green/40 focus-visible:border-accent-blue'
        }`}
      >
        <span className={value ? 'text-dark-green' : 'text-dark-green/30'}>{value || placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M3 5l5 6 5-6" className="fill-dark-green" />
        </svg>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-cream rounded-xl shadow-[0_0_8px_rgba(0,0,0,0.16)] z-20 p-2"
        >
          {options.map((option, i) => {
            const selected = option === value;
            return (
              <li
                key={option}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={selected}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(option)}
                onMouseEnter={() => setActive(i)}
                className={`flex items-center justify-between gap-3 h-11 px-3 rounded-lg font-gothic text-body-m text-dark-green cursor-pointer ${
                  i === active ? 'bg-light-green' : ''
                } ${selected ? 'font-medium' : ''}`}
              >
                {option}
                {selected && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
                    <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
