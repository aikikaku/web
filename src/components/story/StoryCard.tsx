import Link from 'next/link';
import { Story } from '@/types/microcms';
import CmsImage from '@/components/ui/CmsImage';
import { BookIcon } from '@/components/ui/icons';

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
  s: { imageAspect: 'aspect-[4/3]', imageR: 'rounded-2xl', titleSize: 'text-heading-24', width: 'w-full' },
};

function ReadStoryButton({ isDark }: { isDark: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 h-[2.75rem] px-4 border rounded-full font-gothic font-medium text-[1rem] leading-none transition-colors ${
        isDark
          ? 'border-white text-white hover:opacity-70'
          : 'border-dark-green text-dark-green group-hover:bg-dark-green group-hover:border-[rgba(252,255,247,0.3)] group-hover:text-white'
      }`}
    >
      <BookIcon />
      ストーリーを読む
    </span>
  );
}

export default function StoryCard({ story, size = 's', variant = 'light' }: StoryCardProps) {
  const isDark = variant === 'dark';
  const regionNames = story.regions?.map((r) => r.name).join('・');

  // card-story-m (Figma 4211:24944): 画像左(264×352)+テキスト右の横並びレイアウト。
  // l/sの縦積みレイアウトとは構造自体が異なるため別分岐にしている。
  if (size === 'm') {
    return (
      <Link href={`/stories/${story.id}`} className="flex gap-[1.875rem] group">
        <div className="relative w-[16.5rem] h-[22rem] shrink-0 overflow-hidden rounded-2xl">
          <CmsImage
            image={story.thumbnail}
            alt={story.title}
            fill
            className="object-cover transition-transform group-hover:scale-[1.02]"
            sizes="264px"
          />
        </div>
        <div className="flex flex-col gap-6 flex-1 min-w-0">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
              <span className="tag">{getCategoryLabel(story.category)}</span>
              {regionNames && (
                <span className={`font-gothic font-medium text-body-s ${isDark ? 'text-white/80' : 'text-dark-green'}`}>
                  {regionNames}
                </span>
              )}
            </div>
            <h4
              className={`font-mincho text-heading-24 line-clamp-2 ${isDark ? 'text-white' : 'text-black'}`}
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              {story.title}
            </h4>
          </div>
          <ReadStoryButton isDark={isDark} />
        </div>
      </Link>
    );
  }

  const cfg = sizeConfig[size];

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
          <span className="tag">
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
          <ReadStoryButton isDark={isDark} />
        </div>
      </div>
    </Link>
  );
}
