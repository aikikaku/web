'use client';

import { useEffect, useState } from 'react';

interface TocNavProps {
  items: string[];
}

/**
 * スクロール追従する目次ナビゲーション。
 * .rich-content 内の h5[id^="toc-"] 要素を IntersectionObserver で監視し、
 * 現在表示中のセクションをアクティブ表示する。
 */
export default function TocNav({ items }: TocNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const headings = items
      .map((_, i) => document.getElementById(`toc-${i}`))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    // 各 h5 の画面内位置に基づいてアクティブを判定
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.3;
      let current = 0;

      for (let i = 0; i < headings.length; i++) {
        if (headings[i].offsetTop <= scrollY) {
          current = i;
        }
      }

      setActiveIndex(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const handleClick = (index: number) => {
    const el = document.getElementById(`toc-${index}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="flex flex-col">
      {items.map((item, i, arr) => {
        const isActive = i === activeIndex;

        return (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            className="flex items-center h-[56px] text-left cursor-pointer"
          >
            {/* タイムラインドット + 線 */}
            <div className="w-[40px] flex flex-col items-center h-full shrink-0">
              {/* 上の線 */}
              {i > 0 && (
                <div className={`w-[1.5px] flex-1 ${
                  i <= activeIndex ? 'bg-dark-green' : 'bg-dark-green/30'
                } transition-colors duration-300`} />
              )}
              {i === 0 && <div className="flex-1" />}

              {/* ドット */}
              <div className={`w-[10px] h-[10px] rounded-full shrink-0 transition-colors duration-300 ${
                isActive
                  ? 'bg-dark-green'
                  : i < activeIndex
                    ? 'bg-dark-green'
                    : 'border-2 border-dark-green/30'
              }`} />

              {/* 下の線 */}
              {i < arr.length - 1 && (
                <div className={`w-[1.5px] flex-1 ${
                  i < activeIndex ? 'bg-dark-green' : 'bg-dark-green/30'
                } transition-colors duration-300`} />
              )}
              {i === arr.length - 1 && <div className="flex-1" />}
            </div>

            {/* テキスト */}
            <span className={`font-gothic font-medium text-[16px] leading-[1.5] text-dark-green transition-opacity duration-300 ${
              isActive ? 'opacity-100' : 'opacity-50'
            }`}>
              {item}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
