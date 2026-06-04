import type { ImageLoaderProps } from 'next/image';

const MICROCMS_IMAGE_HOST = 'images.microcms-assets.io';

/** src が microCMS の画像 CDN かどうか */
export function isMicrocmsImage(url: string): boolean {
  return url.includes(MICROCMS_IMAGE_HOST);
}

/**
 * microCMS 画像 CDN 用の next/image カスタムローダー。
 *
 * 従来は getImageUrl で `?w=410` のように「CSS 表示幅と同じ固定幅」を焼き込んでいたため、
 * Retina など高 DPR 環境ではソース解像度が不足して画像がぼやけていた。
 * このローダーは Next が srcset 生成時に要求する各幅（deviceSizes × DPR）を
 * そのまま microCMS の image API に渡し、表示サイズに応じた解像度を CDN 側で配信させる。
 */
export function microcmsLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(src);
  // 焼き込み済みのサイズ系パラメータは破棄し、Next が要求する width で再構築する
  url.searchParams.delete('w');
  url.searchParams.delete('h');
  url.searchParams.set('w', String(width));
  url.searchParams.set('fm', 'webp');
  url.searchParams.set('q', String(quality ?? 75));
  if (!url.searchParams.has('fit')) {
    url.searchParams.set('fit', 'crop');
  }
  return url.toString();
}
