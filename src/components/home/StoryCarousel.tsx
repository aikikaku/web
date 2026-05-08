'use client';

import { useRef, useState, useEffect } from 'react';
import { Story } from '@/types/microcms';
import StoryCardOverlay from '@/components/story/StoryCardOverlay';
import SlideshowNav from '@/components/ui/SlideshowNav';

interface Props {
  stories: Story[];
  href?: string;
  /** dark = 背景 dark-green の上で使う場合 (cream の dot/矢印) */
  variant?: 'light' | 'dark';
}

export default function StoryCarousel({ stories, href = '/stories', variant = 'light' }: Props) {
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

      {/* Navigation-Slideshow (Figma 4211:11501 共通) */}
      <div className="mt-8 px-4">
        <SlideshowNav
          activePage={activeIndex}
          totalPages={stories.length}
          onPageChange={scrollTo}
          href={href}
          variant={variant}
        />
      </div>
    </div>
  );
}
