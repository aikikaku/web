import type { HeroSlot } from '@/types/microcms';

export type HeroMedia =
  | { type: 'image'; src: string }
  /** poster はロード前・reduced-motion 時に出す静止画（動画の先頭フレーム推奨） */
  | { type: 'video'; src: string; poster: string };

export type HeroSet = Record<HeroSlot, HeroMedia> & {
  /** このセットの表示時間（切り替えのフェード時間は含まない）。省略時は DEFAULT_HERO_SET_MS */
  durationMs?: number;
};

/**
 * Figma Handoff(20260724) のプロトタイプ「Hero_Preview_20260731」(Hero 4470:17400 → 17407 → 17414 → 17400)。
 * 各セットを 6 秒表示 → 2 秒の Smart Animate（ease-in）で次のセットへ、をループする。
 */
export const DEFAULT_HERO_SET_MS = 6000;
export const HERO_FADE_MS = 2000;

const video = (name: string): HeroMedia => ({
  type: 'video',
  src: `/videos/hero/${name}.mp4`,
  poster: `/images/home/hero/${name}.jpg`,
});
const image = (name: string): HeroMedia => ({ type: 'image', src: `/images/home/hero/${name}.jpg` });

/**
 * トップ PC ヒーローの切り替えセット。3枠（左の大枠 main / 右上 topRight / 右下 bottomRight）を
 * 1セットとしてまとめて切り替える。どの枠を動画にするかは Figma のプロトタイプの指定どおり。
 * 動画の poster には同じ枠の静止画（public/images/home/hero/）を使う。
 * 動画ファイル本体は public/videos/hero/<セット>-<枠>.mp4 に置く（Figma の動画は MCP から取り出せないため別途書き出し）。
 */
export const HERO_SETS: HeroSet[] = [
  {
    // 4470:17400: 校庭と山並み / 商店街の子ども（動画）/ 橋の欄干（動画）
    main: image('set1-main'),
    topRight: video('set1-top-right'),
    bottomRight: video('set1-bottom-right'),
  },
  {
    // 4470:17407: 富士山と稲穂（動画）/ トマトの無人販売 / 田んぼ道のバイク（動画）
    main: video('set2-main'),
    topRight: image('set2-top-right'),
    bottomRight: video('set2-bottom-right'),
  },
  {
    // 4470:17414: 神社の屋根と鳥 / 木立（動画）/ 湧水（動画）
    main: image('set3-main'),
    topRight: video('set3-top-right'),
    bottomRight: video('set3-bottom-right'),
  },
];
