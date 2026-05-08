import { Suspense } from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import { getProperties } from '@/lib/microcms/queries';
import PropertyCard from '@/components/property/PropertyCard';
import PickupCard from '@/components/property/PickupCard';
import PropertyFilter from '@/components/property/PropertyFilter';
import Pagination from '@/components/ui/Pagination';
import MobileFilterNav from '@/components/property/MobileFilterNav';
import ParkingBanner from '@/components/ui/ParkingBanner';
import ContactBanner from '@/components/ui/ContactBanner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '物件を探す',
  description: '静岡県三島市を中心とした不動産物件一覧。売買・賃貸物件を地域や種別で検索できます。',
};

export const revalidate = 3600;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp';
const PER_PAGE = 9;

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
  noStore();
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

  // pickup 物件はフィルタ非依存に固定（最新の available 物件 = 全物件中 publishedAt 降順の最初）
  const pickupData = await getProperties({
    limit: 1,
    filters: 'status[contains]available',
    orders: '-publishedAt',
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 1 }));
  const featuredProperty = pickupData.contents[0];
  // grid は paginatedContents から pickup と同じ ID を除外（同じ物件を 2 回描画しないため）
  const gridProperties = paginatedContents.filter((p) => p.id !== featuredProperty?.id);

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

      {/* PC: 下余白は ParkingBanner 側 (tablet:py-24) で確保。SP: Figma 4211:10722 通り pagination→駐車場の gap を 120px に。 */}
      <section className="pt-[60px] tablet:pt-24 pb-[120px] tablet:pb-0">
        <div className="max-w-[1440px] mx-auto px-4 tablet:px-[45px]">
          {/* ページタイトル */}
          <h1 className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[1.92px] text-dark-green mb-8 tablet:mb-12" style={{ fontFeatureSettings: "'palt' 1" }}>物件を探す</h1>

          {/* pickup 物件（サムネイル切替対応） */}
          {/* Figma 4211:10722 SP: pickup → grid 60px / PC: pickup → filter row 120px */}
          {featuredProperty && (
            <div className="mb-[60px] tablet:mb-[120px]">
              <PickupCard property={featuredProperty} />
            </div>
          )}

          {/* PC: 検索バー (フィルター) */}
          <div className="hidden tablet:block mb-[96px]">
            <Suspense fallback={<div className="h-14 bg-cream animate-pulse rounded-lg" />}>
              <PropertyFilter />
            </Suspense>
          </div>

          {/* 物件カードグリッド */}
          {gridProperties.length > 0 ? (
            <div id="properties-grid" className="grid grid-cols-1 tablet:grid-cols-3 gap-y-[60px] tablet:gap-x-[30px] tablet:gap-y-24">
              {gridProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center font-gothic font-medium text-[16px] leading-[2] text-dark-green/60 py-12">
              条件に一致する物件が見つかりませんでした
            </p>
          )}

          <div data-mobile-filter-end />
          <Pagination
            totalCount={filteredTotalCount}
            perPage={PER_PAGE}
            currentPage={currentPage}
            basePath="/properties"
            scrollTargetId="properties-grid"
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
      <ParkingBanner />

      {/* お問い合わせバナー */}
      <ContactBanner />
    </div>
  );
}
