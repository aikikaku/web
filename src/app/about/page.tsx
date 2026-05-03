import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'アイ企画について',
  description: 'アイ企画の企業理念・ビジョン・会社概要をご紹介します。',
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp';

export default function AboutPage() {
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
              { '@type': 'ListItem', position: 2, name: 'アイ企画について' },
            ],
          }),
        }}
      />

      {/* ヒーローセクション */}
      <section className="bg-cream py-24">
        <div className="page-container">
          <div className="text-center mb-12">
            <p className="text-body-m text-dark-green mb-2">アイ企画について</p>
            <h1>私たちは、「つくる」不動産会社です。</h1>
          </div>
          <div className="aspect-[2/1] relative rounded-3xl overflow-hidden">
            <Image
              src="/images/about/hero.jpg"
              alt="アイ企画スタッフ"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* 不動産サービスリンク（背景画像付き） */}
      <section className="relative py-24">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/about/service-bg.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 page-container">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8">
            <Link href="/for-customer" className="group block bg-cream rounded-3xl p-[30px] overflow-hidden">
              <div className="flex gap-8 items-start">
                <div className="flex-1">
                  <div className="mb-auto">
                    <h3 className="font-mincho text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green mb-2">
                      不動産を<br />お探しの方へ
                    </h3>
                    <p className="text-body-l text-dark-green">買いたい・借りたい</p>
                  </div>
                  <div className="mt-8">
                    <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="w-[294px] h-[220px] relative rounded-xl overflow-hidden shrink-0 hidden tablet:block">
                  <Image
                    src="/images/about/service-customer.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
            <Link href="/for-owner" className="group block bg-cream rounded-3xl p-[30px] overflow-hidden">
              <div className="flex gap-8 items-start">
                <div className="flex-1">
                  <div className="mb-auto">
                    <h3 className="font-mincho text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green mb-2">
                      不動産を<br />お持ちの方へ
                    </h3>
                    <p className="text-body-l text-dark-green">売りたい・貸したい</p>
                  </div>
                  <div className="mt-8">
                    <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="w-[294px] h-[220px] relative rounded-xl overflow-hidden shrink-0 hidden tablet:block">
                  <Image
                    src="/images/about/service-owner.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ご挨拶セクション */}
      <section className="bg-cream py-24">
        <div className="flex flex-col tablet:flex-row items-center">
          <div className="tablet:w-1/2 px-8 tablet:pl-12 tablet:pr-0">
            <div className="max-w-[616px] ml-auto">
              <div className="mb-16">
                <p className="text-body-m text-dark-green mb-2">ご挨拶</p>
                <h2 className="mb-16">
                  この街をよく知る、<br />住まいのプロとして
                </h2>
                <p className="text-body-l text-dark-green">
                  地域への想いとビジョン。<br />
                  地域と共に歩む企業として、暮らしの未来に貢献してまいります。
                </p>
              </div>
              <div className="flex justify-end">
                <Link href="/message" className="inline-flex items-center gap-2 group">
                  <span className="font-gothic font-medium text-[18px] text-dark-green">もっと知る</span>
                  <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="tablet:w-1/2 mt-8 tablet:mt-0 px-8 tablet:pl-0 tablet:pr-20">
            <div className="aspect-[557/742] relative rounded-2xl overflow-hidden">
              <Image
                src="/images/about/greeting.jpg"
                alt="三島の街並み"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* スタッフインタビューセクション */}
      <section className="bg-dark-green py-24">
        <div className="flex flex-col tablet:flex-row items-center">
          <div className="tablet:w-1/2 px-8 tablet:pl-12 tablet:pr-0 order-2 tablet:order-1">
            <div className="aspect-[557/742] relative rounded-2xl overflow-hidden">
              <Image
                src="/images/about/staff-interview.jpg"
                alt="スタッフインタビュー"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="tablet:w-1/2 px-8 tablet:pr-20 tablet:pl-0 order-1 tablet:order-2 mb-8 tablet:mb-0">
            <div className="max-w-[616px]">
              <div className="mb-16">
                <p className="text-body-m text-cream mb-2">スタッフインタビュー</p>
                <h2 className="text-cream mb-16">
                  この街で、不動産と<br />向き合うということ
                </h2>
                <p className="text-body-l text-cream">
                  アイ企画の中心となって働いている、髙野大地（たかの だいち）と髙野恒成（たかの こうせい）。創業者である父の想いを受け、地域に寄り添い、ともに歩んでいくと決めた二人のことを紹介します。
                </p>
              </div>
              <div className="flex justify-end">
                <Link href="/staff-interview" className="inline-flex items-center gap-2 group">
                  <span className="font-gothic font-medium text-[18px] text-cream">もっと知る</span>
                  <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* コンポスト活動セクション */}
      <section className="bg-light-green py-24 pb-32">
        <div className="page-container">
          <div className="mb-24">
            <p className="text-body-m text-dark-green mb-2">コンポスト活動</p>
            <h2>
              地域との繋がりで<br />
              サステナブルな環境を<br />
              創出する。
            </h2>
          </div>
          <div className="flex flex-col tablet:flex-row gap-16 items-start">
            {/* 左: コンポスト図解 */}
            <div className="tablet:w-[554px] shrink-0">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/about/compost-diagram.svg"
                  alt="コンポスト活動の循環図"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            {/* 右: テキスト */}
            <div className="flex-1">
              <div className="mb-12">
                <h4 className="font-mincho text-[24px] leading-[1.6] tracking-[0.04em] text-dark-green mb-4">
                  なぜ？コンポスト活動
                </h4>
                <p className="text-body-l text-dark-green">
                  私たちは、不動産探しのお手伝いをしたら終わり。ではなく、お引っ越しをされてからお客様と本当のお付き合いが始まります。不動産購入後も、一緒に街をつくる地域住民として、日頃から地域の人たちと関わることで、いざというときに頼れる存在でありたいと思っています。そこで、持続可能な地域との繋がりとして、生活の中で排出される生ゴミと、季節の作物を循環させるコンポスト活動を始めました。暮らしは&ldquo;地域&rdquo;の中にあり、地域をとりまく&ldquo;環境&rdquo;がある。このコンポスト活動を通じて、地域との繋がりを生み、サステナブルな環境を次の世代に残せることを願っています。
                </p>
              </div>

              <div className="bg-cream rounded-2xl p-[30px] mb-12">
                <p className="font-gothic font-medium text-[20px] text-dark-green mb-2">コンポストとは</p>
                <p className="text-body-l text-dark-green">
                  有機物を微生物の働きで分解させて堆肥にする処理方法、またはその堆肥のことをいいます。
                </p>
              </div>

              <div className="mb-12">
                <h4 className="font-mincho text-[24px] leading-[1.6] tracking-[0.04em] text-dark-green mb-4">
                  コンポスト活動の仕組み
                </h4>
                <p className="text-body-l text-dark-green">
                  コンポスト（生ゴミ乾燥機）を地域住⺠（アイ企画お客様）にお配りします。お客様には、家庭で出る生ゴミをお配りしたコンポストで乾燥させて頂き、定期的にアイ企画の畑に設置された回収BOXに投函していただきます。その後、私たちが回収した生ゴミで肥料を作り、農作業に利用します。そして畑で収穫された作物を、お客様にお届けします。
                </p>
              </div>

              <div>
                <h4 className="font-mincho text-[24px] leading-[1.6] tracking-[0.04em] text-dark-green mb-4">
                  アイ企画の環境への取組
                </h4>
                <p className="text-body-l text-dark-green">
                  アイ企画では、購入後の持続可能な暮らしの提案を目的とした「コンポスト事業」のほか、建物解体による建設産業廃棄物を減らすため使用可能な住宅の再利用を促進する「空き家・古民家再生事業」にも取り組んでいます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 会社概要セクション */}
      <section className="bg-cream py-24 pb-36">
        <div className="page-container">
          <div className="flex flex-col tablet:flex-row gap-16">
            {/* 左: 見出し */}
            <div className="tablet:w-[410px] shrink-0">
              <h3 className="font-mincho text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green">
                会社概要
              </h3>
            </div>
            {/* 右: テーブル */}
            <div className="flex-1 max-w-[616px]">
              <dl className="divide-y divide-dark-green/20 border-b border-dark-green/20">
                <div className="flex gap-8 py-6">
                  <dt className="w-[147px] shrink-0 text-body-l text-dark-green">商号</dt>
                  <dd className="text-body-l text-black">有限会社アイ企画</dd>
                </div>
                <div className="flex gap-8 py-6">
                  <dt className="w-[147px] shrink-0 text-body-l text-dark-green">設立</dt>
                  <dd className="text-body-l text-black">昭和61年12月</dd>
                </div>
                <div className="flex items-start justify-between py-6">
                  <dt className="text-body-l text-dark-green shrink-0">所在地</dt>
                  <dd className="flex flex-col gap-6 items-end w-[528px]">
                    <div className="flex items-center gap-3">
                      <span className="text-body-m text-dark-green text-right">静岡県三島市加茂18番地の7</span>
                      <a
                        href="https://maps.google.com/?q=静岡県三島市加茂18番地の7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tag-pill bg-light-blue text-dark-green"
                      >
                        MAP
                      </a>
                    </div>
                    <div className="w-full aspect-[528/370] relative rounded-2xl overflow-hidden border border-dark-green/20">
                      <Image
                        src="/images/about/map.jpg"
                        alt="アイ企画の所在地マップ"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </dd>
                </div>
                <div className="flex gap-8 py-6">
                  <dt className="w-[147px] shrink-0 text-body-l text-dark-green">電話</dt>
                  <dd className="text-body-l text-black">055-976-5300</dd>
                </div>
                <div className="flex gap-8 py-6">
                  <dt className="w-[147px] shrink-0 text-body-l text-dark-green">FAX</dt>
                  <dd className="text-body-l text-black">055-976-5301</dd>
                </div>
                <div className="flex items-center justify-between py-6">
                  <dt className="text-body-l text-dark-green shrink-0">営業時間</dt>
                  <dd className="flex flex-col gap-1 items-end text-right">
                    <div className="text-body-l text-dark-green">
                      <p>月曜日～土曜日</p>
                      <p>9:00～19:00</p>
                    </div>
                    <p className="text-body-s text-dark-green/50">※ご予約により営業時間外の対応も可能</p>
                  </dd>
                </div>
                <div className="flex gap-8 py-6">
                  <dt className="w-[147px] shrink-0 text-body-l text-dark-green">休業日</dt>
                  <dd className="text-body-l text-black">日曜日・祝日</dd>
                </div>
                <div className="flex gap-8 py-6">
                  <dt className="w-[147px] shrink-0 text-body-l text-dark-green">事業案内</dt>
                  <dd className="text-body-l text-black">土地・中古住宅・店舗の売買媒介及び賃貸物件の管理・媒介</dd>
                </div>
                <div className="flex gap-8 py-6">
                  <dt className="w-[147px] shrink-0 text-body-l text-dark-green">代表者</dt>
                  <dd className="text-body-l text-black">代表取締役　髙野大地</dd>
                </div>
                <div className="flex gap-8 py-6">
                  <dt className="w-[147px] shrink-0 text-body-l text-dark-green">免許</dt>
                  <dd className="text-body-l text-black">宅地建物取引業免許　静岡県知事（10）第6124号</dd>
                </div>
                <div className="flex gap-8 py-6">
                  <dt className="w-[147px] shrink-0 text-body-l text-dark-green">加盟団体</dt>
                  <dd className="text-body-l text-black">
                    公益社団法人　全国宅地建物取引業保証協会<br />
                    公益社団法人　静岡県宅地建物取引業協会<br />
                    公益社団法人　東海不動産公正取引協議会
                  </dd>
                </div>
                <div className="flex gap-8 py-6">
                  <dt className="w-[147px] shrink-0 text-body-l text-dark-green">資本金</dt>
                  <dd className="text-body-l text-black">500万円</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
