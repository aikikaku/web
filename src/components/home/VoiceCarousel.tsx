'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CustomerVoice } from '@/types/microcms';
import SlideshowNav from '@/components/ui/content/SlideshowNav';

interface Props {
  voices: CustomerVoice[];
}

// #69/gkzW5eIRYKBs「カード1枚ずつ送る」: 1 ページ = カード 1 枚
// (PropertyCarousel と同じ 1 枚送りモデル)。dot はカード枚数分。
const PAGE_SIZE = 1;

/**
 * お客様の声カルーセル。Figma 4211:10009 (PC) / 4211:9317 (SP) 準拠。
 * - 1枚送り: dot/矢印クリックで voices[page] を track 左端に smooth scroll。
 * - dot はカード枚数分。新着順、初期 activePage=0。
 * - PC/SP どちらも全件レンダリング + 横スクロール peek (PC card w-644 / SP w-322)。
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

  if (!voices.length) return null;

  return (
    <div className="max-w-[90rem] mx-auto">
      {/* PC/SP 共通: 全件レンダリング + 横スクロール peek。Figma 4211:10009 (PC w-644 h-350 peek 横並び) / 4211:10704 (SP w-322 peek)
          dot 切替で voices[page*3] を track 左端に smooth scroll → 「pagination で 4 件目から表示」が成立。 */}
      <div
        ref={trackRef}
        className="overflow-x-auto pl-4 tablet:pl-[4.6875rem] pb-4 scroll-smooth snap-x snap-mandatory scroll-pl-4 tablet:scroll-pl-[4.6875rem]"
        style={{ scrollbarWidth: 'none' }}
      >
        <div ref={flexRef} className="flex gap-3 min-w-max pr-4 tablet:pr-[4.6875rem]">
          {voices.map((voice) => (
            <div key={voice.id} className="w-[20.125rem] tablet:w-[40.25rem] shrink-0 snap-start">
              <VoiceCard voice={voice} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation-Slideshow (Figma 4211:11501 共通) */}
      <div className="hidden tablet:block mt-16 px-[4.6875rem]">
        <SlideshowNav activePage={activePage} totalPages={totalPages} onPageChange={goToPage} href="/voice" />
      </div>
      <div className="tablet:hidden mt-8 px-4">
        <SlideshowNav activePage={activePage} totalPages={totalPages} onPageChange={goToPage} href="/voice" />
      </div>
    </div>
  );
}

function VoiceCard({ voice }: { voice: CustomerVoice }) {
  return (
    <div className="bg-cream rounded-xl tablet:rounded-3xl px-[1.8125rem] tablet:px-[3.625rem] pt-[1.875rem] tablet:pt-12 pb-12 tablet:pb-14 h-full">
      <div className="flex flex-col gap-2 tablet:gap-4">
        <Image
          src="/images/mock/quote-mark-blue.svg"
          alt=""
          width={32}
          height={24}
          className="w-4 h-3 tablet:w-8 tablet:h-6"
        />
        <h3
          className="font-mincho text-heading-18 tablet:text-heading-32 text-dark-green"
          style={{ fontFeatureSettings: "'palt' 1" }}
        >
          {voice.title || voice.customerName}
        </h3>
        <p className="text-body-m font-gothic font-medium text-black">
          {voice.content.replace(/<[^>]*>/g, '')}
        </p>
      </div>
      <div className="flex items-start gap-[0.375rem] tablet:gap-3 mt-6 tablet:mt-12 text-body-s tablet:text-body-m font-gothic font-medium text-dark-green flex-wrap">
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
