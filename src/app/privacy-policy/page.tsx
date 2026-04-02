import Breadcrumb from '@/components/ui/Breadcrumb';
import type { Metadata } from 'next';

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
    heading: '5.プライバシーポリシーの変更',
    body: 'アイ企画は、プライバシーポリシーについて定期的な見直し、および継続的な改善を実施致します。プライバシーポリシーに重要な変更がある場合は当サイトに掲示いたします。個人情報の取扱いについて、ご質問等がございましたらお問い合わせフォームからご連絡下さい。',
  },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp';

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
              { '@type': 'ListItem', position: 1, name: 'ホーム', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'プライバシーポリシー' },
            ],
          }),
        }}
      />
      <div className="page-container">
        <Breadcrumb items={[{ label: 'プライバシーポリシー' }]} />
      </div>

      <section className="pt-24 pb-36 page-container">
        <h1 className="mb-24">プライバシーポリシーについて</h1>

        <div className="flex justify-center">
          <div className="w-full max-w-[704px] flex flex-col gap-16">
            {/* イントロ */}
            <p className="text-body-l text-black">
              アイ企画が運営する当サイト「 izuip.com 」における、個人情報に関する取扱いについて以下に記載致します。
            </p>

            {/* セクション */}
            {sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-4">
                <h4>{section.heading}</h4>
                <p className="text-body-l text-black whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            ))}

            {/* 日付 */}
            <p className="text-body-l text-black">
              2021.01　アイ企画
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
