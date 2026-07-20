'use client';

import { useState, useEffect } from 'react';
import SpFloatingTrigger from '@/components/ui/popup/SpFloatingTrigger';
import SpModalBackdrop from '@/components/ui/popup/SpModalBackdrop';
import SpModalCloseButton from '@/components/ui/popup/SpModalCloseButton';

interface Props {
  items: string[];
}

/**
 * SP 専用の目次フローティングバー。Figma 4211:10920 (closed) / 4211:11590 (open) 準拠。
 * - Closed: cream の角丸ピル、左にドット + 現在セクション名（14px）
 * - Open: 右下に dark-green 円の閉じるボタン + 上に縦リスト（タイムライン indicator）
 */
export default function PageNavSP({ items }: Props) {
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
      <SpFloatingTrigger
        onClick={open}
        visible={showBar}
        ariaLabel="目次を開く"
        className="inline-flex items-center px-5 py-2 shadow-[0_-1px_8px_rgba(0,0,0,0.1)]"
      >
        <span className="size-8 inline-flex items-center justify-center shrink-0">
          <span className="size-2 rounded-full bg-dark-green" />
        </span>
        <span className="flex-1 font-gothic font-medium text-body-s text-dark-green text-left truncate">
          {items[activeIndex] || '目次'}
        </span>
      </SpFloatingTrigger>

      {/* Open: 右寄せ x ボタン + 縦リスト */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <SpModalBackdrop onClick={close} />
          <div className="absolute bottom-6 right-4 left-4 flex flex-col items-end gap-2">
            <SpModalCloseButton onClick={close} className="inline-flex" />
            <div className="bg-[#f4faf0] border border-dark-green/10 rounded-3xl px-5 py-6 w-full shadow-[0_0_16px_rgba(0,0,0,0.16)]">
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
                      <span className="font-gothic font-medium text-body-s text-dark-green">
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
