'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CustomerVoice } from '@/types/microcms';
import SeeAllLink from '@/components/ui/SeeAllLink';
import SeeAllButtonSP from '@/components/ui/SeeAllButtonSP';

interface Props {
  voices: CustomerVoice[];
}

const PAGE_SIZE = 3;

/**
 * お客様の声カルーセル。Figma 4211:10009 (PC) / 4211:9317 (SP) 準拠。
 * - 共通: pagination dot は Math.ceil(voices / 3) 個。新着順、初期 activePage=0。
 * - PC/SP どちらも全件レンダリング + 横スクロール peek (PC card w-644 h-350 / SP w-322)。
 * - dot/矢印クリックで voices[page*3] を track 左端に smooth scroll → ページ2 で 4 件目 〜 が表示される。
 */
export default function VoiceCarousel({ voices }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(voices.length / PAGE_SIZE));

  useEffect(() => {
    const el = trackRef.current;
    const flex = flexRef.current;
    if (!el || !flex) return;
    const handleScroll = () => {
      const card = flex.children[0] as HTMLElement | undefined;
      if (!card) return;
      const cardWidth = card.getBoundingClientRect().width;
      const gap = 12;
      const cardIdx = Math.max(0, Math.round(el.scrollLeft / (cardWidth + gap)));
      const page = Math.min(totalPages - 1, Math.floor(cardIdx / PAGE_SIZE));
      setActivePage(page);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [voices.length, totalPages]);

  const goToPage = (page: number) => {
    setActivePage(page);
    // SP: 該当ページ先頭のカードを track 左端に smooth scroll
    const el = trackRef.current;
    const flex = flexRef.current;
    if (!el || !flex) return;
    const card = flex.children[page * PAGE_SIZE] as HTMLElement | undefined;
    if (!card) return;
    const delta = card.getBoundingClientRect().left - el.getBoundingClientRect().left;
    el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' });
  };

  const handlePrev = () => goToPage(Math.max(0, activePage - 1));
  const handleNext = () => goToPage(Math.min(totalPages - 1, activePage + 1));

  if (!voices.length) return null;

  return (
    <div className="max-w-[1440px] mx-auto">
      {/* PC/SP 共通: 全件レンダリング + 横スクロール peek。Figma 4211:10009 (PC w-644 h-350 peek 横並び) / 4211:10704 (SP w-322 peek)
          dot 切替で voices[page*3] を track 左端に smooth scroll → 「pagination で 4 件目から表示」が成立。 */}
      <div
        ref={trackRef}
        className="overflow-x-auto pl-4 tablet:pl-[75px] pb-4 scroll-smooth snap-x snap-mandatory scroll-pl-4 tablet:scroll-pl-[75px]"
        style={{ scrollbarWidth: 'none' }}
      >
        <div ref={flexRef} className="flex gap-3 min-w-max pr-4 tablet:pr-[75px]">
          {voices.map((voice) => (
            <div key={voice.id} className="w-[322px] tablet:w-[644px] shrink-0 snap-start">
              <VoiceCard voice={voice} />
            </div>
          ))}
        </div>
      </div>

      {/* PC ナビ: 矢印 + dots（左） + すべて見る（右） */}
      <div className="hidden tablet:flex items-center justify-between mt-16 px-[75px]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activePage === 0}
            aria-label="前へ"
            className="size-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`ページ${i + 1}`}
                onClick={() => goToPage(i)}
                className={`size-2 rounded-full transition-colors ${i === activePage ? 'bg-dark-green' : 'bg-dark-green/30'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={activePage >= totalPages - 1}
            aria-label="次へ"
            className="size-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <SeeAllLink href="/voice" />
      </div>

      {/* SP ナビ: 中央 dots(gap-58 内に矢印+dots) + 全幅すべて見る (Figma 4211:10704: section gap-32) */}
      <div className="tablet:hidden mt-8 px-4">
        <div className="flex items-center justify-center gap-[58px] pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activePage === 0}
              aria-label="前へ"
              className="size-6 inline-flex items-center justify-center text-dark-green disabled:opacity-50"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`ページ${i + 1}`}
                  onClick={() => goToPage(i)}
                  className={`size-1 rounded-full transition-colors ${i === activePage ? 'bg-dark-green' : 'bg-dark-green/30'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={activePage >= totalPages - 1}
              aria-label="次へ"
              className="size-6 inline-flex items-center justify-center text-dark-green disabled:opacity-50"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-8">
          <SeeAllButtonSP href="/voice" />
        </div>
      </div>
    </div>
  );
}

function VoiceCard({ voice }: { voice: CustomerVoice }) {
  return (
    <div className="bg-cream rounded-xl tablet:rounded-3xl px-[29px] tablet:px-[58px] pt-[30px] tablet:pt-12 pb-12 tablet:pb-14 h-full">
      <div className="flex flex-col gap-2 tablet:gap-4">
        <Image
          src="/images/mock/quote-mark-blue.svg"
          alt=""
          width={32}
          height={24}
          className="w-4 h-3 tablet:w-8 tablet:h-6"
        />
        <h3
          className="font-mincho text-[18px] tablet:text-[32px] leading-[1.6] tablet:leading-[1.5] tracking-[0.72px] tablet:tracking-[1.28px] text-dark-green line-clamp-2"
          style={{ fontFeatureSettings: "'palt' 1" }}
        >
          {voice.title || voice.customerName}
        </h3>
        <p className="text-body-m font-gothic font-medium text-black line-clamp-3 tablet:line-clamp-3">
          {voice.content.replace(/<[^>]*>/g, '')}
        </p>
      </div>
      <div className="flex items-start gap-[6px] tablet:gap-3 mt-6 tablet:mt-12 text-body-s tablet:text-body-m font-gothic font-medium text-dark-green leading-[1.8] tablet:leading-[2] flex-wrap">
        <div className="flex items-center">
          {voice.location && <span className="opacity-60">{voice.location}</span>}
          {voice.location && voice.propertyType && <span className="leading-[1.4]">｜</span>}
          {voice.propertyType && <span className="opacity-60">{voice.propertyType}</span>}
        </div>
        <span className="opacity-60">{voice.customerName}</span>
      </div>
    </div>
  );
}
