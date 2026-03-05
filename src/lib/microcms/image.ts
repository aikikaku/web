import { MicroCMSImage } from '@/types/microcms';

interface ImageOptions {
  width?: number;
  height?: number;
  fit?: 'clip' | 'crop' | 'fill' | 'scale' | 'max';
  format?: 'webp' | 'png' | 'jpg';
}

export function getImageUrl(
  image: MicroCMSImage,
  options: ImageOptions = {}
): string {
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
