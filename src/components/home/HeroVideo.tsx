'use client';

import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  /** ロード前・reduced-motion 時に表示する静止画 */
  poster: string;
  className?: string;
  /**
   * 再生中かどうか（ヒーローのセット切り替え用）。true になるたび先頭から再生し、
   * false で一時停止する。省略時は常に再生（単体の背景ループ用途）。
   */
  active?: boolean;
}

/**
 * トップ PC ヒーローの動画 (#Heroの演出 / Slack)。
 * - muted + loop + playsInline で背景ループ再生。
 * - poster を指定し、ロード前や再生不可時も静止画で表示。
 * - prefers-reduced-motion 時は再生せず poster（先頭フレーム）で静止。
 */
export default function HeroVideo({ src, poster, className, active = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !active) {
      v.pause();
      return;
    }
    v.currentTime = 0;
    // 自動再生がブロックされても poster のまま表示されるだけなので握りつぶす
    v.play().catch(() => {});
  }, [active]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={active ? 'auto' : 'metadata'}
      aria-hidden="true"
    />
  );
}
