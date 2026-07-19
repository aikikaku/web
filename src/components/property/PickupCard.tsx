'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';
import CmsImage from '@/components/ui/CmsImage';

interface Props {
  property: Property;
}

export default function PickupCard({ property }: Props) {
  const isSold = property.status === 'sold';
  const statusLabel = isSold ? '成約済み' : property.status === 'negotiating' ? '商談中' : null;
  const allImages = [property.mainImage, ...(property.images || [])].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

  // ピルは CMS の label を優先。未設定なら category+type から算出 (#30)
  const categoryLabel =
    property.label ||
    (property.category === 'property'
      ? property.type === 'sell'
        ? '中古住宅'
        : '賃貸物件'
      : property.type === 'sell'
        ? '売土地'
        : '貸土地');
  const locationText = property.regions?.map((r) => r.name).join('・');

  return (
    <Link
      data-mobile-filter-start
      href={`/properties/${property.id}`}
      // Figma 4211:10721: section bg-light-green px-16 py-32 を Link 単体で再現
      className="block bg-light-green rounded-2xl tablet:rounded-[2rem] py-8 px-4 tablet:p-[1.875rem] group"
    >
      {/* SP: 縦積み image → thumbs → details / PC: 横並び image | details(thumbs下) */}
      <div className="flex flex-col tablet:flex-row tablet:gap-[3.75rem] tablet:items-stretch">
        {/* メイン画像 */}
        <div className="tablet:w-[40.375rem] tablet:shrink-0">
          <div className="aspect-[294/220] tablet:aspect-[646/485] relative overflow-hidden rounded-2xl tablet:rounded-[1.5rem]">
            {allImages.map((img, i) => (
              <CmsImage
                key={i}
                image={img}
                alt={property.title}
                fill
                className={`object-cover transition-opacity duration-300 ease-out ${i === activeIndex ? 'opacity-100' : 'opacity-0'}`}
                sizes="(max-width: 992px) 100vw, 646px"
                priority={i === 0}
              />
            ))}
            {/* Figma 4211:10721: 画像上端の暗グラデ（ラベル可読性のため）。to top: 73.6% transparent → 92.7% rgba(0,0,0,0.2) */}
            <div
              aria-hidden
              className="absolute inset-0 z-10 pointer-events-none rounded-2xl tablet:rounded-[1.5rem]"
              style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0) 73.635%, rgba(0,0,0,0.2) 92.755%)' }}
            />
            {/* SP: ラベルを画像内 top に overlay（Figma 4211:10721）
                location は cream (白) text 16px leading-2、画像上端の暗グラデで可読化 */}
            <div className="tablet:hidden absolute inset-x-0 top-0 z-20 p-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="tag-pill text-[0.875rem] leading-none px-3 py-1.5 shrink-0">
                  {categoryLabel}
                </span>
                {locationText && (
                  <span className="font-gothic font-medium text-body-m text-cream truncate px-1">
                    {locationText}
                  </span>
                )}
              </div>
              {statusLabel && (
                <span className="inline-flex items-center bg-dark-green text-white font-gothic font-medium text-[0.875rem] leading-none rounded-full px-3 py-1.5 shrink-0">
                  {statusLabel}
                </span>
              )}
            </div>
            {/* PC: 状態バッジは右上に単独 */}
            {statusLabel && (
              <span className="hidden tablet:inline-flex absolute top-4 right-4 z-20 items-center bg-dark-green text-white font-gothic font-medium text-[0.875rem] leading-none rounded-full px-3 py-1.5">
                {statusLabel}
              </span>
            )}
          </div>

          {/* SP: thumbs（画像の下）。flex-1 + aspect-square + max-w-[3.25rem] で親要素 (Link px-4 内側 326px) に収まるよう均等配分。 */}
          {allImages.length > 1 && (
            <div className="tablet:hidden flex items-center gap-2 pt-4 pb-6 w-full">
              {allImages.slice(0, 6).map((img, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`画像 ${i + 1} を表示`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(i);
                  }}
                  className={`relative flex-1 min-w-0 max-w-[3.25rem] aspect-square rounded-lg overflow-hidden transition-opacity duration-200 ${i === activeIndex ? 'opacity-100' : 'opacity-15 hover:opacity-50'}`}
                >
                  <Image
                    src={getImageUrl(img, { width: 120, height: 120, format: 'webp' })}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="52px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 右カラム: 詳細＋thumbs（PC 用） */}
        <div className="flex-1 flex flex-col justify-between min-w-0 pt-4 tablet:pt-0">
          <div className="flex flex-col tablet:pt-3">
            {/* Tags + Location: PC のみ（SP はラベルを画像内 overlay に表示）*/}
            <div className="hidden tablet:flex flex-wrap items-center gap-2">
              {statusLabel && (
                <span className="inline-flex items-center bg-dark-green text-white font-gothic font-medium text-[0.875rem] leading-none rounded-full px-3 py-1.5">
                  {statusLabel}
                </span>
              )}
              <span className="tag-pill text-[0.875rem] leading-none px-3 py-1.5">
                {categoryLabel}
              </span>
              {locationText && (
                <span className="font-gothic font-medium text-[1rem] leading-none text-dark-green">
                  {locationText}
                </span>
              )}
            </div>

            {/* タイトル */}
            <div className="py-[1.5rem] tablet:py-[1.875rem] px-2 tablet:px-0">
              <h3
                className="font-mincho text-[1.5rem] tablet:text-[2rem] leading-[1.5] tablet:leading-[1.5] tracking-[0.04em] text-black"
                style={{ fontFeatureSettings: "'palt' 1" }}
              >
                {property.title}
              </h3>
            </div>

            {/* Price / Layout split — 余白なし、border full-width */}
            <div className="pb-4">
              <div className="flex border-t border-b border-dark-green/20">
                <div className={`flex-1 ${property.layout ? 'border-r border-dark-green/20' : ''} pt-2 pb-4`}>
                  <div className="pl-2">
                    <span className="font-gothic font-medium text-body-s text-dark-green">
                      {property.type === 'rent' ? '賃料' : '価格'}
                    </span>
                  </div>
                  <div className="flex items-end justify-center">
                    <span className="font-gothic font-medium text-category-2 tablet:text-category-1 text-black px-1">
                      {isSold
                        ? '-'
                        : property.price
                          ? property.price.toLocaleString()
                          : property.rent
                            ? property.rent.toLocaleString()
                            : '応談'}
                    </span>
                    <span className="font-gothic font-medium text-[0.875rem] leading-[1.5] text-black pb-1 w-7">
                      {isSold ? '万円' : property.price ? '万円' : property.rent ? '円/月' : ''}
                    </span>
                  </div>
                </div>
                {property.layout && (
                  <div className="flex-1 pt-2 pb-4">
                    <div className="pl-2">
                      <span className="font-gothic font-medium text-body-s text-dark-green">
                        間取り
                      </span>
                    </div>
                    <div className="flex items-end justify-center">
                      <span className="font-gothic font-medium text-category-2 tablet:text-category-1 text-black">
                        {property.layout}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SP: 物件詳細ボタン（station の前） */}
            {!isSold && (
              <div className="tablet:hidden pb-6">
                <span className="inline-flex items-center justify-center h-[2.75rem] px-6 btn-outline-fill text-[1rem] leading-none">
                  物件詳細
                </span>
              </div>
            )}

            {/* Station / Construction */}
            <div className="flex items-center flex-wrap">
              {property.nearestStation && (
                <span className="font-gothic font-medium text-body-m text-black px-2">
                  {property.nearestStation}
                </span>
              )}
              {property.constructionDate && (
                <span className="font-gothic font-medium text-body-m text-black px-2">
                  築{property.constructionDate}
                </span>
              )}
            </div>

            {/* PC: 物件詳細ボタン */}
            {!isSold && (
              <div className="hidden tablet:block mt-10">
                <span className="inline-flex items-center justify-center h-[2.75rem] px-6 btn-outline-fill text-[1rem] leading-none">
                  物件詳細
                </span>
              </div>
            )}
          </div>

          {/* PC: thumbs（右カラム下端） */}
          {allImages.length > 1 && (
            <div className="hidden tablet:flex flex-wrap items-start gap-2 mt-8">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`画像 ${i + 1} を表示`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(i);
                  }}
                  className={`relative flex-1 min-w-0 aspect-square rounded-xl overflow-hidden transition-opacity duration-200 ${i === activeIndex ? 'opacity-100' : 'opacity-15 hover:opacity-60'}`}
                >
                  <Image
                    src={getImageUrl(img, { width: 160, height: 160, format: 'webp' })}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
