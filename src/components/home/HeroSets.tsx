'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import HeroVideo from '@/components/home/HeroVideo';
import { DEFAULT_HERO_SET_MS, type HeroSet } from '@/lib/heroSets';
import type { HeroSlot } from '@/types/microcms';

const FADE_MS = 1400; // クロスフェード時間
// 3枠の切り替えを少しずつずらす（旧 HeroFrame の 0 / 0.5s / 1s ずらしを踏襲）
const SLOT_DELAY_MS: Record<HeroSlot, number> = { main: 0, topRight: 300, bottomRight: 600 };

const HeroSetContext = createContext<{ sets: HeroSet[]; index: number; reduced: boolean } | null>(null);

/**
 * トップ PC ヒーローのセット切り替え。3枠は配置の都合で別々の要素にあるため、
 * Provider で「いま何番目のセットか」を共有し、各枠（HeroSetSlot）が同時に切り替わる。
 * prefers-reduced-motion 時は切り替えず先頭セットを静止表示。
 */
export function HeroSetProvider({ sets, children }: { sets: HeroSet[]; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  }, []);

  // セットごとに表示時間が違ってよいよう setInterval ではなく毎回 setTimeout
  useEffect(() => {
    if (reduced || sets.length <= 1) return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % sets.length),
      sets[index].durationMs ?? DEFAULT_HERO_SET_MS,
    );
    return () => clearTimeout(t);
  }, [index, reduced, sets]);

  return <HeroSetContext.Provider value={{ sets, index, reduced }}>{children}</HeroSetContext.Provider>;
}

interface SlotProps {
  slot: HeroSlot;
  alt: string;
  priority?: boolean;
  sizes?: string;
}

/** ヒーローの1枠。全セット分の画像/動画を重ね、アクティブなセットだけ表示する。 */
export function HeroSetSlot({ slot, alt, priority, sizes }: SlotProps) {
  const ctx = useContext(HeroSetContext);
  if (!ctx) throw new Error('HeroSetSlot must be used inside HeroSetProvider');
  const { sets, index, reduced } = ctx;

  return (
    <>
      {sets.map((set, i) => {
        const media = set[slot];
        const active = i === index;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: active ? 1 : 0,
              transition: reduced ? 'none' : `opacity ${FADE_MS}ms ease-in-out ${SLOT_DELAY_MS[slot]}ms`,
            }}
            aria-hidden={active ? undefined : true}
          >
            {media.type === 'video' ? (
              <HeroVideo
                src={media.src}
                poster={media.poster}
                active={active}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              // 表示中の画像はゆっくりズーム（景色が流れる印象 / #EjAsuZuByOas）
              <div
                className="absolute inset-0"
                style={reduced ? undefined : { animation: 'hero-zoom 10s ease-in-out infinite alternate' }}
              >
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
