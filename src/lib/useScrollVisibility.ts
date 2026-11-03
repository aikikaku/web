'use client';

import { useEffect, useState } from 'react';

/**
 * 開始/終了要素のスクロール位置から表示可否を判定する。SPフローティングボタン共通ロジック
 * （MobileFilterNav.tsx / MobileStoriesFilter.tsx）。
 *
 * - 要素は判定のたびに探し直す。絞り込み・ページ送りで一覧が描画し直されると、最初に見つけた要素は
 *   DOM から外れて位置が取れなくなるため（ボタンが出なくなる）。DOM の変化でも判定し直す
 * - 開始〜終了の間が画面の高さより短いとき（0件・数件の絞り込み結果）は、終了位置で隠さない。
 *   隠すと、条件を変える手段がなくなり一覧を見られないままになる
 */
export function useScrollVisibility(
  startSelector: string,
  endSelector: string,
  startThreshold = 0.8,
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const start = document.querySelector(startSelector);
      if (!start) {
        setVisible(false);
        return;
      }
      const end = document.querySelector(endSelector);
      const vh = window.innerHeight;
      const startRect = start.getBoundingClientRect();
      const isPastStart = startRect.top < vh * startThreshold;
      let isBeforeEnd = true;
      if (end) {
        const endRect = end.getBoundingClientRect();
        const isShortList = endRect.top - startRect.top < vh;
        isBeforeEnd = isShortList || endRect.top > vh * 0.5;
      }
      setVisible(isPastStart && isBeforeEnd);
    };

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(checkVisibility);
    };
    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [startSelector, endSelector, startThreshold]);

  return visible;
}
