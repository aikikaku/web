'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const slides = [
  '/images/home/hero-1.jpg',
  '/images/home/hero-2.jpg',
  '/images/home/hero-3.jpg',
];

const DISPLAY_MS = 4500; // 各画像の表示時間
const FADE_MS = 1000; // クロスフェード時間

/**
 * SP ヒーロースライドショー (デザインレビュー VEz1nsZDWbIP)。
 * - 画像切り替えはスライドではなくクロスフェード（ふわっと）。
 * - 自動再生。右下のボタンで停止/再生できる。
 * - prefers-reduced-motion 時は自動再生せず、フェードも無効（即時切替）。
 */
export default function HeroSlideshowSP() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  }, []);

  useEffect(() => {
    if (!playing || reduced) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, DISPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, reduced]);

  const goTo = (index: number) => setActiveIndex(index);

  return (
    <div className="flex flex-col gap-[0.625rem] min-[1440px]:hidden">
      <div className="relative h-[22.125rem] tablet:h-[32rem]">
        {/* 画像は右へ 16px はみ出す rounded-l-3xl コンテナ内でクロスフェード */}
        <div className="relative h-full w-full -mr-4 tablet:mr-0 rounded-l-3xl tablet:rounded-3xl overflow-hidden">
          {slides.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity ease-in-out"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                transitionDuration: reduced ? '0ms' : `${FADE_MS}ms`,
              }}
              aria-hidden={i === activeIndex ? undefined : true}
            >
              <Image
                src={src}
                alt={`三島の風景 ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* 再生/停止ボタン: component frame 右端 0px / bottom 12px（Figma 4211:10610 のアイコン位置を踏襲） */}
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? '自動再生を停止' : '自動再生を再生'}
          aria-pressed={playing}
          className="absolute right-3 bottom-3 size-6 inline-flex items-center justify-center active:scale-95 transition-transform"
          style={{ filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.16))' }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-full">
            <circle cx="12" cy="12" r="12" fill="#FCFFF7" fillOpacity="0.5" />
            {playing ? (
              // 一時停止（2本線）
              <g fill="#27333B">
                <rect x="9" y="8" width="2" height="8" rx="1" />
                <rect x="13" y="8" width="2" height="8" rx="1" />
              </g>
            ) : (
              // 再生（三角）
              <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="#27333B" />
            )}
          </svg>
        </button>
      </div>

      {/* dots */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`スライド${i + 1}`}
            onClick={() => goTo(i)}
            className={`size-1 rounded-full transition-colors ${i === activeIndex ? 'bg-dark-green' : 'bg-dark-green/30'}`}
          />
        ))}
      </div>
    </div>
  );
}
