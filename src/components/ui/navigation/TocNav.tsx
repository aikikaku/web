'use client';

import { useEffect, useState } from 'react';

interface TocNavProps {
  items: string[];
}

/**
 * スクロール追従する目次ナビゲーション。
 * .rich-content 内の h5[id^="toc-"] 要素を IntersectionObserver で監視し、
 * 現在表示中のセクションをアクティブ表示する。
 *
 * Figma 4470:14285（物件詳細 PC 目次）準拠: 1 行 40px、線 1.5px・丸 10px は全て dark-green 塗り。
 * 未到達の行は丸・線とも 50% 不透明（Figma では行ごと opacity-50）、アクティブ行の下線も 50%。
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
            // 1行なら Figma どおり高さ 40px・点は中央。長い項目は折り返して行が伸び、点は1行目に揃え、線は次の項目へつながる
            className="flex items-stretch min-h-[2.5rem] text-left cursor-pointer"
          >
            {/* タイムラインドット + 線 */}
            <div className="w-[2.5rem] flex flex-col items-center shrink-0">
              {/* 上の線（1行目の中央に点が来る高さ: 余白 8px + 行の半分 12px - 点の半分 5px = 15px） */}
              <div
                className={`w-[0.09375rem] h-[0.9375rem] shrink-0 ${
                  i === 0 ? '' : i <= activeIndex ? 'bg-dark-green' : 'bg-dark-green/50'
                } transition-colors duration-300`}
              />

              {/* ドット */}
              <div className={`w-[0.625rem] h-[0.625rem] rounded-full shrink-0 transition-colors duration-300 ${
                isActive
                  ? 'bg-dark-green'
                  : i < activeIndex
                    ? 'bg-dark-green'
                    : 'bg-dark-green/50'
              }`} />

              {/* 下の線（行の残りの高さいっぱい） */}
              <div
                className={`w-[0.09375rem] flex-1 ${
                  i === arr.length - 1 ? '' : i < activeIndex ? 'bg-dark-green' : 'bg-dark-green/50'
                } transition-colors duration-300`}
              />
            </div>

            {/* テキスト */}
            <span className={`flex-1 min-w-0 py-2 font-gothic font-medium text-[1rem] leading-[1.5] text-dark-green transition-opacity duration-300 ${
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
