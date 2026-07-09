import type { HeroSlot } from '@/types/microcms';

/**
 * トップ PC ヒーローのクロスフェード画像 (#EjAsuZuByOas)。
 *
 * `public/` に置いた画像のパスを slot ごとに列挙する。
 * - 各 slot に **2枚以上**並べるとクロスフェード＋ゆっくりズームが有効になる。
 * - 1枚だけなら静止表示（現行の見た目）。
 *
 * 画像を追加するには: `public/images/home/` に画像を置き、下のリストにパスを足すだけ。
 * (Vercel では public を実行時に fs で列挙できないため、ここで明示的に列挙している)
 *
 * ⚠️ 現在の割り当ては既存アセットを流用した**暫定**（デザイナー指示の「9枚」を
 *    正式な hero 用写真が届き次第、差し替える前提）。
 */
export const HERO_IMAGES: Record<HeroSlot, string[]> = {
  // 左の大きい枠: 風景中心（町と山 / 富士山 / 住宅街）
  main: [
    '/images/home/hero-1.jpg',
    '/images/home/cta-banner.jpg',
    '/images/home/service-customer.jpg',
  ],
  // 右上の枠: 自然と暮らし
  topRight: [
    '/images/home/hero-2.jpg',
    '/images/home/story-1.png',
    '/images/home/story-2.png',
  ],
  // 右下の枠: 街と人
  bottomRight: [
    '/images/home/hero-3.jpg',
    '/images/home/about.jpg',
    '/images/home/story-3.png',
  ],
};
