import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import ServiceCTA from '@/components/ui/ServiceCTA';

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

      {/* ヒーローセクション (Figma 4211:11107 + 4211:11109 / PC: 4211:10001 等) */}
      <section className="bg-cream pt-12 pb-12 tablet:py-24">
        {/* SP: タイトル → 写真の縦積み */}
        <div className="tablet:hidden flex flex-col gap-8 px-4">
          <div className="pl-2">
            <p className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green mb-2">アイ企画について</p>
            <h1 className="font-mincho text-[32px] leading-[1.5] tracking-[1.28px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              私たちは、「つくる」<br />不動産会社です。
            </h1>
          </div>
          <div className="aspect-[358/268] relative rounded-2xl overflow-hidden">
            <Image
              src="/images/about/hero.jpg"
              alt="アイ企画スタッフ"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 992px) 100vw, 0px"
            />
          </div>
        </div>
        {/* PC: 中央寄せタイトル + 横長画像 */}
        <div className="hidden tablet:block max-w-[1440px] mx-auto px-[45px]">
          <div className="text-center mb-12">
            <p className="font-gothic font-medium text-[18px] leading-[1.8] text-dark-green mb-2">アイ企画について</p>
            <h1 className="font-mincho text-[56px] leading-[1.5] tracking-[2.24px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              私たちは、「つくる」不動産会社です。
            </h1>
          </div>
          <div className="aspect-[2/1] relative rounded-3xl overflow-hidden">
            <Image
              src="/images/about/hero.jpg"
              alt="アイ企画スタッフ"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 992px) 1350px, 0px"
            />
          </div>
        </div>
      </section>

      {/* サービス CTA (共通コンポーネント Figma 4211:10023) */}
      <ServiceCTA />

      {/* ご挨拶セクション (Figma PC 4211:10025 / SP 4211:11115-11119) */}
      <section className="bg-cream py-[60px] tablet:py-24">
        {/* SP: 縦積み (label → heading → body → image → button) */}
        <div className="tablet:hidden flex flex-col gap-8 px-4">
          <div className="flex flex-col gap-4 px-2">
            <p className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">ご挨拶</p>
            <h2 className="font-mincho text-[28px] leading-[1.5] tracking-[1.12px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              この街をよく知る、<br />住まいのプロとして
            </h2>
            <p className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
              地域への想いとビジョン。<br />
              地域と共に歩む企業として、暮らしの未来に貢献してまいります。
            </p>
          </div>
          <div className="aspect-[358/268] relative rounded-2xl overflow-hidden">
            <Image
              src="/images/about/greeting.jpg"
              alt="三島の街並み"
              fill
              className="object-cover"
              sizes="(max-width: 992px) 100vw, 0px"
            />
          </div>
          <Link
            href="/message"
            className="flex items-center justify-center gap-2 h-12 bg-accent-blue rounded-full font-gothic font-medium text-[16px] leading-none text-white"
          >
            もっと知る
          </Link>
        </div>
        {/* PC: 両端揃えレイアウト (Figma 4211:10024 = pl-45/pr-75, text 616 + image 557×742, gap auto) */}
        <div className="hidden tablet:block max-w-[1440px] mx-auto pl-[45px] pr-[75px]">
          <div className="flex items-center justify-between gap-[60px]">
            <div className="flex-1 max-w-[616px]">
              <div className="mb-16">
                <p className="font-gothic font-medium text-[18px] leading-[1.8] text-dark-green mb-2">ご挨拶</p>
                <h2 className="font-mincho text-[48px] leading-[1.5] tracking-[1.92px] text-dark-green mb-16" style={{ fontFeatureSettings: "'palt' 1" }}>
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
            <div className="w-[557px] h-[742px] shrink-0 rounded-2xl overflow-hidden relative">
              <Image
                src="/images/about/greeting.jpg"
                alt="三島の街並み"
                fill
                className="object-cover"
                sizes="(min-width: 992px) 557px, 0px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* スタッフインタビューセクション (Figma PC 4211:10036 dot pattern bg / SP 4211:11120) */}
      <section
        className="bg-dark-green py-[60px] tablet:py-24 relative"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(252,255,247,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0',
        }}
      >
        {/* SP: 縦積み (label → heading → body → image → button) */}
        <div className="tablet:hidden flex flex-col gap-8 px-4">
          <div className="flex flex-col gap-4 px-2">
            <p className="font-gothic font-medium text-[14px] leading-[1.8] text-cream">スタッフインタビュー</p>
            <h2 className="font-mincho text-[28px] leading-[1.5] tracking-[1.12px] text-cream" style={{ fontFeatureSettings: "'palt' 1" }}>
              この街で、不動産と<br />向き合うということ
            </h2>
            <p className="font-gothic font-medium text-[14px] leading-[1.8] text-cream">
              アイ企画の中心となって働いている、髙野大地（たかの だいち）と髙野恒成（たかの こうせい）。創業者である父の想いを受け、地域に寄り添い、ともに歩んでいくと決めた二人のことを紹介します。
            </p>
          </div>
          <div className="aspect-[358/268] relative rounded-2xl overflow-hidden">
            <Image
              src="/images/about/staff-interview.jpg"
              alt="スタッフインタビュー"
              fill
              className="object-cover"
              sizes="(max-width: 992px) 100vw, 0px"
            />
          </div>
          <Link
            href="/staff-interview"
            className="flex items-center justify-center gap-2 h-12 bg-accent-blue rounded-full font-gothic font-medium text-[16px] leading-none text-white"
          >
            もっと知る
          </Link>
        </div>
        {/* PC: 両端揃え (image 左 / text 右, Figma 4211:10036 mirror of greeting) */}
        <div className="hidden tablet:block max-w-[1440px] mx-auto pl-[45px] pr-[75px]">
          <div className="flex items-center justify-between gap-[60px]">
            <div className="w-[557px] h-[742px] shrink-0 rounded-2xl overflow-hidden relative">
              <Image
                src="/images/about/staff-interview.jpg"
                alt="スタッフインタビュー"
                fill
                className="object-cover"
                sizes="(min-width: 992px) 557px, 0px"
              />
            </div>
            <div className="flex-1 max-w-[616px]">
              <div className="mb-16">
                <p className="font-gothic font-medium text-[18px] leading-[1.8] text-cream mb-2">スタッフインタビュー</p>
                <h2 className="font-mincho text-[48px] leading-[1.5] tracking-[1.92px] text-cream mb-16" style={{ fontFeatureSettings: "'palt' 1" }}>
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

      {/* コンポスト活動セクション (Figma SP 4211:11127 / PC 既存) */}
      <section className="bg-light-green py-[60px] pb-[80px] tablet:py-24 tablet:pb-32">
        <div className="px-4 tablet:px-[75px] max-w-[1440px] mx-auto">
          {/* 見出し */}
          <div className="mb-12 tablet:mb-24 px-2 tablet:px-0">
            <p className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green mb-2">コンポスト活動</p>
            <h2 className="font-mincho text-[28px] tablet:text-[48px] leading-[1.5] tracking-[1.12px] tablet:tracking-[1.92px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              地域との繋がりで<br />
              サステナブルな環境を<br />
              創出する。
            </h2>
          </div>

          <div className="flex flex-col tablet:flex-row gap-12 tablet:gap-16 items-start">
            {/* 図解 (SP では先頭) */}
            <div className="w-full tablet:w-[554px] shrink-0">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/about/compost-diagram.svg"
                  alt="コンポスト活動の循環図"
                  fill
                  className="object-contain"
                  sizes="(min-width: 992px) 554px, 100vw"
                />
              </div>
            </div>
            {/* テキスト */}
            <div className="flex-1 px-2 tablet:px-0">
              <div className="mb-10 tablet:mb-12">
                <h4 className="font-mincho text-[18px] tablet:text-[24px] leading-[1.6] tracking-[0.04em] text-dark-green mb-4">
                  なぜ？コンポスト活動
                </h4>
                <p className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green">
                  私たちは、不動産探しのお手伝いをしたら終わり。ではなく、お引っ越しをされてからお客様と本当のお付き合いが始まります。不動産購入後も、一緒に街をつくる地域住民として、日頃から地域の人たちと関わることで、いざというときに頼れる存在でありたいと思っています。そこで、持続可能な地域との繋がりとして、生活の中で排出される生ゴミと、季節の作物を循環させるコンポスト活動を始めました。暮らしは&ldquo;地域&rdquo;の中にあり、地域をとりまく&ldquo;環境&rdquo;がある。このコンポスト活動を通じて、地域との繋がりを生み、サステナブルな環境を次の世代に残せることを願っています。
                </p>
              </div>

              <div className="bg-cream rounded-2xl p-6 tablet:p-[30px] mb-10 tablet:mb-12">
                <p className="font-gothic font-medium text-[16px] tablet:text-[20px] leading-[1.6] text-dark-green mb-2">コンポストとは</p>
                <p className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green">
                  有機物を微生物の働きで分解させて堆肥にする処理方法、またはその堆肥のことをいいます。
                </p>
              </div>

              <div className="mb-10 tablet:mb-12">
                <h4 className="font-mincho text-[18px] tablet:text-[24px] leading-[1.6] tracking-[0.04em] text-dark-green mb-4">
                  コンポスト活動の仕組み
                </h4>
                <p className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green">
                  コンポスト（生ゴミ乾燥機）を地域住⺠（アイ企画お客様）にお配りします。お客様には、家庭で出る生ゴミをお配りしたコンポストで乾燥させて頂き、定期的にアイ企画の畑に設置された回収BOXに投函していただきます。その後、私たちが回収した生ゴミで肥料を作り、農作業に利用します。そして畑で収穫された作物を、お客様にお届けします。
                </p>
              </div>

              <div>
                <h4 className="font-mincho text-[18px] tablet:text-[24px] leading-[1.6] tracking-[0.04em] text-dark-green mb-4">
                  アイ企画の環境への取組
                </h4>
                <p className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green">
                  アイ企画では、購入後の持続可能な暮らしの提案を目的とした「コンポスト事業」のほか、建物解体による建設産業廃棄物を減らすため使用可能な住宅の再利用を促進する「空き家・古民家再生事業」にも取り組んでいます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 会社概要セクション (Figma PC 4211:10099 = pl-75/pr-75 + 410 heading + 616 table 両端揃え / SP 4211:11149 = dd 右寄せ) */}
      <section className="bg-cream py-[60px] pb-[80px] tablet:py-24 tablet:pb-36">
        <div className="px-4 tablet:px-[75px] max-w-[1440px] mx-auto">
          <div className="flex flex-col tablet:flex-row tablet:items-start tablet:justify-between gap-8 tablet:gap-[60px]">
            {/* 見出し */}
            <div className="tablet:w-[410px] shrink-0 px-2 tablet:px-0">
              <h3 className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green">
                会社概要
              </h3>
            </div>
            {/* テーブル: SP は dd 右寄せ / PC は w-616 固定 */}
            <div className="w-full tablet:w-[616px] shrink-0">
              <dl className="divide-y divide-dark-green/20 border-b border-dark-green/20">
                <div className="flex items-center justify-between gap-4 py-5 tablet:py-6">
                  <dt className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green shrink-0">商号</dt>
                  <dd className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-black text-right tablet:text-left tablet:flex-1 tablet:pl-10">有限会社アイ企画</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-5 tablet:py-6">
                  <dt className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green shrink-0">設立</dt>
                  <dd className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-black text-right tablet:text-left tablet:flex-1 tablet:pl-10">昭和61年12月</dd>
                </div>
                <div className="flex flex-col gap-4 py-5 tablet:py-6">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green shrink-0">所在地</dt>
                    <dd className="flex items-center gap-3">
                      <span className="font-gothic font-medium text-[14px] tablet:text-[16px] leading-[1.8] text-dark-green text-right">静岡県三島市加茂18番地の7</span>
                      <a
                        href="https://maps.google.com/?q=静岡県三島市加茂18番地の7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-3 py-1 bg-light-blue text-dark-green text-[12px] font-gothic font-medium rounded-full"
                      >
                        MAP
                      </a>
                    </dd>
                  </div>
                  <div className="w-full aspect-[528/370] relative rounded-2xl overflow-hidden border border-dark-green/20">
                    <Image
                      src="/images/about/map.jpg"
                      alt="アイ企画の所在地マップ"
                      fill
                      className="object-cover"
                      sizes="(min-width: 992px) 528px, 100vw"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 py-5 tablet:py-6">
                  <dt className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green shrink-0">電話</dt>
                  <dd className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-black text-right tablet:text-left tablet:flex-1 tablet:pl-10">055-976-5300</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-5 tablet:py-6">
                  <dt className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green shrink-0">FAX</dt>
                  <dd className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-black text-right tablet:text-left tablet:flex-1 tablet:pl-10">055-976-5301</dd>
                </div>
                <div className="flex items-start justify-between gap-4 py-5 tablet:py-6">
                  <dt className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green shrink-0">営業時間</dt>
                  <dd className="flex flex-col gap-1 items-end text-right">
                    <div className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green">
                      <p>月曜日～土曜日</p>
                      <p>9:00～19:00</p>
                    </div>
                    <p className="font-gothic font-medium text-[12px] tablet:text-[14px] leading-[1.8] text-dark-green/50">※ご予約により営業時間外の対応も可能</p>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-5 tablet:py-6">
                  <dt className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green shrink-0">休業日</dt>
                  <dd className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-black text-right tablet:text-left tablet:flex-1 tablet:pl-10">日曜日・祝日</dd>
                </div>
                <div className="flex items-start justify-between gap-4 py-5 tablet:py-6">
                  <dt className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green shrink-0">事業案内</dt>
                  <dd className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-black text-right tablet:text-left tablet:flex-1 tablet:pl-10 max-w-[60%] tablet:max-w-none">土地・中古住宅・店舗の売買媒介及び賃貸物件の管理・媒介</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-5 tablet:py-6">
                  <dt className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green shrink-0">代表者</dt>
                  <dd className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-black text-right tablet:text-left tablet:flex-1 tablet:pl-10">代表取締役　髙野大地</dd>
                </div>
                <div className="flex items-start justify-between gap-4 py-5 tablet:py-6">
                  <dt className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green shrink-0">免許</dt>
                  <dd className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-black text-right tablet:text-left tablet:flex-1 tablet:pl-10 max-w-[60%] tablet:max-w-none">宅地建物取引業免許　静岡県知事（10）第6124号</dd>
                </div>
                <div className="flex items-start justify-between gap-4 py-5 tablet:py-6">
                  <dt className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green shrink-0">加盟団体</dt>
                  <dd className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-black text-right tablet:text-left tablet:flex-1 tablet:pl-10">
                    公益社団法人　全国宅地建物取引業保証協会<br />
                    公益社団法人　静岡県宅地建物取引業協会<br />
                    公益社団法人　東海不動産公正取引協議会
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-5 tablet:py-6">
                  <dt className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-dark-green shrink-0">資本金</dt>
                  <dd className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] text-black text-right tablet:text-left tablet:flex-1 tablet:pl-10">500万円</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
