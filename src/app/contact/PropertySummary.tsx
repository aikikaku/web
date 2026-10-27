import Link from 'next/link';
import CmsImage from '@/components/common/CmsImage';
import { getPropertyStatus, getPropertyCategoryLabel, formatPropertyPrice } from '@/lib/propertyDisplay';
import { getPriceLabel } from '@/components/property/propertyCells';
import type { Property } from '@/types/microcms';

/**
 * 物件お問い合わせの左カラムに出し続ける物件カード。
 * 一覧の CardProperty だとノート PC の高さに収まらず上がヘッダーに隠れるので、問い合わせに要る情報だけに絞る。
 */
export default function PropertySummary({ property }: { property: Property }) {
  const { isSold } = getPropertyStatus(property);
  const { amount, unit } = formatPropertyPrice(property, isSold);
  const regions = property.regions?.map((r) => r.name).join('・');

  return (
    <div className="bg-light-green rounded-[2rem] p-6 flex flex-col gap-4">
      <p className="font-gothic font-medium text-body-s text-dark-green/70">お問い合わせの物件</p>
      <Link href={`/properties/${property.id}`} className="flex tablet:flex-col gap-4 hover:opacity-70 transition-opacity">
        <div className="relative w-28 tablet:w-full shrink-0 aspect-[4/3] rounded-xl overflow-hidden">
          <CmsImage image={property.mainImage} alt={property.title} fill className="object-cover" sizes="(max-width: 992px) 112px, 360px" />
        </div>
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag">{getPropertyCategoryLabel(property)}</span>
            {regions && <span className="font-gothic font-medium text-body-s text-dark-green">{regions}</span>}
          </div>
          <p className="font-mincho text-[1.125rem] tablet:text-[1.25rem] leading-[1.6] text-black" style={{ fontFeatureSettings: "'palt' 1" }}>
            {property.title}
          </p>
        </div>
      </Link>
      <dl className="flex flex-col border-t border-dark-green/20 font-gothic text-body-s text-dark-green">
        <div className="flex gap-4 py-2 border-b border-dark-green/20">
          <dt className="w-14 shrink-0 text-dark-green/70">{getPriceLabel(property)}</dt>
          <dd className="font-medium">
            {amount}
            {unit}
          </dd>
        </div>
        {property.location && (
          <div className="flex gap-4 py-2 border-b border-dark-green/20">
            <dt className="w-14 shrink-0 text-dark-green/70">所在地</dt>
            <dd>{property.location}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
