import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStories } from '@/lib/microcms/queries';
import { Story } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';
import Pagination from '@/components/ui/Pagination';
import StoriesFilter from '@/components/story/StoriesFilter';
import MobileStoriesFilter from '@/components/story/MobileStoriesFilter';
import StoryCardOverlay from '@/components/story/StoryCardOverlay';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '暮らしを知る',
  description: '静岡県三島市の暮らしにまつわるストーリーをお届けします。',
};

export const revalidate = 3600;

const PER_PAGE = 9;

// カテゴリのラベルマッピング（配列で管理、API連携時に拡張しやすい）
const categoryLabels: { value: string; label: string }[] = [
  { value: 'daily', label: '日々のこと' },
  { value: 'regional', label: '地域のこと' },
  { value: 'property', label: '物件のつづき' },
];

function getCategoryLabel(category?: string): string {
  return categoryLabels.find((c) => c.value === category)?.label || '日々のこと';
}

interface StoriesPageProps {
  searchParams: {
    category?: string;
    regions?: string;
    page?: string;
  };
}

function StoryCardLarge({ story }: { story: Story }) {
  const regionNames = story.regions?.map((r) => r.name).join('・');

  return (
    <>
      {/* SP: 共通 overlay variant */}
      <div className="tablet:hidden">
        <StoryCardOverlay story={story} />
      </div>

      {/* PC: 既存（画像の下にテキスト） */}
      <Link href={`/stories/${story.id}`} className="hidden tablet:flex group w-full flex-col items-start">
        <div className="relative aspect-[410/308] w-full overflow-hidden rounded-[24px]">
          <Image
            src={getImageUrl(story.thumbnail, { width: 410, format: 'webp' })}
            alt={story.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="410px"
          />
        </div>
        <div className="flex flex-col gap-6 items-start justify-center pt-[30px] px-3 w-full">
          <div className="flex flex-col gap-4 items-start w-full">
            <div className="flex gap-3 items-center">
              <span className="tag-pill text-[14px] leading-none px-3 py-1.5">
                {getCategoryLabel(story.category)}
              </span>
              {regionNames && (
                <span className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
                  {regionNames}
                </span>
              )}
            </div>
            <h3
              className="font-mincho text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green line-clamp-2"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              {story.title}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 h-[44px] px-6 border border-dark-green rounded-full font-gothic font-medium text-[16px] leading-none text-dark-green transition-colors group-hover:opacity-70">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z" />
            </svg>
            ストーリーを読む
          </span>
        </div>
      </Link>
    </>
  );
}

function FeaturedStoryCard({ story }: { story: Story }) {
  const regionNames = story.regions?.map((r) => r.name).join('・');

  return (
    <Link href={`/stories/${story.id}`} className="block group w-full">
      <div className="flex flex-col tablet:flex-row gap-6 tablet:gap-[30px] items-stretch">
        {/* Image */}
        <div className="relative w-full tablet:w-[850px] shrink-0 aspect-[850/639] overflow-hidden rounded-[24px]">
          <Image
            src={getImageUrl(story.thumbnail, { width: 850, format: 'webp' })}
            alt={story.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 992px) 100vw, 850px"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6 items-start justify-center pb-8 flex-1 min-w-0">
          <div className="flex flex-col gap-4 items-start w-full">
            <div className="flex gap-3 items-center">
              <span className="tag-pill text-[14px] leading-none px-3 py-1.5">
                {getCategoryLabel(story.category)}
              </span>
              {regionNames && (
                <span className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
                  {regionNames}
                </span>
              )}
            </div>

            <h3
              className="font-mincho text-[32px] leading-[1.4] text-dark-green"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              {story.title}
            </h3>
          </div>

          <span className="inline-flex items-center gap-2 h-[44px] px-4 border border-dark-green rounded-full font-gothic font-medium text-[14px] leading-[20px] tracking-[0.1px] text-dark-green transition-colors group-hover:opacity-70">
            <svg width="20" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z" />
            </svg>
            ストーリーを読む
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function StoriesPage({ searchParams }: StoriesPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const offset = (currentPage - 1) * PER_PAGE;

  const data = await getStories({
    limit: PER_PAGE,
    offset,
    orders: '-publishedAt',
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: PER_PAGE }));

  let filteredContents = data.contents;

  // カテゴリフィルタ
  if (searchParams.category) {
    filteredContents = filteredContents.filter(
      (story) => story.category === searchParams.category
    );
  }

  // 地域フィルタ
  if (searchParams.regions) {
    const selectedRegions = searchParams.regions.split(',');
    filteredContents = filteredContents.filter((story) =>
      story.regions?.some((r) => selectedRegions.includes(r.name))
    );
  }

  // 最初の1件をフィーチャード、残りをグリッド
  const featuredStory = filteredContents[0];
  const gridStories = filteredContents.slice(1);

  return (
    <div className="bg-cream">
      {/* ヘッダーセクション (Figma 4211:10961: SP pt-60 pb-32 px-16, gap-32) */}
      <section className="px-4 tablet:px-[45px] pt-[60px] pb-8 tablet:py-24 max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-8 tablet:gap-12">
          <div className="flex flex-col gap-2">
            <h1
              className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[0.04em] text-dark-green"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              暮らしを知る
            </h1>
          </div>
          <p className="font-gothic font-medium text-[16px] tablet:text-[18px] leading-[1.8] text-dark-green max-w-[768px]">
            物件だけじゃわからない、<br className="tablet:hidden" />三島での暮らしのこと。
            <br />
            ここで一緒に、のぞいてみませんか？
          </p>
        </div>
      </section>

      {/* SP用フローティングフィルター */}
      <Suspense fallback={null}>
        <MobileStoriesFilter />
      </Suspense>

      {/* フィルター + リスト */}
      <section className="px-4 tablet:px-[45px] pb-[60px] tablet:pb-24 max-w-[1440px] mx-auto">
        <div>
          {/* PC用フィルターバー（pickup の上に配置） */}
          <div className="hidden tablet:block mb-[96px]">
            <Suspense fallback={<div className="h-14 bg-cream animate-pulse rounded-lg" />}>
              <StoriesFilter
                categories={categoryLabels}
                currentCategory={searchParams.category}
                currentRegions={searchParams.regions}
              />
            </Suspense>
          </div>

          {filteredContents.length > 0 ? (
            <>
              {/* フィーチャードストーリー (Figma 4211:10987: SP cards gap-32) */}
              {featuredStory && (
                <div data-stories-filter-start id="stories-list" className="mb-8 tablet:mb-24">
                  <FeaturedStoryCard story={featuredStory} />
                </div>
              )}

              {/* グリッド: SP は overlay variant の縦並び gap-32、PC は 3 列 gap-y-48 */}
              {gridStories.length > 0 && (
                <div data-stories-grid className="grid grid-cols-1 tablet:grid-cols-3 gap-y-8 tablet:gap-y-[48px] gap-x-0 tablet:gap-x-[30px]">
                  {gridStories.map((story) => (
                    <StoryCardLarge key={story.id} story={story} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-center font-gothic font-medium text-[16px] leading-[2] text-dark-green/60 py-12">
              条件に一致するストーリーが見つかりませんでした
            </p>
          )}

          {/* ページネーション */}
          <div data-stories-filter-end />
          <Pagination
            totalCount={data.totalCount}
            perPage={PER_PAGE}
            currentPage={currentPage}
            basePath="/stories"
            scrollTargetId="stories-list"
            searchParams={
              Object.fromEntries(
                Object.entries(searchParams).filter(([key]) => key !== 'page')
              ) as Record<string, string>
            }
          />
        </div>
      </section>

      {/* 仲人バナー */}
      <section className="px-4 tablet:px-[45px] pb-24 tablet:pb-36 max-w-[1440px] mx-auto flex justify-center">
        <Link
          href="/about"
          className="block group bg-light-green rounded-[24px] p-[30px] w-full max-w-[646px] overflow-hidden"
        >
          <div className="flex flex-col items-center text-center gap-[30px] tablet:flex-row tablet:items-end tablet:justify-between tablet:text-left">
            <div className="flex flex-col gap-4 items-center tablet:items-start justify-center p-3 tablet:flex-1">
              {/* 仲 + NAKA-BITO ロゴ */}
              <div className="h-[56px] w-[260px] relative">
                <Image
                  src="/images/nakabito-kanji.svg"
                  alt="仲"
                  width={105}
                  height={56}
                  className="absolute left-0 top-0"
                />
                <Image
                  src="/images/nakabito-text.svg"
                  alt="NAKA-BITO"
                  width={143}
                  height={11}
                  className="absolute left-[117px] top-[18px]"
                />
              </div>
              <p className="font-gothic font-medium text-[16px] leading-[2] text-black">
                想いが、ひとをつないでいく。
              </p>
            </div>

            {/* 矢印リンク */}
            <div className="w-11 h-11 rounded-full bg-accent-blue flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
