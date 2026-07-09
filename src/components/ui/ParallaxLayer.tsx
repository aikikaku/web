'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  /** 移動量係数（親高さに対する比率）。0.1 = 親高さの±10% 程度動く */
  strength?: number;
}

/**
 * 背景パララックス (デザインレビュー #42/#8/#9 系 / HHEgDkY7rPsV・lE9D0Wug_dHN・nAenFdImJ3wb)。
 * 「下スクロール時に、背景を下から上へ少し移動させる」。
 *
 * - 親要素は `relative overflow-hidden` であること。
 * - 自身を親より上下に overfill（strength 分だけ）させ、translateY してもズレ（隙間）が出ないようにする。
 * - children に `<Image fill>` や `absolute inset-0` の背景を置く。
 * - prefers-reduced-motion 時は何もしない（静止）。
 */
export default function ParallaxLayer({ children, className = '', strength = 0.1 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 親の中心が viewport 中心にあるとき 0、下にあるほど + / 上にあるほど −
      const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - vh / 2) / vh));
      // 下スクロール（progress 減少）で背景が上へ移動する
      const shift = progress * strength * rect.height;
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  // overfill 量は strength より少し大きめに取り、端に隙間が出ないようにする
  const overfill = `-${(strength * 100 + 3).toFixed(1)}%`;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 right-0 ${className}`}
      style={{ top: overfill, bottom: overfill, willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
