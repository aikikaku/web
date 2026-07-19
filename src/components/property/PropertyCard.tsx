import Link from 'next/link';
import { Property } from '@/types/microcms';
import CmsImage from '@/components/ui/CmsImage';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const isSold = property.status === 'sold';
  const isNegotiating = property.status === 'negotiating';
  // 状態ラベル: 成約済み or 商談中（案内中は非表示）(#35)
  const statusLabel = isSold ? '成約済み' : isNegotiating ? '商談中' : null;
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
    <Link href={`/properties/${property.id}`} className="block group w-full hover:opacity-70 transition-opacity">
      {/* Tags above image — PC のみ。SP では画像内オーバーレイ */}
      <div className="hidden tablet:flex gap-3 items-center pb-3">
        <span className="tag-pill">
          {categoryLabel}
        </span>
        {locationText && (
          <span className="font-gothic font-medium text-[1rem] leading-none text-dark-green">
            {locationText}
          </span>
        )}
      </div>

      {/* Image - SP: rounded-[1rem] aspect-[294/220] にラベル overlay
          Figma 4211:10721 / 10725 準拠: sold 時は重いザブトン overlay 不要、商談中ピルのみで状態表示 */}
      <div className="relative aspect-[294/220] tablet:aspect-auto tablet:h-[18.3125rem] w-full rounded-2xl tablet:rounded-lg overflow-hidden">
        <CmsImage
          image={property.mainImage}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 992px) 100vw, 410px"
        />
        {/* SP: 画像内に上下グラデ + ラベル */}
        <div
          className="tablet:hidden absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0) 73.6%, rgba(0,0,0,0.2) 92.7%)' }}
        />
        <div className="tablet:hidden absolute inset-x-0 top-0 p-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="tag-pill shrink-0">{categoryLabel}</span>
            {locationText && (
              <span className="font-gothic font-medium text-body-m text-cream truncate">
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
        {/* PC: 画像右上に状態ラベル */}
        {statusLabel && (
          <span className="hidden tablet:inline-flex absolute top-3 right-3 items-center bg-dark-green text-white font-gothic font-medium text-[0.875rem] leading-none rounded-full px-3 py-1.5">
            {statusLabel}
          </span>
        )}
      </div>

      {/* Details — SP: 外側 px なし / PC: 既存通り px-3 */}
      <div className="tablet:px-3">
        {/* Title — SP: px-2 py-6 / PC: py-6 */}
        <div className="px-2 py-6 tablet:px-0">
          <h3
            className="font-mincho text-heading-18 tablet:text-heading-24 text-black"
            style={{ fontFeatureSettings: "'palt' 1" }}
          >
            {property.title}
          </h3>
        </div>

        {/* Price / Layout — borders are full-width on SP。layout が無い場合は border-r を出さず単独セルに */}
        <div className="pb-3">
          <div className="flex border-t border-b border-dark-green/20">
            <div className={`flex-1 ${property.layout ? 'border-r border-dark-green/20' : ''} p-2`}>
              <div>
                <span className="font-gothic font-medium text-body-s text-dark-green">
                  {property.type === 'rent' ? '賃料' : '価格'}
                </span>
              </div>
              <div className="flex items-end justify-center h-[2.375rem]">
                <span className="font-gothic font-medium text-category-2 tablet:text-category-1 text-black px-2">
                  {isSold
                    ? '-'
                    : property.price
                      ? property.price.toLocaleString()
                      : property.rent
                        ? property.rent.toLocaleString()
                        : '応談'}
                </span>
                <span className="font-gothic font-medium text-body-s text-black pb-1 whitespace-nowrap">
                  {isSold ? '万円' : property.price ? '万円' : property.rent ? '円/月' : ''}
                </span>
              </div>
            </div>
            {property.layout && (
              <div className="flex-1 p-2">
                <div>
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

        {/* SP: Station/Construction（左・縦並び）+ Arrow（右） */}
        <div className="tablet:hidden flex items-center justify-between pb-2 pt-2">
          <div className="flex flex-col flex-1 min-w-0 pr-2">
            {property.nearestStation && (
              <span className="font-gothic font-medium text-body-m text-black truncate">
                {property.nearestStation}
              </span>
            )}
            {property.constructionDate && (
              <span className="font-gothic font-medium text-body-m text-black truncate">
                築{property.constructionDate}
              </span>
            )}
          </div>
          <span className="flex items-center justify-center w-[2.75rem] h-[2.75rem] border border-dark-green rounded-full shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>

        {/* SP: ストーリーを読む — PC の第2ボタンと同じ内容をフル幅で表示（PC では非表示のため欠落していた） */}
        {isSold && property.story && (
          <div className="tablet:hidden pb-2">
            <span className="flex items-center justify-center gap-1 w-full h-[2.75rem] btn-outline-fill text-[1rem] leading-none">
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

        {/* PC: Station/Construction */}
        <div className="hidden tablet:flex items-center pb-6">
          <div className="flex flex-row items-center">
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
