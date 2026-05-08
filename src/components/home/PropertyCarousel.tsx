'use client';

import { useRef, useState, useEffect } from 'react';
import { Property } from '@/types/microcms';
import PropertyCard from '@/components/property/PropertyCard';
import SlideshowNav from '@/components/ui/SlideshowNav';

interface Props {
  properties: Property[];
  href?: string;
}

export default function PropertyCarousel({ properties, href = '/properties' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    const flex = flexRef.current;
    if (!el || !flex) return;
    const handleScroll = () => {
      const cardWidth = (flex.children[0] as HTMLElement | undefined)?.getBoundingClientRect().width || 1;
      const gap = 20;
      const idx = Math.round(el.scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(idx, properties.length - 1));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [properties.length]);

  const scrollTo = (index: number) => {
    const el = trackRef.current;
    const flex = flexRef.current;
    if (!el || !flex) return;
    const card = flex.children[index] as HTMLElement | undefined;
    if (!card) return;
    const delta = card.getBoundingClientRect().left - el.getBoundingClientRect().left;
    el.scrollTo({ left: el.scrollLeft + delta, behavior: 'smooth' });
  };

  if (!properties.length) return null;

  return (
    <div className="tablet:hidden">
      <div
        ref={trackRef}
        className="overflow-x-auto pl-4 pb-4 snap-x snap-mandatory scroll-smooth scroll-pl-4"
        style={{ scrollbarWidth: 'none' }}
      >
        <div ref={flexRef} className="flex gap-5 min-w-max pr-4">
          {properties.map((property) => (
            <div key={property.id} className="w-[332px] shrink-0 snap-start">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation-Slideshow (Figma 4211:11501 共通) */}
      <div className="mt-8 px-4">
        <SlideshowNav
          activePage={activeIndex}
          totalPages={properties.length}
          onPageChange={scrollTo}
          href={href}
        />
      </div>
    </div>
  );
}
