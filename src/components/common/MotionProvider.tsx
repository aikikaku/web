'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * サイト全体の表示演出（Vercel コメント「フェードイン表示などを加え、時間がふわっと流れるような柔らかい演出に」）。
 *
 * 方針（NN/g「Scrolljacking 101」「The Role of Animation and Motion in UX」に沿って控えめに）:
 * - スクロールの速さ・量は変えない（慣性スクロール等のスクロールジャックはしない）
 * - 読ませる本文・タグ・ボタンは動かさない
 * - 見出し（明朝の h1 / h2）と写真・動画だけ、画面に入った時にその場でゆっくりフェードイン（位置は動かさない）。
 *   写真・動画は読み込みが終わってから始める
 *
 * main 内の要素を自動で対象にするので、各ページ側の実装は不要。
 * 初回描画のちらつきを避けるため、隠す指定は CSS（html.motion-ready + globals.css の .m-* ）で最初から当て、
 * ここでは画面に入った要素に .m-in を付けて表示させるだけにしている。
 * 対象と除外は globals.css と同じにすること。
 */
const TARGETS = 'h1.font-mincho, h2.font-mincho, img, video';
// 動画が再生できない（自動再生ブロック・読み込み失敗等）ときに見えないままにならないための保険
const VIDEO_FALLBACK_MS = 2500;
const EXCLUDE = 'header, nav, footer, form, [role="listbox"], .fixed, .sticky, [data-no-motion]';
const STAGGER_MS = 80; // 同時に画面に入った要素同士のずらし
const MAX_STAGGER_MS = 240;

export default function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('motion-ready')) return; // reduced-motion 等で無効
    (window as unknown as { __motionReady?: boolean }).__motionReady = true;

    const main = document.querySelector('main');
    if (!main) return;

    let alive = true;
    const show = (h: HTMLElement, delay: number) => {
      if (!alive) return;
      if (delay) h.style.transitionDelay = `${delay}ms`;
      h.classList.add('m-anim', 'm-in');
      // 出し終わったら演出用のトランジションと delay を外す（ホバー等の後続トランジションを妨げない）
      setTimeout(() => {
        h.classList.remove('m-anim');
        h.style.transitionDelay = '';
      }, delay + 1600);
    };

    const reveal = (els: Element[]) => {
      els
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        .forEach((el, i) => {
          const delay = Math.min(i * STAGGER_MS, MAX_STAGGER_MS);
          // 写真は読み込みと描画の準備が終わってからフェードを始める。
          // 枠が画面に入った時点で始めると、読み込み中にフェードが終わり、読み込み完了でパッと出て見えるため
          // 動画も同じく、映像を表示できる状態（loadeddata）になってからフェード
          if (el instanceof HTMLVideoElement && el.readyState < 2) {
            let done = false;
            const onReady = () => {
              if (done) return;
              done = true;
              show(el, 0);
            };
            el.addEventListener('loadeddata', onReady, { once: true });
            el.addEventListener('error', onReady, { once: true });
            setTimeout(onReady, VIDEO_FALLBACK_MS);
            return;
          }
          if (el instanceof HTMLImageElement && !(el.complete && el.naturalWidth > 0)) {
            const onReady = () => {
              el.decode().catch(() => {}).finally(() => show(el, 0));
            };
            el.addEventListener('load', onReady, { once: true });
            el.addEventListener('error', () => show(el, 0), { once: true });
            return;
          }
          show(el as HTMLElement, delay);
        });
    };

    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((e) => e.isIntersecting).map((e) => e.target);
        hits.forEach((t) => io.unobserve(t));
        if (hits.length) reveal(hits);
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );

    // 監視済みの印は DOM に書かず、この effect の実行ごとに持つ（開発時の effect 二重実行・hydration 差分対策）
    const observed = new WeakSet<Element>();
    const scan = () => {
      main.querySelectorAll(TARGETS).forEach((el) => {
        if (observed.has(el) || el.classList.contains('m-in') || el.closest(EXCLUDE)) return;
        observed.add(el);
        io.observe(el);
      });
    };

    // 絞り込み・ページ送り・カルーセル等で後から追加される要素も対象にする
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    // React の hydration（Suspense 境界の後追い分を含む）が終わってから始める。それまで対象は CSS で隠れたまま
    const start = window.setTimeout(() => {
      scan();
      mo.observe(main, { childList: true, subtree: true });
    }, 250);

    return () => {
      alive = false;
      window.clearTimeout(start);
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
