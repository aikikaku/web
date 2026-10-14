'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';
import CmsImage from '@/components/common/CmsImage';
import { BookIcon } from '@/components/ui/icons/icons';
import { getPropertyStatus, getPropertyCategoryLabel, formatPropertyPrice } from '@/lib/propertyDisplay';
import { getPriceLabel, getPropertyLayoutCell } from '@/components/property/propertyCells';
import LayoutValue from '@/components/property/LayoutValue';

interface Props {
  property: Property;
}

export default function PickupCard({ property }: Props) {
  const { isSold, label: statusLabel } = getPropertyStatus(property);
  const allImages = [property.mainImage, ...(property.images || [])].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

  const categoryLabel = getPropertyCategoryLabel(property);
  const locationText = property.regions?.map((r) => r.name).join('・');
  const { amount: priceAmount, unit: priceUnit } = formatPropertyPrice(property, isSold);
  const layoutCell = getPropertyLayoutCell(property);
  const detailHref = `/properties/${property.id}`;

  return (
    // カード全体はリンクにせず、写真・タイトル・ボタンだけをリンクにする（文字や写真の外ではポインターにならない）。
    // ボタンはボタン自体のホバーでだけ反転する
    <div
      data-mobile-filter-start
      // Figma 4211:10721: section bg-light-green px-16 py-32。
      // SP は Figma Handoff 4470:14849 通り緑背景を全幅 (角丸なし) にするため、親の px-4 を -mx-4 で打ち消す
      className="block bg-light-green paper-texture paper-texture-light -mx-4 tablet:mx-0 tablet:rounded-[2rem] py-8 px-4 tablet:p-[1.875rem]"
    >
      {/* SP: 縦積み image → thumbs → details / PC: 横並び image | details(thumbs下) */}
      <div className="flex flex-col tablet:flex-row tablet:gap-[3.75rem] tablet:items-stretch">
        {/* メイン画像 */}
        <div className="tablet:w-[40.375rem] tablet:shrink-0">
          <Link
            href={detailHref}
            aria-label={property.title}
            data-motion-fade
            className="block aspect-[294/220] tablet:aspect-[646/485] relative overflow-hidden rounded-2xl tablet:rounded-[1.5rem]"
          >
            {allImages.map((img, i) => (
              <CmsImage
                key={i}
                image={img}
                alt={property.title}
                fill
                className={`object-cover transition-opacity duration-300 ease-out ${i === activeIndex ? 'opacity-100' : 'opacity-0'}`}
                sizes="(min-width: 1440px) 44.86vw, (max-width: 992px) 100vw, 646px"
                priority={i === 0}
              />
            ))}
            {/* Figma card-story-xl-sp: 写真に Paper 40%（SP のみ） */}
            <div aria-hidden className="paper-overlay paper-overlay-sp" style={{ '--paper-opacity': 0.4 } as React.CSSProperties} />
            {/* Figma 4211:10721: 画像上端の暗グラデ（ラベル可読性のため）。to top: 73.6% transparent → 92.7% rgba(0,0,0,0.2)
                SP のみ（PC 4470:14410 は画像上にラベルが無くグラデも無し） */}
            <div
              aria-hidden
              className="tablet:hidden absolute inset-0 z-10 pointer-events-none rounded-2xl"
              style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0) 73.635%, rgba(0,0,0,0.2) 92.755%)' }}
            />
            {/* Figma 4211:12000: sold 時は斜めグラデーションの暗転オーバーレイを追加 */}
            {isSold && (
              <div
                aria-hidden
                className="absolute inset-0 z-10 pointer-events-none rounded-2xl tablet:rounded-[1.5rem]"
                style={{
                  backgroundImage:
                    'linear-gradient(194.36deg, rgba(39,51,59,0.5) 4%, rgba(39,51,59,0.25) 51.9%, rgba(39,51,59,0.5) 103.7%)',
                }}
              />
            )}
            {/* SP: ラベルを画像内 top に overlay（Figma 4211:10721）
                location は cream (白) text 16px leading-2、画像上端の暗グラデで可読化 */}
            <div className="tablet:hidden absolute inset-x-0 top-0 z-20 p-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="tag shrink-0">
                  {categoryLabel}
                </span>
                {locationText && (
                  <span className="font-gothic font-medium text-body-m text-cream truncate px-1">
                    {locationText}
                  </span>
                )}
              </div>
              {statusLabel && (
                <span className="tag-dark shrink-0">
                  {statusLabel}
                </span>
              )}
            </div>
          </Link>

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
        {/* SP: thumbs(pb-24) の直後にタイトル（Figma 4470:14849）。thumbs が無い場合のみ画像との間に 16px */}
        <div className={`flex-1 flex flex-col justify-between min-w-0 ${allImages.length > 1 ? 'pt-0' : 'pt-4'} tablet:pt-0`}>
          <div className="flex flex-col tablet:pt-3">
            {/* Tags + Location: PC のみ（SP はラベルを画像内 overlay に表示）*/}
            <div className="hidden tablet:flex flex-wrap items-center gap-2">
              {statusLabel && (
                <span className="tag-dark">
                  {statusLabel}
                </span>
              )}
              <span className="tag">
                {categoryLabel}
              </span>
              {locationText && (
                <span className="font-gothic font-medium text-[1rem] leading-none text-dark-green">
                  {locationText}
                </span>
              )}
            </div>

            {/* タイトル: SP は上余白なし・下 24 / 行間 1.6 (Figma 4470:14849)、PC は上下 30 / 行間 1.5 */}
            <div className="pb-6 tablet:py-[1.875rem] px-2 tablet:px-0">
              <h3
                className="font-mincho text-[1.5rem] tablet:text-[2rem] leading-[1.6] tablet:leading-[1.5] tracking-[0.04em] text-black"
                style={{ fontFeatureSettings: "'palt' 1" }}
              >
                <Link href={detailHref} className="hover:opacity-70 transition-opacity">
                  {property.title}
                </Link>
              </h3>
            </div>

            {/* Price / Layout split — 余白なし、border full-width。罫線 dark-green 20% / 下余白 SP 24・PC 16 (Figma 4470:14410 / 14849) */}
            <div className="pb-6 tablet:pb-4">
              <div className="flex border-t border-b border-dark-green/20">
                <div className={`flex-1 ${layoutCell ? 'border-r border-dark-green/20' : ''} pt-2 pb-4`}>
                  <div className="pl-2">
                    <span className="font-gothic font-medium text-body-s text-dark-green">
                      {getPriceLabel(property)}
                    </span>
                  </div>
                  <div className="flex items-end justify-center">
                    <span className="font-gothic font-medium text-category-2 tablet:text-category-1 text-black px-1">
                      {priceAmount}
                    </span>
                    <span className="font-gothic font-medium text-[0.875rem] leading-[1.5] text-black pb-1 w-7">
                      {priceUnit}
                    </span>
                  </div>
                </div>
                {layoutCell && (
                  <div className="flex-1 pt-2 pb-4">
                    <div className="pl-2">
                      <span className="font-gothic font-medium text-body-s text-dark-green">
                        {layoutCell.label}
                      </span>
                    </div>
                    <div className="flex items-end justify-center">
                      <LayoutValue value={layoutCell.value} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SP: 物件詳細ボタン（station の前） */}
            {!isSold && (
              <div className="tablet:hidden pb-6">
                <Link href={detailHref} className="inline-flex items-center justify-center h-[2.75rem] px-6 btn-outline-hover text-[1rem] leading-none">
                  物件詳細
                </Link>
              </div>
            )}
            {/* SP: 成約済み+ストーリーありの場合は物件詳細+ストーリーを読むの2ボタン（CardProperty.tsxと同じパターン） */}
            {isSold && property.story && (
              <div className="tablet:hidden pb-6 flex items-center gap-2.5">
                <Link href={detailHref} className="flex-1 inline-flex items-center justify-center h-[2.75rem] px-6 btn-outline-hover text-[1rem] leading-none">
                  物件詳細
                </Link>
                <Link href={`/stories/${property.story!.id}`} className="flex-1 inline-flex items-center justify-center gap-1 h-[2.75rem] px-6 btn-outline-hover text-[1rem] leading-none">
                  <BookIcon />
                  ストーリーを読む
                </Link>
              </div>
            )}

            {/* Station / Construction: SP は縦積み (Figma 4470:14849)、PC は横並び */}
            <div className="flex flex-col items-start tablet:flex-row tablet:items-center tablet:flex-wrap">
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
                <Link href={detailHref} className="inline-flex items-center justify-center h-[2.75rem] px-6 btn-outline-hover text-[1rem] leading-none">
                  物件詳細
                </Link>
              </div>
            )}
            {/* PC: 成約済み+ストーリーありの場合は物件詳細+ストーリーを読むの2ボタン */}
            {isSold && property.story && (
              <div className="hidden tablet:flex items-center gap-2.5 mt-10">
                <Link href={detailHref} className="inline-flex items-center justify-center h-[2.75rem] px-6 btn-outline-hover text-[1rem] leading-none">
                  物件詳細
                </Link>
                <Link href={`/stories/${property.story!.id}`} className="inline-flex items-center justify-center gap-1 h-[2.75rem] px-6 btn-outline-hover text-[1rem] leading-none">
                  <BookIcon />
                  ストーリーを読む
                </Link>
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
    </div>
  );
}
