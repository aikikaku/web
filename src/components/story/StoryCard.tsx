import Link from 'next/link';
import Image from 'next/image';
import { Story } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';

interface StoryCardProps {
  story: Story;
  size?: 'l' | 'm' | 's';
  variant?: 'light' | 'dark';
}

const sizeConfig = {
  l: { imageH: 'h-[485px]', imageR: 'rounded-3xl', titleSize: 'text-[32px]', width: 'w-[646px]' },
  m: { imageH: 'h-[250px]', imageR: 'rounded-2xl', titleSize: 'text-[24px]', width: 'w-[558px]' },
  s: { imageH: 'h-[280px]', imageR: 'rounded-2xl', titleSize: 'text-[24px]', width: 'w-[351px]' },
};

export default function StoryCard({ story, size = 'm', variant = 'light' }: StoryCardProps) {
  const isDark = variant === 'dark';
  const cfg = sizeConfig[size];
  const regionNames = story.regions?.map((r) => r.name).join('・');

  return (
    <Link href={`/stories/${story.id}`} className={`block group ${cfg.width}`}>
      {/* Image */}
      <div className={`${cfg.imageH} relative overflow-hidden ${cfg.imageR}`}>
        <Image
          src={getImageUrl(story.thumbnail, { width: 646, format: 'webp' })}
          alt={story.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 992px) 100vw, 646px"
        />
      </div>

      {/* Content below image */}
      <div className="pt-[30px] px-3">
        {/* Tags */}
        <div className="flex gap-3 items-center mb-4">
          {story.regions && story.regions.length > 0 && (
            <>
              <span className="tag-pill text-[14px] leading-none px-3 py-1.5">
                地域のこと
              </span>
              <span className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
                {regionNames}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3
          className={`font-mincho ${cfg.titleSize} leading-[1.5] tracking-[0.04em] line-clamp-2 ${
            isDark ? 'text-white' : 'text-black'
          }`}
          style={{ fontFeatureSettings: "'palt' 1" }}
        >
          {story.title}
        </h3>

        {/* Button */}
        <div className="mt-6">
          <span
            className={`inline-flex items-center gap-1 h-[44px] px-5 border rounded-full font-gothic font-medium text-[16px] leading-none transition-colors ${
              isDark
                ? 'border-white text-white hover:bg-white/10'
                : 'border-dark-green text-dark-green hover:bg-gray-50'
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
