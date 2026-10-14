'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
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
} | null>(null);

/**
 * トップ PC ヒーローのセット切り替え。3枠は配置の都合で別々の要素にあるため、
 * Provider で「いま何番目のセットか」を共有し、各枠（HeroSetSlot）が同時に切り替わる。
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

  // セットごとに表示時間が違ってよいよう setInterval ではなく毎回 setTimeout
  useEffect(() => {
    if (reduced || sets.length <= 1) return;
    const t = setTimeout(
      () => {
        faded.current = true;
        setPrev(index);
        setIndex((index + 1) % sets.length);
      },
      (faded.current ? HERO_FADE_MS : 0) + (sets[index].durationMs ?? DEFAULT_HERO_SET_MS),
    );
    return () => clearTimeout(t);
  }, [index, reduced, sets]);

  return <HeroSetContext.Provider value={{ sets, index, prev, reduced }}>{children}</HeroSetContext.Provider>;
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
  const { sets, index, prev, reduced } = ctx;

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
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={media.src}
                alt={i === 0 ? alt : ''}
                fill
                className="object-cover"
                priority={priority && i === 0}
                sizes={sizes}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
