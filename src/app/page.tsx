import { getProperties, getStories, getCustomerVoices } from '@/lib/microcms/queries';
import PropertyCard from '@/components/property/PropertyCard';
import NewsAccordion from '@/components/home/NewsAccordion';
import VoiceCarousel from '@/components/home/VoiceCarousel';
import PropertyCarousel from '@/components/home/PropertyCarousel';
import StoryCarousel from '@/components/home/StoryCarousel';
import HeroSlideshowSP from '@/components/home/HeroSlideshowSP';
import SeeAllLink from '@/components/ui/SeeAllLink';
import ParkingBanner from '@/components/ui/ParkingBanner';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600;

export default async function HomePage() {
  const newProperties = await getProperties({
    limit: 6,
    filters: 'status[contains]available',
    orders: '-publishedAt',
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 6 }));

  const latestStories = await getStories({
    limit: 3,
    orders: '-publishedAt',
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 3 }));

  const voices = await getCustomerVoices({ orders: '-publishedAt' })
    .catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 50 }));

  return (
    <div>
      {/* ヒーローセクション */}
      <section className="bg-cream overflow-hidden relative">
        {/* SP: テキスト上 → スライドショー画像（next + dots） */}
        <div className="flex flex-col gap-8 pt-12 px-4 tablet:hidden">
          <div className="pl-4">
            <h1 className="font-mincho text-[32px] leading-[1.5] tracking-[1.28px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              家と街と人が<br />
              つながる、<br />
              三島の暮らし
            </h1>
          </div>
          <HeroSlideshowSP />
        </div>

        {/* PC: absolute配置レイアウト (1440フレーム中央寄せ + 右側画像は viewport右端アンカー) */}
        <div className="hidden tablet:block relative h-[896px] w-full max-w-[1440px] mx-auto">
          <div className="absolute left-[45px] top-[154px] w-[557px] h-[742px] rounded-2xl overflow-hidden">
            <Image
              src="/images/home/hero-1.jpg"
              alt="三島の風景"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute left-[769px] top-[408px] w-[645px]">
            <h1 className="font-mincho text-[56px] leading-[1.5] tracking-[2.24px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              家と街と人が<br />
              つながる、<br />
              三島の暮らし
            </h1>
          </div>
        </div>
        {/* 右上画像: viewport右端アンカー (Figma: 右端から28px はみ出る) */}
        <div className="hidden tablet:block absolute right-[-28px] top-[154px] w-[220px] h-[293px] rounded-2xl overflow-hidden">
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
        {/* 右下画像: viewport右端から89px (Figma: 1145+206=1351, 1440-1351=89) */}
        <div className="hidden tablet:block absolute right-[89px] top-[742px] w-[206px] h-[154px] rounded-xl overflow-hidden">
          <Image
            src="/images/home/hero-3.jpg"
            alt="三島の街並み"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* アイ企画について */}
      <section>
        <div className="px-4 py-[60px] tablet:px-[45px] tablet:py-[96px] max-w-[1440px] mx-auto">
          <div className="flex flex-col tablet:flex-row items-start tablet:items-center justify-between">
            {/* テキスト */}
            <div className="tablet:w-[616px]">
              <div className="flex flex-col gap-8 tablet:gap-16 tablet:pl-[30px]">
                <div className="flex flex-col gap-4 tablet:gap-12">
                  <div className="flex flex-col gap-2">
                    <p className="text-body-m font-gothic font-medium text-dark-green">
                      アイ企画について
                    </p>
                    <h2 className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[1.28px] tablet:tracking-[1.92px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                      私たちは、「つくる」<br />
                      不動産会社です。
                    </h2>
                  </div>
                  <p className="text-body-m tablet:text-[18px] font-gothic font-medium text-dark-green leading-[2] tablet:leading-[1.8] tablet:w-[469px]">
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

                {/* SP: フル幅青ボタン / PC: テキスト+矢印（右寄せ） */}
                <Link
                  href="/about"
                  className="tablet:hidden flex items-center justify-center w-full h-12 rounded-full bg-accent-blue font-gothic font-medium text-base text-white hover:opacity-80 transition-opacity"
                >
                  もっと知る
                </Link>
                <div className="hidden tablet:flex tablet:justify-end">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 font-gothic font-medium text-[18px] text-dark-green hover:opacity-70 transition-opacity"
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
            </div>

            {/* 画像 (PC: 右カラムに表示) */}
            <div className="hidden tablet:block w-[557px] shrink-0">
              <div className="relative h-[742px] rounded-2xl overflow-hidden">
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
      <section className="relative py-[60px] tablet:py-[96px] overflow-hidden bg-[#d9d9d9]">
        {/* SP: 全面 cover 背景 / PC: 同じ image だが位置調整なしで cover */}
        <Image
          src="/images/home/service-bg.png"
          alt=""
          fill
          aria-hidden
          className="object-cover pointer-events-none select-none"
          sizes="100vw"
        />
        <div className="relative px-4 tablet:px-[45px] max-w-[1440px] mx-auto">
          {/* SP: 背景画像cover + ダークオーバーレイ */}
          <div className="flex flex-col gap-6 tablet:hidden">
            <Link
              href="/for-customer"
              className="group relative flex items-center gap-6 rounded-2xl overflow-hidden px-4 pt-9 pb-10"
            >
              <div className="absolute inset-0 -z-0">
                <Image
                  src="/images/home/service-customer.jpg"
                  alt=""
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: 'linear-gradient(-28deg, rgba(39,51,59,0.2) 1.5%, rgba(39,51,59,0.5) 39.7%)' }}
                />
              </div>
              <div className="relative z-10 flex-1 min-w-0 flex flex-col gap-2 text-white">
                <h3 className="font-mincho text-[24px] leading-[1.6] tracking-[0.96px]" style={{ fontFeatureSettings: "'palt' 1" }}>
                  不動産を<br />お探しの方
                </h3>
                <p className="text-body-m font-gothic font-medium leading-[2]">
                  買いたい・借りたい
                </p>
              </div>
              <span className="relative z-10 inline-flex items-center justify-center size-11 rounded-full bg-accent-blue shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            <Link
              href="/for-owner"
              className="group relative flex items-center gap-6 rounded-2xl overflow-hidden px-4 pt-9 pb-10"
            >
              <div className="absolute inset-0 -z-0">
                <Image
                  src="/images/home/service-owner.jpg"
                  alt=""
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: 'linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)' }}
                />
              </div>
              <div className="relative z-10 flex-1 min-w-0 flex flex-col gap-2 text-white">
                <h3 className="font-mincho text-[24px] leading-[1.6] tracking-[0.96px]" style={{ fontFeatureSettings: "'palt' 1" }}>
                  不動産を<br />お持ちの方へ
                </h3>
                <p className="text-body-m font-gothic font-medium leading-[2]">
                  売りたい・貸したい
                </p>
              </div>
              <span className="relative z-10 inline-flex items-center justify-center size-11 rounded-full bg-accent-blue shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>

          {/* PC: 既存レイアウト維持 */}
          <div className="hidden tablet:flex flex-row items-center justify-between gap-6">
            {/* カード1: お探しの方 */}
            <Link
              href="/for-customer"
              className="group bg-cream rounded-3xl p-[30px] flex flex-row gap-[30px] items-start w-[646px] hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="flex flex-col justify-between flex-1 min-w-0 h-[220px] pt-2 px-3">
                <div className="flex flex-col gap-2">
                  <h3 className="font-mincho text-[32px] leading-[1.5] tracking-[1.28px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                    不動産を<br />お探しの方へ
                  </h3>
                  <p className="text-[18px] leading-[1.8] font-gothic font-medium text-dark-green">
                    買いたい・借りたい
                  </p>
                </div>
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className="w-[294px] h-[220px] relative rounded-xl overflow-hidden shrink-0">
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
              className="group bg-cream rounded-3xl p-[30px] flex flex-row gap-[30px] items-start w-[646px] hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="flex flex-col justify-between flex-1 min-w-0 h-[220px] pt-2 px-3">
                <div className="flex flex-col gap-2">
                  <h3 className="font-mincho text-[32px] leading-[1.5] tracking-[1.28px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                    不動産を<br />お持ちの方へ
                  </h3>
                  <p className="text-[18px] leading-[1.8] font-gothic font-medium text-dark-green">
                    売りたい・貸したい
                  </p>
                </div>
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className="w-[294px] h-[220px] relative rounded-xl overflow-hidden shrink-0">
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
      <section className="bg-cream pt-[60px] pb-[60px] tablet:pt-[96px] tablet:pb-0">
        <div className="px-4 tablet:px-[75px] max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-2 mb-8 tablet:mb-[96px]">
            <p className="text-body-m font-gothic font-medium text-dark-green">
              新着物件
            </p>
            <h2 className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[1.28px] tablet:tracking-[1.92px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              今日の出会いを、<br className="tablet:hidden" />さがしに
            </h2>
          </div>
        </div>

        {newProperties.contents.length > 0 && (
          <>
            {/* SP: スライドショー（dots+arrows付き） */}
            <PropertyCarousel properties={newProperties.contents.slice(0, 6)} />

            {/* PC: 3列グリッド */}
            <div className="hidden tablet:block max-w-[1440px] mx-auto px-[75px]">
              <div className="grid grid-cols-3 gap-x-[30px] gap-y-[96px]">
                {newProperties.contents.slice(0, 6).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* PC: すべて見る */}
        <div className="hidden tablet:flex items-center justify-end mt-[96px] max-w-[1440px] mx-auto px-[75px]">
          <SeeAllLink href="/properties" />
        </div>
      </section>

      {/* 駐車場セクション */}
      <ParkingBanner />

      {/* ストーリーセクション - 暮らしを知る */}
      <section className="bg-cream pt-0 pb-[60px] tablet:py-[96px]">
        <div className="px-4 tablet:px-[75px] max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-2 mb-8 tablet:mb-[96px]">
            <p className="text-category-2 font-gothic font-medium text-dark-green">
              暮らしを知る
            </p>
            <h2 className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[1.28px] tablet:tracking-[1.92px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              三島の暮らしに、<br className="tablet:hidden" />ふれる・深まる。
            </h2>
          </div>
        </div>

        {latestStories.contents.length > 0 ? (
          <>
            {/* SP: スライドショー */}
            <StoryCarousel stories={latestStories.contents} />


            {/* PC: 左に大カード + 右に中カード2枚 */}
            <div className="hidden tablet:block px-[75px]">
              <div className="flex gap-[117px]">
                {/* 左: 大きなストーリーカード */}
                {latestStories.contents[0] && (
                  <div className="w-[646px] shrink-0">
                    <Link href={`/stories/${latestStories.contents[0].id}`} className="block group">
                      <div className="relative h-[485px] rounded-3xl overflow-hidden">
                        <Image
                          src={latestStories.contents[0].thumbnail?.url || '/images/home/hero-1.jpg'}
                          alt={latestStories.contents[0].title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="pt-[30px] px-3">
                        <div className="flex gap-3 items-center mb-4">
                          <span className="tag-pill text-[14px] leading-none px-3 py-1.5">
                            {latestStories.contents[0].category === 'property' ? '物件のつづき' : latestStories.contents[0].category === 'regional' ? '地域のこと' : latestStories.contents[0].category === 'daily' ? '日々のこと' : '物件のつづき'}
                          </span>
                          <span className="text-body-s font-gothic font-medium text-dark-green">
                            {latestStories.contents[0].regions?.[0]?.name || ''}
                          </span>
                        </div>
                        <h3 className="font-mincho text-[32px] leading-[1.5] tracking-[1.28px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                          {latestStories.contents[0].title}
                        </h3>
                        <span className="inline-flex items-center gap-1 mt-6 h-11 px-6 border border-dark-green rounded-full font-gothic font-medium text-base leading-none text-dark-green hover:opacity-70 transition-opacity">
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
                <div className="flex flex-col gap-[96px] w-[558px]">
                  {latestStories.contents.slice(1, 3).map((story) => (
                    <Link key={story.id} href={`/stories/${story.id}`} className="flex gap-[30px] h-[352px] group">
                      <div className="relative w-[264px] h-[352px] rounded-2xl overflow-hidden shrink-0">
                        <Image
                          src={story.thumbnail?.url || '/images/home/hero-1.jpg'}
                          alt={story.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex gap-3 items-center mb-4">
                          <span className="tag-pill text-[14px] leading-none px-3 py-1.5">
                            {story.category === 'property' ? '物件のつづき' : story.category === 'regional' ? '地域のこと' : story.category === 'daily' ? '日々のこと' : '地域のこと'}
                          </span>
                          <span className="text-body-s font-gothic font-medium text-dark-green">
                            {story.regions?.[0]?.name || ''}
                          </span>
                        </div>
                        <h4 className="font-mincho text-[24px] leading-[1.6] tracking-[0.96px] text-dark-green w-[264px]" style={{ fontFeatureSettings: "'palt' 1" }}>
                          {story.title}
                        </h4>
                        <span className="inline-flex items-center gap-1 mt-6 h-11 px-6 border border-dark-green rounded-full font-gothic font-medium text-base leading-none text-dark-green hover:opacity-70 transition-opacity w-fit">
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

        {/* PC: すべて見る */}
        <div className="hidden tablet:flex items-center justify-end mt-[96px] max-w-[1440px] mx-auto px-[75px]">
          <SeeAllLink href="/stories" />
        </div>
      </section>

      {/* お客様の声セクション */}
      {voices.contents.length > 0 && (
        <section className="bg-light-green py-[60px] tablet:pt-[96px] tablet:pb-16">
          <div className="px-4 tablet:px-[75px] max-w-[1440px] mx-auto">
            <div className="mb-8 tablet:mb-16">
              <h3 className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.96px] tablet:tracking-[1.28px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                お客様の声
              </h3>
            </div>
          </div>
          <VoiceCarousel voices={voices.contents} />
        </section>
      )}

      {/* お知らせセクション */}
      <section className="py-[60px] tablet:py-[96px]">
        <div className="px-4 tablet:px-[75px] max-w-[1440px] mx-auto">
          <div className="flex flex-col tablet:flex-row gap-8 tablet:gap-[88px]">
            {/* 見出し */}
            <div className="tablet:w-[410px] shrink-0">
              <h2 className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.96px] tablet:tracking-[1.28px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                お知らせ
              </h2>
            </div>

            {/* ニュースリスト（アコーディオン） */}
            <NewsAccordion />
          </div>
        </div>
      </section>

      {/* CTAバナー */}
      <section className="px-4 tablet:px-[45px] pb-[120px] tablet:pb-36 max-w-[1440px] mx-auto">
        {/* SP版 */}
        <div className="tablet:hidden relative rounded-2xl overflow-hidden h-[425px] flex flex-col justify-between pt-8 pb-[60px] px-4">
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
                backgroundImage: 'linear-gradient(-46deg, rgba(39, 51, 59, 0.1) 0%, rgba(39, 51, 59, 0.25) 87%)',
              }}
            />
          </div>
          <div className="relative z-10 text-white">
            <p className="text-body-s font-gothic font-medium leading-[1.8] mb-2">お問い合わせ</p>
            <p className="font-mincho text-[24px] leading-[1.6] tracking-[0.96px]" style={{ fontFeatureSettings: "'palt' 1" }}>
              不動産に関すること、<br />
              ぜひご相談ください。
            </p>
          </div>
          <div className="relative z-10">
            <Link
              href="/for-customer"
              className="flex items-center justify-center w-full h-12 rounded-full bg-cream/95 border border-cream shadow-[0_0_16px_rgba(0,0,0,0.16)] font-gothic font-medium text-base text-dark-green hover:opacity-70 transition-opacity"
            >
              不動産に関するご相談はこちら
            </Link>
          </div>
        </div>

        {/* PC版 */}
        <div className="hidden tablet:block relative rounded-3xl overflow-hidden px-[30px] py-[96px]">
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
                backgroundImage: 'linear-gradient(218deg, rgba(39, 51, 59, 0.1) 26.6%, rgba(39, 51, 59, 0.25) 72.5%)',
              }}
            />
          </div>
          <div className="relative z-10 flex gap-[30px] items-start">
            <div className="text-white shrink-0">
              <p className="text-body-m font-gothic font-medium leading-[2] mb-2">お問い合わせ</p>
              <p className="font-mincho text-[32px] leading-[1.5] tracking-[1.28px] whitespace-nowrap" style={{ fontFeatureSettings: "'palt' 1" }}>
                不動産に関すること、<br />
                ぜひご相談ください。
              </p>
            </div>
            <div className="flex-1 flex gap-3 justify-end">
              <Link
                href="/for-customer"
                className="bg-cream/95 rounded-3xl px-[30px] pt-10 pb-[30px] text-center w-[264px] flex flex-col items-center gap-[30px] hover:opacity-70 transition-opacity"
              >
                <span className="font-gothic font-medium text-[20px] leading-[1.6] text-dark-green">
                  不動産に関する<br />ご相談はこちら
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
