'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

interface Props {
  /** レンダリングするタグ (既存の section/div を置き換える用途)。既定 div */
  as?: ElementType;
  className?: string;
  /** stagger 用の遅延 (ms)。並列要素は 100〜150ms ずつずらす想定 */
  delayMs?: number;
  children: ReactNode;
}

/**
 * スクロール連動フェードイン (デザインレビュー #74 / Tkv1NaGcdcNc)。
 *
 * 方針: やさしく、ゆったりとした空気感。
 * - きっかけ: 要素がビューポートに ~15% 入ったら発火、1回のみ (unobserve)
 * - 動き: opacity 0 → 1 / translateY 24px → 0 (CSS `.reveal` で定義)
 * - duration 0.9s / easing cubic-bezier(0.16, 1, 0.3, 1)
 * - stagger: delayMs で並列要素を順に表示
 * - prefers-reduced-motion: globals.css の media query で即時表示 (transition/transform 無効)
 *
 * SSR では `.reveal` (opacity:0) で出力されるが、IntersectionObserver は
 * observe 時点でビューポート内の要素にも発火するため above-the-fold も表示される。
 */
export default function Reveal({ as: Tag = 'div', className = '', delayMs, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // reduced-motion 環境や IO 非対応環境では即時表示にして確実に見せる
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    // 初期表示でビューポート内に(一部でも)入っている要素は即フェードイン (#6)。
    // threshold 0.15 だと画面下端付近の大きめ要素が発火せず隠れたままになるため、
    // マウント時に可視な above-the-fold 要素はその場で表示する。
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
