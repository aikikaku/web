'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';
import { MicroCMSImage } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';

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
  const selectedImage = allImages[selectedIndex];

  return (
    <div className="flex flex-col tablet:flex-row tablet:gap-[60px] w-full">
      {/* 画像 + (SP のみ) サムネイル */}
      <div className="w-full tablet:w-[646px] tablet:shrink-0">
        <div className="relative aspect-[646/485] rounded-2xl tablet:rounded-3xl overflow-hidden">
          <Image
            src={getImageUrl(selectedImage, { width: 646, format: 'webp' })}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 992px) 100vw, 646px"
            priority
          />
          {isSold && (
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(to top, rgba(0,0,0,0) 73.635%, rgba(0,0,0,0.2) 92.755%)',
              }}
            />
          )}
          {spLabelsSlot && (
            <div className="tablet:hidden absolute inset-x-0 top-0 z-10 p-2.5">
              {spLabelsSlot}
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
                onClick={() => setSelectedIndex(index)}
                aria-label={`画像 ${index + 1} を表示`}
                className={`relative w-[60px] h-[60px] rounded-xl overflow-hidden transition-opacity ${
                  index === selectedIndex ? 'opacity-100' : 'opacity-[0.15] hover:opacity-50'
                }`}
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
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`画像 ${index + 1} を表示`}
                  className={`relative flex-1 aspect-square rounded-xl overflow-hidden min-w-0 transition-opacity ${
                    index === selectedIndex ? 'opacity-100' : 'opacity-[0.15] hover:opacity-50'
                  }`}
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
