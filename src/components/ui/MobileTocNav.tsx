'use client';

import { useState, useEffect } from 'react';

interface Props {
  items: string[];
}

/**
 * SP 専用の目次フローティングバー。Figma 4211:10920 (closed) / 4211:11590 (open) 準拠。
 * - Closed: cream の角丸ピル、左にドット + 現在セクション名（14px）
 * - Open: 右下に dark-green 円の閉じるボタン + 上に縦リスト（タイムライン indicator）
 */
export default function MobileTocNav({ items }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const start = document.querySelector('[data-mobile-toc-start]');
    const end = document.querySelector('[data-mobile-toc-end]');
    if (!start) return;

    const checkVisibility = () => {
      const startRect = start.getBoundingClientRect();
      const isPastStart = startRect.top < window.innerHeight * 0.6;
      let isBeforeEnd = true;
      if (end) {
        const endRect = end.getBoundingClientRect();
        isBeforeEnd = endRect.top > window.innerHeight * 0.5;
      }
      setShowBar(isPastStart && isBeforeEnd);
    };

    const handleScroll = () => {
      checkVisibility();
      const headings = items
        .map((_, i) => document.getElementById(`toc-${i}`))
        .filter(Boolean) as HTMLElement[];
      const scrollY = window.scrollY + window.innerHeight * 0.3;
      let current = 0;
      for (let i = 0; i < headings.length; i++) {
        if (headings[i].offsetTop <= scrollY) current = i;
      }
      setActiveIndex(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [items]);

  const open = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleClick = (index: number) => {
    close();
    setTimeout(() => {
      const el = document.getElementById(`toc-${index}`);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  if (items.length === 0) return null;

  return (
    <div className="tablet:hidden">
      {/* Closed: 中央寄せ floating ピル (Figma 4211:10920 Column 342×56) */}
      <button
        onClick={open}
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 inline-flex items-center bg-cream border border-dark-green/20 rounded-full pl-5 pr-6 py-2 shadow-[0_-1px_4px_rgba(0,0,0,0.1)] w-[342px] h-14 transition-opacity duration-300 ${showBar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="目次を開く"
      >
        <span className="size-8 inline-flex items-center justify-center shrink-0">
          <span className="size-2 rounded-full bg-dark-green" />
        </span>
        <span className="flex-1 font-gothic font-medium text-[14px] leading-[1.8] text-dark-green text-left truncate">
          {items[activeIndex] || '目次'}
        </span>
      </button>

      {/* Open: 右寄せ x ボタン + 縦リスト */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={close} />
          <div className="absolute bottom-6 right-4 left-4 flex flex-col items-end gap-2">
            <button
              onClick={close}
              className="size-11 rounded-full bg-dark-green inline-flex items-center justify-center"
              aria-label="閉じる"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className="bg-[#f4faf0] border border-dark-green/20 rounded-3xl px-5 py-6 w-full shadow-[0_0_8px_rgba(0,0,0,0.16)]">
              <nav className="flex flex-col">
                {items.map((item, i, arr) => {
                  const isActive = i === activeIndex;
                  const isPast = i < activeIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleClick(i)}
                      className={`flex items-center h-9 text-left transition-opacity ${isActive ? 'opacity-100' : 'opacity-50'}`}
                    >
                      <div className="w-8 flex flex-col items-center h-full shrink-0">
                        {/* 上線（先頭以外） */}
                        {i > 0 ? (
                          <div className={`w-px flex-1 ${isPast || isActive ? 'bg-dark-green' : 'bg-dark-green/30'}`} />
                        ) : (
                          <div className="flex-1" />
                        )}
                        {/* dot */}
                        <span className={`size-2 rounded-full shrink-0 ${isPast || isActive ? 'bg-dark-green' : 'bg-dark-green/30'}`} />
                        {/* 下線（末尾以外） */}
                        {i < arr.length - 1 ? (
                          <div className={`w-px flex-1 ${isPast ? 'bg-dark-green' : 'bg-dark-green/30'}`} />
                        ) : (
                          <div className="flex-1" />
                        )}
                      </div>
                      <span className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
                        {item}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
