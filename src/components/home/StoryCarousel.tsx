'use client';

import { useRef, useState, useEffect } from 'react';
import { Story } from '@/types/microcms';
import StoryCard from '@/components/story/StoryCard';
import SeeAllLink from '@/components/ui/SeeAllLink';

interface Props {
  stories: Story[];
  href?: string;
}

export default function StoryCarousel({ stories, href = '/stories' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = (el.children[0] as HTMLElement)?.getBoundingClientRect().width || 1;
      const gap = 16;
      const idx = Math.round(el.scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(idx, stories.length - 1));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [stories.length]);

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' });
  };

  if (!stories.length) return null;

  return (
    <div className="tablet:hidden">
      <div
        ref={trackRef}
        className="overflow-x-auto pl-4 pb-4 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex gap-4 min-w-max pr-4">
          {stories.map((story) => (
            <div key={story.id} className="w-[332px] shrink-0 snap-start">
              <StoryCard story={story} size="m" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 px-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            aria-label="前へ"
            className="w-6 h-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-20"
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
                className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? 'bg-dark-green' : 'bg-dark-green/30'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollTo(Math.min(stories.length - 1, activeIndex + 1))}
            disabled={activeIndex >= stories.length - 1}
            aria-label="次へ"
            className="w-6 h-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-20"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <SeeAllLink href={href} />
      </div>
    </div>
  );
}
