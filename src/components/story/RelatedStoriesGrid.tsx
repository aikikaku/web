import { Story } from '@/types/microcms';
import CardStory from '@/components/ui/card/CardStory';
import StoryCarousel from '@/components/home/StoryCarousel';

interface Props {
  stories: Story[];
}

/**
 * ストーリー詳細「もっとストーリーを見る」のカード一覧。
 * - PC: card-story-l の3列グリッド(スクロール無し)。Figma 4470:14724
 * - SP: card-story-sp(幅 332・gap 20・左 16 から画面右端まで)の横スクロール +
 *   Navigation-Slideshow + 全幅 button-primary-sp「すべて見る」。Figma 4470:16279 / 4470:16282 / 4470:16290
 *   トップページと同じ構成なので [[StoryCarousel]] をそのまま使う。
 *   StoryCarousel は track 側に pl-4 を持つため、親セクションの px-4 を -mx-4 で打ち消して画面端まで広げる。
 */
export default function RelatedStoriesGrid({ stories }: Props) {
  return (
    <>
      <div className="hidden tablet:grid grid-cols-3 gap-y-12 gap-x-[1.875rem]">
        {stories.map((s) => (
          <CardStory key={s.id} story={s} size="l" />
        ))}
      </div>
      <div className="tablet:hidden -mx-4">
        <StoryCarousel stories={stories} href="/stories" />
      </div>
    </>
  );
}
