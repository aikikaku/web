'use client';

import { use, useState } from 'react';
import Image, { getImageProps, type ImageProps } from 'next/image';
import type { MicroCMSImage } from '@/types/microcms';
import { PLACEHOLDER_IMAGE_URL, hasNoImage } from '@/lib/microcms/image';
import { isMicrocmsImage, microcmsLoader } from '@/lib/microcms/loader';
import { isListSwapPending } from '@/lib/listSwap';

// ページ送りで写真を待つ上限。回線が遅い時はこれ以上待たずに入れ替える
const LIST_SWAP_WAIT_MS = 1500;
// use() は同じ promise を受け取る必要があるので、写真ごとに使い回す
const preloads = new Map<string, Promise<void>>();

/** 表示時と同じ srcset・sizes で読み込み、ブラウザに同じ解像度の写真をキャッシュさせる */
function preload({ src, srcSet, sizes }: { src: string; srcSet?: string; sizes?: string }) {
  const key = srcSet ?? src;
  let promise = preloads.get(key);
  if (!promise) {
    const img = new window.Image();
    if (sizes) img.sizes = sizes;
    if (srcSet) img.srcset = srcSet;
    img.src = src;
    promise = Promise.race([img.decode().catch(() => {}), new Promise<void>((resolve) => setTimeout(resolve, LIST_SWAP_WAIT_MS))]);
    preloads.set(key, promise);
  }
  return promise;
}

type CmsImageProps = Omit<ImageProps, 'src' | 'loader'> & {
  /** microCMS の画像オブジェクト。未設定（任意項目で空）の場合はプレースホルダを表示 */
  image?: MicroCMSImage | null;
};

/**
 * microCMS 画像を表示する next/image ラッパー。
 * - microCMS CDN の画像は {@link microcmsLoader} を使い、表示幅に応じた解像度を CDN から配信
 * - 画像未設定時（CMS の「画像なし」用画像を含む）は「画像準備中」プレースホルダにフォールバック
 * - 読み込みに失敗した場合は段階的に救済する:
 *   変換付き URL → 変換なしの元画像 → 「画像準備中」プレースホルダ
 *   （例: CMS に登録された一部の PNG は microCMS の画像変換 API（fm=webp 等）が 422 を返す）
 *
 * 呼び出し側は width を焼き込まず、fill + sizes（または width/height）を渡すだけでよい。
 */
export default function CmsImage({ image, alt, onError, ...rest }: CmsImageProps) {
  // CMS の「画像なし」用画像は未設定と同じ扱いにし、サイト共通のシンプルなプレースホルダに揃える
  const url = hasNoImage(image) ? undefined : image?.url;
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

  const loader = isMicrocmsImage(url) ? microcmsLoader : undefined;
  // ページ送り中は写真がそろうまで描画を保留する（startTransition 中なので、今の一覧が出たままになる）
  if (isListSwapPending()) use(preload(getImageProps({ src: url, loader, alt, ...rest }).props));

  return <Image src={url} loader={loader} alt={alt} onError={handleError} {...rest} />;
}
