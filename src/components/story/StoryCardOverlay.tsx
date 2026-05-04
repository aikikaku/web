import Link from 'next/link';
import Image from 'next/image';
import { Story } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';

interface Props {
  story: Story;
  className?: string;
}

const categoryLabels: Record<string, string> = {
  daily: '日々のこと',
  regional: '地域のこと',
  property: '物件のつづき',
};

function getCategoryLabel(category?: string): string {
  return (category && categoryLabels[category]) || '日々のこと';
}

/**
 * SP/共通の Story 縦長カード（Figma 4211:10693 / 4211:10988）。
 * - aspect 341/442、画像全面背景 + dark gradient
 * - 上: tag + region（白文字）
 * - 下: タイトル（白文字 mincho 24px） + arrow（青円 size-44）
 */
export default function StoryCardOverlay({ story, className }: Props) {
  const regionNames = story.regions?.map((r) => r.name).join('・');

  return (
    <Link href={`/stories/${story.id}`} className={`block group ${className ?? ''}`}>
      <div className="relative aspect-[341/442] w-full overflow-hidden rounded-[24px]">
        <Image
          src={getImageUrl(story.thumbnail, { width: 410, format: 'webp' })}
          alt={story.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 992px) 332px, 410px"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(204deg, rgba(39,51,59,0.5) 4%, rgba(39,51,59,0.25) 52%, rgba(39,51,59,0.5) 104%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-start justify-between pt-4 pb-6 px-4">
          <div className="flex items-center gap-3">
            <span className="tag-pill text-[14px] leading-none px-3 py-1.5">
              {getCategoryLabel(story.category)}
            </span>
            {regionNames && (
              <span className="font-gothic font-medium text-[14px] leading-[1.8] text-white">
                {regionNames}
              </span>
            )}
          </div>
          <div className="flex items-end gap-4 w-full">
            <p
              className="flex-1 min-w-0 font-mincho text-[24px] leading-[1.6] tracking-[0.96px] text-white line-clamp-2"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              {story.title}
            </p>
            <span className="size-11 rounded-full bg-accent-blue inline-flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
