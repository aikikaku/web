'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import HeroVideo from '@/components/home/HeroVideo';
import { DEFAULT_HERO_SET_MS, HERO_FADE_MS, type HeroSet } from '@/lib/heroSets';
import type { HeroSlot } from '@/types/microcms';

const HeroSetContext = createContext<{
  sets: HeroSet[];
  index: number;
  /** 直前のセット。フェード中に背景が透けないよう、新しいセットの下に不透明のまま残す */
  prev: number | null;
  reduced: boolean;
  /** 表示中セットの動画が最後まで再生されたときに各枠から呼ぶ */
  onVideoEnded: (setIndex: number) => void;
} | null>(null);

const SLOTS: HeroSlot[] = ['main', 'topRight', 'bottomRight'];
// 動画が再生できない（読み込み失敗・自動再生ブロック等）ときに止まらないための保険
const VIDEO_FALLBACK_MS = 15000;

/**
 * トップ PC ヒーローのセット切り替え。3枠は配置の都合で別々の要素にあるため、
 * Provider で「いま何番目のセットか」を共有し、各枠（HeroSetSlot）が同時に切り替わる。
 * 動画を含むセットは、動画をループさせず、セット内でいちばん短い動画が再生し終わったら次のセットへ移る
 * （長い方の動画はフェードアウト中も再生を続ける）。
 * 画像だけのセットは durationMs（Figma の After delay 6 秒）表示して次へ。
 * prefers-reduced-motion 時は切り替えず先頭セットを静止表示。
 */
export function HeroSetProvider({ sets, children }: { sets: HeroSet[]; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  }, []);

  // Figma の After delay と同じく、フェードし終わってから表示時間を数える（初回はフェードなし）
  const faded = useRef(false);
  const advance = useCallback(() => {
    faded.current = true;
    setPrev(index);
    setIndex((index + 1) % sets.length);
  }, [index, sets.length]);

  // 画像だけのセットは表示時間で、動画を含むセットは保険のタイマーで次へ
  useEffect(() => {
    if (reduced || sets.length <= 1) return;
    const hasVideo = SLOTS.some((slot) => sets[index][slot].type === 'video');
    const t = setTimeout(
      advance,
      hasVideo
        ? VIDEO_FALLBACK_MS
        : (faded.current ? HERO_FADE_MS : 0) + (sets[index].durationMs ?? DEFAULT_HERO_SET_MS),
    );
    return () => clearTimeout(t);
  }, [index, reduced, sets, advance]);

  // 表示中セットの動画のうち最初に終わったもの（= いちばん短い動画）で次へ
  const onVideoEnded = useCallback(
    (setIndex: number) => {
      if (reduced || sets.length <= 1 || setIndex !== index) return;
      advance();
    },
    [reduced, sets.length, index, advance],
  );

  return (
    <HeroSetContext.Provider value={{ sets, index, prev, reduced, onVideoEnded }}>{children}</HeroSetContext.Provider>
  );
}

interface SlotProps {
  slot: HeroSlot;
  alt: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * ヒーローの1枠。全セット分の画像/動画を重ね、アクティブなセットだけ表示する。
 * 3枠とも同時に HERO_FADE_MS かけて ease-in でクロスフェードする（Figma の Smart Animate）。
 */
export function HeroSetSlot({ slot, alt, priority, sizes }: SlotProps) {
  const ctx = useContext(HeroSetContext);
  if (!ctx) throw new Error('HeroSetSlot must be used inside HeroSetProvider');
  const { sets, index, prev, reduced, onVideoEnded } = ctx;

  return (
    <>
      {sets.map((set, i) => {
        const media = set[slot];
        const active = i === index;
        const leaving = i === prev;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: active || leaving ? 1 : 0,
              zIndex: active ? 2 : leaving ? 1 : 0,
              transition: active && !reduced ? `opacity ${HERO_FADE_MS}ms ease-in` : 'none',
            }}
            aria-hidden={active ? undefined : true}
          >
            {media.type === 'video' ? (
              <HeroVideo
                src={media.src}
                poster={media.poster}
                active={active}
                pauseDelayMs={HERO_FADE_MS}
                loop={false}
                onEnded={() => onVideoEnded(i)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              // 表示中（とフェードアウト中）の写真はゆっくり引いていく（Ken Burns）。表示のたびに最初から
              <div className={`absolute inset-0 ${(active || leaving) && !reduced ? 'ken-burns' : ''}`}>
                <Image
                  src={media.src}
                  alt={i === 0 ? alt : ''}
                  fill
                  className="object-cover"
                  priority={priority && i === 0}
                  sizes={sizes}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
