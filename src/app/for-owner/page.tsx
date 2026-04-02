import { getCustomerVoices, getStories } from '@/lib/microcms/queries';
import Breadcrumb from '@/components/ui/Breadcrumb';
import StoryCard from '@/components/story/StoryCard';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '不動産をお持ちの方へ',
  description: '不動産の売却・賃貸をお考えの方へ、アイ企画のサービスをご紹介します。',
};

export const revalidate = 3600;

const steps = [
  {
    title: 'ご相談',
    desc: 'まずはメール・お電話・ご来店などで、お客様の想いと不動産の状況などをご相談ください。',
  },
  {
    title: 'ご提案・\n査定',
    desc: '売却をご検討の方には、査定金額をご提示いたします。\nまた、そのほか物件に合った活用方法（賃貸、一時及び一部の賃貸、改修・用途の変更など）もセカンドオピニオン的な立ち位置からアドバイス・ご提案いたします。',
  },
  {
    title: '媒介契約・募集開始',
    desc: '売却・賃貸の価格や方法などが決定すれば、弊社に仲介をご依頼いただく旨の媒介契約を結び、募集を開始します。',
  },
  {
    title: 'ご契約',
    desc: 'WEBやチラシなどの告知、既存のお客様へのご提案などから買主様・借主様をお探しし、双方にご納得いただければ売買・賃貸の契約を結びます。契約前には時間をかけて、契約内容の事前説明を丁寧に行なっています。取引がはじめての方にも、安心して契約にのぞめるよう、お客様自身が納得できる場と時間を提供します。',
  },
  {
    title: 'お引渡し',
    desc: '契約終了後、買主様・借主様から代金を受け取り、不動産の引渡しを行います。引渡しに伴う諸手続きなどについてもお気軽にご相談ください。',
  },
];

const features = [
  {
    image: '/images/for-owner/iejmai.jpg',
    title: 'アイ企画の家じまい',
    body: '大切に使ってきた家、幼い頃育ったご実家、相続で受け継いだ祖先の古家。\nいつかは手放さないといけないのはわかっているけど、思い入れもあるし、、、\n新規活用や、次の方へ受け継ぐ前に、気持ちの整理整頓をしませんか。\n弊社では、思い出の詰まった建物を、フィルムカメラに残す撮影サービスを行なっています。\nフォトグラファーとともにご依頼先に伺い、撮影いたします。',
    activities: [
      {
        title: '「家じまい」撮影サービス',
        desc: '仲人のフォトグラファー宮﨑美咲さんとともにご依頼先に伺い、撮影いたします。右記リンクより仲人をご覧いただけます。',
        link: { label: '仲人 NAKA-BITO', href: 'https://example.com', external: true },
      },
    ],
  },
  {
    image: '/images/for-owner/chiiki.jpg',
    title: '地域づくりへの取り組み',
    body: '不動産は土地固有の条件だけでは"金額"が決まりません。その土地が属する地域も、査定価格に大きく関わります。そこでアイ企画では、そこに住む皆さんで、地域の魅力を高め、住みたいと思われる地域づくりをお手伝いする取り組みを行なっています。',
    activities: [
      {
        title: '空き家の管理',
        desc: '管理サービスとして、毎月1回の定期点検、簡易清掃などを行っています。\n\n毎月1回の定期点検 … 目視で家、及び周辺を確認します。また大雨、台風後などにも行います。\n簡易清掃 … 定期点検時、点検時間内で、草刈り、掃き掃除などを行います。\n報告書の提出 … 点検結果の報告書を、メールに添付し送付致します。\n看板設置 … 管理者を明示することで、近隣からのクレームの一時窓口、及び対応を行います。',
      },
      {
        title: '最新の売却価格の情報公開、共有',
        desc: 'お持ちの不動産周辺の最新の売却価格(坪単価)を把握し、相場観を知るお手伝いをしています。',
      },
      {
        title: '空き地の活用',
        desc: '駐車場をお探しの方の斡旋、草刈り業者紹介など',
      },
    ],
  },
];

const faqItems = [
  {
    q: '査定にはどのくらい時間がかかりますか？',
    a: '簡易査定は即日〜数日、現地調査を伴う詳細査定は1〜2週間程度です。',
  },
  {
    q: '売却にかかる費用はありますか？',
    a: '査定・提案、媒介契約には費用は発生しません。売却または賃貸が成約した際に、規定の仲介手数料を頂戴いたします。（成果報酬制）',
  },
  {
    q: '古い家でも売れますか？',
    a: 'はい、古い家にも魅力があります。リノベーション需要も高まっており、状態に合わせた最適な活用方法をご提案いたします。',
  },
  {
    q: '遠方に住んでいますが対応できますか？',
    a: 'はい、オンラインでのご相談や、現地の状況を写真・動画でお伝えするなど、遠方の方にも対応しております。',
  },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp';

export default async function ForOwnerPage() {
  const [voices, stories] = await Promise.all([
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
              { '@type': 'ListItem', position: 2, name: '不動産をお持ちの方へ' },
            ],
          }),
        }}
      />
      <div className="page-container">
        <Breadcrumb items={[{ label: '不動産をお持ちの方へ' }]} />
      </div>

      {/* ヒーロー */}
      <section className="page-container pb-24">
        <div className="flex flex-col tablet:flex-row items-center gap-8 tablet:gap-0">
          <div className="flex-1 flex items-center">
            <h1 className="tracking-wider">不動産をお持ちの方へ</h1>
          </div>
          <div className="w-full tablet:w-[675px] shrink-0 tablet:pl-[30px]">
            <div className="relative h-[400px] tablet:h-[640px] rounded-3xl overflow-hidden">
              <Image
                src="/images/for-owner/hero.jpg"
                alt="不動産をお持ちの方へ"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* まずはご相談ください */}
      <section className="relative h-auto min-h-[720px] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/for-owner/section-bg.jpg"
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
        <div className="relative page-container py-24">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 text-cream">
              <p className="text-body-m font-gothic font-medium">
                不動産をお持ちですか？
              </p>
              <h2 className="text-cream">まずはご相談ください。</h2>
            </div>
            <div className="text-body-l text-cream leading-[1.8]">
              <p>本当は価値のある不動産、空き家や空き地などを眠らせていませんか？</p>
              <p>不動産は、ただ所有しているだけでは価値はどんどんと落ちてしまいます。</p>
              <p>それぞれ個性のある不動産だからこそ、小さな土地や古い建物にも、魅力があります。</p>
              <p>「アイ企画」では正しい情報を発信し、お客様自身が知識をつけられる図書館のような場を提供したいと考えています。</p>
              <p>そこで、医療業界で言うセカンドオピニオン的な立ち位置からのアドバイスをしています。</p>
              <p>お客様と共に考え、お客様の想いを共有し、その売却や活用方法などお客様の不動産の魅力を最大限に生かすご提案をいたします。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 売却までの流れ */}
      <section className="bg-cream py-24">
        <div className="page-container">
          <div className="flex flex-col gap-2 items-center text-center mb-12">
            <p className="text-body-m font-gothic font-medium text-dark-green">
              物件サポート
            </p>
            <h2>売却までの流れ</h2>
          </div>
          <div className="max-w-[792px] mx-auto flex flex-col gap-4 items-center">
            {steps.map((step, i) => (
              <div key={step.title} className="w-full flex flex-col gap-4 items-center">
                <div className="w-full bg-cream rounded-3xl shadow-[0px_-1px_8px_0px_rgba(0,0,0,0.1)] p-6 tablet:pl-6 tablet:pr-8 tablet:py-8">
                  <div className="flex flex-col tablet:flex-row gap-2 tablet:gap-8 items-start tablet:items-center">
                    <p className="font-mincho text-lg tablet:text-2xl text-dark-green text-left tablet:text-center w-full tablet:w-[140px] shrink-0 whitespace-pre-line leading-[1.6] tablet:leading-[1.4] tracking-wider">
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
          <div className="max-w-[792px] mx-auto mt-8">
            <p className="text-sm text-dark-green/50 leading-[1.6]">
              ※査定・提案、媒介契約には費用は発生しません。
            </p>
            <p className="text-sm text-dark-green/50 leading-[1.6]">
              ※売却または賃貸が成約した際に、規定の仲介手数料を頂戴いたします。(成果報酬制)
            </p>
          </div>
        </div>
      </section>

      {/* アイ企画で物件を活用する */}
      <section className="bg-light-green py-24">
        <div className="page-container">
          {/* Section heading */}
          <div className="flex flex-col gap-2 mb-8">
            <p className="text-body-m font-gothic font-medium text-dark-green">
              アイ企画の強み
            </p>
            <h2>アイ企画で物件を活用する</h2>
          </div>
          <div className="mb-24">
            <p className="text-body-m text-dark-green">
              私たちのプロセスは、お客様のニーズに合わせたサポートを提供します。
            </p>
            <p className="text-body-m text-dark-green">
              安心して次の一歩へ進めるよう、全力でお手伝いします。
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
                          className="bg-cream rounded-2xl p-6 tablet:px-8 tablet:py-8"
                        >
                          <div className="flex flex-col gap-2">
                            <p className="font-gothic font-medium text-base tablet:text-[20px] leading-[2] tablet:leading-[1.6] text-dark-green">
                              {activity.title}
                            </p>
                            <p className="font-gothic font-medium text-body-s tablet:text-body-m text-black leading-[1.8] tablet:leading-[2] whitespace-pre-line">
                              {activity.desc}
                            </p>
                          </div>
                          {'link' in activity && activity.link && (
                            <div className="mt-4">
                              <Link
                                href={activity.link.href}
                                className="inline-flex items-center gap-1 text-body-s font-gothic font-medium text-dark-green hover:opacity-70 transition-opacity"
                                {...(activity.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              >
                                {activity.link.label}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-dark-green">
                                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </Link>
                            </div>
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

      {/* 物件のその後のはなし */}
      {stories.contents.length > 0 && (
        <section className="bg-dark-green py-24 pb-16">
          <div className="page-container">
            <h2 className="font-mincho text-[32px] tracking-wider text-cream mb-16">
              物件のその後のはなし
            </h2>
            <div className="grid grid-cols-1 tablet:grid-cols-3 gap-8 mb-16">
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

      {/* お客様の声 */}
      {voices.contents.length > 0 && (
        <section className="bg-light-green py-24">
          <div className="page-container">
            <h2 className="font-mincho text-[32px] tracking-wider mb-16">お客様の声</h2>
            <div className="overflow-x-auto pb-4 -mx-5 tablet:-mx-[64px] px-5 tablet:px-[64px]">
              <div className="flex gap-3 min-w-max">
                {voices.contents.map((voice) => (
                  <div key={voice.id} className="w-[600px] tablet:w-[644px] shrink-0">
                    <div className="bg-cream rounded-3xl px-8 tablet:px-[58px] pt-12 pb-14 h-full">
                      {/* Quote mark */}
                      <div className="font-mincho text-[32px] leading-none text-gray-300 mb-4">
                        &ldquo;
                      </div>

                      {/* Title (customerName as heading) */}
                      <h3 className="font-mincho text-[32px] leading-[1.5] tracking-wider mb-4 line-clamp-2">
                        {voice.customerName}
                      </h3>

                      {/* Content excerpt */}
                      <div
                        className="text-body-m font-gothic font-medium text-black line-clamp-3 mb-12"
                        dangerouslySetInnerHTML={{ __html: voice.content }}
                      />

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-body-m font-gothic font-medium text-dark-green">
                        <div className="flex items-center opacity-60">
                          {voice.location && <span>{voice.location}</span>}
                          {voice.location && voice.propertyType && (
                            <span className="mx-1 leading-[1.4]">｜</span>
                          )}
                          {voice.propertyType && <span>{voice.propertyType}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end mt-8">
              <Link
                href="/voice"
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

      {/* よくある質問 */}
      <section className="py-24">
        <div className="page-container">
          <div className="flex flex-col tablet:flex-row gap-12 tablet:gap-12 items-start justify-center">
            <div className="w-full tablet:w-[410px] shrink-0">
              <h2 className="font-mincho text-[32px] tracking-wider">よくある質問</h2>
            </div>
            <div className="flex-1 max-w-[792px]">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="border-b border-dark-green/20 group"
                >
                  <summary className="flex items-center justify-between py-6 pr-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <p className="font-gothic font-medium text-body-m text-black leading-[2] flex-1 pr-4">
                      {item.q}
                    </p>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0 text-dark-green transition-transform group-open:rotate-180"
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="pb-6">
                    <p className="font-gothic font-medium text-body-m text-dark-green/70 leading-[2]">
                      {item.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA バナー */}
      <section className="relative overflow-hidden">
        <div className="relative h-[400px] tablet:h-[480px]">
          <Image
            src="/images/for-owner/banner-contact.jpg"
            alt="お問い合わせ"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-dark-green/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-cream mb-8">お気軽にご相談ください</h2>
              <Link href="/contact" className="btn-primary">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
