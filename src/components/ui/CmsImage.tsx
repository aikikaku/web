import Image, { type ImageProps } from 'next/image';
import type { MicroCMSImage } from '@/types/microcms';
import { PLACEHOLDER_IMAGE_URL } from '@/lib/microcms/image';
import { isMicrocmsImage, microcmsLoader } from '@/lib/microcms/loader';

type CmsImageProps = Omit<ImageProps, 'src' | 'loader'> & {
  /** microCMS の画像オブジェクト。未設定（任意項目で空）の場合はプレースホルダを表示 */
  image?: MicroCMSImage | null;
};

/**
 * microCMS 画像を表示する next/image ラッパー。
 * - microCMS CDN の画像は {@link microcmsLoader} を使い、表示幅に応じた解像度を CDN から配信
 * - 画像未設定時は「画像準備中」プレースホルダにフォールバック
 *
 * 呼び出し側は width を焼き込まず、fill + sizes（または width/height）を渡すだけでよい。
 */
export default function CmsImage({ image, alt, ...rest }: CmsImageProps) {
  const url = image?.url;

  if (!url) {
    return <Image src={PLACEHOLDER_IMAGE_URL} alt={alt} unoptimized {...rest} />;
  }

  if (isMicrocmsImage(url)) {
    return <Image src={url} loader={microcmsLoader} alt={alt} {...rest} />;
  }

  return <Image src={url} alt={alt} {...rest} />;
}
