import { getStory, getStories } from '@/lib/microcms/queries';
import StoryCard from '@/components/story/StoryCard';
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

// モック: 目次データ
const mockTocItems = [
  'この家との出会い',
  '〇〇の魅力',
  '周辺環境',
  '担当者より',
  '検討中の方へ',
  'オーナー様からのコメント',
  '物件概要',
];

// モック: ストーリー構造化コンテンツ
const mockSections = [
  {
    category: 'この家との出会い',
    title: 'この家に、静けさとあたたかさがあった。',
    body: `静かな住宅街の一角。
地元・三島市谷田に建つこの家を初めて訪れたのは、春の昼下がりでした。
やわらかな光が落ちる南向きの庭と、どこか落ち着いた佇まい。
この家は、派手さではなく「ずっと暮らしていける安心感」が、最初の印象に残ります。

私たちスタッフも、案内のたびに「ここに暮らす人は、きっとこんなふうに過ごすんだろうな」と思い描いてしまう、そんな家です。`,
    image: { src: '/images/mock/property-1.jpg', caption: '南向きの外観' },
    comment: 'ここに一言コメントが入ります',
  },
  {
    category: '〇〇の魅力',
    title: '暮らしの目線で、家の中を歩いてみる。',
    body: `玄関を開けると、廊下が一直線に伸び、その先にひらけたLDKが迎えてくれます。
南側から入る光が部屋を包み、冬でも日中は暖房いらず。キッチンに立った時の視線の抜けも心地よく、家族の様子を見渡せる安心感があります。

2階には3部屋。子ども部屋、ワークスペース、寝室。ライフスタイルに合わせたアレンジも想像しやすく、何より収納がしっかり確保されているのも嬉しいポイント。`,
    images: [
      { src: '/images/home/hero-2.jpg', caption: '南向きの外観' },
      { src: '/images/home/hero-3.jpg', caption: '南向きの外観' },
    ],
  },
  {
    category: '周辺環境',
    title: '「生活圏としての谷田」が、この家を支えている。',
    body: `この家が位置するのは、三島駅から車で10分ほどの「谷田」エリア。
落ち着いた環境ながら、スーパー、コンビニ、小学校、公園が半径500m圏内に揃い、生活動線のよさが光ります。

さらに、徒歩圏にある「楽寿園」や四季折々の景観が楽しめる散歩道など、自然と人との距離がちょうどよい街並みです。`,
    comment: 'ここに一言コメントが入ります',
  },
  {
    category: '担当者より',
    title: 'この家を紹介したい理由',
    body: `不動産屋として多くの物件を見てきた中で、
「紹介したい家」と「ただ売れる家」は、少し違うと感じます。

この家は、住んだ人の暮らしが想像できる家。
売主さまも丁寧に手入れをされていて、次の方が気持ちよく住み始められる状態が整っています。
地域に根差した私たちだからこそ、おすすめしたい理由がいくつもあるのです。`,
    image: { src: '/images/home/about.jpg', caption: '担当者が物件を案内している様子' },
    comment: 'ここに一言コメントが入ります',
  },
  {
    category: '検討中の方へ',
    title: 'まだ「迷っている方」へ、伝えたいこと。',
    body: `この物件が合うかどうかは、実際に見てみないとわかりません。
でも、気になったときが"その家と出会ったタイミング"かもしれません。

「通りがかっただけで、ちょっと気になって…」
「移住を考えていて、まずは話だけ聞きたい」
そんなきっかけから、お手伝いできればと思っています。

この家が、あなたにとっての"暮らしの入口"になれたら——
そう願いながら、今日も私たちはこの家のカギを手に待っています。`,
    image: { src: '/images/home/hero-1.jpg', caption: '空室の玄関に差し込む光' },
    comment: 'ここに一言コメントが入ります',
  },
];

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

  return (
    <div className="bg-cream">
      {/* パンくず */}
      <div className="px-[45px] max-w-[1440px] mx-auto max-tablet:px-4">
        <Breadcrumb
          items={[
            { label: '暮らしを知る', href: '/stories' },
            { label: story.title },
          ]}
        />
      </div>

      {/* ヒーローセクション */}
      <section className="pt-12 pb-24 px-[45px] max-w-[1440px] mx-auto max-tablet:px-4 max-tablet:pb-12">
        <div className="flex max-tablet:flex-col gap-0">
          {/* 左: 画像 */}
          <div className="tablet:w-[675px] shrink-0 h-[640px] max-tablet:h-[300px] rounded-3xl overflow-hidden relative">
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
              <p className="text-body-l font-gothic font-medium text-dark-green text-left">
                {story.subtitle}
              </p>
            )}
            {/* Figmaでは長めの説明テキストが入る */}
            <p className="text-body-l font-gothic font-medium text-dark-green text-left leading-[1.8]">
              三島市谷田・つつじヶ丘の高台に佇む、三角形の敷地に建つちょっと個性的な住まい。コンパクトながら、南側にひらけた玄関前の庭では季節の花や家庭菜園も楽しめます。昭和50年築の鉄骨造2階建。しっかりした構造で、まだまだ活かせる昭和の良き時代のつくり。室内はリフォーム前提ですが、そのぶん「自分好みに変えられる」余白があります。「この住まいを育てながら使っていく」という大人の暮らしにぴったりの物件です。
            </p>
          </div>
        </div>
      </section>

      {/* メインコンテンツ: TOC + リッチテキスト */}
      <section className="pb-24 px-[45px] tablet:pr-[75px] max-w-[1440px] mx-auto max-tablet:px-4">
        <div className="flex max-tablet:flex-col gap-0 items-start">
          {/* 左: 目次サイドバー */}
          <div className="tablet:w-[323px] shrink-0 tablet:sticky tablet:top-24 max-tablet:mb-8 max-tablet:w-full">
            <div className="bg-light-green rounded-[32px] px-[30px] py-[45px]">
              <nav className="flex flex-col">
                {mockTocItems.map((item, i) => (
                  <div key={i} className="flex items-center h-[40px]">
                    {/* タイムラインドット */}
                    <div className="w-[40px] flex flex-col items-center h-full shrink-0">
                      {i > 0 && (
                        <div className="w-[1.5px] flex-1 bg-dark-green/30" />
                      )}
                      {i === 0 && <div className="flex-1" />}
                      <div
                        className={`w-[10px] h-[10px] rounded-full shrink-0 ${
                          i === 0 ? 'bg-dark-green' : 'bg-dark-green/30'
                        }`}
                      />
                      {i < mockTocItems.length - 1 && (
                        <div className="w-[1.5px] flex-1 bg-dark-green/30" />
                      )}
                      {i === mockTocItems.length - 1 && <div className="flex-1" />}
                    </div>
                    <span
                      className={`font-gothic font-medium text-base leading-[1.5] text-dark-green ${
                        i > 0 ? 'opacity-50' : ''
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* 右: リッチテキストコンテンツ */}
          <div className="flex-1 tablet:pl-[calc(1440px-323px-75px-734px-45px)] max-tablet:pl-0">
            <div className="max-w-[734px]">
              {mockSections.map((section, sIdx) => (
                <div key={sIdx}>
                  {/* サブ見出し */}
                  <div className={`flex flex-col gap-2 ${sIdx === 0 ? 'pt-6 pb-12' : 'py-12'}`}>
                    <p className="text-body-m font-gothic font-medium text-dark-green">
                      {section.category}
                    </p>
                    <h3
                      className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green"
                      style={{ fontFeatureSettings: "'palt' 1" }}
                    >
                      {section.title}
                    </h3>
                  </div>

                  {/* 本文 */}
                  <div className="pb-12">
                    <div className="text-body-l font-gothic font-medium text-dark-green leading-[1.8] whitespace-pre-wrap">
                      {section.body}
                    </div>
                  </div>

                  {/* 画像 + キャプション (単一) */}
                  {'image' in section && section.image && (
                    <div className="pb-12">
                      <div className="flex flex-col gap-3">
                        <div className="aspect-[763/509] relative rounded-3xl overflow-hidden">
                          <Image
                            src={section.image.src}
                            alt={section.image.caption}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-body-s font-gothic font-medium text-dark-green pl-[30px]">
                          {section.image.caption}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 画像 + キャプション (複数) */}
                  {'images' in section && section.images && section.images.map((img, imgIdx) => (
                    <div key={imgIdx} className="pb-12">
                      <div className="flex flex-col gap-3">
                        <div className="aspect-[763/509] relative rounded-3xl overflow-hidden">
                          <Image
                            src={img.src}
                            alt={img.caption}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-body-s font-gothic font-medium text-dark-green pl-[30px]">
                          {img.caption}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* コメント */}
                  {'comment' in section && section.comment && (
                    <div className="pb-12">
                      <div className="flex gap-6 items-start">
                        <div className="flex flex-col items-center pt-2 shrink-0">
                          <div className="w-[50px] h-[50px] bg-cream rounded-full overflow-hidden relative">
                            <Image
                              src="/images/home/about.jpg"
                              alt="アイ企画"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-body-s font-gothic font-medium text-dark-green mt-0.5">
                            アイ企画
                          </span>
                        </div>
                        <div className="flex-1 bg-light-green rounded-3xl px-[30px] py-[30px] flex items-center">
                          <p className="text-body-m font-gothic font-medium text-dark-green">
                            {section.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* 物件リンクカード */}
              {story.property && (
                <div className="pt-12">
                  <Link
                    href={`/properties/${story.property.id}`}
                    className="flex items-center justify-between bg-dark-green rounded-2xl p-[30px] h-[108px] group"
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
            <div className="flex gap-[30px] max-tablet:overflow-x-auto max-tablet:pb-4">
              {relatedStories.contents.map((s) => (
                <div key={s.id} className="w-[410px] shrink-0 max-tablet:w-[300px]">
                  <StoryCard story={s} />
                </div>
              ))}
            </div>

            {/* ナビゲーション: すべて見る */}
            <div className="flex items-center justify-between">
              <div />
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 font-gothic font-medium text-[18px] text-dark-green hover:opacity-70 transition-opacity"
              >
                すべて見る
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
