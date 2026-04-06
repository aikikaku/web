import { Suspense } from 'react';
import { getProperties } from '@/lib/microcms/queries';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyFilter from '@/components/property/PropertyFilter';
import Pagination from '@/components/ui/Pagination';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/microcms/image';
import MobileFilterNav from '@/components/property/MobileFilterNav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '物件を探す',
  description: '静岡県三島市を中心とした不動産物件一覧。売買・賃貸物件を地域や種別で検索できます。',
};

export const revalidate = 3600;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp';
const PER_PAGE = 12;

interface PropertiesPageProps {
  searchParams: {
    status?: string;
    types?: string;
    regions?: string;
    q?: string;
    page?: string;
  };
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const offset = (currentPage - 1) * PER_PAGE;

  // フィルター条件構築
  const filters: string[] = [];

  if (searchParams.status === 'available') {
    filters.push('status[contains]available');
  }

  if (searchParams.types) {
    const typeFilters = searchParams.types.split(',').map((t) => {
      const [type, category] = t.split('_');
      return `(type[contains]${type}[and]category[contains]${category})`;
    });
    if (typeFilters.length > 0) {
      filters.push(`(${typeFilters.join('[or]')})`);
    }
  }

  // 地域フィルタがある場合は全件取得→クライアント側でフィルタ＆ページネーション
  const hasRegionFilter = !!searchParams.regions;

  const data = await getProperties({
    limit: hasRegionFilter ? 100 : PER_PAGE,
    offset: hasRegionFilter ? 0 : offset,
    filters: filters.length > 0 ? filters.join('[and]') : undefined,
    orders: '-publishedAt',
    q: searchParams.q || undefined,
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: PER_PAGE }));

  // 地域フィルターをクライアントサイドで適用
  let allFiltered = data.contents;
  if (hasRegionFilter) {
    const selectedRegions = searchParams.regions!.split(',');
    allFiltered = data.contents.filter((property) =>
      property.regions?.some((r) => selectedRegions.includes(r.name))
    );
  }

  const filteredTotalCount = hasRegionFilter ? allFiltered.length : data.totalCount;

  // 地域フィルタ時はクライアントでページネーション
  const paginatedContents = hasRegionFilter
    ? allFiltered.slice(offset, offset + PER_PAGE)
    : allFiltered;

  const featuredProperty = paginatedContents[0];
  const gridProperties = paginatedContents.slice(1);

  return (
    <div className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'ホーム', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: '物件を探す' },
            ],
          }),
        }}
      />
      <Suspense fallback={null}>
        <MobileFilterNav />
      </Suspense>

      <section className="section-padding">
        <div className="page-container">
          {/* ページタイトル（左寄せ） */}
          <h1 className="mb-12">物件を探す</h1>

          {/* 注目物件（XLカード） */}
          {featuredProperty && (
            <Link
              href={`/properties/${featuredProperty.id}`}
              className="block rounded-[32px] bg-light-green p-4 tablet:p-[30px] mb-12 group"
            >
              <div className="flex flex-col tablet:flex-row tablet:gap-[60px] tablet:items-stretch">
                {/* 左: メイン画像 */}
                <div className="tablet:w-[646px] tablet:shrink-0">
                  <div className="aspect-[294/220] tablet:aspect-[646/485] relative overflow-hidden rounded-2xl tablet:rounded-[24px]">
                    <Image
                      src={featuredProperty.mainImage?.url || '/images/home/service-customer.jpg'}
                      alt={featuredProperty.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {featuredProperty.status === 'sold' && (
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: 'linear-gradient(194deg, rgba(39,51,59,0.5) 4%, rgba(39,51,59,0.25) 52%, rgba(39,51,59,0.5) 104%)',
                        }}
                      />
                    )}
                  </div>
                </div>
                {/* 右: 詳細情報 */}
                <div className="flex-1 flex flex-col justify-between min-w-0 pt-4 tablet:pt-0">
                  <div className="flex flex-col gap-0 tablet:pt-3">
                    {/* Tags + Location */}
                    <div className="flex flex-wrap items-center gap-3">
                      {featuredProperty.status === 'sold' && (
                        <span className="tag-pill-dark text-[14px] leading-none px-3 py-1.5">成約済み</span>
                      )}
                      {featuredProperty.type && (
                        <span className="tag-pill text-[14px] leading-none px-3 py-1.5">
                          {featuredProperty.category === 'property'
                            ? featuredProperty.type === 'sell' ? '中古住宅' : '賃貸物件'
                            : featuredProperty.type === 'sell' ? '売土地' : '貸土地'}
                        </span>
                      )}
                      {featuredProperty.regions && featuredProperty.regions.length > 0 && (
                        <span className="font-gothic font-medium text-[16px] leading-none text-dark-green">
                          {featuredProperty.regions.map(r => r.name).join('・')}
                        </span>
                      )}
                    </div>

                    {/* タイトル */}
                    <div className="py-[30px]">
                      <h3
                        className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green"
                        style={{ fontFeatureSettings: "'palt' 1" }}
                      >
                        {featuredProperty.title}
                      </h3>
                    </div>

                    {/* Price / Layout split */}
                    <div className="pb-4">
                      <div className="flex border-t border-b border-dark-green/20">
                        <div className="flex-1 border-r border-dark-green/20 pt-2 pb-4">
                          <div className="pl-2">
                            <span className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
                              {featuredProperty.type === 'rent' ? '賃料' : '価格'}
                            </span>
                          </div>
                          <div className="flex items-end justify-center">
                            <span className="font-gothic font-medium text-[20px] tablet:text-[24px] leading-[1.6] text-dark-green px-1">
                              {featuredProperty.status === 'sold'
                                ? '-'
                                : featuredProperty.price
                                  ? featuredProperty.price.toLocaleString()
                                  : featuredProperty.rent
                                    ? featuredProperty.rent.toLocaleString()
                                    : '応談'}
                            </span>
                            <span className="font-gothic font-medium text-[14px] leading-[1.5] text-dark-green pb-1 w-7">
                              {featuredProperty.status === 'sold' ? '万円' : featuredProperty.price ? '万円' : featuredProperty.rent ? '円/月' : ''}
                            </span>
                          </div>
                        </div>
                        {featuredProperty.layout && (
                          <div className="flex-1 pt-2 pb-4">
                            <div className="pl-2">
                              <span className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
                                間取り
                              </span>
                            </div>
                            <div className="flex items-end justify-center">
                              <span className="font-gothic font-medium text-[20px] tablet:text-[24px] leading-[1.6] text-dark-green">
                                {featuredProperty.layout}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Station / Construction */}
                    <div className="flex items-center">
                      {featuredProperty.nearestStation && (
                        <span className="font-gothic font-medium text-[16px] leading-[2] text-dark-green px-2">
                          {featuredProperty.nearestStation}
                        </span>
                      )}
                      {featuredProperty.constructionDate && (
                        <span className="font-gothic font-medium text-[16px] leading-[2] text-dark-green px-2">
                          築{featuredProperty.constructionDate}
                        </span>
                      )}
                    </div>

                    {/* 物件詳細ボタン */}
                    <div className="mt-10">
                      {featuredProperty.status !== 'sold' && (
                        <span className="inline-flex items-center justify-center h-[44px] px-6 border border-dark-green rounded-full font-gothic font-medium text-[16px] leading-none text-dark-green transition-colors hover:bg-gray-50">
                          物件詳細
                        </span>
                      )}
                    </div>
                  </div>

                  {/* サムネイル行（mainImage + images） */}
                  {(() => {
                    const allThumbs = [
                      featuredProperty.mainImage,
                      ...(featuredProperty.images || []),
                    ].filter(Boolean).slice(0, 6);
                    return allThumbs.length > 0 ? (
                    <div className="flex gap-2 mt-4 tablet:mt-0">
                      {allThumbs.map((img, i) => (
                        <div
                          key={i}
                          className={`flex-1 aspect-square relative rounded-xl overflow-hidden ${i > 0 ? 'opacity-[0.15]' : ''}`}
                        >
                          <Image
                            src={getImageUrl(img, { width: 140, height: 140, format: 'webp' })}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="70px"
                          />
                        </div>
                      ))}
                    </div>
                    ) : null;
                  })()}
                </div>
              </div>
            </Link>
          )}

          {/* フィルター */}
          <div className="tablet:px-[30px]">
            <Suspense fallback={<div className="h-14 bg-cream animate-pulse rounded-lg" />}>
              <PropertyFilter />
            </Suspense>
          </div>

          {/* 物件カードグリッド */}
          {gridProperties.length > 0 ? (
            <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 tablet:gap-x-[30px] tablet:gap-y-24 mt-8 tablet:mt-[96px]">
              {gridProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : paginatedContents.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              条件に一致する物件が見つかりませんでした
            </p>
          ) : null}

          <Pagination
            totalCount={filteredTotalCount}
            perPage={PER_PAGE}
            currentPage={currentPage}
            basePath="/properties"
            searchParams={
              Object.fromEntries(
                Object.entries(searchParams).filter(
                  ([key]) => key !== 'page'
                )
              ) as Record<string, string>
            }
          />
        </div>
      </section>

      {/* 駐車場セクション */}
      <section className="py-24">
        <div className="page-container flex justify-center">
          <Link
            href="/for-customer"
            className="block bg-light-green rounded-[24px] px-[30px] pt-6 pb-8 max-w-[646px] w-full group"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2 max-w-[449px]">
                <p className="font-gothic font-medium text-[16px] leading-[2] text-dark-green">駐車場を借りたい</p>
                <p
                  className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green"
                  style={{ fontFeatureSettings: "'palt' 1" }}
                >
                  三島市で駐車場をお探しの方へ
                </p>
              </div>
              <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* お問い合わせバナー */}
      <section className="px-4 tablet:px-12 pb-24">
        <div className="relative rounded-3xl overflow-hidden px-6 py-16 tablet:px-8 tablet:py-24">
          <div className="absolute inset-0">
            <Image
              src="/images/home/cta-banner.jpg"
              alt=""
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(216deg, rgba(39, 51, 59, 0.1) 26.6%, rgba(39, 51, 59, 0.25) 72.5%)',
              }}
            />
          </div>
          <div className="relative z-10 flex flex-col tablet:flex-row gap-6 tablet:gap-8 items-start">
            <div className="text-white">
              <p className="text-body-m mb-2">お問い合わせ</p>
              <p className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.04em]">
                不動産に関すること、<br />
                ぜひご相談ください。
              </p>
            </div>
            <div className="flex flex-col tablet:flex-row gap-3 tablet:ml-auto w-full tablet:w-auto">
              <Link
                href="/for-customer"
                className="bg-cream/95 rounded-3xl px-6 py-8 tablet:px-8 tablet:py-10 text-center w-full tablet:w-[264px] flex flex-col items-center gap-6 tablet:gap-8 hover:bg-white transition-colors"
              >
                <span className="font-gothic font-medium text-[18px] tablet:text-[20px] text-dark-green">
                  不動産をお探しの方
                </span>
                <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/for-owner"
                className="bg-cream/95 rounded-3xl px-6 py-8 tablet:px-8 tablet:py-10 text-center w-full tablet:w-[264px] flex flex-col items-center gap-6 tablet:gap-8 hover:bg-white transition-colors"
              >
                <span className="font-gothic font-medium text-[18px] tablet:text-[20px] text-dark-green">
                  その他のお問い合わせ
                </span>
                <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
