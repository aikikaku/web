import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const isSold = property.status === 'sold';
  const categoryLabel =
    property.category === 'property'
      ? property.type === 'sell'
        ? '中古住宅'
        : '賃貸物件'
      : property.type === 'sell'
        ? '売土地'
        : '貸土地';
  const locationText = property.regions?.map((r) => r.name).join('・');

  return (
    <Link href={`/properties/${property.id}`} className="block group w-full">
      {/* Tags above image */}
      <div className="flex gap-3 items-center pb-3">
        {isSold && (
          <span className="tag-pill-dark text-[14px] leading-none px-3 py-1.5">
            成約済み
          </span>
        )}
        <span className="tag-pill text-[14px] leading-none px-3 py-1.5">
          {categoryLabel}
        </span>
        {locationText && (
          <span className="font-gothic font-medium text-[16px] leading-none text-dark-green">
            {locationText}
          </span>
        )}
      </div>

      {/* Image - rounded-2xl on SP, rounded-lg (8px) on tablet per Figma */}
      <div className="relative aspect-[294/220] tablet:aspect-auto tablet:h-[293px] w-full rounded-2xl tablet:rounded-lg overflow-hidden">
        <Image
          src={getImageUrl(property.mainImage, { width: 410, format: 'webp' })}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 992px) 100vw, 410px"
        />
        {isSold && (
          <div className="absolute inset-0 bg-[rgba(42,54,59,0.5)]" />
        )}
      </div>

      {/* Details */}
      <div className="px-3">
        {/* Title */}
        <div className="py-6">
          <h3
            className="font-mincho text-[18px] tablet:text-[24px] leading-[1.6] tracking-[0.04em] text-dark-green"
            style={{ fontFeatureSettings: "'palt' 1" }}
          >
            {property.title}
          </h3>
        </div>

        {/* Price / Layout */}
        <div className="pb-3">
          <div className="flex border-t border-b border-dark-green/20">
            <div className="flex-1 border-r border-dark-green/20 pt-2 pb-4">
              <div className="pl-2">
                <span className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
                  {property.type === 'rent' ? '賃料' : '価格'}
                </span>
              </div>
              <div className="flex items-end justify-center h-[38px]">
                <span className="font-gothic font-medium text-[20px] tablet:text-[24px] leading-[1.6] text-dark-green px-2">
                  {isSold
                    ? '-'
                    : property.price
                      ? property.price.toLocaleString()
                      : property.rent
                        ? property.rent.toLocaleString()
                        : '応談'}
                </span>
                <span className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green pb-1 w-7">
                  {isSold ? '万円' : property.price ? '万円' : property.rent ? '円/月' : ''}
                </span>
              </div>
            </div>
            {property.layout && (
              <div className="flex-1 pt-2 pb-4">
                <div className="pl-2">
                  <span className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
                    間取り
                  </span>
                </div>
                <div className="flex items-end justify-center">
                  <span className="font-gothic font-medium text-[20px] tablet:text-[24px] leading-[1.6] text-dark-green">
                    {property.layout}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Station / Construction */}
        <div className="flex items-center pb-6">
          <div className="flex flex-col tablet:flex-row tablet:items-center">
            {property.nearestStation && (
              <span className="font-gothic font-medium text-[16px] leading-[2] text-dark-green px-2">
                {property.nearestStation}
              </span>
            )}
            {property.constructionDate && (
              <span className="font-gothic font-medium text-[16px] leading-[2] text-dark-green px-2">
                築{property.constructionDate}
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Mobile: circle arrow */}
          <span className="tablet:hidden flex items-center justify-center w-[44px] h-[44px] border border-dark-green rounded-full shrink-0 ml-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>

          {/* Desktop buttons */}
          <div className={`hidden tablet:flex items-center w-full ${isSold && property.story ? 'justify-between' : 'gap-2.5'}`}>
            <div className={`h-[44px] ${isSold && property.story ? 'w-[187px]' : 'flex-1 min-w-[176px]'}`}>
              <span className="flex items-center justify-center w-full h-full border border-dark-green rounded-full font-gothic font-medium text-[16px] leading-none text-dark-green transition-colors hover:bg-gray-50">
                物件詳細
              </span>
            </div>
            {isSold && property.story && (
              <div className="h-[44px] w-[187px]">
                <span className="flex items-center justify-center gap-1 w-full h-full border border-dark-green rounded-full font-gothic font-medium text-[16px] leading-none text-dark-green transition-colors hover:bg-gray-50">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="shrink-0"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z" />
                  </svg>
                  ストーリーを読む
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
