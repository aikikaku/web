'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const slides = [
  '/images/home/hero-1.jpg',
  '/images/home/hero-2.jpg',
  '/images/home/hero-3.jpg',
];

export default function HeroSlideshowSP() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handleScroll = () => {
      const slideWidth = el.children[0]?.getBoundingClientRect().width || 1;
      const idx = Math.round(el.scrollLeft / slideWidth);
      setActiveIndex(Math.min(idx, slides.length - 1));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const goNext = () => {
    const el = trackRef.current;
    if (!el) return;
    const next = (activeIndex + 1) % slides.length;
    const slideEl = el.children[next] as HTMLElement | undefined;
    if (!slideEl) return;
    el.scrollTo({ left: slideEl.offsetLeft, behavior: 'smooth' });
  };

  const goTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slideEl = el.children[index] as HTMLElement | undefined;
    if (!slideEl) return;
    el.scrollTo({ left: slideEl.offsetLeft, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-[10px] tablet:hidden">
      <div className="relative">
        <div
          ref={trackRef}
          className="overflow-x-auto snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex">
            {slides.map((src, i) => (
              <div
                key={i}
                className="relative h-[354px] w-full shrink-0 snap-start"
              >
                <div className="relative h-full w-full -mr-4 rounded-l-3xl overflow-hidden">
                  <Image
                    src={src}
                    alt={`三島の風景 ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    sizes="100vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 次へアイコン: 半透明白円＋三角プレイ風 */}
        <button
          type="button"
          onClick={goNext}
          aria-label="次のスライド"
          className="absolute right-3 bottom-3 size-9 inline-flex items-center justify-center rounded-full bg-white/30 backdrop-blur-[2px] shadow-[0_0_16px_rgba(0,0,0,0.16)] hover:bg-white/50 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 2.5L10 7L4 11.5V2.5Z" fill="white" />
          </svg>
        </button>
      </div>

      {/* dots */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`スライド${i + 1}`}
            onClick={() => goTo(i)}
            className={`size-1 rounded-full transition-colors ${i === activeIndex ? 'bg-dark-green' : 'bg-dark-green/30'}`}
          />
        ))}
      </div>
    </div>
  );
}
