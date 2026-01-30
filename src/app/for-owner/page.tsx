import { getPageBySlug } from '@/lib/microcms/queries';
import RichText from '@/components/ui/RichText';
import Breadcrumb from '@/components/ui/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '不動産をお持ちの方へ',
  description: '不動産の売却・賃貸をお考えの方へ、アイ企画のサービスをご紹介します。',
};

export const revalidate = 3600;

export default async function ForOwnerPage() {
  const page = await getPageBySlug('for-owner');

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '不動産をお持ちの方へ' }]} />
      <h1 className="text-3xl font-bold mb-8">不動産をお持ちの方へ</h1>

      {page?.content ? (
        <div className="max-w-3xl mx-auto">
          <RichText content={page.content} />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p>
            不動産の売却・賃貸をお考えの方、まずはお気軽にご相談ください。
            地域に精通したスタッフが、適切な査定と販売戦略をご提案いたします。
          </p>
          <h2>売却の流れ</h2>
          <ol>
            <li>無料査定のご依頼</li>
            <li>物件の査定・評価</li>
            <li>販売計画のご提案</li>
            <li>販売活動の開始</li>
            <li>契約・引き渡し</li>
          </ol>
        </div>
      )}
    </div>
  );
}
