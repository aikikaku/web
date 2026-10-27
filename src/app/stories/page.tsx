import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStories } from '@/lib/microcms/queries';
import { Story } from '@/types/microcms';
import CmsImage from '@/components/common/CmsImage';
import Pagination from '@/components/common/Pagination';
import StoriesFilter from '@/components/story/StoriesFilter';
import MobileStoriesFilter from '@/components/story/MobileStoriesFilter';
import CardStorySp from '@/components/ui/card/CardStorySp';
import { BookIcon } from '@/components/ui/icons/icons';
import Reveal from '@/components/common/Reveal';
import Arrow from '@/components/ui/interactive/Arrow';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/navigation/Breadcrumb';

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
  searchParams: Promise<{
    category?: string;
    regions?: string;
    page?: string;
  }>;
}

function StoryCardLarge({ story }: { story: Story }) {
  const regionNames = story.regions?.map((r) => r.name).join('・');

  return (
    <>
      {/* SP: 共通 overlay variant */}
      <div className="tablet:hidden">
        <CardStorySp story={story} />
      </div>

      {/* PC: 既存（画像の下にテキスト） */}
      {/* カード全体はリンクにせず、写真・タイトル・ボタンだけをリンクにする（空いている所のクリックで遷移しない） */}
      <div className="hidden tablet:flex w-full flex-col items-start">
        <Link
          href={`/stories/${story.id}`}
          aria-label={story.title}
          className="group block relative aspect-[410/308] w-full overflow-hidden rounded-[1.5rem]"
        >
          <CmsImage
            image={story.thumbnail}
            alt={story.title}
            fill
            className="object-cover transition-transform group-hover:scale-[1.02]"
            sizes="410px"
          />
        </Link>
        <div className="flex flex-col gap-6 items-start justify-center pt-[1.875rem] px-3 w-full">
          <div className="flex flex-col gap-4 items-start w-full">
            <div className="flex gap-3 items-center">
              <span className="tag">
                {getCategoryLabel(story.category)}
              </span>
              {regionNames && (
                <span className="font-gothic font-medium text-body-s text-dark-green">
                  {regionNames}
                </span>
              )}
            </div>
            <h3
              className="font-mincho text-heading-32 text-dark-green line-clamp-2"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              <Link href={`/stories/${story.id}`} className="hover:opacity-70 transition-opacity">
                {story.title}
              </Link>
            </h3>
          </div>
          <Link
            href={`/stories/${story.id}`}
            className="inline-flex items-center gap-1 h-[2.75rem] px-6 btn-outline-hover text-[1rem] leading-none"
          >
            <BookIcon />
            ストーリーを読む
          </Link>
        </div>
      </div>
    </>
  );
}

function FeaturedStoryCard({ story }: { story: Story }) {
  const regionNames = story.regions?.map((r) => r.name).join('・');

  return (
    // カード全体はリンクにせず、写真・タイトル・ボタンだけをリンクにする（空いている所のクリックで遷移しない）
    <div className="w-full">
      {/* #22: 詳細ページのヒーローと同じレイアウト(1440px時)。画像 675×640 / テキスト左89・右60
          (Figma 4470:15360 PC / 4470:15097 SP: SP は画像→テキスト gap-30) */}
      <div className="flex flex-col tablet:flex-row gap-[1.875rem] tablet:gap-0 items-stretch">
        {/* Image */}
        <Link
          href={`/stories/${story.id}`}
          aria-label={story.title}
          className="group block relative w-full tablet:w-[42.1875rem] shrink-0 aspect-[850/639] tablet:aspect-auto tablet:h-[40rem] overflow-hidden rounded-[1.5rem]"
        >
          <CmsImage
            image={story.thumbnail}
            alt={story.title}
            fill
            className="object-cover transition-transform group-hover:scale-[1.02]"
            sizes="(max-width: 992px) 100vw, 675px"
            priority
          />
        </Link>

        {/* Info (Figma 4470:15363 / 4470:15100: Top→ボタン gap-24、SP は px-12) */}
        <div className="flex flex-col gap-6 items-start justify-center flex-1 min-w-0 px-3 tablet:pl-[5.5625rem] tablet:pr-[3.75rem]">
          <div className="flex flex-col gap-4 items-start w-full">
            <div className="flex gap-3 items-center">
              <span className="tag">
                {getCategoryLabel(story.category)}
              </span>
              {regionNames && (
                <span className="font-gothic font-medium text-body-s text-dark-green">
                  {regionNames}
                </span>
              )}
            </div>

            <h3
              className="font-mincho text-[2rem] leading-[1.4] text-dark-green"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              <Link href={`/stories/${story.id}`} className="hover:opacity-70 transition-opacity">
                {story.title}
              </Link>
            </h3>
          </div>

          <Link
            href={`/stories/${story.id}`}
            className="inline-flex items-center gap-2 h-[2.75rem] px-4 btn-outline-hover text-[0.875rem] leading-[1.25rem] tracking-[0.00625rem]"
          >
            <BookIcon size={20} />
            ストーリーを読む
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function StoriesPage(props: StoriesPageProps) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const offset = (currentPage - 1) * PER_PAGE;

  // 絞り込みがある場合は全件取得 → 絞り込み → ページ分割（/properties の地域フィルタと同じ方式）。
  // 取得した1ページ分を絞り込むと、件数とページネーションが絞り込み前の総数のままになるため
  const hasFilter = !!searchParams.category || !!searchParams.regions;

  const data = await getStories({
    limit: hasFilter ? 100 : PER_PAGE,
    offset: hasFilter ? 0 : offset,
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

  const totalCount = hasFilter ? filteredContents.length : data.totalCount;
  if (hasFilter) filteredContents = filteredContents.slice(offset, offset + PER_PAGE);

  // 最初の1件をフィーチャード、残りをグリッド
  const featuredStory = filteredContents[0];
  const gridStories = filteredContents.slice(1);

  return (
    <div className="bg-cream">
      <Breadcrumb items={[{ label: '暮らしを知る' }]} />
      {/* ヘッダーセクション (Figma 4470:15091 SP: pt-60 pb-32 px-16, gap-32 / 4470:15353 PC: py-96 px-75, gap-48) */}
      <section className="px-4 tablet:px-[4.6875rem] pt-[3.75rem] pb-8 tablet:py-24 max-w-[90rem] mx-auto">
        <div className="flex flex-col gap-8 tablet:gap-12">
          <div className="flex flex-col gap-2">
            <h1
              className="font-mincho text-heading-32 tablet:text-heading-48 text-dark-green"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              暮らしを知る
            </h1>
          </div>
          <p className="font-gothic font-medium text-[1rem] leading-[2] tablet:text-body-l text-dark-green max-w-[48rem]">
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

      {/* フィルター + リスト (Figma 4470:15357 PC: px-75 pb-96 / 4470:15116 SP: pb-120) */}
      <Reveal as="section" className="px-4 tablet:px-[4.6875rem] pb-[7.5rem] tablet:pb-24 max-w-[90rem] mx-auto">
        <div>
          {/* PC用フィルターバー（pickup の上に配置） */}
          <div className="hidden tablet:block mb-[6rem]">
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
              {/* フィーチャードストーリー (Figma 4470:15097 SP: pb-60 / PC: 下の一覧まで 96) */}
              {featuredStory && (
                <div data-stories-filter-start id="stories-list" className="mb-[3.75rem] tablet:mb-24">
                  <FeaturedStoryCard story={featuredStory} />
                </div>
              )}

              {/* グリッド: SP は overlay variant の縦並び gap-32、PC は 3 列 gap-y-48 */}
              {gridStories.length > 0 && (
                <div data-stories-grid className="grid grid-cols-1 tablet:grid-cols-3 gap-y-8 tablet:gap-y-[3rem] gap-x-0 tablet:gap-x-[1.875rem]">
                  {gridStories.map((story) => (
                    <StoryCardLarge key={story.id} story={story} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-center font-gothic font-medium text-body-m text-dark-green/60 py-12">
              条件に一致するストーリーが見つかりませんでした
            </p>
          )}

          {/* ページネーション */}
          <div data-stories-filter-end />
          <Pagination
            totalCount={totalCount}
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
      </Reveal>

      {/* 仲人バナー (Figma 4470:15412 PC: px-45 pb-144, Card p-30 / 4470:15135 SP: pb-120, Card pt-48 pb-30 px-30, ロゴ→文言 gap-30) */}
      <Reveal as="section" className="px-4 tablet:px-[2.8125rem] pb-[7.5rem] tablet:pb-36 max-w-[90rem] mx-auto flex justify-center">
        <Link
          href="/about"
          className="block group bg-light-green rounded-[1.5rem] pt-12 pb-[1.875rem] px-[1.875rem] tablet:p-[1.875rem] w-full max-w-[40.375rem] overflow-hidden"
        >
          <div className="flex flex-col items-center text-center gap-[1.875rem] tablet:flex-row tablet:items-end tablet:justify-between tablet:text-left">
            <div className="flex flex-col gap-[1.875rem] tablet:gap-4 items-center tablet:items-start justify-center tablet:p-3 tablet:flex-1">
              {/* 仲 + NAKA-BITO ロゴ */}
              <div className="h-[3.5rem] w-[16.25rem] relative">
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
                  className="absolute left-[7.3125rem] top-[1.125rem]"
                />
              </div>
              <p className="font-gothic font-medium text-body-m text-black">
                想いが、ひとをつないでいく。
              </p>
            </div>

            {/* 矢印リンク */}
            <Arrow size="sm" />
          </div>
        </Link>
      </Reveal>
    </div>
  );
}
