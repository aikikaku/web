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
import Breadcrumb from '@/components/ui/navigation/Breadcrumb';
import { getPriceLabel, getPropertyLayoutCell } from '@/components/property/propertyCells';

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

  // 価格/賃料ラベル（貸物件・貸土地は「賃料」）と、価格セル右隣（間取り / 土地は「広さ」）。Figma 付箋 4470:16568
  const priceLabel = getPriceLabel(property);
  const layoutCell = getPropertyLayoutCell(property);

  // 価格フィールド（特別扱い）
  const priceValue = isSold
    ? '-'
    : property.price
      ? property.price.toLocaleString()
      : property.rent
        ? property.rent.toLocaleString()
        : null;
  const priceUnit = property.price ? '万円' : property.rent ? '円/月' : '';

  // 物件概要フィールド。成約時は所在地・土地面積・建物面積を非表示 (#31/#32)。
  // 並びは Figma 4470:14376 / 付箋 4470:16691 通り「…取引態様 → 価格 → 備考」。
  // 成約時は価格(賃料)・備考も非表示（付箋 4470:16814）。
  const detailFields: { label: string; value: string | undefined; hasTag?: boolean; isPrice?: boolean }[] = [
    ...(!isSold ? [{ label: '所在地', value: property.location, hasTag: true }] : []),
    { label: '最寄駅', value: property.nearestStation },
    { label: '種別', value: categoryLabel },
    ...(!isSold && property.landArea ? [{ label: '土地面積', value: `${property.landArea}㎡` }] : []),
    ...(!isSold && property.buildingArea ? [{ label: '建物面積', value: `${property.buildingArea}㎡` }] : []),
    ...(property.layout ? [{ label: '間取り', value: property.layout }] : []),
    ...(property.constructionDate ? [{ label: '築年月', value: property.constructionDate }] : []),
    ...(property.schoolDistrict ? [{ label: '学区', value: property.schoolDistrict }] : []),
    ...(property.transactionType ? [{ label: '取引態様', value: property.transactionType }] : []),
    ...(!isSold && priceValue ? [{ label: priceLabel, value: priceValue, isPrice: true }] : []),
    ...(!isSold && property.remarks ? [{ label: '備考', value: property.remarks }] : []),
  ];

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
      <Breadcrumb items={[{ label: '物件を探す', href: '/properties' }, { label: property.title }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* ヒーローセクション - カード型。パンくず追加に伴い上余白を調整 (Figma Handoff 20260724):
          PC はパンくず下 48px、SP は緑背景を全幅にしてパンくず下 8px / 内側 上下32px・左右16px (4470:14926) */}
      <section className="tablet:px-[2.8125rem] pt-2 tablet:pt-12 max-w-[90rem] mx-auto">
        <div className="bg-light-green tablet:rounded-[2rem] px-4 py-8 tablet:p-[1.875rem]">
          <PropertyDetailClient
            allImages={allImages}
            title={property.title}
            isSold={isSold}
            spLabelsSlot={(
              // SP 画像内ラベル: 左に種別タグ + 地域(16px cream)、右に状態タグ (Figma 4470:14927 / 成約 4470:16161)
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="tag shrink-0">
                    {categoryLabel}
                  </span>
                  {locationText && (
                    <span className="font-gothic font-medium text-body-m text-cream truncate pl-1">
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
            )}
            detailsSlot={(
              // SP: thumbs(pb-24) の直後にタイトル。thumbs が無い場合のみ画像との間に 16px (Figma 4470:14927)
              <div className={`flex flex-col gap-6 tablet:gap-10 ${allImages.length > 1 ? 'pt-0' : 'pt-4'} tablet:pt-3 min-w-0`}>
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

                  {/* タイトル: SP 上余白なし・下 24・左右 8 / 行間 1.6 (Figma I4470:14927;4699:24103)、PC 上下 30 / 行間 1.5 */}
                  <div className="pb-6 px-2 tablet:px-0 tablet:py-[1.875rem]">
                    <h1
                      className="font-mincho text-[1.5rem] tablet:text-[2rem] leading-[1.6] tablet:leading-[1.5] tracking-[0.04em] text-black"
                      style={{ fontFeatureSettings: "'palt' 1" }}
                    >
                      {property.title}
                    </h1>
                  </div>

                  {/* 価格 / 間取り(土地は広さ)。罫線 dark-green 20%、下余白 SP 24 / PC 16、数値 SP 20px / PC 24px (Figma 4470:14283 / 14927) */}
                  <div className="pb-6 tablet:pb-4">
                    <div className="flex border-t border-b border-dark-green/20">
                      <div className={`flex-1 ${layoutCell ? 'border-r border-dark-green/20' : ''} pt-2 pb-4`}>
                        <div className="pl-2">
                          <span className="font-gothic font-medium text-body-s text-dark-green">
                            {priceLabel}
                          </span>
                        </div>
                        <div className="flex items-end justify-center">
                          <span className="font-gothic font-medium text-category-2 tablet:text-category-1 text-black px-1">
                            {priceValue || '応談'}
                          </span>
                          {priceUnit && (
                            <span className="font-gothic font-medium text-[0.875rem] leading-[1.5] text-black pb-1">
                              {priceUnit}
                            </span>
                          )}
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
                            <span className="font-gothic font-medium text-category-2 tablet:text-category-1 text-black">
                              {layoutCell.value}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SP: 「詳しく見る」ボタンは価格欄の後・駅の前 (Figma 4470:14927 の「物件詳細」ボタン)。下 24 */}
                  {!isSold && (
                    <div className="tablet:hidden pb-6">
                      <a
                        href="#property-detail-body"
                        className="inline-flex items-center justify-center gap-1 h-[2.75rem] px-6 border border-dark-green rounded-full font-gothic font-medium text-[1rem] leading-none text-dark-green transition-colors hover:bg-dark-green hover:text-white"
                      >
                        詳しく見る
                        <ScrollDownIcon />
                      </a>
                    </div>
                  )}

                  {/* 最寄駅 / 築年月: SP 縦積み / PC 横並び */}
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
                </div>

                {/* 「詳しく見る」ボタン(PC): 詳細セクションへの anchor scroll。SP は上の価格欄直後に配置。
                    Figma の文言は「物件詳細」だが、詳細ページ内では紛らわしいため「詳しく見る」+下向き矢印にしている */}
                {!isSold && (
                  <div className="hidden tablet:block">
                    <a
                      href="#property-detail-body"
                      className="inline-flex items-center justify-center gap-1 h-[2.75rem] px-6 border border-dark-green rounded-full font-gothic font-medium text-[1rem] leading-none text-dark-green transition-colors hover:bg-dark-green hover:text-white"
                    >
                      詳しく見る
                      <ScrollDownIcon />
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

            {/* 物件概要テーブル (SP は下余白を縮めて action card との間 32px に)。
                成約時は action card が無く、Figma 4470:14584 (PC pt-48・下余白なし→セクション pb-96) /
                4470:16178 (SP pt-60、セクション末尾まで 120 = pb-56 + セクション pb-64) に合わせる */}
            <div className={isSold ? 'pt-[3.75rem] pb-14 tablet:pt-12 tablet:pb-0' : 'pt-12 pb-8 tablet:py-24'}>
              <div className="border-b border-dark-green/20">
                {detailFields.map((field) =>
                  field.value ? (
                    field.isPrice ? (
                      // 価格(賃料)行: PC は 24px + 単位 18px(black)、SP は縦積みで 24px + 単位 16px(dark-green)
                      // (Figma 4470:14385 / 4470:14954)
                      <div
                        key={field.label}
                        className="flex flex-col gap-3 pr-6 tablet:flex-row tablet:gap-[1.875rem] tablet:items-center tablet:pr-0 py-6 border-t border-dark-green/20 first:border-t-0"
                      >
                        <p className="font-gothic font-medium text-body-m tablet:text-body-l text-dark-green tablet:w-[9.1875rem] shrink-0">
                          {field.label}
                        </p>
                        <div className="flex items-end gap-1 h-[2.125rem]">
                          <span className="font-gothic font-medium text-category-1 text-dark-green tablet:text-black">
                            {field.value}
                          </span>
                          <span className="font-gothic font-medium text-body-m tablet:text-body-l text-dark-green tablet:text-black">
                            {priceUnit}
                          </span>
                        </div>
                      </div>
                    ) : field.hasTag ? (
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
          <1440px はオーバーレイカード、>=1440px は 見出し | 画像 | テキスト の3カラム。
          成約前でもストーリーがあれば表示、無ければ非表示（Figma 付箋 4470:17326 / 4470:16773） */}
      {property.story && (
        <section className="bg-light-green">
          {/* 上下余白 SP 60 (Figma 4470:16188) / PC 96 (Figma 4470:14595) */}
          <div className="max-w-[90rem] mx-auto px-4 tablet:px-[4.6875rem] py-[3.75rem] tablet:py-24 flex flex-col tablet:flex-row tablet:gap-[1.875rem] tablet:items-start">
            {/* 見出し */}
            <div className="flex flex-col gap-2 mb-8 tablet:mb-0 tablet:w-[32.9375rem] tablet:shrink-0">
              {/* SP: sub-heading-2 (Figma 4470:16189) 14px / 24px 行間 1.6、PC: sub-heading-1 16px / 32px 行間 1.5 */}
              <p className="font-gothic font-medium text-body-s tablet:text-body-m text-dark-green">
                継承者のストーリー
              </p>
              <p
                className="font-mincho text-[1.5rem] tablet:text-[2rem] leading-[1.6] tablet:leading-[1.5] tracking-[0.04em] text-dark-green"
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
                {/* Figma 4470:14601: タグ → (地域 / タイトル を gap-12 で縦積み) を gap-12 で縦積み */}
                <div className="flex flex-col gap-3 items-start">
                  <span className="tag">
                    物件のつづき
                  </span>
                  <div className="flex flex-col gap-3">
                    {property.story.regions && property.story.regions.length > 0 && (
                      <span className="font-gothic font-medium text-body-s text-dark-green">
                        {property.story.regions.map((r) => r.name).join('・')}
                      </span>
                    )}
                    <p
                      className="font-mincho text-heading-24 text-dark-green"
                      style={{ fontFeatureSettings: "'palt' 1" }}
                    >
                      {property.story.title}
                    </p>
                  </div>
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
      {/* PC: 本文と「もっと物件を見る」の区切り線 (Figma 4470:14390: x75〜1365, dark-green 20%)。
          ストーリーセクションがある場合は背景色で区切られるため不要（成約 PC 4470:14489 には線なし） */}
      {!property.story && relatedProperties.contents.length > 0 && (
        <div className="hidden tablet:block max-w-[90rem] mx-auto px-[4.6875rem]">
          <div className="border-t border-dark-green/20" />
        </div>
      )}
      {/* もっと物件を見る: SP 下余白 120 (Figma 4470:14959) / PC 144 */}
      {relatedProperties.contents.length > 0 && (
        <section className="px-4 tablet:px-[4.6875rem] pt-[3.75rem] pb-[7.5rem] tablet:pt-24 tablet:pb-36 max-w-[90rem] mx-auto">
          {/* Figma 4470:14393 Container 幅 1280 だが Navigation-Slideshow は 1290 (=セクション内幅) のため max-w は付けない。
              カードの右 peek は MoreProperties 側で画面右端まではみ出させる */}
          <div>
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

/** 「詳しく見る」ボタンの下向き矢印（ページ内の詳細セクションへスクロールすることを示す） */
function ScrollDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
