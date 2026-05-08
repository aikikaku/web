'use client';

import { useEffect, useRef, useState } from 'react';
import SlideshowNav from '@/components/ui/SlideshowNav';

export interface ArticleItem {
  tag: string;
  title: string;
  date: string;
}

interface Props {
  articles: ArticleItem[];
  href?: string;
}

const PAGE_SIZE_PC = 3;
const PAGE_SIZE_SP = 1;

export default function ArticleCarousel({ articles, href = '/for-owner' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);
  const [activePagePc, setActivePagePc] = useState(0);
  const [activePageSp, setActivePageSp] = useState(0);

  const totalPagesPc = Math.max(1, Math.ceil(articles.length / PAGE_SIZE_PC));
  const totalPagesSp = Math.max(1, Math.ceil(articles.length / PAGE_SIZE_SP));

  useEffect(() => {
    const el = trackRef.current;
    const flex = flexRef.current;
    if (!el || !flex) return;
    const handleScroll = () => {
      const card = flex.children[0] as HTMLElement | undefined;
      if (!card) return;
      const cardWidth = card.getBoundingClientRect().width;
      const gap = 30;
      const idx = Math.max(0, Math.round(el.scrollLeft / (cardWidth + gap)));
      setActivePagePc(Math.min(totalPagesPc - 1, Math.floor(idx / PAGE_SIZE_PC)));
      setActivePageSp(Math.min(totalPagesSp - 1, idx));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [articles.length, totalPagesPc, totalPagesSp]);

  const scrollToCardIdx = (cardIdx: number) => {
    const el = trackRef.current;
    const flex = flexRef.current;
    if (!el || !flex) return;
    const card = flex.children[cardIdx] as HTMLElement | undefined;
    if (!card) return;
    const delta = card.getBoundingClientRect().left - el.getBoundingClientRect().left;
    el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' });
  };

  if (!articles.length) return null;

  return (
    <div>
      <div
        ref={trackRef}
        className="overflow-x-auto pl-4 tablet:pl-0 pb-4 scroll-smooth snap-x snap-mandatory scroll-pl-4 tablet:scroll-pl-0"
        style={{ scrollbarWidth: 'none' }}
      >
        <div ref={flexRef} className="flex gap-5 tablet:gap-[30px] min-w-max pr-4 tablet:pr-0">
          {articles.map((article, i) => (
            <div key={i} className="w-[332px] tablet:w-[410px] shrink-0 snap-start flex flex-col">
              <div className="relative aspect-[410/293] rounded-lg overflow-hidden mb-0">
                <div className="absolute inset-0 bg-dark-green/10" />
                <span className="absolute top-4 left-4 tag-pill text-[14px] leading-none px-3 py-1.5">
                  {article.tag}
                </span>
              </div>
              <div className="px-3">
                <div className="py-6">
                  <h3
                    className="font-mincho text-[20px] tablet:text-[24px] leading-[1.6] tracking-[0.96px] text-black"
                    style={{ fontFeatureSettings: "'palt' 1" }}
                  >
                    {article.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between gap-2.5">
                  <span className="font-gothic font-medium text-[16px] leading-[2] text-dark-green">
                    {article.date}
                  </span>
                  <span className="inline-flex items-center justify-center min-w-[176px] h-11 px-6 border border-dark-green rounded-full font-gothic font-medium text-[16px] leading-none text-dark-green">
                    記事を読む
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 tablet:mt-16 px-4 tablet:px-0">
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
