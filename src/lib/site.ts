/** 本番の正規 URL（末尾スラッシュなし）。プレビュー等で変えたいときだけ NEXT_PUBLIC_SITE_URL で上書きする */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aikikaku.net').replace(/\/$/, '');

export const NAKABITO_URL = 'https://nakabito.org';
export const INSTAGRAM_URL = 'https://www.instagram.com/ai_kikaku_/';
export const YOUTUBE_URL = 'https://www.youtube.com/channel/UCHapMF2lUnUNDZVN8k5PDfQ';
