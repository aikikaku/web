'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MicroCMSImage } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';

interface PropertyGalleryProps {
  mainImage: MicroCMSImage;
  images?: MicroCMSImage[];
}

export default function PropertyGallery({
  mainImage,
  images,
}: PropertyGalleryProps) {
  const allImages = [mainImage, ...(images || [])];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const selectedImage = allImages[selectedIndex];

  return (
    <>
      <div className="space-y-4">
        {/* メイン画像 */}
        <div
          className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={getImageUrl(selectedImage, { width: 800, format: 'webp' })}
            alt="物件画像"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>

        {/* サムネイル一覧 */}
        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative w-20 h-20 flex-shrink-0 rounded overflow-hidden border-2 transition-colors ${
                  index === selectedIndex
                    ? 'border-blue-600'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={getImageUrl(image, { width: 100, height: 100, format: 'webp' })}
                  alt={`画像 ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ライトボックス */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setLightboxOpen(false)}
            aria-label="閉じる"
          >
            &times;
          </button>
          <div className="relative max-w-4xl w-full aspect-[4/3]">
            <Image
              src={getImageUrl(selectedImage, { width: 1200, format: 'webp' })}
              alt="物件画像（拡大）"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          {allImages.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white text-4xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) =>
                    prev > 0 ? prev - 1 : allImages.length - 1
                  );
                }}
                aria-label="前の画像"
              >
                &#8249;
              </button>
              <button
                className="absolute right-4 text-white text-4xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) =>
                    prev < allImages.length - 1 ? prev + 1 : 0
                  );
                }}
                aria-label="次の画像"
              >
                &#8250;
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
