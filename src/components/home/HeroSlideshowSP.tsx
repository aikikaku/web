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
  const flexRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    const flex = flexRef.current;
    if (!el || !flex) return;
    const handleScroll = () => {
      const slideWidth = (flex.children[0] as HTMLElement | undefined)?.getBoundingClientRect().width || 1;
      const idx = Math.round(el.scrollLeft / slideWidth);
      setActiveIndex(Math.min(idx, slides.length - 1));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    const el = trackRef.current;
    const flex = flexRef.current;
    if (!el || !flex) return;
    const target = flex.children[index] as HTMLElement | undefined;
    if (!target) return;
    const delta = target.getBoundingClientRect().left - el.getBoundingClientRect().left;
    el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' });
  };

  const goNext = () => scrollToSlide((activeIndex + 1) % slides.length);
  const goTo = (index: number) => scrollToSlide(index);

  return (
    <div className="flex flex-col gap-[10px] tablet:hidden">
      <div className="relative">
        <div
          ref={trackRef}
          className="overflow-x-auto snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          <div ref={flexRef} className="flex">
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
        {/* 次へアイコン: Figma 4211:10610 imgSubtract をそのまま転記。
            cream(#FCFFF7) で塗った circle に play 三角を切り抜いた Subtract path、opacity 50%、drop shadow blur 16 */}
        <button
          type="button"
          onClick={goNext}
          aria-label="次のスライド"
          className="absolute right-4 bottom-4 size-14 inline-flex items-center justify-center active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 56 56" fill="none" className="size-full">
            <g opacity="0.5" filter="url(#hero-next-shadow)">
              <path
                d="M28 16C34.6274 16 40 21.3726 40 28C40 34.6274 34.6274 40 28 40C21.3726 40 16 34.6274 16 28C16 21.3726 21.3726 16 28 16ZM26.0215 23.7109C25.6882 23.5185 25.2716 23.7587 25.2715 24.1436V31.8594C25.2716 32.2442 25.6882 32.4844 26.0215 32.292L32.7031 28.4346C33.0365 28.2421 33.0365 27.7608 32.7031 27.5684L26.0215 23.7109Z"
                fill="#FCFFF7"
              />
            </g>
            <defs>
              <filter id="hero-next-shadow" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset />
                <feGaussianBlur stdDeviation="8" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_4" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_4" result="shape" />
              </filter>
            </defs>
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
