import Link from 'next/link';
import { Property } from '@/types/microcms';
import CmsImage from '@/components/common/CmsImage';
import { BookIcon } from '@/components/ui/icons/icons';
import { getPropertyStatus, getPropertyCategoryLabel, formatPropertyPrice } from '@/lib/propertyDisplay';
import { getPriceLabel, getPropertyLayoutCell } from '@/components/property/propertyCells';

interface CardPropertyProps {
  property: Property;
}

export default function CardProperty({ property }: CardPropertyProps) {
  const { isSold, label: statusLabel } = getPropertyStatus(property);
  const categoryLabel = getPropertyCategoryLabel(property);
  const locationText = property.regions?.map((r) => r.name).join('・');
  const { amount: priceAmount, unit: priceUnit } = formatPropertyPrice(property, isSold);
  const layoutCell = getPropertyLayoutCell(property);

  return (
    <Link href={`/properties/${property.id}`} className="block group w-full hover:opacity-70 transition-opacity">
      {/* Tags above image — PC のみ。SP では画像内オーバーレイ */}
      <div className="hidden tablet:flex gap-3 items-center pb-3">
        <span className="tag">
          {categoryLabel}
        </span>
        {locationText && (
          <span className="font-gothic font-medium text-[1rem] leading-none text-dark-green">
            {locationText}
          </span>
        )}
      </div>

      {/* Image - SP: rounded-[1rem] aspect-[294/220] にラベル overlay
          Figma 4211:11989 準拠: sold 時は画像全体に dark-green 50% の暗転オーバーレイ */}
      <div className="relative aspect-[294/220] tablet:aspect-auto tablet:h-[18.3125rem] w-full rounded-2xl tablet:rounded-lg overflow-hidden">
        <CmsImage
          image={property.mainImage}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 992px) 100vw, 410px"
        />
        {isSold && (
          <div className="absolute inset-0 bg-dark-green/50 pointer-events-none" aria-hidden="true" />
        )}
        {/* SP: 画像内に上下グラデ + ラベル */}
        <div
          className="tablet:hidden absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0) 73.6%, rgba(0,0,0,0.2) 92.7%)' }}
        />
        <div className="tablet:hidden absolute inset-x-0 top-0 p-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="tag shrink-0">{categoryLabel}</span>
            {locationText && (
              <span className="font-gothic font-medium text-body-m text-cream truncate">
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
        {/* PC: 画像右上に状態ラベル */}
        {statusLabel && (
          <span className="tag-dark hidden tablet:inline-flex absolute top-3 right-3">
            {statusLabel}
          </span>
        )}
      </div>

      {/* Details — SP: 外側 px なし / PC: 既存通り px-3 */}
      <div className="tablet:px-3">
        {/* Title — SP: px-2 py-6 / PC: py-6。文字色 SP black / PC dark-green (Figma 4470:14852 / 4470:14454) */}
        <div className="px-2 py-6 tablet:px-0">
          <h3
            className="font-mincho text-heading-18 tablet:text-heading-24 text-black tablet:text-dark-green"
            style={{ fontFeatureSettings: "'palt' 1" }}
          >
            {property.title}
          </h3>
        </div>

        {/* Price / Layout — borders are full-width on SP。右セル(間取り/広さ)が無い場合は border-r を出さず単独セルに。
            セル自体に左右余白なし・ラベルのみ pl-8 (Figma 4470:14454 / 4470:14852)。数値色 SP black / PC dark-green */}
        <div className="pb-3">
          <div className="flex border-t border-b border-dark-green/20">
            <div className={`flex-1 ${layoutCell ? 'border-r border-dark-green/20' : ''} pt-2 pb-4`}>
              <div className="pl-2">
                <span className="font-gothic font-medium text-body-s text-dark-green">
                  {getPriceLabel(property)}
                </span>
              </div>
              {/* 数値行の高さ: SP 32 (20px×1.6, Figma I4470:14852;4646:28875) / PC 38 (24px×1.6) */}
              <div className="flex items-end justify-center h-8 tablet:h-[2.375rem]">
                <span className="font-gothic font-medium text-category-2 tablet:text-category-1 text-black tablet:text-dark-green px-2">
                  {priceAmount}
                </span>
                <span className="font-gothic font-medium text-body-s text-black tablet:text-dark-green pb-1 whitespace-nowrap">
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
                  <span className="font-gothic font-medium text-category-2 tablet:text-category-1 text-black tablet:text-dark-green">
                    {layoutCell.value}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SP: Station/Construction（左・縦並び、各行 px-8）+ Arrow（右）。価格欄 pb-12 の直後・下 8 (Figma 4470:14852) */}
        <div className="tablet:hidden flex items-center justify-between pb-2">
          <div className="flex flex-col flex-1 min-w-0 pr-2">
            {property.nearestStation && (
              <span className="font-gothic font-medium text-body-m text-black truncate px-2">
                {property.nearestStation}
              </span>
            )}
            {property.constructionDate && (
              <span className="font-gothic font-medium text-body-m text-black truncate px-2">
                築{property.constructionDate}
              </span>
            )}
          </div>
          {/* 矢印は右端から 8px 内側 (Figma I4470:14852;4646:28893: x250 幅108 内の x56 → 右余白 8) */}
          <span className="flex items-center justify-center w-[2.75rem] h-[2.75rem] mr-2 border border-dark-green rounded-full shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>

        {/* SP: ストーリーを読む — PC の第2ボタンと同じ内容をフル幅で表示（PC では非表示のため欠落していた） */}
        {isSold && property.story && (
          <div className="tablet:hidden pb-2">
            <span className="flex items-center justify-center gap-1 w-full h-[2.75rem] btn-outline-fill text-[1rem] leading-none">
              <BookIcon />
              ストーリーを読む
            </span>
          </div>
        )}

        {/* PC: Station/Construction（dark-green, Figma 4470:14454） */}
        <div className="hidden tablet:flex items-center pb-6">
          <div className="flex flex-row items-center">
            {property.nearestStation && (
              <span className="font-gothic font-medium text-body-m text-dark-green px-2">
                {property.nearestStation}
              </span>
            )}
            {property.constructionDate && (
              <span className="font-gothic font-medium text-body-m text-dark-green px-2">
                築{property.constructionDate}
              </span>
            )}
          </div>
        </div>

        {/* PC Buttons */}
        <div className="hidden tablet:flex items-center gap-2.5">
          <div className={`flex items-center w-full ${isSold && property.story ? 'justify-between' : 'gap-2.5'}`}>
            <div className={`h-[2.75rem] ${isSold && property.story ? 'w-[11.6875rem]' : 'flex-1 min-w-[11rem]'}`}>
              <span className="flex items-center justify-center w-full h-full btn-outline-fill text-[1rem] leading-none">
                物件詳細
              </span>
            </div>
            {isSold && property.story && (
              <div className="h-[2.75rem] w-[11.6875rem]">
                <span className="flex items-center justify-center gap-1 w-full h-full btn-outline-fill text-[1rem] leading-none">
                  <BookIcon />
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
