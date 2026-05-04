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

const PER_PAGE_PC = 3;

/**
 * 「もっと物件を見る」セクション。Figma 4211:10277 のスライドショーナビ準拠。
 * - PC: 3 件ずつページ単位で表示し、ドット + 矢印 + すべて見る を justify-between
 * - SP: 横スクロールのスナップカルーセル + 中央寄せドット + 全幅すべて見るボタン
 */
export default function MoreProperties({ properties, href = '/properties' }: Props) {
  const [activePage, setActivePage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(properties.length / PER_PAGE_PC));
  const pageProperties = properties.slice(activePage * PER_PAGE_PC, (activePage + 1) * PER_PAGE_PC);

  if (!properties.length) return null;

  return (
    <div>
      {/* PC: 3 列グリッド（現ページ） */}
      <div className="hidden tablet:grid grid-cols-3 gap-[30px]">
        {pageProperties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>

      {/* SP: 横スクロール（全件） */}
      <div
        className="tablet:hidden overflow-x-auto pl-4 pb-4 snap-x snap-mandatory scroll-smooth scroll-pl-4"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex gap-5 min-w-max pr-4">
          {properties.map((p) => (
            <div key={p.id} className="w-[332px] shrink-0 snap-start">
              <PropertyCard property={p} />
            </div>
          ))}
        </div>
      </div>

      {/* PC ナビ: ドット + 矢印（左） + すべて見る（右） */}
      {totalPages > 1 ? (
        <div className="hidden tablet:flex items-center justify-between mt-16">
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
              {Array.from({ length: totalPages }).map((_, i) => (
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
        <div className="hidden tablet:flex items-center justify-end mt-16">
          <SeeAllLink href={href} />
        </div>
      )}

      {/* SP ナビ: 中央ドット + 全幅すべて見る */}
      <div className="tablet:hidden mt-6 px-4">
        <div className="flex items-center justify-center pb-4">
          <div className="flex items-center gap-2">
            {properties.map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`size-1 rounded-full ${i === 0 ? 'bg-dark-green' : 'bg-dark-green/30'}`}
              />
            ))}
          </div>
        </div>
        <SeeAllButtonSP href={href} />
      </div>
    </div>
  );
}
