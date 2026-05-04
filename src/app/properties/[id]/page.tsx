import { unstable_noStore as noStore } from 'next/cache';
import { getProperty, getProperties } from '@/lib/microcms/queries';
import Link from 'next/link';
import MoreProperties from '@/components/property/MoreProperties';
import MobileTocNav from '@/components/ui/MobileTocNav';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getImageUrl } from '@/lib/microcms/image';
import PropertyDetailClient from '@/components/property/PropertyDetailClient';
import RichText, { extractTocFromHtml } from '@/components/ui/RichText';
import TocNav from '@/components/ui/TocNav';

export const revalidate = 3600;

export async function generateStaticParams() {
  const data = await getProperties({ limit: 100, fields: 'id' });

  return data.contents.map((property) => ({
    id: property.id,
  }));
}

interface PropertyPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const property = await getProperty(params.id).catch(() => null);

  if (!property) {
    return { title: '物件が見つかりません' };
  }

  const description = [
    property.location,
    property.layout,
    property.price
      ? `${property.price.toLocaleString()}万円`
      : property.rent
        ? `${property.rent.toLocaleString()}円/月`
        : '',
  ]
    .filter(Boolean)
    .join(' ');

  return {
    title: property.title,
    description,
    openGraph: {
      title: property.title,
      description,
      images: [
        getImageUrl(property.mainImage, { width: 1200, height: 630, format: 'webp' }),
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description,
      images: [
        getImageUrl(property.mainImage, { width: 1200, height: 630, format: 'webp' }),
      ],
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  noStore();
  const property = await getProperty(params.id).catch(() => null);

  if (!property) {
    notFound();
  }

  const relatedProperties = await getProperties({
    limit: 9,
    filters: `id[not_equals]${property.id}`,
    orders: '-publishedAt',
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 9 }));

  const categoryLabel =
    property.category === 'property'
      ? property.type === 'sell'
        ? '中古住宅'
        : '賃貸物件'
      : property.type === 'sell'
        ? '売土地'
        : '貸土地';

  const locationText = property.regions?.map((r) => r.name).join('・') || property.location || '';

  const allImages = [property.mainImage, ...(property.images || [])];

  // 目次データ: descriptionのh5見出し + 「物件概要」を動的生成
  const tocFromContent = property.description
    ? extractTocFromHtml(property.description)
    : [];
  const tocItems = [...tocFromContent, '物件概要'];

  // 物件概要フィールド
  const detailFields: { label: string; value: string | undefined; hasTag?: boolean }[] = [
    { label: '所在地', value: property.location, hasTag: true },
    { label: '最寄駅', value: property.nearestStation },
    { label: '種別', value: categoryLabel },
    ...(property.landArea ? [{ label: '土地面積', value: `${property.landArea}㎡` }] : []),
    ...(property.buildingArea ? [{ label: '建物面積', value: `${property.buildingArea}㎡` }] : []),
    ...(property.layout ? [{ label: '間取り', value: property.layout }] : []),
    ...(property.constructionDate ? [{ label: '築年月', value: property.constructionDate }] : []),
    ...(property.schoolDistrict ? [{ label: '学区', value: property.schoolDistrict }] : []),
    ...(property.transactionType ? [{ label: '取引態様', value: property.transactionType }] : []),
    ...(property.remarks ? [{ label: '備考', value: property.remarks }] : []),
  ];

  // 価格フィールド（特別扱い）
  const isSold = property.status === 'sold';
  const priceValue = isSold
    ? '-'
    : property.price
      ? property.price.toLocaleString()
      : property.rent
        ? property.rent.toLocaleString()
        : null;
  const priceUnit = property.price ? '万円' : property.rent ? '円/月' : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description
      ? property.description.replace(/<[^>]*>/g, '').slice(0, 200)
      : property.title,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp'}/properties/${property.id}`,
    image: property.mainImage?.url,
    datePosted: property.publishedAt,
    ...(property.location && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: property.location,
        addressRegion: '静岡県',
        addressCountry: 'JP',
      },
    }),
    ...(property.price && {
      offers: {
        '@type': 'Offer',
        price: property.price * 10000,
        priceCurrency: 'JPY',
        availability:
          property.status === 'available'
            ? 'https://schema.org/InStock'
            : 'https://schema.org/SoldOut',
      },
    }),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '物件を探す',
        item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp'}/properties`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: property.title,
      },
    ],
  };

  return (
    <div className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* ヒーローセクション - カード型 */}
      <section className="px-4 tablet:px-[45px] pt-12 max-w-[1440px] mx-auto">
        <div className="bg-light-green rounded-[32px] p-4 tablet:p-[30px]">
          <div className="flex flex-col tablet:flex-row gap-6 tablet:gap-[60px]">
            {/* メイン画像 */}
            <div className="w-full tablet:w-[646px] shrink-0">
              <PropertyDetailClient
                allImages={allImages}
                title={property.title}
                isSold={isSold}
              />
            </div>

            {/* 物件概要 */}
            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-6 tablet:gap-10 pt-0 tablet:pt-3">
                {/* ラベル + 地域 */}
                <div>
                  <div className="flex gap-3 items-center">
                    {property.status === 'sold' && (
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

                  {/* タイトル */}
                  <div className="py-6 tablet:py-[30px]">
                    <h1
                      className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.04em] text-black"
                      style={{ fontFeatureSettings: "'palt' 1" }}
                    >
                      {property.title}
                    </h1>
                  </div>

                  {/* 価格 / 間取り */}
                  <div className="pb-4">
                    <div className="flex border-t border-b border-dark-green/20">
                      <div className="flex-1 border-r border-dark-green/20 pt-2 pb-4">
                        <div className="pl-2">
                          <span className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
                            価格
                          </span>
                        </div>
                        <div className="flex items-end justify-center">
                          <span className="font-gothic font-medium text-[24px] leading-[1.6] text-black px-1">
                            {priceValue || '応談'}
                          </span>
                          {priceUnit && (
                            <span className="font-gothic font-medium text-[14px] leading-[1.5] text-black pb-1">
                              {priceUnit}
                            </span>
                          )}
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
                            <span className="font-gothic font-medium text-[24px] leading-[1.6] text-black">
                              {property.layout}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 最寄駅 / 築年月 */}
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
                </div>

                {/* 物件詳細ボタン */}
                {!isSold && (
                  <div>
                    <span className="inline-flex items-center justify-center h-[44px] px-6 border border-dark-green rounded-full font-gothic font-medium text-[16px] leading-none text-dark-green">
                      物件詳細
                    </span>
                  </div>
                )}
              </div>

              {/* サムネイル一覧 (PCのみ) */}
              {allImages.length > 1 && (
                <div className="hidden tablet:flex gap-2 mt-6 w-full">
                  {allImages.slice(0, 6).map((image, index) => (
                    <div
                      key={index}
                      className={`relative flex-1 aspect-square rounded-xl overflow-hidden min-w-0 ${
                        index > 0 ? 'opacity-[0.15]' : ''
                      }`}
                    >
                      <Image
                        src={getImageUrl(image, { width: 200, height: 200, format: 'webp' })}
                        alt={`画像 ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SP用 floating TOC bar */}
      <MobileTocNav items={tocItems} />

      {/* メインコンテンツ - 2カラムレイアウト */}
      <section data-mobile-toc-start className="px-4 tablet:pl-[45px] tablet:pr-[75px] py-16 tablet:py-24 max-w-[1440px] mx-auto">
        <div className="flex flex-col tablet:flex-row gap-8 tablet:gap-0 tablet:justify-between">
          {/* 左サイドバー - 目次ナビ（PC のみ、SP では floating bar） */}
          <aside className="hidden tablet:block w-[323px] shrink-0">
            <div className="bg-light-green rounded-[32px] px-[30px] py-[45px] sticky top-[120px]">
              <TocNav items={tocItems} />
            </div>
          </aside>

          {/* 右メインコンテンツ */}
          <div className="w-full tablet:w-[733px]">
            {/* リッチテキスト（description） */}
            {property.description && (
              <div className="max-w-[768px] pt-6">
                <RichText content={property.description} />
              </div>
            )}

            {/* 物件概要テーブル */}
            <div className="py-24">
              <div className="border-b border-dark-green/20">
                {detailFields.map((field) =>
                  field.value ? (
                    <div
                      key={field.label}
                      className="flex gap-[30px] items-start py-6 border-t border-dark-green/20"
                    >
                      <p className="font-gothic font-medium text-[16px] tablet:text-[18px] leading-[1.8] text-dark-green w-[120px] tablet:w-[147px] shrink-0">
                        {field.label}
                      </p>
                      <div className="flex-1 flex items-center justify-between gap-3">
                        <p className="font-gothic font-medium text-[16px] tablet:text-[18px] leading-[1.8] text-black whitespace-pre-line">
                          {field.value}
                        </p>
                        {field.hasTag && (
                          <span className="tag-pill text-[14px] leading-none px-3 py-1.5 shrink-0">
                            MAP
                          </span>
                        )}
                      </div>
                    </div>
                  ) : null
                )}
                {/* 価格行 */}
                {priceValue && (
                  <div className="flex gap-[30px] items-center py-6 border-t border-dark-green/20">
                    <p className="font-gothic font-medium text-[16px] tablet:text-[18px] leading-[1.8] text-dark-green w-[120px] tablet:w-[147px] shrink-0">
                      価格
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="font-gothic font-medium text-[24px] leading-[1.6] text-black">
                        {priceValue}
                      </span>
                      <span className="font-gothic font-medium text-[18px] leading-[1.8] text-black">
                        {priceUnit}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* アクションカード */}
            {!isSold && (
              <div className="flex flex-col tablet:flex-row gap-3">
                <Link
                  href="/for-customer"
                  className="flex-1 bg-dark-green rounded-2xl p-[30px] h-[108px] flex items-center justify-between hover:opacity-90 transition-opacity"
                >
                  <p className="font-gothic font-medium text-[20px] leading-[1.6] text-white px-3">
                    物件資料
                  </p>
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/for-customer"
                  className="flex-1 bg-dark-green rounded-2xl p-[30px] h-[108px] flex items-center justify-between hover:opacity-90 transition-opacity"
                >
                  <p className="font-gothic font-medium text-[20px] leading-[1.6] text-white px-3">
                    お問い合わせ
                  </p>
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>
            )}

            {/* 継承者のストーリー */}
            {isSold && property.story && (
              <div className="mt-24">
                <div className="flex flex-col gap-4 mb-8">
                  <p
                    className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green"
                    style={{ fontFeatureSettings: "'palt' 1" }}
                  >
                    この物件を選んだ人の、
                    <br />
                    その後を尋ねました
                  </p>
                </div>
                <Link
                  href={`/stories/${property.story.id}`}
                  className="block group bg-light-green rounded-[32px] p-6 tablet:p-[30px]"
                >
                  <div className="flex flex-col tablet:flex-row gap-6">
                    <div className="tablet:w-[320px] shrink-0 relative aspect-[4/3] rounded-2xl overflow-hidden">
                      {property.story.thumbnail && (
                        <Image
                          src={getImageUrl(property.story.thumbnail, { width: 640, format: 'webp' })}
                          alt={property.story.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-center gap-3">
                      <div className="flex gap-2 items-center">
                        <span className="tag-pill text-[14px] leading-none px-3 py-1.5">
                          物件のつづき
                        </span>
                        {property.story.regions && property.story.regions.length > 0 && (
                          <span className="font-gothic font-medium text-[14px] leading-[1.4] text-dark-green">
                            {property.story.regions.map((r) => r.name).join('・')}
                          </span>
                        )}
                      </div>
                      <p
                        className="font-mincho text-[20px] tablet:text-[24px] leading-[1.6] tracking-[0.04em] text-dark-green"
                        style={{ fontFeatureSettings: "'palt' 1" }}
                      >
                        {property.story.title}
                      </p>
                      <span className="inline-flex items-center gap-2 font-gothic font-medium text-[16px] text-dark-green mt-2">
                        ストーリーを読む
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-blue shrink-0 group-hover:scale-110 transition-transform">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <div data-mobile-toc-end />
      {/* もっと物件を見る */}
      {relatedProperties.contents.length > 0 && (
        <section className="px-4 tablet:px-[75px] pt-[60px] pb-[60px] tablet:pt-24 tablet:pb-36 max-w-[1440px] mx-auto">
          <div className="max-w-[1280px]">
            <h2
              className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green mb-8 tablet:mb-16"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              もっと物件を見る
            </h2>
            <MoreProperties properties={relatedProperties.contents} />
          </div>
        </section>
      )}
    </div>
  );
}
