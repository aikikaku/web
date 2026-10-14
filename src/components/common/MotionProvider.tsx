'use client';

import { useEffect } from 'react';

/**
 * サイト全体の表示演出（Vercel コメント「フェードイン表示などを加え、時間がふわっと流れるような柔らかい演出に」）。
 *
 * 方針（NN/g「Scrolljacking 101」「The Role of Animation and Motion in UX」とレビュー指摘に沿って）:
 * - スクロールの速さ・量は変えない（慣性スクロール等のスクロールジャックはしない）
 * - 文字も写真も「その場で濃くなるだけ」。下から出す・1文字ずつ・ぼかしは使わない（「くどい」との指摘）
 * - main 内で「文字を直接持つ要素」をすべて自動で対象にする。タグの一覧で選ぶと、部品の span / div や
 *   CMS から取得した文字が漏れて、そこだけ機械的にパッと出てしまうため（レビュー指摘）
 * - 同時に画面に入ったものは上（DOM 順）から少しずつずらして出す。見出しがその下のカードより後から出ないように
 * - 文字はすぐ、写真・動画は読み込みが終わってからフェードを始める（読み込み前に始めると「パッと出る」）
 * - 大きな写真だけ「ゆっくり時間が流れる」演出: 出たあと約4秒かけてわずかな拡大から落ち着く。
 *   PC では枠の中で写真だけがスクロールよりわずかに遅れて動く（ゆるいパララックス・上下 3%）。
 *   枠・レイアウト・スクロール量は変えない。SP・reduced-motion では入れない
 *
 * 初回表示のちらつき（一瞬見えてから消えてフェードし直す）を避けるため、main は対象に印（.m-hide）を
 * 付け終わるまで CSS で見えなくしておき（html.motion-ready main:not(.m-ready)）、付け終えたら表示する。
 * JS が動かない場合は layout.tsx の inline script が 4 秒で motion-ready を外して全て表示する。
 */
// data-motion-fade: 中の写真の透明度を自前で切り替える枠（PICK UP カードのギャラリー等）。枠ごとフェードする
const MEDIA = 'img, video, [data-motion-fade]';
const EXCLUDE = 'header, nav, footer, form, [role="listbox"], .fixed, .sticky, [data-no-motion]';
const STAGGER_MS = 60; // 同時に画面に入った要素同士のずらし
const MAX_STAGGER_MS = 240;
// 動画が再生できない（自動再生ブロック・読み込み失敗等）ときに見えないままにならないための保険
const VIDEO_FALLBACK_MS = 2500;
// 「ゆっくり時間が流れる」演出の対象にする大きな写真の下限（カードの小さな写真は落ち着かなくなるので対象外）
const LARGE_MIN_W = 480;
const LARGE_MIN_H = 280;
// パララックスで写真が枠の中で動く量（枠の高さに対する割合・片側）
const PARALLAX_AMP = 0.03;

/** 空白以外の文字を直接（子のテキストノードとして）持っているか */
function hasOwnText(el: Element) {
  for (const n of Array.from(el.childNodes)) {
    if (n.nodeType === Node.TEXT_NODE && n.textContent && n.textContent.trim()) return true;
  }
  return false;
}

export default function MotionProvider() {
  // ページをまたいで1つだけ動かす（遷移で作り直すと、その間に新しいページの文字が一瞬見えてしまう）。
  // 遷移後の新しい要素は MutationObserver が次の描画の前に拾う
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
      }, delay + (h.classList.contains('m-large') ? 4600 : 1600));
    };

    const reveal = (els: Element[]) => {
      els
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        .forEach((el, i) => {
          const delay = Math.min(i * STAGGER_MS, MAX_STAGGER_MS);
          // 動画は、映像を表示できる状態（loadeddata）になってからフェード
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
          // 写真（枠ごとフェードする場合は中の最初の写真）は、読み込みとデコードが終わってからフェード
          const img = el instanceof HTMLImageElement ? el : el.matches('[data-motion-fade]') ? el.querySelector('img') : null;
          if (img && !(img.complete && img.naturalWidth > 0)) {
            const onReady = () => {
              img.decode().catch(() => {}).finally(() => show(el as HTMLElement, 0));
            };
            img.addEventListener('load', onReady, { once: true });
            img.addEventListener('error', () => show(el as HTMLElement, 0), { once: true });
            return;
          }
          show(el as HTMLElement, delay);
        });
    };

    const io = new IntersectionObserver(
      (entries) => {
        // 画面に入ったもの + 速いスクロールで入らずに上へ通り過ぎたもの（戻った時に見えないままにしない）
        const hits = entries
          .filter((e) => e.isIntersecting || e.boundingClientRect.bottom < 0)
          .map((e) => e.target);
        hits.forEach((t) => io.unobserve(t));
        if (hits.length) reveal(hits);
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );

    // 大きな写真の判定。枠（はみ出しを切り抜く親）に収まっている写真だけ。横スクロールのカルーセル内は除く
    const parallaxOn = window.matchMedia('(min-width: 993px) and (pointer: fine)').matches;
    const parallaxEls = new Set<HTMLImageElement>();
    const visibleParallax = new Set<HTMLImageElement>();
    const pio = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visibleParallax.add(e.target as HTMLImageElement);
        else visibleParallax.delete(e.target as HTMLImageElement);
      }
    });
    const frameOf = (img: HTMLElement) => {
      let a = img.parentElement;
      for (let i = 0; i < 3 && a; i++, a = a.parentElement) {
        const ov = getComputedStyle(a).overflow;
        if (ov.includes('hidden') || ov.includes('clip')) return a;
      }
      return null;
    };
    const markLarge = (img: HTMLImageElement) => {
      const r = img.getBoundingClientRect();
      if (r.width < LARGE_MIN_W || r.height < LARGE_MIN_H) return;
      if (img.closest('.overflow-x-auto, [data-motion-fade]')) return;
      const frame = frameOf(img);
      if (!frame) return;
      img.classList.add('m-large');
      if (parallaxOn) {
        img.classList.add('m-parallax');
        parallaxEls.add(img);
        pio.observe(img);
      }
    };
    // 枠の中心が画面の下端→上端へ動く間に、写真を枠の中で下向きに少しずつずらす（スクロールよりわずかに遅れて見える）
    const updateParallax = () => {
      const vh = window.innerHeight;
      visibleParallax.forEach((img) => {
        if (!img.isConnected) {
          visibleParallax.delete(img);
          return;
        }
        const frame = frameOf(img) ?? img;
        const r = frame.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
        img.style.translate = `0 ${(-progress * PARALLAX_AMP * r.height).toFixed(1)}px`;
      });
    };

    // 対象の選び方: 写真・動画・枠、または文字を直接持つ要素。すでに対象になっている要素の中は外側と一緒に出す
    const observed = new WeakSet<Element>();
    const scan = () => {
      for (const el of Array.from(main.querySelectorAll('*'))) {
        if (observed.has(el) || el.classList.contains('m-in')) continue;
        if (el instanceof SVGElement || el.closest(EXCLUDE)) continue;
        const isMedia = el.matches(MEDIA);
        if (!isMedia && !hasOwnText(el)) continue;
        // 外側がすでに対象（文字のまとまり・枠）なら、その中身は外側と一緒に出す
        if (el.parentElement?.closest('.m-hide')) continue;
        observed.add(el);
        el.classList.add('m-hide');
        if (el instanceof HTMLImageElement && !/opacity-/.test(el.className)) markLarge(el);
        io.observe(el);
      }
    };

    // 速いスクロールで画面に入らないまま上へ通り過ぎた要素は IntersectionObserver から通知が来ないため、
    // スクロールのたびに（1フレーム1回）まとめて表示済みにする（戻った時に見えないままにしない）
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const passed = Array.from(main.querySelectorAll('.m-hide:not(.m-in)')).filter(
          (el) => el.getBoundingClientRect().bottom < 0,
        );
        passed.forEach((el) => {
          io.unobserve(el);
          show(el as HTMLElement, 0);
        });
        if (parallaxOn) updateParallax();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // 絞り込み・ページ送り・カルーセル等で後から追加される要素も対象にする（次の描画の前に印を付ける）
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    // React の hydration（Suspense 境界の後追い分を含む）が終わってから始める。それまで main は CSS で見えない
    const start = window.setTimeout(() => {
      try {
        scan();
        if (parallaxOn) requestAnimationFrame(updateParallax);
      } finally {
        main.classList.add('m-ready');
      }
      mo.observe(main, { childList: true, subtree: true });
    }, 120);

    return () => {
      alive = false;
      window.clearTimeout(start);
      io.disconnect();
      pio.disconnect();
      parallaxEls.forEach((img) => (img.style.translate = ''));
      mo.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
