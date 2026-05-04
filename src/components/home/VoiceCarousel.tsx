'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CustomerVoice } from '@/types/microcms';
import SeeAllLink from '@/components/ui/SeeAllLink';

interface Props {
  voices: CustomerVoice[];
}

const PAGE_SIZE = 3;

export default function VoiceCarousel({ voices }: Props) {
  const [activePage, setActivePage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(voices.length / PAGE_SIZE));
  const pageVoices = voices.slice(activePage * PAGE_SIZE, (activePage + 1) * PAGE_SIZE);

  const handlePrev = () => setActivePage((p) => Math.max(0, p - 1));
  const handleNext = () => setActivePage((p) => Math.min(totalPages - 1, p + 1));

  if (!voices.length) return null;

  return (
    <div className="max-w-[1440px] mx-auto">
      {/* PC: 3列グリッド */}
      <div className="hidden tablet:grid grid-cols-3 gap-3 px-[75px]">
        {pageVoices.map((voice) => (
          <VoiceCard key={voice.id} voice={voice} variant="pc" />
        ))}
      </div>

      {/* SP: 当該ページ3件を横スクロール（3件以下なら通常表示） */}
      <div
        className="tablet:hidden overflow-x-auto pl-4 pb-4 snap-x snap-mandatory scroll-smooth scroll-pl-4"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex gap-2 min-w-max pr-4">
          {pageVoices.map((voice) => (
            <div key={voice.id} className="w-[322px] shrink-0 snap-start">
              <VoiceCard voice={voice} variant="sp" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation: PC */}
      <div className="hidden tablet:flex items-center justify-between mt-16 px-[75px]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activePage === 0}
            aria-label="前へ"
            className="w-6 h-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
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
                onClick={() => setActivePage(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === activePage ? 'bg-dark-green' : 'bg-dark-green/30'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={activePage >= totalPages - 1}
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

      {/* Navigation: SP（中央寄せのドット + 下に全幅すべて見る） */}
      <div className="tablet:hidden mt-6 px-4">
        <div className="flex items-center justify-center gap-[58px] pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activePage === 0}
              aria-label="前へ"
              className="size-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
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
                  onClick={() => setActivePage(i)}
                  className={`size-1 rounded-full transition-colors ${i === activePage ? 'bg-dark-green' : 'bg-dark-green/30'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={activePage >= totalPages - 1}
              aria-label="次へ"
              className="size-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <Link
          href="/voice"
          className="flex items-center justify-center w-full h-12 rounded-full bg-accent-blue font-gothic font-medium text-base text-white hover:opacity-80 transition-opacity"
        >
          すべて見る
        </Link>
      </div>
    </div>
  );
}

function VoiceCard({ voice, variant }: { voice: CustomerVoice; variant: 'pc' | 'sp' }) {
  return (
    <div
      className={
        variant === 'pc'
          ? 'bg-cream rounded-3xl px-[58px] pt-12 pb-14 h-full'
          : 'bg-cream rounded-xl px-[29px] pt-[30px] pb-12 h-full'
      }
    >
      <div className={variant === 'pc' ? 'flex flex-col gap-4' : 'flex flex-col gap-2'}>
        <Image
          src="/images/mock/quote-mark-blue.svg"
          alt=""
          width={variant === 'pc' ? 32 : 16}
          height={variant === 'pc' ? 24 : 12}
          className={variant === 'pc' ? 'w-8 h-6' : 'w-4 h-3'}
        />
        <h3
          className={
            variant === 'pc'
              ? 'font-mincho text-[32px] leading-[1.5] tracking-[1.28px] text-dark-green line-clamp-2'
              : 'font-mincho text-[18px] leading-[1.6] tracking-[0.72px] text-dark-green line-clamp-2'
          }
          style={{ fontFeatureSettings: "'palt' 1" }}
        >
          {voice.title || voice.customerName}
        </h3>
        <p
          className={
            variant === 'pc'
              ? 'text-body-m font-gothic font-medium text-black line-clamp-3'
              : 'text-body-m font-gothic font-medium text-black line-clamp-4'
          }
        >
          {voice.content.replace(/<[^>]*>/g, '')}
        </p>
      </div>
      <div
        className={
          variant === 'pc'
            ? 'flex items-center gap-3 mt-12 text-body-m font-gothic font-medium text-dark-green'
            : 'flex items-start gap-[6px] mt-6 text-body-s font-gothic font-medium text-dark-green leading-[1.8] flex-wrap'
        }
      >
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
