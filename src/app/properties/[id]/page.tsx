import { getProperty, getProperties } from '@/lib/microcms/queries';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyDetails from '@/components/property/PropertyDetails';
import PropertyCard from '@/components/property/PropertyCard';
import RichText from '@/components/ui/RichText';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getImageUrl } from '@/lib/microcms/image';

export const revalidate = 3600;

export async function generateStaticParams() {
  const data = await getProperties({ limit: 100, fields: 'id' });

  return data.contents.map((property) => ({
    id: property.id,
  }));
}

interface PropertyPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const property = await getProperty(params.id).catch(() => null);

  if (!property) {
    return { title: '物件が見つかりません' };
  }

  const description = [
    property.location,
    property.layout,
    property.price
      ? `${property.price.toLocaleString()}万円`
      : property.rent
        ? `${property.rent.toLocaleString()}円/月`
        : '',
  ]
    .filter(Boolean)
    .join(' ');

  return {
    title: property.title,
    description,
    openGraph: {
      title: property.title,
      description,
      images: [
        getImageUrl(property.mainImage, { width: 1200, height: 630, format: 'webp' }),
      ],
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await getProperty(params.id).catch(() => null);

  if (!property) {
    notFound();
  }

  const relatedProperties = await getProperties({
    limit: 3,
    filters: `id[not_equals]${property.id}`,
    orders: '-publishedAt',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: '物件を探す', href: '/properties' },
          { label: property.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* 画像ギャラリー */}
        <PropertyGallery
          mainImage={property.mainImage}
          images={property.images}
        />

        {/* 物件情報 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            {property.label && (
              <span
                className={`px-3 py-1 text-sm rounded text-white ${
                  property.type === 'sell' ? 'bg-red-500' : 'bg-blue-500'
                }`}
              >
                {property.label}
              </span>
            )}
            <span
              className={`px-3 py-1 text-sm rounded text-white ${
                property.status === 'available' ? 'bg-green-500' : 'bg-gray-500'
              }`}
            >
              {property.status === 'available' ? 'ご案内中' : '成約済み'}
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

          <div className="text-3xl font-bold text-blue-600 mb-6">
            {property.price
              ? `${property.price.toLocaleString()}万円`
              : property.rent
                ? `${property.rent.toLocaleString()}円/月`
                : '価格応談'}
          </div>

          {property.regions && property.regions.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {property.regions.map((region) => (
                <span
                  key={region.id}
                  className="text-sm bg-gray-200 px-3 py-1 rounded"
                >
                  {region.name}
                </span>
              ))}
            </div>
          )}

          <PropertyDetails property={property} />
        </div>
      </div>

      {/* 詳細説明 */}
      {property.description && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">詳細説明</h2>
          <RichText content={property.description} />
        </div>
      )}

      {/* 関連ストーリー */}
      {property.story && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">関連ストーリー</h2>
          <Link
            href={`/stories/${property.story.id}`}
            className="text-blue-600 hover:underline text-lg"
          >
            {property.story.title}
          </Link>
          {property.story.subtitle && (
            <p className="text-gray-600 mt-1">{property.story.subtitle}</p>
          )}
        </div>
      )}

      {/* 関連物件 */}
      {relatedProperties.contents.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">関連物件</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProperties.contents.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
