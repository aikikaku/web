import { Suspense } from 'react';
import { getProperties } from '@/lib/microcms/queries';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyFilter from '@/components/property/PropertyFilter';
import Pagination from '@/components/ui/Pagination';
import Breadcrumb from '@/components/ui/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '物件を探す',
  description: '静岡県三島市を中心とした不動産物件一覧。売買・賃貸物件を地域や種別で検索できます。',
};

export const revalidate = 3600;

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
    filters.push('status[equals]available');
  }

  if (searchParams.types) {
    const typeFilters = searchParams.types.split(',').map((t) => {
      const [type, category] = t.split('_');
      return `(type[equals]${type}[and]category[equals]${category})`;
    });
    if (typeFilters.length > 0) {
      filters.push(`(${typeFilters.join('[or]')})`);
    }
  }

  const data = await getProperties({
    limit: PER_PAGE,
    offset,
    filters: filters.length > 0 ? filters.join('[and]') : undefined,
    orders: '-publishedAt',
    q: searchParams.q || undefined,
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: PER_PAGE }));

  // 地域フィルターはクライアントサイドで適用（microCMSの複数コンテンツ参照フィルター制約のため）
  let filteredContents = data.contents;
  if (searchParams.regions) {
    const selectedRegions = searchParams.regions.split(',');
    filteredContents = data.contents.filter((property) =>
      property.regions?.some((r) => selectedRegions.includes(r.name))
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '物件を探す' }]} />
      <h1 className="text-3xl font-bold mb-8">物件を探す</h1>

      <Suspense fallback={<div>読み込み中...</div>}>
        <PropertyFilter />
      </Suspense>

      <div className="mt-8">
        <p className="text-sm text-gray-500 mb-4">
          {data.totalCount}件の物件が見つかりました
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredContents.length === 0 && (
          <p className="text-center text-gray-500 mt-8 py-12">
            条件に一致する物件が見つかりませんでした
          </p>
        )}
      </div>

      <Pagination
        totalCount={data.totalCount}
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
  );
}
