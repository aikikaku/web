'use client';

import { useEffect, useRef, useState } from 'react';
import { Property } from '@/types/microcms';
import PropertyCard from '@/components/property/PropertyCard';
import SeeAllLink from '@/components/ui/SeeAllLink';
import SeeAllButtonSP from '@/components/ui/SeeAllButtonSP';

interface Props {
  properties: Property[];
  href?: string;
}

const PAGE_SIZE_PC = 3;
const PAGE_SIZE_SP = 1;

/**
 * 「もっと物件を見る」セクション。Figma 4211:10268 (PC) / 4211:10830 (SP) 準拠で横スクロール。
 * - 共通: 全件レンダリング、横スクロール peek、dot/矢印で対応ページの先頭カードへ smooth scroll
 * - PC: 3 件 + 4 枚目 peek (Math.ceil(N/3) ページ)、dot 行 + すべて見る を justify-between
 * - SP: 1 枚 + 次の peek (Math.ceil(N/1) ページ = 物件数)、dot 行 + 全幅すべて見る
 * - 親 (page.tsx) が同 category & type で random shuffle 済みの properties を渡す前提（最大 6 件）
 */
export default function MoreProperties({ properties, href = '/properties' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);
  const [activePagePc, setActivePagePc] = useState(0);
  const [activePageSp, setActivePageSp] = useState(0);

  const totalPagesPc = Math.max(1, Math.ceil(properties.length / PAGE_SIZE_PC));
  const totalPagesSp = Math.max(1, Math.ceil(properties.length / PAGE_SIZE_SP));

  useEffect(() => {
    const el = trackRef.current;
    const flex = flexRef.current;
    if (!el || !flex) return;
    const handleScroll = () => {
      const card = flex.children[0] as HTMLElement | undefined;
      if (!card) return;
      const cardWidth = card.getBoundingClientRect().width;
      const gap = 30; // PC gap-[30px], SP gap close enough
      const idx = Math.max(0, Math.round(el.scrollLeft / (cardWidth + gap)));
      setActivePagePc(Math.min(totalPagesPc - 1, Math.floor(idx / PAGE_SIZE_PC)));
      setActivePageSp(Math.min(totalPagesSp - 1, idx));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [properties.length, totalPagesPc, totalPagesSp]);

  const scrollToCardIdx = (cardIdx: number) => {
    const el = trackRef.current;
    const flex = flexRef.current;
    if (!el || !flex) return;
    const card = flex.children[cardIdx] as HTMLElement | undefined;
    if (!card) return;
    const delta = card.getBoundingClientRect().left - el.getBoundingClientRect().left;
    el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' });
  };

  if (!properties.length) return null;

  return (
    <div>
      {/* 横スクロールトラック（PC/SP 共通） */}
      <div
        ref={trackRef}
        className="overflow-x-auto pl-4 tablet:pl-0 pb-4 scroll-smooth snap-x snap-mandatory scroll-pl-4 tablet:scroll-pl-0"
        style={{ scrollbarWidth: 'none' }}
      >
        <div ref={flexRef} className="flex gap-5 tablet:gap-[30px] min-w-max pr-4 tablet:pr-0">
          {properties.map((p) => (
            <div key={p.id} className="w-[332px] tablet:w-[410px] shrink-0 snap-start">
              <PropertyCard property={p} />
            </div>
          ))}
        </div>
      </div>

      {/* PC ナビ: dots + 矢印（左） + すべて見る（右） */}
      <div className="hidden tablet:flex items-center justify-between mt-16">
        {totalPagesPc > 1 ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToCardIdx(Math.max(0, (activePagePc - 1) * PAGE_SIZE_PC))}
              disabled={activePagePc === 0}
              aria-label="前へ"
              className="size-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPagesPc }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`ページ${i + 1}`}
                  onClick={() => scrollToCardIdx(i * PAGE_SIZE_PC)}
                  className={`size-2 rounded-full transition-colors ${i === activePagePc ? 'bg-dark-green' : 'bg-dark-green/30'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollToCardIdx(Math.min(totalPagesPc - 1, activePagePc + 1) * PAGE_SIZE_PC)}
              disabled={activePagePc >= totalPagesPc - 1}
              aria-label="次へ"
              className="size-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : (
          <div />
        )}
        <SeeAllLink href={href} />
      </div>

      {/* SP ナビ: 中央ドット + 全幅すべて見る */}
      <div className="tablet:hidden mt-8 px-4">
        {totalPagesSp > 1 && (
          <div className="flex items-center justify-center gap-[58px] pb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToCardIdx(Math.max(0, activePageSp - 1))}
                disabled={activePageSp === 0}
                aria-label="前へ"
                className="size-6 inline-flex items-center justify-center text-dark-green disabled:opacity-50"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPagesSp }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`スライド${i + 1}`}
                    onClick={() => scrollToCardIdx(i)}
                    className={`size-1 rounded-full transition-colors ${i === activePageSp ? 'bg-dark-green' : 'bg-dark-green/30'}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => scrollToCardIdx(Math.min(totalPagesSp - 1, activePageSp + 1))}
                disabled={activePageSp >= totalPagesSp - 1}
                aria-label="次へ"
                className="size-6 inline-flex items-center justify-center text-dark-green disabled:opacity-50"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}
        <div className="mt-8">
          <SeeAllButtonSP href={href} />
        </div>
      </div>
    </div>
  );
}
