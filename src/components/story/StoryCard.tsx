import Link from 'next/link';
import { Story } from '@/types/microcms';
import CmsImage from '@/components/ui/CmsImage';

const categoryLabels: Record<string, string> = {
  daily: '日々のこと',
  regional: '地域のこと',
  property: '物件のつづき',
};

function getCategoryLabel(category?: string): string {
  return (category && categoryLabels[category]) || '日々のこと';
}

interface StoryCardProps {
  story: Story;
  size?: 'l' | 'm' | 's';
  variant?: 'light' | 'dark';
}

const sizeConfig = {
  l: { imageAspect: 'aspect-[410/308]', imageR: 'rounded-[1.5rem]', titleSize: 'text-heading-32', width: 'w-full' },
  m: { imageAspect: 'aspect-[410/308]', imageR: 'rounded-[1.5rem]', titleSize: 'text-heading-24', width: 'w-full' },
  s: { imageAspect: 'aspect-[4/3]', imageR: 'rounded-2xl', titleSize: 'text-heading-24', width: 'w-full' },
};

export default function StoryCard({ story, size = 'm', variant = 'light' }: StoryCardProps) {
  const isDark = variant === 'dark';
  const cfg = sizeConfig[size];
  const regionNames = story.regions?.map((r) => r.name).join('・');

  return (
    <Link href={`/stories/${story.id}`} className={`block group ${cfg.width}`}>
      {/* Image */}
      <div className={`${cfg.imageAspect} relative overflow-hidden ${cfg.imageR}`}>
        <CmsImage
          image={story.thumbnail}
          alt={story.title}
          fill
          className="object-cover transition-transform group-hover:scale-[1.02]"
          sizes="(max-width: 992px) 100vw, 646px"
        />
      </div>

      {/* Content below image */}
      <div className="pt-[1.875rem] px-3">
        {/* Tags */}
        <div className="flex gap-3 items-center mb-4">
          <span className="tag-pill text-[0.875rem] leading-none px-3 py-1.5">
            {getCategoryLabel(story.category)}
          </span>
          {regionNames && (
            <span className={`font-gothic font-medium text-body-s ${isDark ? 'text-white/80' : 'text-dark-green'}`}>
              {regionNames}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={`font-mincho ${cfg.titleSize} line-clamp-2 ${
            isDark ? 'text-white' : 'text-dark-green'
          }`}
          style={{ fontFeatureSettings: "'palt' 1" }}
        >
          {story.title}
        </h3>

        {/* Button */}
        <div className="mt-6">
          <span
            className={`inline-flex items-center gap-1 h-[2.75rem] px-6 border rounded-full font-gothic font-medium text-[1rem] leading-none transition-colors ${
              isDark
                ? 'border-white text-white hover:opacity-70'
                : 'border-dark-green text-dark-green group-hover:bg-dark-green group-hover:text-white'
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="shrink-0"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z" />
            </svg>
            ストーリーを読む
          </span>
        </div>
      </div>
    </Link>
  );
}
