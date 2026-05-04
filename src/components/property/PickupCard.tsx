'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';

interface Props {
  property: Property;
}

export default function PickupCard({ property }: Props) {
  const isSold = property.status === 'sold';
  const allImages = [property.mainImage, ...(property.images || [])].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <Link
      data-mobile-filter-start
      href={`/properties/${property.id}`}
      // Figma 4211:10721: section bg-light-green px-16 py-32 を Link 単体で再現
      className="block bg-light-green rounded-2xl tablet:rounded-[32px] py-8 px-4 tablet:p-[30px] group"
    >
      {/* SP: 縦積み image → thumbs → details / PC: 横並び image | details(thumbs下) */}
      <div className="flex flex-col tablet:flex-row tablet:gap-[60px] tablet:items-stretch">
        {/* メイン画像 */}
        <div className="tablet:w-[646px] tablet:shrink-0">
          <div className="aspect-[294/220] tablet:aspect-[646/485] relative overflow-hidden rounded-2xl tablet:rounded-[24px]">
            {allImages.map((img, i) => (
              <Image
                key={i}
                src={getImageUrl(img, { width: 646, format: 'webp' })}
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
              className="absolute inset-0 z-10 pointer-events-none rounded-2xl tablet:rounded-[24px]"
              style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0) 73.635%, rgba(0,0,0,0.2) 92.755%)' }}
            />
            {/* SP: ラベルを画像内 top に overlay（中古住宅 + 地域 / 商談中 right）
                Figma 4211:10798 通り 地域テキストは dark-green（軽量 gradient overlay 上で可読） */}
            <div className="tablet:hidden absolute inset-x-0 top-0 z-20 p-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="tag-pill text-[14px] leading-none px-3 py-1.5 shrink-0">
                  {categoryLabel}
                </span>
                {locationText && (
                  <span className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green truncate">
                    {locationText}
                  </span>
                )}
              </div>
              {isSold && (
                <span className="inline-flex items-center bg-dark-green text-white font-gothic font-medium text-[14px] leading-none rounded-full px-3 py-1.5 shrink-0">
                  商談中
                </span>
              )}
            </div>
            {/* PC: 商談中バッジは右上に単独 */}
            {isSold && (
              <span className="hidden tablet:inline-flex absolute top-4 right-4 z-20 items-center bg-dark-green text-white font-gothic font-medium text-[14px] leading-none rounded-full px-3 py-1.5">
                商談中
              </span>
            )}
          </div>

          {/* SP: thumbs（画像の下） */}
          {allImages.length > 1 && (
            <div className="tablet:hidden flex items-center gap-2 pt-4 pb-6">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`画像 ${i + 1} を表示`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(i);
                  }}
                  className={`relative shrink-0 w-[52px] h-[52px] rounded-lg overflow-hidden transition-opacity duration-200 ${i === activeIndex ? 'opacity-100' : 'opacity-15 hover:opacity-50'}`}
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
              {isSold && (
                <span className="inline-flex items-center bg-dark-green text-white font-gothic font-medium text-[14px] leading-none rounded-full px-3 py-1.5">
                  商談中
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

            {/* タイトル */}
            <div className="py-[24px] tablet:py-[30px] px-2 tablet:px-0">
              <h3
                className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tablet:leading-[1.5] tracking-[0.04em] text-black"
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
                    <span className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
                      {property.type === 'rent' ? '賃料' : '価格'}
                    </span>
                  </div>
                  <div className="flex items-end justify-center">
                    <span className="font-gothic font-medium text-[20px] tablet:text-[24px] leading-[1.6] text-black px-1">
                      {isSold
                        ? '-'
                        : property.price
                          ? property.price.toLocaleString()
                          : property.rent
                            ? property.rent.toLocaleString()
                            : '応談'}
                    </span>
                    <span className="font-gothic font-medium text-[14px] leading-[1.5] text-black pb-1 w-7">
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
                      <span className="font-gothic font-medium text-[20px] tablet:text-[24px] leading-[1.6] text-black">
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
                <span className="inline-flex items-center justify-center h-[44px] px-6 border border-dark-green rounded-full font-gothic font-medium text-[16px] leading-none text-dark-green transition-opacity hover:opacity-70">
                  物件詳細
                </span>
              </div>
            )}

            {/* Station / Construction */}
            <div className="flex items-center flex-wrap">
              {property.nearestStation && (
                <span className="font-gothic font-medium text-[16px] leading-[2] text-black px-2">
                  {property.nearestStation}
                </span>
              )}
              {property.constructionDate && (
                <span className="font-gothic font-medium text-[16px] leading-[2] text-black px-2">
                  築{property.constructionDate}
                </span>
              )}
            </div>

            {/* PC: 物件詳細ボタン */}
            {!isSold && (
              <div className="hidden tablet:block mt-10">
                <span className="inline-flex items-center justify-center h-[44px] px-6 border border-dark-green rounded-full font-gothic font-medium text-[16px] leading-none text-dark-green transition-opacity hover:opacity-70">
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
