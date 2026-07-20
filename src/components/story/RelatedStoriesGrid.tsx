'use client';

import { useEffect, useRef, useState } from 'react';
import { Story } from '@/types/microcms';
import StoryCard from '@/components/story/StoryCard';
import SlideshowNav from '@/components/ui/content/SlideshowNav';

interface Props {
  stories: Story[];
}

/**
 * ストーリー詳細「もっとストーリーを見る」のカードグリッド。
 * PC: 3列グリッド(スクロール無し)。SP: 横スクロール+ドットページャー
 * (Figma Navigation-Slideshow SP 4211:12124。以前は横スクロールのみでページャー未実装だった)。
 */
export default function RelatedStoriesGrid({ stories }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handleScroll = () => {
      const card = el.children[0] as HTMLElement | undefined;
      const cardWidth = card?.getBoundingClientRect().width || 1;
      const gap = 16; // max-tablet:gap-x-4 = 1rem = 16px
      const idx = Math.round(el.scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(Math.max(idx, 0), stories.length - 1));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [stories.length]);

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (!card) return;
    const delta = card.getBoundingClientRect().left - el.getBoundingClientRect().left;
    el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' });
  };

  return (
    <>
      <div
        ref={trackRef}
        className="grid grid-cols-1 tablet:grid-cols-3 gap-y-12 gap-x-[1.875rem] max-tablet:flex max-tablet:overflow-x-auto max-tablet:pb-4 max-tablet:gap-x-4"
      >
        {stories.map((s) => (
          <div key={s.id} className="max-tablet:w-[18.75rem] max-tablet:shrink-0">
            <StoryCard story={s} size="l" />
          </div>
        ))}
      </div>
      <div className="tablet:hidden mt-8">
        <SlideshowNav activePage={activeIndex} totalPages={stories.length} onPageChange={scrollTo} />
      </div>
    </>
  );
}
