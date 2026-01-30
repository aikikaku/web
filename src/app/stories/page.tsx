import { getStories } from '@/lib/microcms/queries';
import StoryCard from '@/components/story/StoryCard';
import Pagination from '@/components/ui/Pagination';
import Breadcrumb from '@/components/ui/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '暮らしを知る',
  description: '静岡県三島市の暮らしにまつわるストーリーをお届けします。',
};

export const revalidate = 3600;

const PER_PAGE = 9;

interface StoriesPageProps {
  searchParams: {
    regions?: string;
    q?: string;
    page?: string;
  };
}

export default async function StoriesPage({ searchParams }: StoriesPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const offset = (currentPage - 1) * PER_PAGE;

  const data = await getStories({
    limit: PER_PAGE,
    offset,
    orders: '-publishedAt',
    q: searchParams.q || undefined,
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: PER_PAGE }));

  let filteredContents = data.contents;
  if (searchParams.regions) {
    const selectedRegions = searchParams.regions.split(',');
    filteredContents = data.contents.filter((story) =>
      story.regions?.some((r) => selectedRegions.includes(r.name))
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '暮らしを知る' }]} />
      <h1 className="text-3xl font-bold mb-8">暮らしを知る</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContents.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      {filteredContents.length === 0 && (
        <p className="text-center text-gray-500 mt-8 py-12">
          ストーリーがまだありません
        </p>
      )}

      <Pagination
        totalCount={data.totalCount}
        perPage={PER_PAGE}
        currentPage={currentPage}
        basePath="/stories"
        searchParams={
          Object.fromEntries(
            Object.entries(searchParams).filter(([key]) => key !== 'page')
          ) as Record<string, string>
        }
      />
    </div>
  );
}
