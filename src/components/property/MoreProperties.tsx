'use client';

import { useState } from 'react';
import { Property } from '@/types/microcms';
import PropertyCard from '@/components/property/PropertyCard';
import SeeAllLink from '@/components/ui/SeeAllLink';
import SeeAllButtonSP from '@/components/ui/SeeAllButtonSP';

interface Props {
  properties: Property[];
  href?: string;
}

const PER_PAGE = 6;

/**
 * 「もっと物件を見る」セクション。Figma 4211:10269 (PC) / 4211:10881, 4211:10794 (SP) 準拠。
 * - PER_PAGE = 6: page1 で 1-6 件目、矢印/dot で次ページ → 7-12 件目…
 * - PC: 3 cols × 2 rows のグリッド + dot/矢印 + すべて見る (justify-between)
 * - SP: 縦積み 6 件 + 中央ドット + 全幅すべて見る
 * - 親の getProperties は同 category & type で random shuffle 済みを渡す前提。
 */
export default function MoreProperties({ properties, href = '/properties' }: Props) {
  const [activePage, setActivePage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(properties.length / PER_PAGE));
  const pageProperties = properties.slice(activePage * PER_PAGE, (activePage + 1) * PER_PAGE);

  if (!properties.length) return null;

  const dots = Array.from({ length: totalPages });

  return (
    <div>
      {/* PC: 3 cols × 2 rows */}
      <div className="hidden tablet:grid grid-cols-3 gap-x-[30px] gap-y-[96px]">
        {pageProperties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>

      {/* SP: 縦積み */}
      <div className="tablet:hidden flex flex-col gap-[60px]">
        {pageProperties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>

      {/* PC ナビ: ドット + 矢印（左） + すべて見る（右） */}
      {totalPages > 1 ? (
        <div className="hidden tablet:flex items-center justify-between mt-24">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActivePage((p) => Math.max(0, p - 1))}
              disabled={activePage === 0}
              aria-label="前へ"
              className="size-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-20"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {dots.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`ページ${i + 1}`}
                  onClick={() => setActivePage(i)}
                  className={`size-2 rounded-full transition-colors ${i === activePage ? 'bg-dark-green' : 'bg-dark-green/30'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActivePage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={activePage >= totalPages - 1}
              aria-label="次へ"
              className="size-6 inline-flex items-center justify-center text-dark-green hover:opacity-70 transition-opacity disabled:opacity-20"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <SeeAllLink href={href} />
        </div>
      ) : (
        <div className="hidden tablet:flex items-center justify-end mt-24">
          <SeeAllLink href={href} />
        </div>
      )}

      {/* SP ナビ: 中央ドット + 全幅すべて見る */}
      <div className="tablet:hidden mt-8 px-4">
        <div className="flex items-center justify-center gap-[58px] pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActivePage((p) => Math.max(0, p - 1))}
              disabled={activePage === 0}
              aria-label="前へ"
              className="size-6 inline-flex items-center justify-center text-dark-green disabled:opacity-50"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {dots.map((_, i) => (
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
              onClick={() => setActivePage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={activePage >= totalPages - 1}
              aria-label="次へ"
              className="size-6 inline-flex items-center justify-center text-dark-green disabled:opacity-50"
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
