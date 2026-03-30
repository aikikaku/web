'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MicroCMSImage } from '@/types/microcms';
import { getImageUrl } from '@/lib/microcms/image';

interface PropertyDetailClientProps {
  allImages: MicroCMSImage[];
  title: string;
  isSold?: boolean;
}

export default function PropertyDetailClient({
  allImages,
  title,
  isSold = false,
}: PropertyDetailClientProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = allImages[selectedIndex];

  return (
    <div>
      {/* メイン画像 */}
      <div className="relative aspect-[646/485] rounded-3xl overflow-hidden">
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
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(194deg, rgba(39,51,59,0.5) 4%, rgba(39,51,59,0.25) 52%, rgba(39,51,59,0.5) 104%)',
            }}
          />
        )}
      </div>

      {/* SP用サムネイル */}
      {allImages.length > 1 && (
        <div className="flex tablet:hidden flex-wrap gap-2 mt-3">
          {allImages.slice(0, 6).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-[60px] h-[60px] rounded-xl overflow-hidden transition-opacity ${
                index === selectedIndex ? '' : 'opacity-[0.15]'
              }`}
            >
              <Image
                src={getImageUrl(image, { width: 100, height: 100, format: 'webp' })}
                alt={`画像 ${index + 1}`}
                fill
                className="object-cover"
                sizes="60px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
