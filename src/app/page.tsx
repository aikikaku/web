import { getProperties, getStories, getCustomerVoices } from '@/lib/microcms/queries';
import PropertyCard from '@/components/property/PropertyCard';
import StoryCard from '@/components/story/StoryCard';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600;

export default async function HomePage() {
  const newProperties = await getProperties({
    limit: 6,
    filters: 'status[equals]available',
    orders: '-publishedAt',
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 6 }));

  const latestStories = await getStories({
    limit: 3,
    orders: '-publishedAt',
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 3 }));

  const voices = await getCustomerVoices()
    .catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 50 }));

  return (
    <div>
      {/* ヒーローセクション */}
      <section className="bg-cream overflow-hidden">
        {/* SP: テキスト上 → 画像下の縦レイアウト */}
        <div className="flex flex-col gap-8 pt-12 px-4 tablet:hidden">
          <div className="pl-4">
            <h1 className="text-[32px] leading-[1.5] tracking-wider">
              家と街と人が<br />
              つながる、<br />
              三島の暮らし
            </h1>
          </div>
          <div className="relative h-[354px] rounded-l-3xl overflow-hidden -mr-4">
            <Image
              src="/images/home/hero-1.jpg"
              alt="三島の風景"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* PC: absolute配置レイアウト */}
        <div className="hidden tablet:block relative h-[896px] w-full">
          <div className="absolute left-[45px] top-[154px] w-[557px] h-[742px] rounded-2xl overflow-hidden">
            <Image
              src="/images/home/hero-1.jpg"
              alt="三島の風景"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute right-[192px] top-[154px] w-[220px] h-[293px] rounded-2xl overflow-hidden">
            <Image
              src="/images/home/hero-2.jpg"
              alt="三島の自然"
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(209deg, #fcfff7 6.2%, rgba(252,255,247,0) 84.4%)',
              }}
            />
          </div>
          <div className="absolute right-[89px] bottom-0 w-[206px] h-[154px] rounded-xl overflow-hidden">
            <Image
              src="/images/home/hero-3.jpg"
              alt="三島の街並み"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute left-[769px] top-[408px] w-[645px]">
            <h1 className="text-[56px] leading-[1.5] tracking-wider">
              家と街と人が<br />
              つながる、<br />
              三島の暮らし。
            </h1>
          </div>
        </div>
      </section>

      {/* アイ企画について */}
      <section className="py-[60px] tablet:py-24">
        <div className="px-4 tablet:px-[45px] max-w-[1440px] mx-auto">
          <div className="flex flex-col tablet:flex-row items-center justify-between gap-8 tablet:gap-12">
            {/* テキスト */}
            <div className="tablet:w-[616px] tablet:pl-[30px]">
              <div className="flex flex-col gap-4 tablet:gap-16">
                <div className="flex flex-col gap-4 tablet:gap-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-body-m font-gothic font-medium text-dark-green">
                      アイ企画について
                    </p>
                    <h2 className="text-[32px] tablet:text-[48px]">
                      私たちは、「つくる」<br />
                      不動産会社です。
                    </h2>
                  </div>
                  <p className="text-body-m tablet:text-body-l font-gothic font-medium text-dark-green leading-[2] tablet:leading-[1.8] tablet:w-[469px]">
                    昭和61年、三島市加茂の住宅街に、不動産屋の店舗兼住宅を構えました。
                    ここにいると、町の人の顔が見え、声が聞こえます。
                    地域と日々関わりながら、暮らしの視点で、このまちの魅力と住まいの価値をていねいに伝えていく。
                    そうして、地域の環境を「ともにつくる」ことが私たちの仕事です。
                  </p>
                </div>

                {/* 画像 (SP: テキストの下に表示) */}
                <div className="w-full tablet:hidden">
                  <div className="relative h-[268px] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/home/about.jpg"
                      alt="アイ企画スタッフ"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* SP: フル幅青ボタン / PC: テキスト+矢印 */}
                <Link
                  href="/about"
                  className="tablet:hidden flex items-center justify-center w-full h-12 rounded-full bg-accent-blue font-gothic font-medium text-base text-white hover:opacity-80 transition-opacity"
                >
                  もっと知る
                </Link>
                <Link
                  href="/about"
                  className="hidden tablet:inline-flex items-center gap-2 font-gothic font-medium text-[18px] text-dark-green hover:opacity-70 transition-opacity w-fit"
                >
                  もっと知る
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* 画像 (PC: 右カラムに表示) */}
            <div className="hidden tablet:block w-[557px] shrink-0">
              <div className="relative h-[742px] rounded-3xl overflow-hidden">
                <Image
                  src="/images/home/about.jpg"
                  alt="アイ企画スタッフ"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 不動産サービスリンク */}
      <section className="relative py-[60px] tablet:py-24 overflow-hidden">
        {/* 背景画像 */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/home/service-bg.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative px-4 tablet:px-[45px] max-w-[1440px] mx-auto">
          <div className="flex flex-col tablet:flex-row items-center justify-between gap-6">
            {/* カード1: お探しの方 */}
            <Link
              href="/for-customer"
              className="group bg-cream rounded-3xl p-6 tablet:p-8 flex flex-row gap-4 tablet:gap-8 items-start w-full tablet:w-[646px] hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <h3 className="font-mincho text-2xl tablet:text-[32px] leading-[1.5] tracking-wider mb-1 tablet:mb-2">
                    不動産を<br />お探しの方へ
                  </h3>
                  <p className="text-body-s tablet:text-body-l font-gothic font-medium text-dark-green">
                    買いたい・借りたい
                  </p>
                </div>
                <span className="inline-flex items-center justify-center w-10 h-10 tablet:w-12 tablet:h-12 rounded-full bg-accent-blue mt-3 tablet:mt-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className="w-[140px] h-[140px] tablet:w-[294px] tablet:h-[220px] relative rounded-xl overflow-hidden shrink-0">
                <Image
                  src="/images/home/service-customer.jpg"
                  alt="不動産をお探しの方へ"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            </Link>

            {/* カード2: お持ちの方 */}
            <Link
              href="/for-owner"
              className="group bg-cream rounded-3xl p-6 tablet:p-8 flex flex-row gap-4 tablet:gap-8 items-start w-full tablet:w-[646px] hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <h3 className="font-mincho text-2xl tablet:text-[32px] leading-[1.5] tracking-wider mb-1 tablet:mb-2">
                    不動産を<br />お持ちの方へ
                  </h3>
                  <p className="text-body-s tablet:text-body-l font-gothic font-medium text-dark-green">
                    売りたい・貸したい
                  </p>
                </div>
                <span className="inline-flex items-center justify-center w-10 h-10 tablet:w-12 tablet:h-12 rounded-full bg-accent-blue mt-3 tablet:mt-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className="w-[140px] h-[140px] tablet:w-[294px] tablet:h-[220px] relative rounded-xl overflow-hidden shrink-0">
                <Image
                  src="/images/home/service-owner.jpg"
                  alt="不動産をお持ちの方へ"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 新着物件セクション */}
      <section className="bg-cream py-[60px] tablet:pt-24 tablet:pb-0">
        <div className="px-4 tablet:px-[75px]">
          <div className="flex flex-col gap-2 mb-8 tablet:mb-24">
            <p className="text-body-m font-gothic font-medium text-dark-green">
              新着物件
            </p>
            <h2 className="text-[32px] tablet:text-[48px]">今日の出会いを、さがしに</h2>
          </div>
        </div>

        {newProperties.contents.length > 0 && (
          <>
            {/* SP: 横スクロール */}
            <div className="tablet:hidden overflow-x-auto pl-4 pb-4">
              <div className="flex gap-5 min-w-max pr-4">
                {newProperties.contents.slice(0, 6).map((property) => (
                  <div key={property.id} className="w-[332px] shrink-0">
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            </div>

            {/* PC: 3列グリッド */}
            <div className="hidden tablet:block px-[75px]">
              <div className="grid grid-cols-3 gap-x-[30px] gap-y-24">
                {newProperties.contents.slice(0, 6).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* すべて見る */}
        <div className="flex items-center justify-end mt-8 tablet:mt-24 px-4 tablet:px-[75px]">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 font-gothic font-medium text-base tablet:text-[18px] text-dark-green hover:opacity-70 transition-opacity"
          >
            すべて見る
            <span className="inline-flex items-center justify-center w-10 h-10 tablet:w-12 tablet:h-12 rounded-full bg-accent-blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* 駐車場セクション */}
      <section className="py-[60px] tablet:py-24">
        <div className="px-4 tablet:px-[45px] flex justify-center">
          <Link
            href="/for-customer"
            className="block bg-light-green rounded-3xl p-6 tablet:p-8 max-w-[646px] w-full group"
          >
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-body-m font-gothic font-medium text-dark-green">
                  駐車場を借りたい
                </p>
                <p className="font-mincho text-2xl tablet:text-[32px] leading-[1.5] tracking-wider text-dark-green">
                  三島市で駐車場をお探しの方へ
                </p>
              </div>
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue shrink-0 ml-4 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ストーリーセクション - 暮らしを知る */}
      <section className="bg-cream py-[60px] tablet:py-24">
        <div className="px-4 tablet:px-[75px]">
          <div className="flex flex-col gap-2 mb-8 tablet:mb-24">
            <p className="text-category-2 font-gothic font-medium text-dark-green">
              暮らしを知る
            </p>
            <h2 className="text-[32px] tablet:text-[48px]">三島の暮らしに、ふれる・深まる。</h2>
          </div>
        </div>

        {latestStories.contents.length > 0 ? (
          <>
            {/* SP: 横スクロール */}
            <div className="tablet:hidden overflow-x-auto pl-4 pb-4">
              <div className="flex gap-4 min-w-max pr-4">
                {latestStories.contents.map((story) => (
                  <div key={story.id} className="w-[300px] shrink-0">
                    <StoryCard story={story} />
                  </div>
                ))}
              </div>
            </div>

            {/* PC: 左に大カード + 右に中カード2枚 */}
            <div className="hidden tablet:block px-[75px]">
              <div className="flex gap-[117px]">
                {/* 左: 大きなストーリーカード */}
                {latestStories.contents[0] && (
                  <div className="w-[646px] shrink-0">
                    <Link href={`/stories/${latestStories.contents[0].id}`} className="block group">
                      <div className="relative h-[485px] rounded-3xl overflow-hidden mb-8">
                        <Image
                          src={latestStories.contents[0].thumbnail?.url || '/images/home/hero-1.jpg'}
                          alt={latestStories.contents[0].title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="px-3">
                        <div className="flex gap-3 items-center mb-4">
                          <span className="tag-pill text-[14px] leading-none px-3 py-1.5">
                            物件のつづき
                          </span>
                          <span className="text-body-s font-gothic font-medium text-dark-green">
                            {latestStories.contents[0].regions?.[0]?.name || ''}
                          </span>
                        </div>
                        <h3 className="font-mincho text-[32px] leading-[1.5] tracking-wider text-dark-green">
                          {latestStories.contents[0].title}
                        </h3>
                        <span className="inline-flex items-center gap-1 mt-6 px-6 py-2.5 border border-dark-green rounded-full font-gothic font-medium text-base text-dark-green hover:bg-gray-50 transition-colors">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z" />
                          </svg>
                          ストーリーを読む
                        </span>
                      </div>
                    </Link>
                  </div>
                )}

                {/* 右: 中サイズカード2枚 */}
                <div className="flex-1 flex flex-col gap-24">
                  {latestStories.contents.slice(1, 3).map((story) => (
                    <Link key={story.id} href={`/stories/${story.id}`} className="flex gap-8 group">
                      <div className="relative w-[264px] h-[352px] rounded-2xl overflow-hidden shrink-0">
                        <Image
                          src={story.thumbnail?.url || '/images/home/hero-1.jpg'}
                          alt={story.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex gap-3 items-center mb-4">
                          <span className="tag-pill text-[14px] leading-none px-3 py-1.5">
                            地域のこと
                          </span>
                          <span className="text-body-s font-gothic font-medium text-dark-green">
                            {story.regions?.[0]?.name || ''}
                          </span>
                        </div>
                        <h4 className="font-mincho text-[24px] leading-[1.6] tracking-wider text-dark-green">
                          {story.title}
                        </h4>
                        <span className="inline-flex items-center gap-1 mt-6 px-6 py-2.5 border border-dark-green rounded-full font-gothic font-medium text-base text-dark-green hover:bg-gray-50 transition-colors w-fit">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z" />
                          </svg>
                          ストーリーを読む
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 py-12">
            ストーリーはまだありません
          </p>
        )}

        {/* すべて見る */}
        <div className="flex items-center justify-end mt-8 tablet:mt-24 px-4 tablet:px-[75px]">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 font-gothic font-medium text-base tablet:text-[18px] text-dark-green hover:opacity-70 transition-opacity"
          >
            すべて見る
            <span className="inline-flex items-center justify-center w-10 h-10 tablet:w-12 tablet:h-12 rounded-full bg-accent-blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* お客様の声セクション */}
      {voices.contents.length > 0 && (
        <section className="bg-light-green pt-[60px] pb-[40px] tablet:pt-24 tablet:pb-16">
          <div className="px-4 tablet:px-[75px]">
            <div className="flex flex-col gap-2 mb-8 tablet:mb-16">
              <p className="text-body-m font-gothic font-medium text-dark-green">
                お客様の声
              </p>
              <h3 className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-wider">
                お客様からいただいた声をご紹介
              </h3>
            </div>
          </div>
          <div className="overflow-x-auto pl-4 tablet:pl-[75px] pb-4">
            <div className="flex gap-3 min-w-max pr-4">
              {voices.contents.map((voice) => (
                <div key={voice.id} className="w-[320px] tablet:w-[644px] shrink-0">
                  <div className="bg-cream rounded-3xl px-6 tablet:px-[58px] pt-8 tablet:pt-12 pb-10 tablet:pb-14 h-full">
                    <div className="flex flex-col gap-4">
                      {/* Blue quote mark */}
                      <Image
                        src="/images/mock/quote-mark-blue.svg"
                        alt=""
                        width={32}
                        height={24}
                        className="w-8 h-6"
                      />
                      <h3 className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-wider line-clamp-2">
                        {voice.title}
                      </h3>
                      <p className="text-body-s tablet:text-body-m font-gothic font-medium text-black line-clamp-3">
                        {voice.content.replace(/<[^>]*>/g, '')}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-8 tablet:mt-12 text-body-m font-gothic font-medium text-dark-green">
                      <div className="flex items-center">
                        {voice.location && <span className="opacity-60">{voice.location}</span>}
                        {voice.location && voice.propertyType && (
                          <span className="leading-[1.4]">｜</span>
                        )}
                        {voice.propertyType && <span className="opacity-60">{voice.propertyType}</span>}
                      </div>
                      <span className="opacity-60">{voice.customerName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-6 tablet:mt-8 px-4 tablet:px-[75px]">
            {/* Pagination dots (decorative) */}
            <div className="flex items-center gap-2">
              <span className="hidden tablet:inline-block text-dark-green/40">&lt;</span>
              {voices.contents.slice(0, 6).map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-dark-green' : 'bg-dark-green/30'}`}
                />
              ))}
              <span className="hidden tablet:inline-block text-dark-green/40">&gt;</span>
            </div>
            <Link
              href="/voice"
              className="inline-flex items-center gap-2 font-gothic font-medium text-base tablet:text-[18px] text-dark-green hover:opacity-70 transition-opacity"
            >
              すべて見る
              <span className="inline-flex items-center justify-center w-10 h-10 tablet:w-12 tablet:h-12 rounded-full bg-accent-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* お知らせセクション */}
      <section className="py-[60px] tablet:py-24">
        <div className="px-4 tablet:px-[75px]">
          <div className="flex flex-col tablet:flex-row gap-8 tablet:gap-[88px]">
            {/* 見出し */}
            <div className="tablet:w-[645px] shrink-0">
              <div className="flex flex-col gap-2">
                <p className="text-body-m font-gothic font-medium text-dark-green">
                  お知らせ
                </p>
                <h2 className="text-[24px] tablet:text-[32px]">最新のお知らせ</h2>
              </div>
            </div>

            {/* ニュースリスト */}
            <div className="flex-1">
              {[
                { title: '夏季休業のお知らせ', date: '2025.08.01' },
                { title: '年末年始の営業について', date: '2025.07.15' },
                { title: 'ホームページをリニューアルしました', date: '2025.06.01' },
                { title: 'GW期間中の営業のお知らせ', date: '2025.04.20' },
                { title: '新年のご挨拶', date: '2025.01.06' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-6 border-b border-dark-green/10 pr-2"
                >
                  <div>
                    <p className="font-gothic font-medium text-[16px] leading-[2] text-black">
                      {item.title}
                    </p>
                    <p className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green opacity-60">
                      {item.date}
                    </p>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M6 9l6 6 6-6" stroke="#2a363b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTAバナー */}
      <section className="px-4 tablet:px-[45px] pb-[60px] tablet:pb-36">
        <div className="relative rounded-3xl overflow-hidden px-6 py-16 tablet:px-[30px] tablet:py-24">
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
          <div className="relative z-10 flex flex-col tablet:flex-row gap-6 tablet:gap-[30px] items-start">
            <div className="text-white tablet:w-[645px] shrink-0">
              <p className="text-body-m font-gothic font-medium mb-2">お問い合わせ</p>
              <p className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.04em]">
                不動産に関すること、<br />
                ぜひご相談ください。
              </p>
            </div>
            <div className="flex flex-col tablet:flex-row gap-3 w-full tablet:w-auto tablet:flex-1 tablet:justify-end">
              <Link
                href="/for-customer"
                className="bg-cream/95 rounded-3xl px-6 py-8 tablet:px-[30px] tablet:pt-10 tablet:pb-[30px] text-center w-full tablet:w-[264px] flex flex-col items-center gap-[30px] hover:bg-white transition-colors"
              >
                <span className="font-gothic font-medium text-[18px] tablet:text-[20px] leading-[1.6] text-dark-green">
                  不動産をお探しの方
                </span>
                <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/for-owner"
                className="bg-cream/95 rounded-3xl px-6 py-8 tablet:px-[30px] tablet:pt-10 tablet:pb-[30px] text-center w-full tablet:w-[264px] flex flex-col items-center gap-[30px] hover:bg-white transition-colors"
              >
                <span className="font-gothic font-medium text-[18px] tablet:text-[20px] leading-[1.6] text-dark-green">
                  その他のお問い合わせ
                </span>
                <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
