import { getStory, getStories } from '@/lib/microcms/queries';
import RelatedStoriesGrid from '@/components/story/RelatedStoriesGrid';
import CmsImage from '@/components/common/CmsImage';
import Arrow from '@/components/ui/interactive/Arrow';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getImageUrl } from '@/lib/microcms/image';
import RichText, { extractTocFromHtml } from '@/components/ui/post/RichText';
import TocNav from '@/components/ui/navigation/TocNav';
import PageNavSp from '@/components/ui/navigation/PageNavSp';
import ButtonPrimary from '@/components/ui/interactive/ButtonPrimary';
import { getStoryCategoryLabel } from '@/lib/storyCategory';
import Breadcrumb from '@/components/ui/navigation/Breadcrumb';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

export async function generateStaticParams() {
  const data = await getStories({ limit: 100, fields: 'id' });
  return data.contents.map((story) => ({ id: story.id }));
}

interface StoryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const story = await getStory(id).catch(() => null);

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
  const { id } = await params;
  const story = await getStory(id).catch(() => null);

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
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '暮らしを知る',
        item: `${SITE_URL}/stories`,
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
      <Breadcrumb items={[{ label: '暮らしを知る', href: '/stories' }, { label: story.title }]} />

      {/* ヒーローセクション (Figma 4470:14621 PC: pt-48 pb-96 px-45 / 4470:16255 SP: py-60 px-16, gap-32)
          SP はタグ・タイトル → 画像 → 本文 の順。右カラムを SP では display:contents にして order で並べ替える */}
      <section className="pt-12 pb-24 px-[2.8125rem] max-w-[90rem] mx-auto max-tablet:px-4 max-tablet:py-[3.75rem]">
        <div className="flex max-tablet:flex-col gap-0 max-tablet:gap-8">
          {/* 左: 画像 */}
          <div className="max-tablet:order-2 tablet:w-[42.1875rem] shrink-0 h-[40rem] max-tablet:h-auto max-tablet:aspect-square rounded-3xl overflow-hidden relative">
            <CmsImage
              image={story.thumbnail}
              alt={story.title}
              fill
              className="object-cover"
              sizes="(max-width: 992px) 100vw, 675px"
              priority
            />
          </div>

          {/* 右: テキスト */}
          <div className="flex-1 flex flex-col gap-12 items-start justify-center tablet:pl-[5.5625rem] tablet:pr-[3.75rem] max-tablet:contents">
            {/* SP は左揃え・gap-16 (Figma 4470:16256) / PC は中央揃え・gap-32 (Figma 4470:14625) */}
            <div className="max-tablet:order-1 flex flex-col gap-4 tablet:gap-8 items-start tablet:items-center w-full">
              {/* タグ + 地域 */}
              <div className="flex gap-3 items-center">
                <span className="tag">
                  {getStoryCategoryLabel(story.category)}
                </span>
                {regionNames && (
                  <span className="font-gothic font-medium text-[0.875rem] leading-[1.4] text-dark-green">
                    {regionNames}
                  </span>
                )}
              </div>

              {/* タイトル */}
              <h2
                className="font-mincho text-heading-32 tablet:text-heading-48 text-dark-green text-left tablet:text-center"
                style={{ fontFeatureSettings: "'palt' 1" }}
              >
                {story.title}
              </h2>
            </div>

            {/* 名前・肩書き（例: 「二瓶 浩一さん │ 移住者」）は中央揃え (#24)。
                文字は SP 16px/2.0 (Figma 4470:16265) / PC 18px/1.8 (Figma 4470:14632) */}
            {story.subtitle && (
              <p className="max-tablet:order-3 w-full text-body-m tablet:text-body-l font-gothic font-medium text-dark-green text-center">
                {story.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SP用 floating TOC bar */}
      <PageNavSp items={tocItems} />

      {/* メインコンテンツ: TOC + リッチテキスト */}
      {/* Figma 4470:14633 PC: pb-96 / 4470:16266 SP: pb-120 */}
      <section data-mobile-toc-start className="pb-24 px-[2.8125rem] tablet:pr-[4.6875rem] max-w-[90rem] mx-auto max-tablet:px-4 max-tablet:pb-[7.5rem]">
        <div className="flex max-tablet:flex-col items-start tablet:justify-between">
          {/* 左: 目次サイドバー（PC のみ） */}
          {tocItems.length > 0 && (
            <div className="hidden tablet:block tablet:w-[20.1875rem] shrink-0 tablet:sticky tablet:top-24">
              <div className="bg-light-green rounded-[2rem] px-[1.875rem] py-[2.8125rem]">
                <TocNav items={tocItems} />
              </div>
            </div>
          )}

          {/* 右: リッチテキストコンテンツ */}
          <div className="w-full tablet:w-[45.875rem]">
            <div>
              {/* microCMS content フィールド（richEditorV2）。主要ブロック間の余白を 48px に統一 (#19/#37)。
                  冒頭の上余白は PC 24px (Figma 4470:14677 pt-24) / SP 0 (Figma 4470:16269) */}
              {story.content && (
                <div className="tablet:pt-6">
                  <RichText content={story.content} />
                </div>
              )}

              {/* 物件リンクカード: カテゴリ「物件のつづき」かつ物件指定時のみ表示 (#36)
                  Figma 4470:14717 PC: pt-48, p-30, 20px white, Arrow 48 /
                  4470:16274 SP: 本文の下余白(32)に直結, px-24 py-20, 16px/2.0 cream, arrow-sp 44 */}
              {story.category === 'property' && story.property && (
                <div className="tablet:pt-12">
                  <Link
                    href={`/properties/${story.property.id}`}
                    className="flex items-center justify-between gap-[1.875rem] bg-dark-green rounded-2xl px-6 py-5 tablet:p-[1.875rem] group"
                  >
                    <div className="flex-1 px-2 tablet:px-3">
                      <p className="font-gothic font-medium text-body-m text-cream tablet:text-category-2 tablet:text-white">
                        この物件について
                      </p>
                    </div>
                    <Arrow variant="cream" sizeClassName="w-11 h-11 tablet:w-12 tablet:h-12" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 区切り線 (Figma 4470:14719: PC は左右 75 の内側 1290px / SP は線なし) */}
      <div className="hidden tablet:block max-w-[90rem] mx-auto px-[4.6875rem]">
        <div className="border-t border-dark-green/10" />
      </div>
      <div data-mobile-toc-end />

      {/* もっとストーリーを見る
          Figma 4470:14721 PC: pt-96 pb-144 px-75 gap-64 / 4470:16276 SP: pt-60 pb-120 px-16 gap-32, 見出し 24px (sub-heading-2) */}
      {relatedStories.contents.length > 0 && (
        <section className="pt-24 pb-36 px-[4.6875rem] max-w-[90rem] mx-auto max-tablet:px-4 max-tablet:pt-[3.75rem] max-tablet:pb-[7.5rem] overflow-hidden">
          <div className="flex flex-col gap-8 tablet:gap-16">
            <h3
              className="font-mincho text-heading-24 tablet:text-heading-32 text-dark-green"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              もっとストーリーを見る
            </h3>

            {/* カード3列(PC) / 横スクロール+ドットページャー+全幅「すべて見る」(SP) */}
            <RelatedStoriesGrid stories={relatedStories.contents} />

            {/* ナビゲーション: すべて見る（PC のみ右寄せ。SP の全幅ボタンは RelatedStoriesGrid 内） */}
            <div className="hidden tablet:flex items-center justify-end">
              <ButtonPrimary href="/stories" />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
