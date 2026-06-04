import { MicroCMSImage } from '@/types/microcms';

interface ImageOptions {
  width?: number;
  height?: number;
  fit?: 'clip' | 'crop' | 'fill' | 'scale' | 'max';
  format?: 'webp' | 'png' | 'jpg';
}

/** メイン画像が任意項目になり未設定の物件があり得るため、欠損時のフォールバック画像 */
export const PLACEHOLDER_IMAGE_URL = '/images/property-placeholder.svg';

export function getImageUrl(
  image: MicroCMSImage | undefined | null,
  options: ImageOptions = {}
): string {
  // 画像未設定（メイン画像を任意にした下書き物件など）はプレースホルダを返す
  if (!image?.url) {
    return PLACEHOLDER_IMAGE_URL;
  }

  // Only apply microCMS image API params to microCMS-hosted images
  if (!image.url.includes('images.microcms-assets.io')) {
    return image.url;
  }

  const { width, height, fit = 'crop', format } = options;
  const params = new URLSearchParams();

  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (fit) params.append('fit', fit);
  if (format) params.append('fm', format);

  const queryString = params.toString();
  return queryString ? `${image.url}?${queryString}` : image.url;
}
