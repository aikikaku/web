'use client';

import { useEffect, useState } from 'react';

/**
 * 開始/終了要素のスクロール位置から表示可否を判定する。SPフローティングボタン共通ロジック
 * （MobileFilterNav.tsx / MobileStoriesFilter.tsx）。
 */
export function useScrollVisibility(
  startSelector: string,
  endSelector: string,
  startThreshold = 0.8,
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const start = document.querySelector(startSelector);
    const end = document.querySelector(endSelector);
    if (!start) return;

    const checkVisibility = () => {
      const startRect = start.getBoundingClientRect();
      const isPastStart = startRect.top < window.innerHeight * startThreshold;
      let isBeforeEnd = true;
      if (end) {
        const endRect = end.getBoundingClientRect();
        isBeforeEnd = endRect.top > window.innerHeight * 0.5;
      }
      setVisible(isPastStart && isBeforeEnd);
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [startSelector, endSelector, startThreshold]);

  return visible;
}
