'use client';

import { use } from 'react';
import Image, { getImageProps, type ImageProps } from 'next/image';
import type { MicroCMSImage } from '@/types/microcms';
import { PLACEHOLDER_IMAGE_URL } from '@/lib/microcms/image';
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
 * - 画像未設定時は「画像準備中」プレースホルダにフォールバック
 *
 * 呼び出し側は width を焼き込まず、fill + sizes（または width/height）を渡すだけでよい。
 */
export default function CmsImage({ image, alt, ...rest }: CmsImageProps) {
  const url = image?.url;

  if (!url) {
    return <Image src={PLACEHOLDER_IMAGE_URL} alt={alt} unoptimized {...rest} />;
  }

  const loader = isMicrocmsImage(url) ? microcmsLoader : undefined;
  // ページ送り中は写真がそろうまで描画を保留する（startTransition 中なので、今の一覧が出たままになる）
  if (isListSwapPending()) use(preload(getImageProps({ src: url, loader, alt, ...rest }).props));

  return <Image src={url} loader={loader} alt={alt} {...rest} />;
}
