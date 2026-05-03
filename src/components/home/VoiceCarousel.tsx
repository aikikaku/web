'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { CustomerVoice } from '@/types/microcms';
import SeeAllLink from '@/components/ui/SeeAllLink';

interface Props {
  voices: CustomerVoice[];
}

export default function VoiceCarousel({ voices }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.children[0]?.getBoundingClientRect().width || 1;
      const gap = 12;
      const idx = Math.round(el.scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(idx, voices.length - 1));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [voices.length]);

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' });
  };

  const handlePrev = () => scrollTo(Math.max(0, activeIndex - 1));
  const handleNext = () => scrollTo(Math.min(voices.length - 1, activeIndex + 1));

  if (!voices.length) return null;

  return (
    <div>
      <div
        ref={trackRef}
        className="overflow-x-auto pl-4 tablet:pl-[75px] pb-4 scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex gap-3 min-w-max pr-4 tablet:pr-[75px]">
          {voices.map((voice) => (
            <div key={voice.id} className="w-[320px] tablet:w-[644px] shrink-0 snap-start">
              <div className="bg-cream rounded-3xl px-6 tablet:px-[58px] pt-8 tablet:pt-12 pb-10 tablet:pb-14 h-full">
                <div className="flex flex-col gap-4">
                  <Image
                    src="/images/mock/quote-mark-blue.svg"
                    alt=""
                    width={32}
                    height={24}
                    className="w-8 h-6"
                  />
                  <h3
                    className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.96px] tablet:tracking-[1.28px] text-dark-green line-clamp-2"
                    style={{ fontFeatureSettings: "'palt' 1" }}
                  >
                    {voice.title || voice.customerName}
                  </h3>
                  <p className="text-body-s tablet:text-body-m font-gothic font-medium text-black line-clamp-3">
                    {voice.content.replace(/<[^>]*>/g, '')}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-8 tablet:mt-12 text-body-m font-gothic font-medium text-dark-green">
                  <div className="flex items-center">
                    {voice.location && <span className="opacity-60">{voice.location}</span>}
                    {voice.location && voice.propertyType && (
                      <span className="leading-[1.4]">｜</span>
                    )}
                    {voice.propertyType && <span className="opacity-60">{voice.propertyType}</span>}
                  </div>
                  <span className="opacity-60">{voice.customerName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 tablet:mt-16 px-4 tablet:px-[75px] max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="前へ"
            className="w-6 h-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            {voices.slice(0, Math.min(voices.length, 8)).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`スライド${i + 1}`}
                onClick={() => scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? 'bg-dark-green' : 'bg-dark-green/30'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex >= voices.length - 1}
            aria-label="次へ"
            className="w-6 h-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <SeeAllLink href="/voice" />
      </div>
    </div>
  );
}
