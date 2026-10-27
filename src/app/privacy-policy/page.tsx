import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/navigation/Breadcrumb';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'プライバシーポリシーについて',
  description: 'アイ企画のプライバシーポリシー（個人情報保護方針）です。',
};

const sections = [
  {
    heading: 'はじめに',
    body: 'アイ企画では個人情報を保護し、お客様に更なる信頼性と安心感をご提供できるように努めて参ります。 また、個人情報に関する法令を遵守し、個人情報の適切な取扱いを実現致します。',
  },
  {
    heading: '1.個人情報の取得について',
    body: 'アイ企画において、お客様の個人情報を取得する場合は、取得目的を明確にしサイト利用者のご要望に応じたサービスを提供するため「お問い合わせ」フォームにて、個人情報を取得しております。',
  },
  {
    heading: '2.個人情報の管理について',
    body: 'アイ企画は、取扱う個人情報の漏洩、滅失または毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。',
  },
  {
    heading: '3.個人情報の利用について',
    body: 'アイ企画は、個人情報を取得目的の範囲内で取扱います。また、当初の範囲を超えて取扱う場合には改めて本人の同意を得る等の対応を行います。',
  },
  {
    heading: '4.個人情報の提供について',
    body: 'アイ企画は以下の場合を除き、お客様の個人情報を第三者に開示または提供致しません。\n・法令に基づく場合\n・生命・身体または財産の保護のために必要であって、お客様の同意を得ることが困難な場合\n・お客様の同意がある場合',
  },
  {
    heading: '5.業務の委託と外部サービスの利用について',
    body: 'アイ企画は、お問い合わせへの対応に必要な範囲で、個人情報の取扱いを外部のサービスに委託することがあります。委託先には適切な管理を求めます。\n・お問い合わせ内容の通知・自動返信メールの送信（Resend）\n・お問い合わせ内容の記録・管理（Superhuman Docs）\nまた、当サイトでは利用状況を把握するためにアクセス解析（Vercel Web Analytics）を利用しています。このアクセス解析は Cookie を使わず、個人を特定する情報は収集しません。',
  },
  {
    heading: '6.個人情報の開示・訂正・削除について',
    body: 'お客様ご本人から個人情報の開示・訂正・利用停止・削除のご依頼があった場合は、ご本人であることを確認したうえで、速やかに対応いたします。お問い合わせフォームからご連絡下さい。',
  },
  {
    heading: '7.プライバシーポリシーの変更',
    body: 'アイ企画は、プライバシーポリシーについて定期的な見直し、および継続的な改善を実施致します。プライバシーポリシーに重要な変更がある場合は当サイトに掲示いたします。個人情報の取扱いについて、ご質問等がございましたらお問い合わせフォームからご連絡下さい。',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'ホーム', item: SITE_URL },
              { '@type': 'ListItem', position: 2, name: 'プライバシーポリシー' },
            ],
          }),
        }}
      />
      <Breadcrumb items={[{ label: 'プライバシーポリシーについて' }]} />

      {/* Figma Handoff 20260724 PC 4470:15650: pt-96 / タイトル→本文 96 / ブロック間 64 / 見出し→本文 16 / pb-144、本文 18px/1.8
          SP 4470:15317: px-16 / pt-60 / タイトル→本文 60 / ブロック間 60 (pb-32 + pt-28) / 見出し→本文 8 / pb-120、本文 16px/2.0
          見出しは PC/SP とも 24px/1.6 (高さ 38)。タイトルの字間は 4% (sub-heading-1 / section-heading) */}
      <section className="pt-[3.75rem] tablet:pt-24 pb-[7.5rem] tablet:pb-36 px-4 tablet:px-[4.6875rem] max-w-[90rem] mx-auto">
        <h1 className="font-mincho text-[2rem] tablet:text-[3rem] leading-[1.5] tracking-[0.04em] text-dark-green mb-[3.75rem] tablet:mb-24" style={{ fontFeatureSettings: "'palt' 1" }}>プライバシーポリシーについて</h1>

        <div className="flex justify-center">
          <div className="w-full max-w-[44rem] flex flex-col gap-[3.75rem] tablet:gap-16">
            {/* イントロ */}
            <p className="text-body-m tablet:text-body-l text-black">
              アイ企画が運営する当サイト（aikikaku.net）における、個人情報に関する取扱いについて以下に記載致します。
            </p>

            {/* セクション */}
            {sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-2 tablet:gap-4">
                <h4 className="text-[1.5rem] leading-[1.6] text-black">{section.heading}</h4>
                <p className="text-body-m tablet:text-body-l text-black whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            ))}

            {/* 制定日（公開日）。公開日が決まったら合わせる */}
            <p className="text-body-m tablet:text-body-l text-black">
              2026.10.30　アイ企画
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
