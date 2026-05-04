import { getStory, getStories } from '@/lib/microcms/queries';
import StoryCard from '@/components/story/StoryCard';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getImageUrl } from '@/lib/microcms/image';
import RichText, { extractTocFromHtml } from '@/components/ui/RichText';
import TocNav from '@/components/ui/TocNav';
import MobileTocNav from '@/components/ui/MobileTocNav';
import SeeAllLink from '@/components/ui/SeeAllLink';

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
    twitter: {
      card: 'summary_large_image',
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
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 3 }));

  const regionNames = story.regions?.map((r) => r.name).join('・');

  // 目次データ: contentのh5見出しから動的生成
  const tocItems = story.content ? extractTocFromHtml(story.content) : [];

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
        name: '暮らしを知る',
        item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp'}/stories`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: story.title,
      },
    ],
  };

  return (
    <div className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ヒーローセクション */}
      <section className="pt-12 pb-24 px-[45px] max-w-[1440px] mx-auto max-tablet:px-4 max-tablet:pb-12">
        <div className="flex max-tablet:flex-col gap-0">
          {/* 左: 画像 */}
          <div className="tablet:w-[675px] shrink-0 h-[640px] max-tablet:h-auto max-tablet:aspect-square rounded-3xl overflow-hidden relative">
            <Image
              src={getImageUrl(story.thumbnail, { width: 1350, format: 'webp' })}
              alt={story.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 右: テキスト */}
          <div className="flex-1 flex flex-col gap-12 items-start justify-center tablet:pl-[89px] tablet:pr-[60px] max-tablet:pt-8">
            <div className="flex flex-col gap-8 items-center w-full">
              {/* タグ + 地域 */}
              <div className="flex gap-3 items-center">
                <span className="tag-pill text-[14px] leading-none px-3 py-1.5">
                  物件のつづき
                </span>
                {regionNames && (
                  <span className="font-gothic font-medium text-[14px] leading-[1.4] text-dark-green">
                    {regionNames}
                  </span>
                )}
              </div>

              {/* タイトル */}
              <h2
                className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[0.04em] text-dark-green text-center"
                style={{ fontFeatureSettings: "'palt' 1" }}
              >
                {story.title}
              </h2>
            </div>

            {/* 説明テキスト */}
            {story.subtitle && (
              <p className="text-body-l font-gothic font-medium text-dark-green text-left leading-[1.8]">
                {story.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SP用 floating TOC bar */}
      <MobileTocNav items={tocItems} />

      {/* メインコンテンツ: TOC + リッチテキスト */}
      <section data-mobile-toc-start className="pb-24 px-[45px] tablet:pr-[75px] max-w-[1440px] mx-auto max-tablet:px-4">
        <div className="flex max-tablet:flex-col items-start tablet:justify-between">
          {/* 左: 目次サイドバー（PC のみ） */}
          {tocItems.length > 0 && (
            <div className="hidden tablet:block tablet:w-[323px] shrink-0 tablet:sticky tablet:top-24">
              <div className="bg-light-green rounded-[32px] px-[30px] py-[45px]">
                <TocNav items={tocItems} />
              </div>
            </div>
          )}

          {/* 右: リッチテキストコンテンツ */}
          <div className="w-full tablet:w-[734px]">
            <div>
              {/* microCMS content フィールド（richEditorV2） */}
              {story.content && (
                <div className="pt-6">
                  <RichText content={story.content} />
                </div>
              )}

              {/* 物件リンクカード */}
              {story.property && (
                <div className="pt-12">
                  <Link
                    href={`/properties/${story.property.id}`}
                    className="flex items-center justify-between bg-dark-green rounded-2xl p-[30px] group"
                  >
                    <div className="flex-1 px-3">
                      <p className="font-gothic font-medium text-[20px] leading-[1.6] text-white">
                        この物件について
                      </p>
                    </div>
                    <span className="w-12 h-12 rounded-full bg-accent-blue flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 区切り線 */}
      <div className="border-t border-dark-green/10" />
      <div data-mobile-toc-end />

      {/* もっとストーリーを見る */}
      {relatedStories.contents.length > 0 && (
        <section className="pt-24 pb-36 px-[75px] max-w-[1440px] mx-auto max-tablet:px-4 max-tablet:pt-12 max-tablet:pb-24 overflow-hidden">
          <div className="flex flex-col gap-16">
            <h3
              className="font-mincho text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              もっとストーリーを見る
            </h3>

            {/* カード3列 */}
            <div className="grid grid-cols-1 tablet:grid-cols-3 gap-y-12 gap-x-[30px] max-tablet:flex max-tablet:overflow-x-auto max-tablet:pb-4 max-tablet:gap-x-4">
              {relatedStories.contents.map((s) => (
                <div key={s.id} className="max-tablet:w-[300px] max-tablet:shrink-0">
                  <StoryCard story={s} />
                </div>
              ))}
            </div>

            {/* ナビゲーション: すべて見る */}
            <div className="flex items-center justify-end">
              <SeeAllLink href="/stories" />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
