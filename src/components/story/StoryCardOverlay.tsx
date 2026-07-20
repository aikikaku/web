import Link from 'next/link';
import { Story } from '@/types/microcms';
import CmsImage from '@/components/ui/CmsImage';
import { BookIcon } from '@/components/ui/icons';

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
      <div className="relative aspect-[341/442] w-full overflow-hidden rounded-[1.5rem]">
        <CmsImage
          image={story.thumbnail}
          alt={story.title}
          fill
          className="object-cover transition-transform group-hover:scale-[1.02]"
          sizes="(max-width: 992px) 332px, 410px"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(204deg, rgb(var(--overlay-dark) / 0.5) 4%, rgb(var(--overlay-dark) / 0.25) 52%, rgb(var(--overlay-dark) / 0.5) 104%)',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-start justify-between pt-4 pb-6 px-4">
          <div className="flex items-center gap-3">
            <span className="tag">
              {getCategoryLabel(story.category)}
            </span>
            {regionNames && (
              <span className="font-gothic font-medium text-body-s text-white">
                {regionNames}
              </span>
            )}
          </div>
          <div className="flex items-end gap-4 w-full">
            <p
              className="flex-1 min-w-0 font-mincho text-heading-24 text-white line-clamp-2"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              {story.title}
            </p>
            <span className="size-11 rounded-full bg-accent-blue inline-flex items-center justify-center shrink-0">
              <BookIcon size={20} stroke="white" className="" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
