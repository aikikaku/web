import { getStory, getStories } from '@/lib/microcms/queries';
import StoryCard from '@/components/story/StoryCard';
import RichText from '@/components/ui/RichText';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getImageUrl } from '@/lib/microcms/image';

export const revalidate = 3600;

export async function generateStaticParams() {
  const data = await getStories({ limit: 100, fields: 'id' });

  return data.contents.map((story) => ({ id: story.id }));
}

interface StoryPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const story = await getStory(params.id).catch(() => null);

  if (!story) {
    return { title: 'ストーリーが見つかりません' };
  }

  return {
    title: story.title,
    description: story.subtitle || story.title,
    openGraph: {
      title: story.title,
      description: story.subtitle || story.title,
      images: [
        getImageUrl(story.thumbnail, { width: 1200, height: 630, format: 'webp' }),
      ],
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const story = await getStory(params.id).catch(() => null);

  if (!story) {
    notFound();
  }

  const relatedStories = await getStories({
    limit: 3,
    filters: `id[not_equals]${story.id}`,
    orders: '-publishedAt',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: '暮らしを知る', href: '/stories' },
          { label: story.title },
        ]}
      />

      <article className="max-w-3xl mx-auto mt-4">
        <h1 className="text-3xl font-bold mb-2">{story.title}</h1>
        {story.subtitle && (
          <p className="text-lg text-gray-600 mb-6">{story.subtitle}</p>
        )}

        {story.regions && story.regions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {story.regions.map((region) => (
              <span
                key={region.id}
                className="text-sm bg-gray-200 px-3 py-1 rounded"
              >
                {region.name}
              </span>
            ))}
          </div>
        )}

        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
          <Image
            src={getImageUrl(story.thumbnail, { width: 800, format: 'webp' })}
            alt={story.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>

        <RichText content={story.content} />

        {/* 関連物件 */}
        {story.property && (
          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-bold mb-2">関連物件</h2>
            <Link
              href={`/properties/${story.property.id}`}
              className="text-blue-600 hover:underline text-lg"
            >
              {story.property.title}
            </Link>
          </div>
        )}
      </article>

      {/* 関連ストーリー */}
      {relatedStories.contents.length > 0 && (
        <div className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">関連ストーリー</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStories.contents.map((s) => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
