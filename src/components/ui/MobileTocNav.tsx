'use client';

import { useState, useEffect } from 'react';

interface Props {
  items: string[];
}

export default function MobileTocNav({ items }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // pickup〜末尾間で表示
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
      // active section detection
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
      {/* フローティングバー */}
      <button
        onClick={open}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-light-green rounded-full pl-6 pr-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)] transition-opacity duration-300 ${showBar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <span className="font-gothic font-medium text-[14px] leading-none text-dark-green whitespace-nowrap">
          {items[activeIndex] || '目次'}
        </span>
        <span className="w-10 h-10 rounded-full bg-cream flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M5 7L9 11L13 7" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* モーダル */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={close}
          />
          <div className="relative bg-light-green rounded-t-[32px] px-[30px] py-[45px] w-full max-h-[70vh] overflow-y-auto">
            <button
              onClick={close}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-green flex items-center justify-center"
              aria-label="閉じる"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <nav className="flex flex-col">
              {items.map((item, i, arr) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleClick(i)}
                    className="flex items-center h-[40px] text-left cursor-pointer"
                  >
                    <div className="w-[40px] flex flex-col items-center h-full shrink-0">
                      {i > 0 ? (
                        <div className={`w-[1.5px] flex-1 ${i <= activeIndex ? 'bg-dark-green' : 'bg-dark-green/30'} transition-colors duration-300`} />
                      ) : <div className="flex-1" />}
                      <div className={`w-[10px] h-[10px] rounded-full shrink-0 transition-colors duration-300 ${
                        isActive ? 'bg-dark-green' : i < activeIndex ? 'bg-dark-green' : 'border-2 border-dark-green/30'
                      }`} />
                      {i < arr.length - 1 ? (
                        <div className={`w-[1.5px] flex-1 ${i < activeIndex ? 'bg-dark-green' : 'bg-dark-green/30'} transition-colors duration-300`} />
                      ) : <div className="flex-1" />}
                    </div>
                    <span className={`font-gothic font-medium text-[16px] leading-[1.5] text-dark-green transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-50'
                    }`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
