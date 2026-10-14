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
  /** active が false になってから一時停止するまでの時間。フェードアウト中も動かし続けるために使う */
  pauseDelayMs?: number;
  /** ループ再生するか。false なら最後のコマで止まり onEnded を呼ぶ。省略時は true */
  loop?: boolean;
  onEnded?: () => void;
  /** 再生の残りが nearEndMs 以下になったら1回呼ぶ（終わる少し前から次へ切り替え始めるため） */
  onNearEnd?: () => void;
  nearEndMs?: number;
}

/**
 * トップ PC ヒーローの動画 (#Heroの演出 / Slack)。
 * - muted + playsInline で自動再生（loop=false なら最後のコマで止まり onEnded を呼ぶ）。
 * - poster を指定し、ロード前や再生不可時も静止画で表示。
 * - prefers-reduced-motion 時は再生せず poster（先頭フレーム）で静止。
 */
export default function HeroVideo({
  src,
  poster,
  className,
  active = true,
  pauseDelayMs = 0,
  loop = true,
  onEnded,
  onNearEnd,
  nearEndMs = 0,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  // onNearEnd は再生1回につき1回だけ
  const nearEndFired = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      v.pause();
      return;
    }
    if (!active) {
      const t = setTimeout(() => v.pause(), pauseDelayMs);
      return () => clearTimeout(t);
    }
    v.currentTime = 0;
    nearEndFired.current = false;
    // 自動再生がブロックされても poster のまま表示されるだけなので握りつぶす
    v.play().catch(() => {});
  }, [active, pauseDelayMs]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop={loop}
      onEnded={onEnded}
      onTimeUpdate={
        onNearEnd
          ? (e) => {
              const v = e.currentTarget;
              if (!active || nearEndFired.current || !v.duration) return;
              if ((v.duration - v.currentTime) * 1000 <= nearEndMs) {
                nearEndFired.current = true;
                onNearEnd();
              }
            }
          : undefined
      }
      playsInline
      preload={active ? 'auto' : 'metadata'}
      aria-hidden="true"
    />
  );
}
