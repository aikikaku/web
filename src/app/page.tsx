import { getProperties, getStories } from '@/lib/microcms/queries';
import PropertyCard from '@/components/property/PropertyCard';
import StoryCard from '@/components/story/StoryCard';
import Link from 'next/link';

export const revalidate = 3600;

export default async function HomePage() {
  const newProperties = await getProperties({
    limit: 6,
    filters: 'status[equals]available',
    orders: '-publishedAt',
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 6 }));

  const latestStories = await getStories({
    limit: 3,
    orders: '-publishedAt',
  }).catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 3 }));

  return (
    <div>
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-b from-gray-100 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            家族の想いを、
            <br />
            つなぐ不動産へ。
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            静岡県三島市を中心に、暮らしを見つけるお手伝い
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/properties?status=available"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              物件を探す
            </Link>
            <Link
              href="/stories"
              className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              暮らしを知る
            </Link>
          </div>
        </div>
      </section>

      {/* 新着物件セクション */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">新着物件</h2>
          <Link
            href="/properties?status=available"
            className="text-blue-600 hover:underline font-semibold"
          >
            もっと物件を見る →
          </Link>
        </div>
        {newProperties.contents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newProperties.contents.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">
            現在ご案内中の物件はありません
          </p>
        )}
      </section>

      {/* ストーリーセクション */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">暮らしを知る</h2>
            <Link
              href="/stories"
              className="text-blue-600 hover:underline font-semibold"
            >
              もっと見る →
            </Link>
          </div>
          {latestStories.contents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestStories.contents.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">
              ストーリーはまだありません
            </p>
          )}
        </div>
      </section>

      {/* サービスセクション */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/for-customer"
            className="block p-8 border rounded-lg hover:shadow-lg transition group"
          >
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              不動産をお探しの方へ
            </h3>
            <p className="text-gray-600">
              お客様のご要望に合った物件をお探しします。お気軽にご相談ください。
            </p>
          </Link>
          <Link
            href="/for-owner"
            className="block p-8 border rounded-lg hover:shadow-lg transition group"
          >
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
              不動産をお持ちの方へ
            </h3>
            <p className="text-gray-600">
              売却・賃貸のご相談を承ります。地域に精通したスタッフが対応いたします。
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
