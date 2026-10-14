'use client';

import { useState } from 'react';
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
 * - 読み込みに失敗した場合は段階的に救済する:
 *   変換付き URL → 変換なしの元画像 → 「画像準備中」プレースホルダ
 *   （例: CMS に登録された一部の PNG は microCMS の画像変換 API（fm=webp 等）が 422 を返す）
 *
 * 呼び出し側は width を焼き込まず、fill + sizes（または width/height）を渡すだけでよい。
 */
export default function CmsImage({ image, alt, onError, ...rest }: CmsImageProps) {
  const url = image?.url;
  // 0: 通常 / 1: 変換なしの元画像 / 2: プレースホルダ
  const [fallback, setFallback] = useState<0 | 1 | 2>(0);

  if (!url || fallback === 2) {
    return <Image src={PLACEHOLDER_IMAGE_URL} alt={alt} unoptimized {...rest} />;
  }

  const handleError: ImageProps['onError'] = (e) => {
    setFallback((f) => (f === 0 ? 1 : 2));
    onError?.(e);
  };

  if (fallback === 1) {
    return <Image key="raw" src={url} alt={alt} unoptimized onError={handleError} {...rest} />;
  }

  if (isMicrocmsImage(url)) {
    return <Image src={url} loader={microcmsLoader} alt={alt} onError={handleError} {...rest} />;
  }

  return <Image src={url} alt={alt} onError={handleError} {...rest} />;
}
