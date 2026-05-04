'use client';

import { useRef, useState, useEffect } from 'react';
import { Story } from '@/types/microcms';
import StoryCardOverlay from '@/components/story/StoryCardOverlay';
import SeeAllButtonSP from '@/components/ui/SeeAllButtonSP';

interface Props {
  stories: Story[];
  href?: string;
}

export default function StoryCarousel({ stories, href = '/stories' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    const flex = flexRef.current;
    if (!el || !flex) return;
    const handleScroll = () => {
      const cardWidth = (flex.children[0] as HTMLElement | undefined)?.getBoundingClientRect().width || 1;
      const gap = 16;
      const idx = Math.round(el.scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(idx, stories.length - 1));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [stories.length]);

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    const flex = flexRef.current;
    if (!el || !flex) return;
    const card = flex.children[index] as HTMLElement | undefined;
    if (!card) return;
    const delta = card.getBoundingClientRect().left - el.getBoundingClientRect().left;
    el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' });
  };

  if (!stories.length) return null;

  return (
    <div className="tablet:hidden">
      <div
        ref={trackRef}
        className="overflow-x-auto pl-4 pb-4 snap-x snap-mandatory scroll-smooth scroll-pl-4"
        style={{ scrollbarWidth: 'none' }}
      >
        <div ref={flexRef} className="flex gap-5 min-w-max pr-4">
          {stories.map((story) => (
            <div key={story.id} className="w-[332px] shrink-0 snap-start">
              <StoryCardOverlay story={story} />
            </div>
          ))}
        </div>
      </div>

      {/* SP Navigation: Figma 4211:10695 (gap-58 内部 / pb-16 nav) + section gap-32 で button へ */}
      <div className="mt-8 px-4">
        <div className="flex items-center justify-center gap-[58px] pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="前へ"
              className="size-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-50"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`スライド${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={`size-1 rounded-full transition-colors ${i === activeIndex ? 'bg-dark-green' : 'bg-dark-green/30'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollTo(Math.min(stories.length - 1, activeIndex + 1))}
              disabled={activeIndex >= stories.length - 1}
              aria-label="次へ"
              className="size-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-50"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-8">
          <SeeAllButtonSP href={href} />
        </div>
      </div>
    </div>
  );
}
