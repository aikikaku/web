import { getProperties, getCustomerVoices, getStories } from '@/lib/microcms/queries';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyCarousel from '@/components/home/PropertyCarousel';
import VoiceCarousel from '@/components/home/VoiceCarousel';
import StoryCard from '@/components/story/StoryCard';
import SeeAllLink from '@/components/ui/SeeAllLink';
import FaqAccordion from '@/components/ui/FaqAccordion';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '不動産をお探しの方へ',
  description: '不動産の購入・賃貸をお考えの方へ、アイ企画のサービスをご紹介します。',
};

export const revalidate = 3600;

const steps = [
  {
    title: 'ご相談',
    desc: 'まずはメール・お電話・ご来店などで、お客様の想いやお探しの条件などご相談ください。',
  },
  {
    title: 'ご提案',
    desc: 'お客様のご要望に合わせた、最適な物件をご提案いたします。物件を探す上で、地域選びがとても重要だと考えています。\n物件のご紹介と併せて、地域の特色や周辺環境、内見時、確認するポイント等、ご説明させて頂きます。',
  },
  {
    title: 'ご内見',
    desc: '実際に物件をご案内し、ご内見いただきます。現地では災害リスクや建築面の確認、リフォームや融資の相談も可能です。\n将来の資産価値・売却を見据え、専門的な視点から丁寧にご案内いたします。',
  },
  {
    title: 'ご契約',
    desc: '気に入った物件が見つかりましたら、申込と契約のご案内に進みます。\nご契約前には時間をかけて内容をご説明し、安心してご判断いただけるよう努めます。ご希望に応じて、近隣環境の確認や補助金、住宅調査などもサポートいたします。',
  },
  {
    title: 'ご入居',
    desc: '契約後にご入居です。お引越しの見積や火災保険の手続きなど新生活のご準備もお手伝いいたします。\nご入居後、私たちのコンポスト活動にご参加いただける方へ、コンポストをお渡しさせて頂きます。',
  },
];

const features = [
  {
    image: '/images/for-customer/tsumugi.jpg',
    title: 'アイ企画の紡ぐ家づくり',
    body: 'これからはじまる家づくり、その一コマ一コマを思い出に残してみませんか。\nアイ企画では、『紡ぐ家づくり』と題して、その大切な一瞬を残す為にフィルムカメラによる撮影サービスを行なっています。\n土地のお引渡し、建築の地鎮祭、建築途中の様子、完成写真等をフォトグラファーがフィルムカメラで撮影しお子様や、大切な方へ思いを紡ぐお手伝いをします',
    activities: [
      {
        title: '「紡ぐ家づくり」撮影サービス',
        desc: '仲人のフォトグラファー宮﨑美咲さんとともにご新居に伺い、撮影いたします。右記リンクより仲人をご覧いただけます。',
        link: { label: '仲人 NAKA-BITO', href: 'https://example.com', external: true },
      },
    ],
  },
  {
    image: '/images/for-customer/community.jpg',
    title: '地域づくりへの取り組み',
    body: '家を買おうと考えたとき、まず住宅メーカーや展示場に足を運ぶ人が多いと思います。\n\nでも、暮らしは家だけで完結するのではなく地域の一部。\nまずは、その地域の特徴をよく理解している不動産屋を訪ねてみてください。\n私たちは、同じ地域に住む住民として、日頃から地域の人たちと関わることで、いざというときに頼れる存在でありたいと思っています。',
    activities: [
      {
        title: '仲人の運営',
        desc: 'この土地で暮らす人の想いと、この土地に興味を持ってくれた方々とを繋ぐメディアの運営',
        link: { label: '仲人 NAKA-BITO', href: 'https://example.com', external: true },
      },
      {
        title: 'コンポスト活動',
        desc: '地域の方々と、生ゴミから肥料を作り、農作物を収穫する取り組み',
      },
      {
        title: '地域のマルシェ開催',
        desc: '近隣住民、同世代住民、子育て家庭との交流の場の創出',
      },
      {
        title: '空き家管理',
        desc: 'ご依頼のあった空き家の定期パトロールを行なっています。',
      },
    ],
  },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp';

export default async function ForCustomerPage() {
  const [properties, voices, stories] = await Promise.all([
    getProperties({ limit: 6, filters: 'status[contains]available', orders: '-publishedAt' })
      .catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 6 })),
    getCustomerVoices()
      .catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 50 })),
    getStories({ limit: 3 })
      .catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 3 })),
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'ホーム', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: '不動産をお探しの方へ' },
            ],
          }),
        }}
      />

      {/* ヒーロー (Figma SP 4211:11782 - title 2 行 + image 縦長 / PC 4211:11401-11404) */}
      <section className="page-container pb-12 tablet:pb-24 pt-8 tablet:pt-0">
        <div className="flex flex-col tablet:flex-row items-stretch tablet:items-center gap-8 tablet:gap-0">
          <div className="flex-1 flex items-start tablet:items-center">
            <h1 className="font-mincho text-[40px] tablet:text-[48px] leading-[1.5] tracking-[1.6px] tablet:tracking-[1.92px] text-dark-green tablet:whitespace-nowrap" style={{ fontFeatureSettings: "'palt' 1" }}>
              不動産を<br className="tablet:hidden" />お探しの方へ
            </h1>
          </div>
          <div className="w-full tablet:w-[675px] shrink-0 tablet:pl-[30px]">
            <div className="relative aspect-[358/443] tablet:aspect-auto tablet:h-[640px] rounded-3xl overflow-hidden">
              <Image
                src="/images/for-customer/hero.jpg"
                alt="不動産をお探しの方へ"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 992px) 100vw, 675px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* まずはご相談ください */}
      <section className="relative h-auto min-h-[720px] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/for-customer/section-bg.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(243deg, rgba(39, 51, 59, 0.15) 21.5%, rgba(39, 51, 59, 0.4) 80.4%)',
            }}
          />
        </div>
        <div className="relative page-container py-[60px] tablet:py-24">
          <div className="flex flex-col gap-6 tablet:gap-8">
            <div className="flex flex-col gap-2 text-cream">
              <p className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8]">
                不動産をお探しですか？
              </p>
              <h2 className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[1.28px] tablet:tracking-[1.92px] text-cream" style={{ fontFeatureSettings: "'palt' 1" }}>
                まずはご相談ください。
              </h2>
            </div>
            <div className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-cream">
              <p>あなたの想いを聞かせてください。どんな暮らしをしたいか、どんなお店をしたいか。</p>
              <p>私たちは、その想いを共有し、正しい情報をお伝えしながら、</p>
              <p>セカンドオピニオン的な立ち位置でお客様に最適なご提案をさせて頂きます。</p>
              <p>実は不動産会社が持つ物件の情報はどこも同じ。</p>
              <p>看板や広告に記載されている会社だけがその物件を扱えるわけではなく、どこの会社でも扱えるのです。</p>
              <p>「アイ企画」では、物件だけでなく、周辺地域の情報もご説明しながら、</p>
              <p>たくさんの不動産情報の中で、本当にお客様に適した物件をご提案いたします。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ご入居までの流れ (Figma SP 4211:11793 - 左寄せ) */}
      <section className="bg-cream py-[60px] tablet:py-24">
        <div className="page-container">
          <div className="flex flex-col gap-2 items-start tablet:items-center tablet:text-center mb-8 tablet:mb-12">
            <p className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green">
              物件サポート
            </p>
            <h2 className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[1.28px] tablet:tracking-[1.92px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              ご入居までの流れ
            </h2>
          </div>
          <div className="max-w-[792px] mx-auto flex flex-col gap-4 items-center">
            {steps.map((step, i) => (
              <div key={step.title} className="w-full flex flex-col gap-4 items-center">
                <div className="w-full bg-cream rounded-3xl shadow-[0px_-1px_8px_0px_rgba(0,0,0,0.1)] p-6 tablet:pl-6 tablet:pr-8 tablet:py-8">
                  <div className="flex flex-col tablet:flex-row gap-2 tablet:gap-8 items-start tablet:items-center">
                    <p className="font-mincho text-lg tablet:text-2xl text-dark-green text-left tablet:text-center w-full tablet:w-[140px] shrink-0 leading-[1.6] tablet:leading-[1.4] tracking-wider">
                      {step.title}
                    </p>
                    <p className="text-body-m font-gothic font-medium text-black whitespace-pre-line flex-1">
                      {step.desc}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex items-center justify-center">
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="text-dark-green">
                      <path d="M8 10L0 0H16L8 10Z" fill="currentColor" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* アイ企画での物件探しの特徴 (Figma SP 4211:11803 - 左寄せ・余白調整) */}
      <section className="bg-light-green py-[60px] tablet:py-24">
        <div className="page-container">
          {/* Section heading */}
          <div className="flex flex-col gap-2 mb-6 tablet:mb-8">
            <p className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green">
              アイ企画の強み
            </p>
            <h2 className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[1.28px] tablet:tracking-[1.92px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              アイ企画での物件探しの特徴
            </h2>
          </div>
          <div className="mb-10 tablet:mb-8">
            <p className="font-gothic font-medium text-[14px] tablet:text-[16px] leading-[1.8] text-dark-green">
              私たちのプロセスは、お客様のニーズに合わせたサポートを提供します。
            </p>
            <p className="font-gothic font-medium text-[14px] tablet:text-[16px] leading-[1.8] text-dark-green">
              安心して新生活をスタートできるよう、全力でお手伝いします。
            </p>
          </div>

          <div className="flex flex-col gap-24">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`flex flex-col tablet:flex-row gap-8 tablet:gap-[58px] items-start ${i < features.length - 1 ? 'border-b border-dark-green/20 pb-24' : ''}`}
              >
                {/* Image */}
                <div className="w-full tablet:w-[616px] shrink-0">
                  <div className="relative aspect-[616/461] rounded-xl overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Text + Activities */}
                <div className="flex-1 pt-0 tablet:pt-4">
                  <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-4">
                      <h3 className="font-mincho text-lg tablet:text-2xl tracking-wider !leading-[1.6]">
                        {feature.title}
                      </h3>
                      <p className="text-body-m tablet:text-body-l font-gothic font-medium text-black whitespace-pre-line leading-[2] tablet:leading-[1.8]">
                        {feature.body}
                      </p>
                    </div>

                    {/* Activity cards */}
                    <div className="flex flex-col gap-4">
                      {feature.activities.map((activity) => (
                        <div
                          key={activity.title}
                          className="bg-cream rounded-2xl p-6 tablet:px-[30px] tablet:pt-[30px] tablet:pb-[32px] flex flex-col gap-4"
                        >
                          <div className="flex flex-col gap-2">
                            <p className="font-gothic font-medium text-base tablet:text-[20px] leading-[2] tablet:leading-[1.6] text-dark-green">
                              {activity.title}
                            </p>
                            <p className="font-gothic font-medium text-body-s tablet:text-body-m text-black leading-[1.8] tablet:leading-[2]">
                              {activity.desc}
                            </p>
                          </div>
                          {activity.link && (
                            <Link
                              href={activity.link.href}
                              className="inline-flex items-center gap-1 self-start text-[14px] leading-none font-gothic font-medium text-dark-green hover:opacity-70 transition-opacity"
                              {...(activity.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                              {activity.link.label}
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-dark-green">
                                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 物件情報 (Figma 4211:11427 — home の PropertyCarousel を転用) */}
      {properties.contents.length > 0 && (
        <section className="bg-cream pt-[60px] pb-[60px] tablet:pt-24 tablet:pb-0">
          <div className="px-4 tablet:px-[75px] max-w-[1440px] mx-auto">
            <div className="flex flex-col gap-2 mb-8 tablet:mb-[96px]">
              <p className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green">
                物件情報
              </p>
              <h2 className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[1.28px] tablet:tracking-[1.92px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                おすすめの物件
              </h2>
            </div>
          </div>
          {/* SP: スライドショー / PC: 3 列グリッド */}
          <PropertyCarousel properties={properties.contents.slice(0, 6)} />
          <div className="hidden tablet:block max-w-[1440px] mx-auto px-[75px]">
            <div className="grid grid-cols-3 gap-x-[30px] gap-y-[96px]">
              {properties.contents.slice(0, 6).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <div className="flex items-center justify-end mt-[96px]">
              <SeeAllLink href="/properties" />
            </div>
          </div>
        </section>
      )}

      {/* CTA バナー */}
      <section className="px-4 tablet:px-[45px] pb-24">
        <div className="relative overflow-hidden rounded-3xl max-w-[1350px] mx-auto">
          <div className="relative px-6 tablet:px-[30px] py-16 tablet:py-[96px]">
            <Image
              src="/images/for-customer/cta-banner.jpg"
              alt="お問い合わせ"
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(218deg, rgba(39, 51, 59, 0.1) 26.6%, rgba(39, 51, 59, 0.25) 72.5%)',
              }}
            />
            <div className="relative z-10 flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-8 tablet:gap-[30px]">
              <div className="text-white">
                <p className="text-body-m font-gothic font-medium mb-2">お問い合わせ</p>
                <h2
                  className="text-white font-mincho text-[32px] leading-[1.5] tracking-[1.28px]"
                  style={{ fontFeatureSettings: "'palt' 1" }}
                >
                  不動産に関すること、<br />
                  ぜひご相談ください。
                </h2>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="bg-cream/[0.96] rounded-3xl px-[30px] pt-[40px] pb-[30px] text-center w-[264px] flex flex-col items-center gap-[30px] hover:opacity-70 transition-opacity"
                >
                  <span className="font-gothic font-medium text-[20px] leading-[1.6] text-dark-green">
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
                  href="/contact"
                  className="bg-cream/[0.96] rounded-3xl px-[30px] pt-[40px] pb-[30px] text-center w-[264px] flex flex-col items-center gap-[30px] hover:opacity-70 transition-opacity"
                >
                  <span className="font-gothic font-medium text-[20px] leading-[1.6] text-dark-green">
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
        </div>
      </section>

      {/* 暮らしを知る */}
      {stories.contents.length > 0 && (
        <section className="bg-dark-green pt-24 pb-16">
          <div className="page-container">
            <h2 className="font-mincho text-[32px] tracking-wider text-cream mb-16">
              暮らしを知る
            </h2>
            <div className="grid grid-cols-1 tablet:grid-cols-3 gap-[30px] mb-16">
              {stories.contents.map((story) => (
                <StoryCard key={story.id} story={story} variant="dark" />
              ))}
            </div>
            <div className="flex items-center justify-end">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 font-gothic font-medium text-[18px] text-cream hover:opacity-70 transition-opacity"
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

      {/* お客様の声 (Figma 4211:11447 — home の VoiceCarousel を転用) */}
      {voices.contents.length > 0 && (
        <section className="bg-light-green pt-[60px] pb-[60px] tablet:pt-24 tablet:pb-24">
          <div className="px-4 tablet:px-[75px] max-w-[1440px] mx-auto mb-8 tablet:mb-[60px]">
            <div className="flex flex-col gap-2">
              <p className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green">
                お客様の声
              </p>
              <h2 className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[1.28px] tablet:tracking-[1.92px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                ご利用いただいた皆様の声
              </h2>
            </div>
          </div>
          <VoiceCarousel voices={voices.contents} />
        </section>
      )}

      {/* よくある質問 */}
      <section className="bg-cream pt-[60px] pb-[80px] tablet:pt-[96px] tablet:pb-[144px]">
        <div className="px-4 tablet:px-[75px] max-w-[1440px] mx-auto">
          <div className="flex flex-col tablet:flex-row tablet:justify-center gap-8 tablet:gap-[48px] items-start">
            <div className="tablet:w-[410px] shrink-0">
              <h2 className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.96px] tablet:tracking-[1.28px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                よくある質問
              </h2>
            </div>
            <FaqAccordion
              items={[
                {
                  question: '購入にかかる諸経費は？',
                  answer: '売買代金の約8%前後が目安です。広告の金額は売主様へ支払う売買代金のみで、別途、仲介手数料（上限＝3%＋6万円＋税）、登記費用（登録免許税・司法書士報酬）、ローン関連手数料（事務手数料・保証料・印紙）などが発生します。',
                },
                {
                  question: '住宅ローン（購入）や入居審査（賃貸）のポイントは？',
                  answer: '購入をご検討の際は、まず事前審査で「借入可能額」と「金利タイプ（固定・変動など）」を確認します。\n賃貸の入居審査では、収入状況・勤務先、連帯保証人または保証会社の利用などが確認されます。必要書類（本人確認書類、収入証明など）を事前に整えることで、審査から契約までの手続きがスムーズに進みます。',
                },
                {
                  question: '物件の災害リスクはどう確認すれば安心ですか？',
                  answer: 'まずは各市・町が発行するハザードマップ（洪水・土砂災害・津波など）を確認します。ただし、地図で「指定外」でもリスクがゼロではありません。後から指定される可能性や、地盤の弱い地域もあります。物件ごとの状況（地形・標高・周辺の排水計画・過去の災害履歴など）を踏まえて個別にご説明しますので、お気軽にお尋ねください。',
                },
                {
                  question: '契約後の流れは？',
                  answer: '契約後は、物件の引き渡しが行われます。その後、必要な手続きを進め、住民票の移動などを行います。何か不明点があれば、いつでもご相談ください。',
                },
                {
                  question: '物件の内見は？',
                  answer: '物件の内見は事前に予約が必要です。実際に見てみることで、雰囲気や設備を確認できます。お気軽にお問い合わせください。',
                },
              ]}
            />
          </div>
        </div>
      </section>

    </div>
  );
}
