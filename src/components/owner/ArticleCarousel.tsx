'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import NavigationSlideshow from '@/components/ui/content/NavigationSlideshow';

export interface ArticleItem {
  tag: string;
  title: string;
  date: string;
  /** サムネイル。未指定時は枠のみ表示 */
  image?: string;
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
      {/* 下余白はナビ側の mt (SP 32 / PC 64, Figma 4470:16107 / 4470:15635) のみ */}
      <div
        ref={trackRef}
        className="overflow-x-auto pl-4 tablet:pl-0 scroll-smooth snap-x snap-mandatory scroll-pl-4 tablet:scroll-pl-0"
        style={{ scrollbarWidth: 'none' }}
      >
        <div ref={flexRef} className="flex gap-4 tablet:gap-[1.875rem] min-w-max pr-4 tablet:pr-0">
          {articles.map((article, i) => (
            <div key={i} className="w-[20.75rem] tablet:w-[25.625rem] shrink-0 snap-start flex flex-col">
              {/* Image: SP card-article-sp 4470:16105 (aspect 294/220, r16, tag inset 10) /
                  PC card-article 4211:9832 (410×293, r8, tag inset 16)。上部に dark グラデーション */}
              <div className="relative aspect-[294/220] tablet:aspect-[410/293] rounded-2xl tablet:rounded-lg overflow-hidden">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 1440px) 28.47vw, (max-width: 992px) 332px, 410px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-dark-green/10" />
                )}
                <div
                  className="absolute inset-0 tablet:hidden"
                  aria-hidden
                  style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0) 73.6%, rgba(0,0,0,0.2) 92.8%)' }}
                />
                <div
                  className="absolute inset-0 hidden tablet:block"
                  aria-hidden
                  style={{ backgroundImage: 'linear-gradient(to top, rgb(var(--overlay-dark) / 0) 69.5%, rgb(var(--overlay-dark) / 0.2) 88.4%)' }}
                />
                <span className="absolute top-2.5 left-2.5 tablet:top-4 tablet:left-4 tag">
                  {article.tag}
                </span>
              </div>
              <div className="tablet:px-3">
                {/* Title: SP px8 pt24 pb16 / 18px, PC py24 / 24px */}
                <div className="px-2 pt-6 pb-4 tablet:px-0 tablet:py-6">
                  <h3
                    className="font-mincho text-heading-18 tablet:text-heading-24 text-black"
                    style={{ fontFeatureSettings: "'palt' 1" }}
                  >
                    {article.title}
                  </h3>
                </div>
                {/* SP: 日付(opacity 60) + 円矢印 44 / PC: 日付 + 記事を読む(189×44) */}
                <div className="flex items-center justify-between gap-2.5 h-11 px-2 tablet:h-auto tablet:px-0">
                  <span className="font-gothic font-medium text-body-m text-dark-green opacity-60 tablet:opacity-100">
                    {article.date}
                  </span>
                  <span className="tablet:hidden inline-flex items-center justify-center size-11 border border-dark-green rounded-full shrink-0 text-dark-green" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="hidden tablet:inline-flex items-center justify-center w-[11.8125rem] h-11 px-6 border border-dark-green rounded-full font-gothic font-medium text-[1rem] leading-none text-dark-green">
                    記事を読む
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 tablet:mt-16 px-4 tablet:px-0">
        <NavigationSlideshow
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
