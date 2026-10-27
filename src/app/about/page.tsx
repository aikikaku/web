import Image from 'next/image';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import ServiceCTA from '@/components/ui/card/ServiceCTA';
import MoreLinkButton from '@/components/ui/interactive/MoreLinkButton';
import ButtonPrimarySp from '@/components/ui/interactive/ButtonPrimarySp';
import Reveal from '@/components/common/Reveal';
import Breadcrumb from '@/components/ui/navigation/Breadcrumb';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'アイ企画について',
  description: 'アイ企画の企業理念・ビジョン・会社概要をご紹介します。',
};

/** 会社概要の通常行 (Figma List Item-def 4470:14226 等): dt 幅 147 + gap 30 + dd 左揃え・縦中央 */
function CompanyRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-[1.875rem] py-6">
      <dt className="w-[9.1875rem] shrink-0 text-dark-green">{label}</dt>
      <dd className="flex-1 min-w-0 text-black">{children}</dd>
    </div>
  );
}

const companyRows: { label: string; value: string }[] = [
  { label: '商号', value: '有限会社アイ企画' },
  { label: '設立', value: '昭和61年12月' },
  { label: '電話', value: '055-976-5300' },
  { label: 'FAX', value: '055-976-5301' },
  { label: '休業日', value: '日曜日・祝日' },
  { label: '事業案内', value: '土地・中古住宅・店舗の売買媒介及び賃貸物件の管理・媒介' },
  { label: '代表者', value: '代表取締役　髙野大地' },
  { label: '免許', value: '宅地建物取引業免許　静岡県知事（10）第6124号' },
];

const memberOrganizations = [
  '全国宅地建物取引業保証協会',
  '静岡県宅地建物取引業協会',
  '東海不動産公正取引協議会',
];

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
              { '@type': 'ListItem', position: 1, name: 'ホーム', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'アイ企画を知る' },
              { '@type': 'ListItem', position: 3, name: 'アイ企画について' },
            ],
          }),
        }}
      />
      <Breadcrumb items={[{ label: 'アイ企画を知る' }, { label: 'アイ企画について' }]} />

      {/* ヒーローセクション (Figma Handoff 20260724: PC 4470:14141 / SP 4470:15237) */}
      <section className="bg-cream py-[3.75rem] tablet:py-24">
        {/* SP: 中央揃えタイトル → 正方形写真 (Figma 4470:15237: py-60 / gap-32 / 写真 358×358 r24。
            写真は Figma の切り出し (370×478 を縦中央・左寄せ) を hero-sp.jpg に書き出し済み) */}
        <div className="tablet:hidden flex flex-col gap-8 px-4">
          <div className="text-center">
            <p className="font-gothic font-medium text-body-m text-dark-green mb-2">アイ企画について</p>
            <h1 className="font-mincho text-heading-32 text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              私たちは、「つくる」<br />不動産会社です。
            </h1>
          </div>
          <div className="aspect-square relative rounded-3xl overflow-hidden">
            <Image
              src="/images/about/hero-sp.jpg"
              alt="アイ企画スタッフ"
              fill
              className="object-cover"
              priority
              quality={90}
              sizes="(max-width: 992px) 100vw, 0px"
            />
          </div>
        </div>
        {/* PC: 中央寄せタイトル (48px) + 横長画像 1290×645 r24 (Figma 4470:14142 / 4470:14143。
            写真は Figma の切り出し位置で hero.jpg に書き出し済み) */}
        <div className="hidden tablet:block max-w-[90rem] mx-auto px-[4.6875rem]">
          <div className="text-center mb-12">
            <p className="font-gothic font-medium text-body-m text-dark-green mb-2">アイ企画について</p>
            <h1 className="font-mincho text-heading-48 text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
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
              quality={90}
              sizes="(min-width: 992px) 1290px, 0px"
            />
          </div>
        </div>
      </section>

      {/* サービス CTA (共通コンポーネント Figma 4211:10023) */}
      <Reveal>
        <ServiceCTA />
      </Reveal>

      {/* ご挨拶セクション (Figma PC 4211:10025 / SP 4211:11115-11119) */}
      <Reveal as="section" className="bg-cream py-[3.75rem] tablet:py-24">
        {/* SP: 縦積み (label → heading → body → image → button)。
            Figma 4470:15245: label→heading 8 / heading→body 16、見出し 32px・本文 16px (Body M) */}
        <div className="tablet:hidden flex flex-col gap-8 px-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-gothic font-medium text-body-m text-dark-green">ご挨拶</p>
              <h2 className="font-mincho text-heading-32 text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                この街をよく知る、<br />住まいのプロとして
              </h2>
            </div>
            <p className="font-gothic font-medium text-body-m text-dark-green">
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
              quality={90}
            />
          </div>
          <MoreLinkButton href="/message" mode="sp" />
        </div>
        {/* PC: 両端揃えレイアウト (Figma 4470:14145 = pl-45/pr-75, text 616 + image 557×742, gap auto)。
            テキスト塊のみ pl-30・本文幅 469、テキスト塊→ボタン 96 (Figma 4470:14146-14149) */}
        <div className="hidden tablet:block max-w-[90rem] mx-auto pl-[2.8125rem] pr-[4.6875rem]">
          <div className="flex items-center justify-between gap-[3.75rem]">
            <div className="flex-1 max-w-[38.5rem]">
              <div className="mb-24 pl-[1.875rem]">
                <p className="font-gothic font-medium text-body-m text-dark-green mb-2">ご挨拶</p>
                <h2 className="font-mincho text-heading-48 text-dark-green mb-16" style={{ fontFeatureSettings: "'palt' 1" }}>
                  この街をよく知る、<br />住まいのプロとして
                </h2>
                <p className="text-body-l text-dark-green max-w-[29.3125rem]">
                  地域への想いとビジョン。<br />
                  地域と共に歩む企業として、暮らしの未来に貢献してまいります。
                </p>
              </div>
              <div className="flex justify-end">
                <MoreLinkButton href="/message" mode="pc" pcColor="dark-green" />
              </div>
            </div>
            <div className="w-[34.8125rem] h-[46.375rem] shrink-0 rounded-2xl overflow-hidden relative">
              <Image
                src="/images/about/greeting.jpg"
                alt="三島の街並み"
                fill
                className="object-cover"
                sizes="(min-width: 992px) 557px, 0px"
                quality={90}
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* スタッフインタビューセクション (Figma 4470:14154: dark-green + Paper パターン 20% / SP 4211:11120) */}
      <section className="bg-dark-green py-[3.75rem] tablet:py-24 paper-texture">
        {/* SP: 縦積み (label → heading → body → image → button)。Figma 4470:15252 (ご挨拶 SP と同じ構成) */}
        <Reveal className="tablet:hidden flex flex-col gap-8 px-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-gothic font-medium text-body-m text-cream">スタッフインタビュー</p>
              <h2 className="font-mincho text-heading-32 text-cream" style={{ fontFeatureSettings: "'palt' 1" }}>
                この街で、不動産と<br />向き合うということ
              </h2>
            </div>
            <p className="font-gothic font-medium text-body-m text-cream">
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
              quality={90}
            />
          </div>
          {/* Figma I4470:15257: dark-green 背景上のため文字色 cream */}
          <ButtonPrimarySp href="/staff-interview" label="もっと知る" textColor="cream" />
        </Reveal>
        {/* PC: 両端揃え (image 左 / text 右, Figma 4211:10036 mirror of greeting) */}
        <Reveal className="hidden tablet:block max-w-[90rem] mx-auto pl-[2.8125rem] pr-[4.6875rem]">
          <div className="flex items-center justify-between gap-[3.75rem]">
            <div className="w-[34.8125rem] h-[46.375rem] shrink-0 rounded-2xl overflow-hidden relative">
              <Image
                src="/images/about/staff-interview.jpg"
                alt="スタッフインタビュー"
                fill
                className="object-cover"
                sizes="(min-width: 992px) 557px, 0px"
                quality={90}
              />
            </div>
            <div className="flex-1 max-w-[38.5rem]">
              {/* テキスト塊→ボタン 96、本文幅 469 (Figma 4470:14157-14160) */}
              <div className="mb-24">
                <p className="font-gothic font-medium text-body-m text-cream mb-2">スタッフインタビュー</p>
                <h2 className="font-mincho text-heading-48 text-cream mb-16" style={{ fontFeatureSettings: "'palt' 1" }}>
                  この街で、不動産と<br />向き合うということ
                </h2>
                <p className="text-body-l text-cream max-w-[29.3125rem]">
                  アイ企画の中心となって働いている、髙野大地（たかの だいち）と髙野恒成（たかの こうせい）。創業者である父の想いを受け、地域に寄り添い、ともに歩んでいくと決めた二人のことを紹介します。
                </p>
              </div>
              <div className="flex justify-end">
                <MoreLinkButton href="/staff-interview" mode="pc" pcColor="cream" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* コンポスト活動セクション (Figma Handoff 20260724: PC 4470:14163 / SP 4470:15258)。
          左テキストを上部「スタッフインタビュー」section と同じ左45px(pl-[2.8125rem])に揃える (#23)。
          SP はブロック間すべて 32px・py-60、PC は図 554 + 本文 616 の両端揃え */}
      <Reveal as="section" className="bg-light-green py-[3.75rem] tablet:py-24 tablet:pb-32">
        <div className="px-4 tablet:pl-[2.8125rem] tablet:pr-[4.6875rem] max-w-[90rem] mx-auto">
          {/* 見出し (SP 32px / PC 48px) */}
          <div className="mb-8 tablet:mb-24">
            <p className="font-gothic font-medium text-body-m text-dark-green mb-2">コンポスト活動</p>
            <h2 className="font-mincho text-heading-32 tablet:text-heading-48 text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
              地域との繋がりで<br />
              サステナブルな環境を<br />
              創出する。
            </h2>
          </div>

          <div className="flex flex-col tablet:flex-row gap-8 tablet:gap-0 tablet:justify-between items-start">
            {/* 図解 (SP では先頭) */}
            <div className="w-full tablet:w-[34.625rem] shrink-0">
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
            {/* テキスト (PC: 幅 616 / Figma 4470:14206。なぜ→コンポストとは 48、以降のブロック間 64) */}
            <div className="w-full tablet:w-[38.5rem] shrink-0">
              <div className="mb-8 tablet:mb-12">
                <h4 className="font-mincho text-heading-18 tablet:text-heading-24 text-dark-green mb-2 tablet:mb-4">
                  なぜ？コンポスト活動
                </h4>
                <p className="font-gothic font-medium text-body-m tablet:text-body-l text-dark-green">
                  私たちは、不動産探しのお手伝いをしたら終わり。ではなく、お引っ越しをされてからお客様と本当のお付き合いが始まります。不動産購入後も、一緒に街をつくる地域住民として、日頃から地域の人たちと関わることで、いざというときに頼れる存在でありたいと思っています。そこで、持続可能な地域との繋がりとして、生活の中で排出される生ゴミと、季節の作物を循環させるコンポスト活動を始めました。暮らしは&ldquo;地域&rdquo;の中にあり、地域をとりまく&ldquo;環境&rdquo;がある。このコンポスト活動を通じて、地域との繋がりを生み、サステナブルな環境を次の世代に残せることを願っています。
                </p>
              </div>

              {/* SP: r8 / タイトル 18px (Figma 4470:15266)、PC: r16 / タイトル 20px (Figma 4470:14211) */}
              <div className="bg-cream rounded-lg tablet:rounded-2xl p-6 tablet:p-[1.875rem] mb-8 tablet:mb-16">
                <p className="font-gothic font-medium text-[1.125rem] tablet:text-[1.25rem] leading-[1.6] text-dark-green mb-2">コンポストとは</p>
                <p className="font-gothic font-medium text-body-m tablet:text-body-l text-dark-green">
                  有機物を微生物の働きで分解させて堆肥にする処理方法、またはその堆肥のことをいいます。
                </p>
              </div>

              <div className="mb-8 tablet:mb-16">
                <h4 className="font-mincho text-heading-18 tablet:text-heading-24 text-dark-green mb-2 tablet:mb-4">
                  コンポスト活動の仕組み
                </h4>
                <p className="font-gothic font-medium text-body-m tablet:text-body-l text-dark-green">
                  コンポスト（生ゴミ乾燥機）を地域住⺠（アイ企画お客様）にお配りします。お客様には、家庭で出る生ゴミをお配りしたコンポストで乾燥させて頂き、定期的にアイ企画の畑に設置された回収BOXに投函していただきます。その後、私たちが回収した生ゴミで肥料を作り、農作業に利用します。そして畑で収穫された作物を、お客様にお届けします。
                </p>
              </div>

              <div>
                <h4 className="font-mincho text-heading-18 tablet:text-heading-24 text-dark-green mb-2 tablet:mb-4">
                  アイ企画の環境への取組
                </h4>
                <p className="font-gothic font-medium text-body-m tablet:text-body-l text-dark-green">
                  アイ企画では、購入後の持続可能な暮らしの提案を目的とした「コンポスト事業」のほか、建物解体による建設産業廃棄物を減らすため使用可能な住宅の再利用を促進する「空き家・古民家再生事業」にも取り組んでいます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 会社概要セクション (Figma Handoff 20260724: PC 4470:14220 = px-75 + 410 heading + 616 table 両端揃え /
          SP 4470:15275 = pb-120)。各行は dt 幅 147 + gap 30 + dd 左揃え・縦中央 (List Item-def)、
          所在地・営業時間のみ右寄せ。区切り線 rgba(42,54,59,0.2)、行の上下 24px */}
      <Reveal as="section" className="bg-cream pt-[3.75rem] pb-[7.5rem] tablet:pt-24 tablet:pb-36">
        <div className="px-4 tablet:px-[4.6875rem] max-w-[90rem] mx-auto">
          <div className="flex flex-col tablet:flex-row tablet:items-start tablet:justify-between gap-8 tablet:gap-[3.75rem]">
            {/* 見出し (SP 24px/1.6 sub-heading-2 / PC 32px/1.5 sub-heading-1) */}
            <div className="tablet:w-[25.625rem] shrink-0">
              <h3 className="font-mincho text-heading-24 tablet:text-heading-32 text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                会社概要
              </h3>
            </div>
            {/* テーブル: PC は w-616 固定 */}
            <div className="w-full tablet:w-[38.5rem] shrink-0">
              <dl className="divide-y divide-dark-green/20 border-b border-dark-green/20 font-gothic font-medium text-body-s tablet:text-body-l">
                {companyRows.slice(0, 2).map((row) => (
                  <CompanyRow key={row.label} label={row.label}>{row.value}</CompanyRow>
                ))}
                {/* 所在地: PC は dd 列 (幅 528) に住所 + MAP、その下に地図 (Figma 4470:14228)。
                    SP は住所行の下に全幅の地図 (Figma 4470:15284)。住所→地図 24px */}
                <div className="grid grid-cols-[auto_1fr] tablet:grid-cols-[1fr_33rem] items-center gap-x-4 gap-y-6 py-6">
                  <dt className="text-dark-green">所在地</dt>
                  <dd className="flex items-center justify-end gap-3">
                    <span className="text-[0.875rem] tablet:text-[1rem] leading-[1.8] text-dark-green text-right">静岡県三島市加茂18番地の7</span>
                    {/* Tag (Figma 4470:14233): 14px / px12・py6 + pb2 */}
                    <a
                      href="https://maps.google.com/?q=静岡県三島市加茂18番地の7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-3 pt-1.5 pb-2 bg-light-blue text-dark-green text-[0.875rem] leading-none font-gothic font-medium rounded-full shrink-0"
                    >
                      MAP
                    </a>
                  </dd>
                  {/* Google マップ埋め込み (#22)。APIキー不要の output=embed 形式・遅延読込。境界線 1px rgba(0.2) */}
                  <iframe
                    src="https://maps.google.com/maps?q=%E9%9D%99%E5%B2%A1%E7%9C%8C%E4%B8%89%E5%B3%B6%E5%B8%82%E5%8A%A0%E8%8C%8218%E7%95%AA%E5%9C%B0%E3%81%AE7&z=16&output=embed"
                    title="アイ企画の所在地（Google マップ）"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="block w-full aspect-[528/370] rounded-2xl overflow-hidden border border-solid border-dark-green/20 col-span-2 tablet:col-span-1 tablet:col-start-2"
                  />
                </div>
                {companyRows.slice(2, 4).map((row) => (
                  <CompanyRow key={row.label} label={row.label}>{row.value}</CompanyRow>
                ))}
                {/* 営業時間: dd 右寄せ・縦中央 (Figma 4470:14237 / SP 4470:15294) */}
                <div className="flex items-center justify-between gap-4 py-6">
                  <dt className="text-dark-green shrink-0">営業時間</dt>
                  <dd className="flex flex-col gap-1 items-end text-right">
                    <div className="text-dark-green">
                      <p>月曜日～土曜日</p>
                      <p>9:00～19:00</p>
                    </div>
                    <p className="text-caption tablet:text-body-s text-dark-green/50">※ご予約により営業時間外の対応も可能</p>
                  </dd>
                </div>
                {companyRows.slice(4).map((row) => (
                  <CompanyRow key={row.label} label={row.label}>{row.value}</CompanyRow>
                ))}
                {/* 加盟団体: SP は「公益社団法人」で改行 + 団体間に空行 (Figma 4470:15303)、PC は 1 団体 1 行 (Figma 4470:14246) */}
                <CompanyRow label="加盟団体">
                  {memberOrganizations.map((name, i) => (
                    <span key={name}>
                      {i > 0 && (
                        <>
                          <br />
                          <br className="tablet:hidden" />
                        </>
                      )}
                      公益社団法人<br className="tablet:hidden" /><span className="hidden tablet:inline">　</span>{name}
                    </span>
                  ))}
                </CompanyRow>
                <CompanyRow label="資本金">500万円</CompanyRow>
              </dl>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
