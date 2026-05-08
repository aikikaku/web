import Link from 'next/link';
import { Story } from '@/types/microcms';
import StoryCarousel from '@/components/home/StoryCarousel';
import StoryCard from '@/components/story/StoryCard';

interface Props {
  /** 表示するストーリー一覧 */
  stories: Story[];
  /** 上見出し ("物件のその後のはなし" / "暮らしを知る" 等) */
  title: string;
  /** 「すべて見る」リンク先。デフォルト /stories */
  href?: string;
  /** 配色テーマ。dark-green 背景 (light text) を使う場合は "dark" */
  variant?: 'light' | 'dark';
}

/**
 * 物件詳細でも /for-customer (暮らしを知る) でも /for-owner (物件のその後のはなし) でも使う、
 * ストーリーセクション (Figma 4211:11931)。
 *
 * - SP: StoryCarousel (横スクロール peek + dots/矢印 + すべて見るボタン)
 * - PC: 3 列グリッド + 右下「すべて見る」リンク
 * - dark variant では背景 dark-green に対して text-cream / accent-blue 円ボタンを使う
 */
export default function StorySection({
  stories,
  title,
  href = '/stories',
  variant = 'dark',
}: Props) {
  if (stories.length === 0) return null;

  const isDark = variant === 'dark';
  const sectionBg = isDark ? 'bg-dark-green' : 'bg-cream';
  const titleColor = isDark ? 'text-cream' : 'text-dark-green';
  const linkColor = isDark ? 'text-cream' : 'text-dark-green';

  return (
    <section className={`${sectionBg} py-[60px] tablet:py-24`}>
      <div className="px-4 tablet:px-[75px] max-w-[1440px] mx-auto mb-8 tablet:mb-16">
        <h2
          className={`font-mincho text-[28px] tablet:text-[48px] leading-[1.5] tracking-[1.12px] tablet:tracking-[1.92px] ${titleColor}`}
          style={{ fontFeatureSettings: "'palt' 1" }}
        >
          {title}
        </h2>
      </div>

      {/* SP: StoryCarousel (variant に応じて nav 配色を切替) */}
      <StoryCarousel stories={stories} href={href} variant={variant} />

      {/* PC: 3 列グリッド + 右下「すべて見る」 */}
      <div className="hidden tablet:block px-[75px] max-w-[1440px] mx-auto">
        <div className="grid grid-cols-3 gap-[30px] mb-16">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} variant={variant} />
          ))}
        </div>
        <div className="flex items-center justify-end">
          <Link
            href={href}
            className={`inline-flex items-center gap-2 font-gothic font-medium text-[18px] ${linkColor} hover:opacity-70 transition-opacity`}
          >
            すべて見る
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
