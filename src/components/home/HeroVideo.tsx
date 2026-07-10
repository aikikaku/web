'use client';

import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  /** ロード前・reduced-motion 時に表示する静止画 */
  poster: string;
  className?: string;
}

/**
 * トップ PC ヒーローの動画背景 (#Heroの演出 / Slack)。
 * - muted + loop + playsInline + autoPlay で背景ループ再生。
 * - poster を指定し、ロード前や再生不可時も静止画で表示。
 * - prefers-reduced-motion 時は再生せず poster（先頭フレーム）で静止。
 */
export default function HeroVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      v.autoplay = false;
      v.pause();
      v.currentTime = 0;
    }
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
