'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MicroCMSImage } from '@/types/microcms';

interface Props {
  /** CMS 由来の画像。空なら fallbackSrc の1枚のみ（静止）。 */
  images: MicroCMSImage[];
  /** CMS 未登録時に表示する静的画像 */
  fallbackSrc: string;
  alt: string;
  /** 3枠の切り替えを 0.5s ずつずらすための遅延 */
  delayMs?: number;
  priority?: boolean;
  sizes?: string;
}

const DISPLAY_MS = 4500; // 各画像の表示時間
const FADE_MS = 1400; // クロスフェード時間

/**
 * トップ PC ヒーローの1枠。CMS に複数画像があればクロスフェードで切り替え、
 * 表示中はゆっくりズーム（景色が流れる印象 / #EjAsuZuByOas）。
 * 画像が1枚（= CMS 未登録の fallback）なら静止表示。
 * prefers-reduced-motion 時はアニメーションせず先頭画像を表示。
 */
export default function HeroFrame({ images, fallbackSrc, alt, delayMs = 0, priority, sizes }: Props) {
  const urls = images.length > 0 ? images.map((img) => img.url) : [fallbackSrc];
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  }, []);

  useEffect(() => {
    if (reduced || urls.length <= 1) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    // 3枠の切り替えタイミングを delayMs ずつずらす
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setIndex((i) => (i + 1) % urls.length);
      }, DISPLAY_MS);
    }, delayMs);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [reduced, urls.length, delayMs]);

  return (
    <>
      {urls.map((url, i) => (
        <div
          key={`${url}-${i}`}
          className="absolute inset-0"
          style={{
            opacity: i === index ? 1 : 0,
            transition: reduced ? 'none' : `opacity ${FADE_MS}ms ease-in-out`,
          }}
          aria-hidden={i === index ? undefined : true}
        >
          <div
            className="absolute inset-0"
            style={reduced || urls.length <= 1 ? undefined : { animation: 'hero-zoom 10s ease-in-out infinite alternate' }}
          >
            <Image
              src={url}
              alt={i === 0 ? alt : ''}
              fill
              className="object-cover"
              priority={priority && i === 0}
              sizes={sizes}
            />
          </div>
        </div>
      ))}
    </>
  );
}
