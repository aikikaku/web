import { getProperties, getStories, getCustomerVoices } from '@/lib/microcms/queries';
import { HERO_IMAGES } from '@/lib/heroImages';
import CardProperty from '@/components/ui/card/CardProperty';
import NewsAccordion from '@/components/home/NewsAccordion';
import VoiceCarousel from '@/components/home/VoiceCarousel';
import PropertyCarousel from '@/components/home/PropertyCarousel';
import StoryCarousel from '@/components/home/StoryCarousel';
import CardStory from '@/components/ui/card/CardStory';
import HeroSlideshowSP from '@/components/home/HeroSlideshowSP';
import HeroFrame from '@/components/home/HeroFrame';
import HeroVideo from '@/components/home/HeroVideo';
import ButtonPrimary from '@/components/ui/interactive/ButtonPrimary';
import Arrow from '@/components/ui/interactive/Arrow';
import MoreLinkButton from '@/components/ui/interactive/MoreLinkButton';
import ParkingBanner from '@/components/common/ParkingBanner';
import Reveal from '@/components/common/Reveal';
import ServiceCTA from '@/components/ui/card/ServiceCTA';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600;

export default async function HomePage() {
  const newProperties = await getProperties({
    limit: 6,
    filters: '(status[contains]available[or]status[contains]negotiating)',
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
        {/* SP〜ラップトップ(〜1439px): テキスト上 → スライドショー画像（縦積みで重なり無し #40）。
            1440px 以上でのみ下の absolute 配置レイアウトを使う */}
        <div className="flex flex-col gap-8 pt-12 tablet:pt-14 px-4 tablet:px-[4.6875rem] max-w-[90rem] mx-auto desktop:hidden">
          <div className="pl-4 tablet:pl-0">
            <h1 className="font-mincho text-[2rem] tablet:text-[3rem] leading-[1.5] tracking-[0.08rem] tablet:tracking-[0.14rem] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              家と街と人が<br />
              つながる、<br />
              三島の暮らし
            </h1>
          </div>
          <HeroSlideshowSP />
        </div>

        {/* PC(1440px以上): absolute配置レイアウト (1440フレーム中央寄せ + 右側画像は viewport右端アンカー)。
            1440px 未満は上の縦積みレイアウトを使うため min-[1440px] で限定 (#40) */}
        <div className="hidden desktop:block relative h-[49.875rem] w-full max-w-[90rem] mx-auto">
          <div className="absolute left-[2.8125rem] top-[3.5rem] w-[34.8125rem] h-[46.375rem] rounded-2xl overflow-hidden">
            {/* メイン枠は動画背景（Slack「Heroの演出」）。ロード前/reduced-motion は poster 静止画 */}
            <HeroVideo
              src="/videos/hero.mp4"
              poster="/images/home/hero-video-poster.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="absolute left-[48.0625rem] top-[19.375rem] w-[40.3125rem]">
            <h1 className="font-mincho text-heading-56 text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              家と街と人が<br />
              つながる、<br />
              三島の暮らし
            </h1>
          </div>
        </div>
        {/* 右上画像: viewport右端アンカー (Figma: 右端から28px はみ出る) */}
        <div className="hidden desktop:block absolute right-[-1.75rem] top-[3.5rem] w-[13.75rem] h-[18.3125rem] rounded-2xl overflow-hidden">
          <HeroFrame
            srcs={HERO_IMAGES.topRight}
            alt="三島の自然"
            delayMs={500}
            sizes="220px"
          />
        </div>
        {/* 右下画像: viewport右端から89px (Figma: 1145+206=1351, 1440-1351=89) */}
        <div className="hidden desktop:block absolute right-[5.5625rem] top-[40.25rem] w-[12.875rem] h-[9.625rem] rounded-xl overflow-hidden">
          <HeroFrame
            srcs={HERO_IMAGES.bottomRight}
            alt="三島の街並み"
            delayMs={1000}
            sizes="206px"
          />
        </div>
      </section>

      {/* アイ企画について */}
      <Reveal as="section">
        <div className="px-4 py-[3.75rem] tablet:px-[2.8125rem] tablet:py-[6rem] max-w-[90rem] mx-auto">
          <div className="flex flex-col desktop:flex-row items-start desktop:items-center justify-between">
            {/* テキスト */}
            <div className="tablet:w-[38.5rem]">
              <div className="flex flex-col gap-8 tablet:gap-16 tablet:pl-[1.875rem]">
                <div className="flex flex-col gap-4 tablet:gap-12">
                  <div className="flex flex-col gap-2">
                    <p className="text-body-m font-gothic font-medium text-dark-green">
                      アイ企画について
                    </p>
                    <h2 className="font-mincho text-heading-32 tablet:text-heading-48 text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                      私たちは、「つくる」<br />
                      不動産会社です。
                    </h2>
                  </div>
                  <p className="text-body-m tablet:text-[1.125rem] font-gothic font-medium text-dark-green leading-[2] tablet:leading-[1.8] tablet:w-[29.3125rem]">
                    昭和61年、三島市加茂の住宅街に、不動産屋の店舗兼住宅を構えました。
                    ここにいると、町の人の顔が見え、声が聞こえます。
                    地域と日々関わりながら、暮らしの視点で、このまちの魅力と住まいの価値をていねいに伝えていく。
                    そうして、地域の環境を「ともにつくる」ことが私たちの仕事です。
                  </p>
                </div>

                {/* 画像 (1440px 未満: テキストの下に表示) */}
                <div className="w-full desktop:hidden">
                  <div className="relative h-[16.75rem] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/home/about.jpg"
                      alt="アイ企画スタッフ"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* SP: フル幅青ボタン / PC: テキスト+矢印（右寄せ） */}
                <div className="tablet:hidden">
                  <MoreLinkButton href="/about" mode="sp" />
                </div>
                <div className="hidden tablet:flex tablet:justify-end">
                  <MoreLinkButton href="/about" mode="pc" pcColor="dark-green" />
                </div>
              </div>
            </div>

            {/* 画像 (1440px 以上: 右カラムに表示) */}
            <div className="hidden desktop:block w-[34.8125rem] shrink-0">
              <div className="relative h-[46.375rem] rounded-2xl overflow-hidden">
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
      </Reveal>

      {/* 不動産サービスリンク */}
      <Reveal>
        <ServiceCTA
          customerImage="/images/home/service-customer.jpg"
          ownerImage="/images/home/service-owner.jpg"
          parallax
        />
      </Reveal>

      {/* 新着物件セクション */}
      <section className="bg-cream pt-[3.75rem] pb-[3.75rem] tablet:pt-[6rem] tablet:pb-0">
        <div className="px-4 tablet:px-[4.6875rem] max-w-[90rem] mx-auto">
          <Reveal className="flex flex-col gap-2 mb-8 tablet:mb-[6rem]">
            <p className="text-body-m font-gothic font-medium text-dark-green">
              新着物件
            </p>
            <h2 className="font-mincho text-heading-32 tablet:text-heading-48 text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              今日の出会いを、<br className="tablet:hidden" />さがしに
            </h2>
          </Reveal>
        </div>

        {newProperties.contents.length > 0 && (
          <>
            {/* SP: スライドショー（dots+arrows付き） */}
            <PropertyCarousel properties={newProperties.contents.slice(0, 6)} />

            {/* PC: 3列グリッド (stagger フェードイン) */}
            <div className="hidden tablet:block max-w-[90rem] mx-auto px-[4.6875rem]">
              <div className="grid grid-cols-3 gap-x-[1.875rem] gap-y-[6rem]">
                {newProperties.contents.slice(0, 6).map((property, i) => (
                  <Reveal key={property.id} delayMs={(i % 3) * 120}>
                    <CardProperty property={property} />
                  </Reveal>
                ))}
              </div>
            </div>
          </>
        )}

        {/* PC: すべて見る */}
        <div className="hidden tablet:flex items-center justify-end mt-[6rem] max-w-[90rem] mx-auto px-[4.6875rem]">
          <ButtonPrimary href="/properties" />
        </div>
      </section>

      {/* 駐車場セクション */}
      <Reveal>
        <ParkingBanner />
      </Reveal>

      {/* ストーリーセクション - 暮らしを知る */}
      <section className="bg-cream pt-0 pb-[3.75rem] tablet:py-[6rem]">
        <div className="px-4 tablet:px-[4.6875rem] max-w-[90rem] mx-auto">
          <Reveal className="flex flex-col gap-2 mb-8 tablet:mb-[6rem]">
            <p className="text-category-2 font-gothic font-medium text-dark-green">
              暮らしを知る
            </p>
            <h2 className="font-mincho text-heading-32 tablet:text-heading-48 text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              三島の暮らしに、<br className="tablet:hidden" />ふれる・深まる。
            </h2>
          </Reveal>
        </div>

        {latestStories.contents.length > 0 ? (
          <>
            {/* SP: スライドショー */}
            <StoryCarousel stories={latestStories.contents} />


            {/* PC: 左に大カード + 右に中カード2枚。固定幅(646+117+558)が約1471px必要なため
                1440px 未満では下の SP カルーセルを使い、横溢れ(#2)を防ぐ。
                max-w-[90rem] mx-auto で見出しと中央位置を揃える(#76 左寄り解消) */}
            <Reveal className="hidden desktop:block px-[4.6875rem] max-w-[90rem] mx-auto">
              <div className="flex gap-[7.3125rem]">
                {/* 左: 大きなストーリーカード */}
                {latestStories.contents[0] && (
                  <div className="w-[40.375rem] shrink-0">
                    <CardStory story={latestStories.contents[0]} size="l" />
                  </div>
                )}

                {/* 右: 中サイズカード2枚 */}
                <div className="flex flex-col gap-[6rem] w-[34.875rem]">
                  {latestStories.contents.slice(1, 3).map((story) => (
                    <CardStory key={story.id} story={story} size="m" />
                  ))}
                </div>
              </div>
            </Reveal>
          </>
        ) : (
          <p className="text-center text-gray-400 py-12">
            ストーリーはまだありません
          </p>
        )}

        {/* PC: すべて見る */}
        <div className="hidden tablet:flex items-center justify-end mt-[6rem] max-w-[90rem] mx-auto px-[4.6875rem]">
          <ButtonPrimary href="/stories" />
        </div>
      </section>

      {/* お客様の声セクション */}
      {voices.contents.length > 0 && (
        <Reveal as="section" className="bg-light-green py-[3.75rem] tablet:pt-[6rem] tablet:pb-16">
          <div className="px-4 tablet:px-[4.6875rem] max-w-[90rem] mx-auto">
            <div className="mb-8 tablet:mb-16">
              <h3 className="font-mincho text-[1.5rem] tablet:text-[2rem] leading-[1.5] tracking-[0.06rem] tablet:tracking-[0.08rem] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                お客様の声
              </h3>
            </div>
          </div>
          <VoiceCarousel voices={voices.contents} />
        </Reveal>
      )}

      {/* お知らせセクション */}
      <Reveal as="section" className="py-[3.75rem] tablet:py-[6rem]">
        <div className="px-4 tablet:px-[4.6875rem] max-w-[90rem] mx-auto">
          <div className="flex flex-col tablet:flex-row gap-8 tablet:gap-[5.5rem]">
            {/* 見出し */}
            <div className="tablet:w-[25.625rem] shrink-0">
              <h2 className="font-mincho text-[1.5rem] tablet:text-[2rem] leading-[1.5] tracking-[0.06rem] tablet:tracking-[0.08rem] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                お知らせ
              </h2>
            </div>

            {/* ニュースリスト（アコーディオン） */}
            <NewsAccordion />
          </div>
        </div>
      </Reveal>

      {/* CTAバナー */}
      <Reveal as="section" className="px-4 tablet:px-[2.8125rem] pb-[7.5rem] tablet:pb-36 max-w-[90rem] mx-auto">
        {/* SP版 */}
        <div className="tablet:hidden relative rounded-2xl overflow-hidden h-[26.5625rem] flex flex-col justify-between pt-8 pb-[3.75rem] px-4">
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
                backgroundImage: 'linear-gradient(-46deg, rgb(var(--overlay-dark) / 0.1) 0%, rgb(var(--overlay-dark) / 0.25) 87%)',
              }}
            />
          </div>
          <div className="relative z-10 text-white">
            <p className="text-body-s font-gothic font-medium mb-2">お問い合わせ</p>
            <p className="font-mincho text-heading-24" style={{ fontFeatureSettings: "'palt' 1" }}>
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
        <div className="hidden tablet:block relative rounded-3xl overflow-hidden px-[1.875rem] py-[6rem]">
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
                backgroundImage: 'linear-gradient(218deg, rgb(var(--overlay-dark) / 0.1) 26.6%, rgb(var(--overlay-dark) / 0.25) 72.5%)',
              }}
            />
          </div>
          <div className="relative z-10 flex gap-[1.875rem] items-start">
            {/* 左余白: カード padding 30px + この pl で合計60pxにする（旧 pl-[3.75rem] は合計90pxだった）(#30) */}
            <div className="text-white shrink-0 pl-[1.875rem]">
              <p className="text-body-m font-gothic font-medium mb-2">お問い合わせ</p>
              <p className="font-mincho text-heading-32 whitespace-nowrap" style={{ fontFeatureSettings: "'palt' 1" }}>
                不動産に関すること、<br />
                ぜひご相談ください。
              </p>
            </div>
            <div className="flex-1 flex gap-3 justify-end">
              <Link
                href="/for-customer"
                className="group bg-cream/95 rounded-3xl px-[1.875rem] pt-10 pb-[1.875rem] text-center w-[16.5rem] flex flex-col items-center gap-[1.875rem]"
              >
                <span className="font-gothic font-medium text-category-2 text-dark-green">
                  不動産に関する<br />ご相談はこちら
                </span>
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
