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
 */
export const HERO_IMAGES: Record<HeroSlot, string[]> = {
  // 左の大きい枠
  main: ['/images/home/hero-1.jpg'],
  // 右上の枠
  topRight: ['/images/home/hero-2.jpg'],
  // 右下の枠
  bottomRight: ['/images/home/hero-3.jpg'],
};
