import Link from 'next/link';
import Image from 'next/image';
import { Story } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/stories/${story.id}`} className="block group">
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
        <div className="relative h-48">
          <Image
            src={getImageUrl(story.thumbnail, { width: 400, format: 'webp' })}
            alt={story.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 line-clamp-2">{story.title}</h3>
          {story.subtitle && (
            <p className="text-sm text-gray-600 line-clamp-2">{story.subtitle}</p>
          )}
          {story.regions && story.regions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {story.regions.map((region) => (
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
