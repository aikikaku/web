import { getPageBySlug } from '@/lib/microcms/queries';
import RichText from '@/components/ui/RichText';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '不動産をお探しの方へ',
  description: '不動産の購入・賃貸をお考えの方へ、アイ企画のサービスをご紹介します。',
};

export const revalidate = 3600;

export default async function ForCustomerPage() {
  const page = await getPageBySlug('for-customer');

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '不動産をお探しの方へ' }]} />
      <h1 className="text-3xl font-bold mb-8">不動産をお探しの方へ</h1>

      {page?.content ? (
        <div className="max-w-3xl mx-auto">
          <RichText content={page.content} />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p>
            アイ企画では、お客様のご要望に合った物件をお探しいたします。
            三島市を中心とした静岡県東部エリアの物件情報を豊富に取り揃えています。
          </p>
          <h2>サービスの流れ</h2>
          <ol>
            <li>ご要望のヒアリング</li>
            <li>物件のご提案</li>
            <li>内覧のご案内</li>
            <li>契約手続きのサポート</li>
          </ol>
        </div>
      )}

      <div className="max-w-3xl mx-auto mt-12 text-center">
        <Link
          href="/properties?status=available"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          物件を探す
        </Link>
      </div>
    </div>
  );
}
