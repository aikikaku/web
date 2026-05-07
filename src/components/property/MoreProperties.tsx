'use client';

import { useEffect, useRef, useState } from 'react';
import { Property } from '@/types/microcms';
import PropertyCard from '@/components/property/PropertyCard';
import SlideshowNav from '@/components/ui/SlideshowNav';

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

      {/* Navigation-Slideshow (Figma 4211:11501 共通コンポーネント) */}
      <div className="mt-8 tablet:mt-16">
        <SlideshowNav
          activePage={activePagePc}
          totalPages={totalPagesPc}
          onPageChange={(p) => scrollToCardIdx(p * PAGE_SIZE_PC)}
          spActivePage={activePageSp}
          spTotalPages={totalPagesSp}
          onSpPageChange={(p) => scrollToCardIdx(p)}
          href={href}
        />
      </div>
    </div>
  );
}
