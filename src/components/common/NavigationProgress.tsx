'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { endNavigation, isNavigating, startNavigation, subscribeNavigation } from '@/lib/navigation';

// 応答が速い時に一瞬だけ出て消える点滅を避けるため、これより早く終わる移動ではバーを出さない
const SHOW_DELAY_MS = 200;
// URL が変わらないまま終わった移動（同じページへのリンク等）でバーが残り続けないための保険
const GIVE_UP_MS = 15000;

/** 同じサイト内の別ページへのリンクか（新しいタブ・ダウンロード・ページ内リンクは除く） */
function isInternalNavigation(e: MouseEvent, a: HTMLAnchorElement) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return false;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return false;
  return url.pathname !== location.pathname || url.search !== location.search;
}

/**
 * ページ移動中に画面の上端に出す細いバー。サイト全体で「今のページを出したまま、このバーで待ち、
 * 届いたら 1 回で切り替える」にそろえる（ページごとのスケルトンは使わない）。
 * リンクのクリックと戻る/進むはここで、router.push（ページ送り・絞り込み）は呼び出し側で startNavigation する。
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigating = useSyncExternalStore(subscribeNavigation, isNavigating, () => false);
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle');
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (a instanceof HTMLAnchorElement && isInternalNavigation(e, a)) startNavigation();
    };
    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', startNavigation);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', startNavigation);
    };
  }, []);

  // URL が変わった＝新しいページに切り替わった
  useEffect(() => {
    endNavigation();
  }, [pathname, searchParams]);

  useEffect(() => {
    if (navigating) {
      const show = window.setTimeout(() => setPhase('running'), SHOW_DELAY_MS);
      const giveUp = window.setTimeout(endNavigation, GIVE_UP_MS);
      return () => {
        window.clearTimeout(show);
        window.clearTimeout(giveUp);
      };
    }
    if (phaseRef.current !== 'running') return;
    // 出ていたバーは右端まで伸ばしてから消す
    setPhase('done');
    const hide = window.setTimeout(() => setPhase('idle'), 500);
    return () => window.clearTimeout(hide);
  }, [navigating]);

  return (
    <div
      aria-hidden
      className={`fixed top-0 inset-x-0 z-[60] h-[3px] pointer-events-none transition-opacity duration-300 ${
        phase === 'running' ? 'opacity-100' : phase === 'done' ? 'opacity-0 delay-200' : 'opacity-0'
      }`}
    >
      <div
        className="h-full bg-accent-blue origin-left"
        style={{
          // 届くまでの時間は分からないので、最初は速く、だんだんゆっくり 9 割まで伸ばす
          transform: `scaleX(${phase === 'running' ? 0.9 : phase === 'done' ? 1 : 0})`,
          transition: phase === 'running' ? 'transform 8s cubic-bezier(0.1, 0.7, 0.2, 1)' : phase === 'done' ? 'transform 0.2s ease-out' : 'none',
        }}
      />
    </div>
  );
}
