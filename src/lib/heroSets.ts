import type { HeroSlot } from '@/types/microcms';

export type HeroMedia =
  | { type: 'image'; src: string }
  /** poster はロード前・reduced-motion 時に出す静止画（動画の先頭フレーム推奨） */
  | { type: 'video'; src: string; poster: string };

export type HeroSet = Record<HeroSlot, HeroMedia> & {
  /** このセットの表示時間。省略時は DEFAULT_HERO_SET_MS */
  durationMs?: number;
};

export const DEFAULT_HERO_SET_MS = 6000;

/**
 * トップ PC ヒーローの切り替えセット（Figma AI-Kikaku_share「2026-07-24 / 追加写真反映」
 * Hero 4963:12106 / 4963:12113 / 4963:12120）。
 *
 * 3枠（左の大枠 main / 右上 topRight / 右下 bottomRight）を1セットとしてまとめて切り替える。
 * 各枠は画像か動画を選べるので、「1: a動画 / 2: b動画 / 3: c動画」のような指定ができる。
 *
 * ⚠️ 動画はデザイナーからの納品待ち。現在の動画枠は既存の `/videos/hero.mp4` を
 *    仮で入れている（動作確認用）。納品後に src / poster を差し替える。
 */
const DUMMY_VIDEO = {
  type: 'video',
  src: '/videos/hero.mp4',
  poster: '/images/home/hero-video-poster.jpg',
} as const;

export const HERO_SETS: HeroSet[] = [
  {
    // 1: a動画 / b画像 / c画像 （Figma 本来の a = 校庭と山並み）
    main: DUMMY_VIDEO,
    topRight: { type: 'image', src: '/images/home/hero/set1-top-right.jpg' },
    bottomRight: { type: 'image', src: '/images/home/hero/set1-bottom-right.jpg' },
  },
  {
    // 2: a画像 / b動画 / c画像 （Figma 本来の b = トマトの無人販売）
    main: { type: 'image', src: '/images/home/hero/set2-main.jpg' },
    topRight: DUMMY_VIDEO,
    bottomRight: { type: 'image', src: '/images/home/hero/set2-bottom-right.jpg' },
  },
  {
    // 3: a画像 / b画像 / c動画 （Figma 本来の c = 湧水）
    main: { type: 'image', src: '/images/home/hero/set3-main.jpg' },
    topRight: { type: 'image', src: '/images/home/hero/set3-top-right.jpg' },
    bottomRight: DUMMY_VIDEO,
  },
];
