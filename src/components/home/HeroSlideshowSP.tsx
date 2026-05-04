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
        {/* 次へアイコン: Figma 4211:10605 で Subtract path は (334, 318)/24x24 配置 = component frame (358×354) の右端ぴったり / bottom-12px。
            ボタンの bounding box そのものを 24x24 にして absolute right-0 bottom-3 で Figma 通りに配置。shadow は CSS drop-shadow で表現（SVG filter の 56x56 padding が不要に）*/}
        <button
          type="button"
          onClick={goNext}
          aria-label="次のスライド"
          className="absolute right-0 bottom-3 size-6 inline-flex items-center justify-center active:scale-95 transition-transform"
          style={{ filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.16))' }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-full">
            <path
              d="M12 0C18.6274 0 24 5.3726 24 12C24 18.6274 18.6274 24 12 24C5.3726 24 0 18.6274 0 12C0 5.3726 5.3726 0 12 0ZM10.0215 7.7109C9.6882 7.5185 9.2716 7.7587 9.2715 8.1436V15.8594C9.2716 16.2442 9.6882 16.4844 10.0215 16.292L16.7031 12.4346C17.0365 12.2421 17.0365 11.7608 16.7031 11.5684L10.0215 7.7109Z"
              fill="#FCFFF7"
              fillOpacity="0.5"
            />
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
