import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const labelColor = property.type === 'sell' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <Link href={`/properties/${property.id}`} className="block group">
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
        <div className="relative h-48">
          <Image
            src={getImageUrl(property.mainImage, { width: 400, format: 'webp' })}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {property.label && (
            <span
              className={`absolute top-2 left-2 ${labelColor} text-white px-3 py-1 text-sm rounded`}
            >
              {property.label}
            </span>
          )}
          {property.status === 'sold' && (
            <span className="absolute top-2 right-2 bg-gray-600 text-white px-3 py-1 text-sm rounded">
              成約済み
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{property.title}</h3>
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {property.price
              ? `${property.price.toLocaleString()}万円`
              : property.rent
                ? `${property.rent.toLocaleString()}円/月`
                : '価格応談'}
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            {property.layout && <span>{property.layout}</span>}
            {property.landArea && <span>{property.landArea}m&sup2;</span>}
            {property.buildingArea && <span>建物 {property.buildingArea}m&sup2;</span>}
          </div>
          {property.regions && property.regions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {property.regions.map((region) => (
                <span
                  key={region.id}
                  className="text-xs bg-gray-200 px-2 py-1 rounded"
                >
                  {region.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
