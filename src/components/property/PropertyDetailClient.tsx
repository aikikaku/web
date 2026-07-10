'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, type ReactNode } from 'react';
import { MicroCMSImage } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';
import CmsImage from '@/components/ui/CmsImage';

interface PropertyDetailClientProps {
  allImages: MicroCMSImage[];
  title: string;
  isSold?: boolean;
  /** PC で詳細パネル（タイトル・価格 etc）と PC サムネイル列を一緒に レンダリングしたい場合に
      detailsSlot に渡す。サムネイルは右カラム下端に表示するため、`detailsSlot` 〜 PC サムネイル を
      PropertyDetailClient 内で同じ親に持たせて activeIndex をクライアント側で制御する。 */
  detailsSlot?: ReactNode;
  /** SP のラベル overlay (画像内 top) を渡す場合 */
  spLabelsSlot?: ReactNode;
}

/**
 * 物件詳細ページの hero card クライアント部分。サムネイル click ↔ メイン画像切替を一元管理する。
 * SP: image (with optional spLabelsSlot overlay) → SP サムネイル → details
 * PC: image | (details + PC サムネイル下端) を 2 カラムで配置（外側 page.tsx で flex-row 配置）
 */
export default function PropertyDetailClient({
  allImages,
  title,
  isSold = false,
  detailsSlot,
  spLabelsSlot,
}: PropertyDetailClientProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // メイン画像（先頭）のロード完了までサムネイルはクリック不可＋ローディング表示。
  // これによりロード前クリックで切り替わらない問題を防ぐ。
  const [ready, setReady] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // onLoad はキャッシュ済み画像では発火しないことがあるため保険を用意:
  // (1) マウント時に既に complete なら即 ready、(2) 最大2sで必ず解除（スタック防止）
  useEffect(() => {
    const img = wrapRef.current?.querySelector('img');
    if (img && img.complete) {
      setReady(true);
      return;
    }
    const t = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const thumbClass = (index: number) =>
    `relative rounded-xl overflow-hidden transition-opacity ${
      index === selectedIndex ? 'opacity-100' : 'opacity-[0.15] hover:opacity-50'
    } ${!ready ? 'pointer-events-none opacity-40 cursor-wait' : ''}`;

  return (
    <div className="flex flex-col tablet:flex-row tablet:gap-[3.75rem] w-full">
      {/* 画像 + (SP のみ) サムネイル */}
      <div className="w-full tablet:w-[40.375rem] tablet:shrink-0">
        <div ref={wrapRef} className="relative aspect-[646/485] rounded-2xl tablet:rounded-3xl overflow-hidden bg-light-green">
          {/* 全画像をスタックし opacity で切り替え → クリック時に即時切替（都度ロード待ちが無い） */}
          {allImages.map((image, i) => (
            <CmsImage
              key={i}
              image={image}
              alt={i === selectedIndex ? title : ''}
              fill
              className={`object-cover transition-opacity duration-300 ease-out ${i === selectedIndex ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 992px) 100vw, 646px"
              priority={i === 0}
              onLoad={i === 0 ? () => setReady(true) : undefined}
            />
          ))}
          {/* 成約時は写真をブラックアウト (#33) */}
          {isSold && <div aria-hidden className="absolute inset-0 z-10 bg-black/55" />}
          {spLabelsSlot && (
            <div className="tablet:hidden absolute inset-x-0 top-0 z-20 p-2.5">
              {spLabelsSlot}
            </div>
          )}
          {/* メイン画像ロード中のローディング表示 */}
          {!ready && (
            <div aria-hidden className="absolute inset-0 z-30 grid place-items-center bg-light-green">
              <span className="size-8 rounded-full border-2 border-dark-green/20 border-t-dark-green animate-spin" />
            </div>
          )}
        </div>

        {/* SP サムネイル */}
        {allImages.length > 1 && (
          <div className="flex tablet:hidden flex-wrap gap-2 mt-3">
            {allImages.slice(0, 6).map((image, index) => (
              <button
                key={index}
                type="button"
                disabled={!ready}
                onClick={() => setSelectedIndex(index)}
                aria-label={`画像 ${index + 1} を表示`}
                className={`${thumbClass(index)} w-[3.75rem] h-[3.75rem]`}
              >
                <Image
                  src={getImageUrl(image, { width: 100, height: 100, format: 'webp' })}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="60px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 右カラム: details + (PC のみ) サムネイル */}
      {detailsSlot && (
        <div className="flex flex-col justify-between flex-1 min-w-0">
          {detailsSlot}
          {/* PC サムネイル: クライアント側で activeIndex を制御するため Client 内で render */}
          {allImages.length > 1 && (
            <div className="hidden tablet:flex gap-2 mt-6 w-full">
              {allImages.slice(0, 6).map((image, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={!ready}
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`画像 ${index + 1} を表示`}
                  className={`${thumbClass(index)} flex-1 aspect-square min-w-0`}
                >
                  <Image
                    src={getImageUrl(image, { width: 200, height: 200, format: 'webp' })}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
