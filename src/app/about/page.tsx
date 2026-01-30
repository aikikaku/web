import { getPageBySlug } from '@/lib/microcms/queries';
import RichText from '@/components/ui/RichText';
import Breadcrumb from '@/components/ui/Breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'アイ企画について',
  description: 'アイ企画の企業理念・ビジョン・会社概要をご紹介します。',
};

export const revalidate = 3600;

export default async function AboutPage() {
  const page = await getPageBySlug('about');

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'アイ企画について' }]} />
      <h1 className="text-3xl font-bold mb-8">アイ企画について</h1>
      {page?.content ? (
        <RichText content={page.content} />
      ) : (
        <div className="prose prose-lg max-w-none">
          <p>
            アイ企画は、静岡県三島市を中心に不動産の売買・賃貸をお手伝いしている不動産会社です。
            地域に根ざし、お客様一人ひとりに寄り添ったサービスを提供しています。
          </p>
          <h2>会社概要</h2>
          <table>
            <tbody>
              <tr>
                <th>会社名</th>
                <td>株式会社アイ企画</td>
              </tr>
              <tr>
                <th>所在地</th>
                <td>静岡県三島市</td>
              </tr>
              <tr>
                <th>事業内容</th>
                <td>不動産売買・賃貸の仲介</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
