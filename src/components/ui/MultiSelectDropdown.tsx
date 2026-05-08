'use client';

interface Option {
  value: string;
  label: string;
}

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  options: Option[];
  selected: string[];
  onChange: (value: string) => void;
  placeholder: string;
}

/**
 * Figma 4211:26286 / 4211:26323 共通の SP モーダル内 dropdown.
 * - 未選択: placeholder を text-dark-green/40 で表示
 * - 1 件以上選択: 先頭を pill (dark-green + × クローズ)、残りは「+N」バッジ
 * - 開時: 下に check 一覧を expand
 */
export default function MultiSelectDropdown({
  isOpen,
  onToggle,
  options,
  selected,
  onChange,
  placeholder,
}: Props) {
  const firstSelectedLabel = options.find((o) => o.value === selected[0])?.label ?? selected[0];

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-2 h-14 px-4 rounded-lg border border-dark-green w-full ${
          isOpen ? 'bg-light-green' : 'bg-cream'
        }`}
      >
        {selected.length === 0 ? (
          <span className="flex-1 text-left font-gothic font-medium text-[16px] leading-[2] text-dark-green/40">
            {placeholder}
          </span>
        ) : (
          <span className="flex-1 min-w-0 flex items-center gap-1 overflow-hidden">
            <span className="inline-flex items-center gap-1 bg-dark-green text-white rounded-full pl-3 pr-2 py-1 text-[14px] leading-none shrink-0 max-w-[140px]">
              <span className="truncate">{firstSelectedLabel}</span>
              <span
                role="button"
                tabIndex={0}
                aria-label="削除"
                className="size-4 inline-flex items-center justify-center shrink-0 hover:opacity-70"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(selected[0]);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    onChange(selected[0]);
                  }
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </span>
            {selected.length > 1 && (
              <span className="inline-flex items-center bg-dark-green text-white rounded-full px-3 py-1.5 text-[12px] leading-[1.8] shrink-0">
                +{selected.length - 1}
              </span>
            )}
          </span>
        )}
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M5.5 8L10.5 13L15.5 8"
            stroke="#2a363b"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="bg-cream rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.16)] py-4 flex flex-col">
          {options.map((opt) => {
            const checked = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(opt.value)}
                className="flex items-center gap-2 h-8 pl-4 pr-2 hover:bg-light-green/50 text-left"
              >
                <span
                  className={`size-[18px] inline-flex items-center justify-center rounded border shrink-0 ${
                    checked ? 'bg-dark-green border-dark-green' : 'border-dark-green/40'
                  }`}
                >
                  {checked && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 7l3 3 5-6"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="font-gothic font-medium text-[14px] leading-[1.8] text-black">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
