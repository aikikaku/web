import { unstable_noStore as noStore } from 'next/cache';
import { getProperty, getProperties } from '@/lib/microcms/queries';
import Link from 'next/link';
import MoreProperties from '@/components/property/MoreProperties';
import PageNavSp from '@/components/ui/navigation/PageNavSp';
import CmsImage from '@/components/common/CmsImage';
import CardLink from '@/components/ui/card/CardLink';
import { BookIcon } from '@/components/ui/icons/icons';
import CardStorySp from '@/components/ui/card/CardStorySp';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getImageUrl } from '@/lib/microcms/image';
import { getTypeformContactUrl } from '@/lib/typeform';
import type { MicroCMSImage } from '@/types/microcms';
import PropertyDetailClient from '@/components/property/PropertyDetailClient';
import RichText, { extractTocFromHtml } from '@/components/ui/post/RichText';
import TocNav from '@/components/ui/navigation/TocNav';
import ListItemDeco from '@/components/ui/content/ListItemDeco';
import ListItemDef from '@/components/ui/content/ListItemDef';

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

  // 同じ category & type の物件を多めに取得 → サーバー側でシャッフル → 最大 6 件で MoreProperties へ。
  // noStore() なのでアクセスごとに新しい順序になる。
  const relatedRaw = await getProperties({
    limit: 100,
    filters: `id[not_equals]${property.id}[and]category[contains]${property.category}[and]type[contains]${property.type}`,
    orders: '-publishedAt',
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 100 }));
  const shuffledRelated = [...relatedRaw.contents].sort(() => Math.random() - 0.5).slice(0, 6);
  const relatedProperties = { ...relatedRaw, contents: shuffledRelated };

  // ピル/種別は CMS の label を優先（例:「売工場兼住宅」）。未設定なら category+type から算出 (#30)
  const categoryLabel =
    property.label ||
    (property.category === 'property'
      ? property.type === 'sell'
        ? '中古住宅'
        : '賃貸物件'
      : property.type === 'sell'
        ? '売土地'
        : '貸土地');

  const locationText = property.regions?.map((r) => r.name).join('・') || property.location || '';

  const allImages = [property.mainImage, ...(property.images || [])].filter(
    Boolean
  ) as MicroCMSImage[];

  // 目次データ: descriptionのh5見出し + 「物件概要」を動的生成
  const tocFromContent = property.description
    ? extractTocFromHtml(property.description)
    : [];
  const tocItems = [...tocFromContent, '物件概要'];

  const isSold = property.status === 'sold';
  // 状態ラベル: 成約済み or 商談中（案内中は非表示）(#35)
  const statusLabel = isSold ? '成約済み' : property.status === 'negotiating' ? '商談中' : null;

  // お問い合わせ: Typeform フォームが設定されていれば物件情報付きでそこへ、無ければ /for-customer (#63)
  const typeformContactUrl = getTypeformContactUrl({
    id: property.id,
    title: property.title,
  });

  // 物件概要フィールド。成約時は所在地・土地面積・建物面積を非表示 (#31/#32)
  const detailFields: { label: string; value: string | undefined; hasTag?: boolean }[] = [
    ...(!isSold ? [{ label: '所在地', value: property.location, hasTag: true }] : []),
    { label: '最寄駅', value: property.nearestStation },
    { label: '種別', value: categoryLabel },
    ...(!isSold && property.landArea ? [{ label: '土地面積', value: `${property.landArea}㎡` }] : []),
    ...(!isSold && property.buildingArea ? [{ label: '建物面積', value: `${property.buildingArea}㎡` }] : []),
    ...(property.layout ? [{ label: '間取り', value: property.layout }] : []),
    ...(property.constructionDate ? [{ label: '築年月', value: property.constructionDate }] : []),
    ...(property.schoolDistrict ? [{ label: '学区', value: property.schoolDistrict }] : []),
    ...(property.transactionType ? [{ label: '取引態様', value: property.transactionType }] : []),
    ...(property.remarks ? [{ label: '備考', value: property.remarks }] : []),
  ];

  // 価格フィールド（特別扱い）
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
      <section className="px-4 tablet:px-[2.8125rem] pt-12 max-w-[90rem] mx-auto">
        <div className="bg-light-green rounded-[2rem] p-4 tablet:p-[1.875rem]">
          <PropertyDetailClient
            allImages={allImages}
            title={property.title}
            isSold={isSold}
            spLabelsSlot={(
              <div className="flex items-center gap-2 min-w-0">
                <span className="tag shrink-0">
                  {categoryLabel}
                </span>
                {locationText && (
                  <span className="font-gothic font-medium text-body-s text-dark-green truncate">
                    {locationText}
                  </span>
                )}
              </div>
            )}
            detailsSlot={(
              <div className="flex flex-col gap-6 tablet:gap-10 pt-4 tablet:pt-3 min-w-0">
                {/* ラベル + 地域 (PC のみ。SP は spLabelsSlot で画像 overlay) */}
                <div>
                  <div className="hidden tablet:flex gap-3 items-center">
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

                  {/* タイトル */}
                  <div className="py-6 tablet:py-[1.875rem]">
                    <h1
                      className="font-mincho text-[1.5rem] tablet:text-[2rem] leading-[1.5] tracking-[0.04em] text-black"
                      style={{ fontFeatureSettings: "'palt' 1" }}
                    >
                      {property.title}
                    </h1>
                  </div>

                  {/* 価格 / 間取り */}
                  <div className="pb-4">
                    <div className="flex border-t border-b border-dark-green/10">
                      <div className="flex-1 border-r border-dark-green/10 pt-2 pb-4">
                        <div className="pl-2">
                          <span className="font-gothic font-medium text-body-s text-dark-green">
                            価格
                          </span>
                        </div>
                        <div className="flex items-end justify-center">
                          <span className="font-gothic font-medium text-category-1 text-black px-1">
                            {priceValue || '応談'}
                          </span>
                          {priceUnit && (
                            <span className="font-gothic font-medium text-[0.875rem] leading-[1.5] text-black pb-1">
                              {priceUnit}
                            </span>
                          )}
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
                            <span className="font-gothic font-medium text-category-1 text-black">
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

                {/* 物件詳細ボタン: 詳細セクションへの anchor scroll */}
                {!isSold && (
                  <div>
                    <a
                      href="#property-detail-body"
                      className="inline-flex items-center justify-center h-[2.75rem] px-6 border border-dark-green rounded-full font-gothic font-medium text-[1rem] leading-none text-dark-green transition-colors hover:bg-dark-green hover:text-white"
                    >
                      物件詳細
                    </a>
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </section>

      {/* SP用 floating TOC bar */}
      <PageNavSp items={tocItems} />

      {/* メインコンテンツ - 2カラムレイアウト。id は ヒーローカード「物件詳細」ボタンのアンカー先 */}
      <section id="property-detail-body" data-mobile-toc-start className="px-4 tablet:pl-[2.8125rem] tablet:pr-[4.6875rem] py-16 tablet:py-24 max-w-[90rem] mx-auto scroll-mt-20">
        <div className="flex flex-col tablet:flex-row gap-8 tablet:gap-0 tablet:justify-between">
          {/* 左サイドバー - 目次ナビ（PC のみ、SP では floating bar） */}
          <aside className="hidden tablet:block w-[20.1875rem] shrink-0">
            <div className="bg-light-green rounded-[2rem] px-[1.875rem] py-[2.8125rem] sticky top-[7.5rem]">
              <TocNav items={tocItems} />
            </div>
          </aside>

          {/* 右メインコンテンツ */}
          <div className="w-full tablet:w-[45.8125rem]">
            {/* リッチテキスト（description） */}
            {property.description && (
              <div className="max-w-[48rem] pt-6">
                <RichText content={property.description} />
              </div>
            )}

            {/* 物件概要テーブル (SP は下余白を縮めて action card との間 32px に) */}
            <div className="pt-12 pb-8 tablet:py-24">
              <div className="border-b border-dark-green/10">
                {detailFields.map((field) =>
                  field.value ? (
                    field.hasTag ? (
                      <ListItemDeco
                        key={field.label}
                        label={field.label}
                        value={field.value}
                        mapUrl={property.googleMapUrl || undefined}
                      />
                    ) : (
                      <ListItemDef key={field.label} label={field.label} value={field.value} />
                    )
                  ) : null
                )}
                {/* 価格行（成約時は非表示 #31） */}
                {!isSold && priceValue && (
                  <div className="flex gap-[1.875rem] items-center py-6 border-t border-dark-green/10">
                    <p className="font-gothic font-medium text-[1rem] leading-[1.8] tablet:text-body-l text-dark-green w-[7.5rem] tablet:w-[9.1875rem] shrink-0">
                      価格
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="font-gothic font-medium text-category-1 text-black">
                        {priceValue}
                      </span>
                      <span className="font-gothic font-medium text-body-s text-black">
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
                {/* 物件資料: documentUrl があれば資料を別タブで開く。無ければ従来通りお問い合わせへ */}
                {property.documentUrl ? (
                  <CardLink href={property.documentUrl} label="物件資料" external />
                ) : (
                  <CardLink href="/for-customer" label="物件資料" />
                )}
                {typeformContactUrl ? (
                  <CardLink href={typeformContactUrl} label="お問い合わせ" external />
                ) : (
                  <CardLink href="/for-customer" label="お問い合わせ" />
                )}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 継承者のストーリー (#18/#34): カンプ準拠の全幅セクション。
          <1440px はオーバーレイカード、>=1440px は 見出し | 画像 | テキスト の3カラム */}
      {isSold && property.story && (
        <section className="bg-light-green">
          <div className="max-w-[90rem] mx-auto px-4 tablet:px-[4.6875rem] py-16 tablet:py-24 flex flex-col tablet:flex-row tablet:gap-[1.875rem] tablet:items-start">
            {/* 見出し */}
            <div className="flex flex-col gap-2 mb-8 tablet:mb-0 tablet:w-[32.9375rem] tablet:shrink-0">
              <p className="font-gothic font-medium text-body-m text-dark-green">
                継承者のストーリー
              </p>
              <p
                className="font-mincho text-[1.5rem] tablet:text-[2rem] leading-[1.5] tracking-[0.04em] text-dark-green"
                style={{ fontFeatureSettings: "'palt' 1" }}
              >
                この物件を選んだ人の、
                <br />
                その後を尋ねました
              </p>
            </div>

            {/* <1440px: オーバーレイカード（SPカンプ準拠）。物件の続きなので category は property 固定 */}
            <div className="tablet:hidden">
              <CardStorySp story={{ ...property.story, category: 'property' }} />
            </div>

            {/* >=1440px: 画像 | テキスト の3カラム右側 */}
            <Link
              href={`/stories/${property.story.id}`}
              className="hidden tablet:flex flex-1 gap-[3.75rem] items-start group"
            >
              <div className="w-[22rem] h-[29.375rem] shrink-0 relative rounded-2xl overflow-hidden">
                {property.story.thumbnail && (
                  <CmsImage
                    image={property.story.thumbnail}
                    alt={property.story.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-[1.02]"
                    sizes="352px"
                  />
                )}
              </div>
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <span className="tag">
                      物件のつづき
                    </span>
                    {property.story.regions && property.story.regions.length > 0 && (
                      <span className="font-gothic font-medium text-body-s text-dark-green">
                        {property.story.regions.map((r) => r.name).join('・')}
                      </span>
                    )}
                  </div>
                  <p
                    className="font-mincho text-heading-24 text-dark-green"
                    style={{ fontFeatureSettings: "'palt' 1" }}
                  >
                    {property.story.title}
                  </p>
                </div>
                {/* button-secondary: ストーリーを読む */}
                <span className="inline-flex items-center gap-1 h-[2.75rem] px-6 btn-outline-fill text-[1rem] leading-none w-fit">
                  <BookIcon />
                  ストーリーを読む
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <div data-mobile-toc-end />
      {/* もっと物件を見る */}
      {relatedProperties.contents.length > 0 && (
        <section className="px-4 tablet:px-[4.6875rem] pt-[3.75rem] pb-[3.75rem] tablet:pt-24 tablet:pb-36 max-w-[90rem] mx-auto">
          <div className="max-w-[80rem]">
            <h2
              className="font-mincho text-[1.5rem] tablet:text-[2rem] leading-[1.5] tracking-[0.04em] text-dark-green mb-8 tablet:mb-16"
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
