/** 本番の正規 URL（末尾スラッシュなし）。プレビュー等で変えたいときだけ NEXT_PUBLIC_SITE_URL で上書きする */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aikikaku.net').replace(/\/$/, '');

export const NAKABITO_URL = 'https://nakabito.org';
/** 駐車場マップ（月極駐車場の空き状況と申し込み）。別サイト */
export const PARKING_URL = 'https://parking.aikikaku.net';
export const INSTAGRAM_URL = 'https://www.instagram.com/ai_kikaku_/';
export const YOUTUBE_URL = 'https://www.youtube.com/channel/UCHapMF2lUnUNDZVN8k5PDfQ';
