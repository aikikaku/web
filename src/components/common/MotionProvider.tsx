'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

/**
 * サイト全体の表示演出（Vercel コメント「表示アニメーションが不足…時間がふわっと流れるような柔らかい演出に」）。
 * 参考: iwatetown-sdgs.jp / qino.jp（どちらも慣性スクロール + 1種類のイージング（expo-out 系）で 0.8〜1.6s の表示）
 *
 * - 慣性スクロール（Lenis）: PC（マウス等の精密なポインタ）のみ。タッチ端末・reduced-motion では使わない
 * main 内の要素を自動で対象にするので、各ページ側の実装は不要:
 * - 本文系（p / h3 / li / タグ / ボタン 等）: 下から 32px、順番にふわっと
 * - 明朝の見出し（h1 / h2.font-mincho）: 1文字ずつ
 * - 写真（img）: 下から幕が開くように（clip-path）+ 少しの拡大を解きながら
 *
 * 初回描画のちらつきを避けるため、隠す指定は CSS（html.motion-ready + globals.css の .m-* ）で最初から当て、
 * ここでは画面に入った要素に .m-in を付けて表示させるだけにしている。
 * 対象の選び方（除外も含む）は globals.css の MOTION_TARGETS と同じ。
 */
const TEXT_TARGETS = 'p, h3, h4, li, dl, blockquote, .tag, .tag-dark, .btn-outline-fill, .btn-outline-hover';
const EXCLUDE = 'header, nav, footer, form, [role="listbox"], .fixed, .sticky, [data-no-motion]';
const STAGGER_MS = 110; // 同時に画面に入った要素同士のずらし
const MAX_STAGGER_MS = 720;
const CHAR_STAGGER_MS = 45; // 見出しの1文字ごとのずらし

/** 見出しのテキストを1文字ずつ span に分ける（<br> や子要素は保ったまま）。読み上げ用に aria-label を付ける */
function splitChars(el: HTMLElement) {
  if (el.dataset.mSplit) return;
  el.dataset.mSplit = '1';
  el.setAttribute('aria-label', el.textContent?.replace(/\s+/g, ' ').trim() ?? '');
  let i = 0;
  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? '';
        if (!text.trim()) continue;
        const frag = document.createDocumentFragment();
        for (const ch of Array.from(text)) {
          if (/\s/.test(ch)) {
            frag.append(ch);
            continue;
          }
          const span = document.createElement('span');
          span.className = 'm-char';
          span.setAttribute('aria-hidden', 'true');
          span.style.transitionDelay = `${i++ * CHAR_STAGGER_MS}ms`;
          span.textContent = ch;
          frag.append(span);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
        walk(child);
      }
    }
  };
  walk(el);
  el.classList.add('m-split');
}

/** 慣性スクロールの設定。参考サイトの実測（ホイール1回でゆっくり 0.6s ほどかけて止まる）に合わせた */
const LENIS_OPTIONS = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
  wheelMultiplier: 0.55,
  anchors: true,
  autoRaf: true,
  // 内側でスクロールする要素（モーダル・リスト等）は Lenis に奪わせない
  prevent: (node: HTMLElement) => !!node.closest('[data-lenis-prevent], [role="listbox"], .overflow-y-auto'),
};

export default function MotionProvider() {
  const pathname = usePathname();

  // 慣性スクロール（ページをまたいで1つだけ）
  useEffect(() => {
    if (!document.documentElement.classList.contains('motion-ready')) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const lenis = new Lenis(LENIS_OPTIONS);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('motion-ready')) return; // reduced-motion 等で無効
    (window as unknown as { __motionReady?: boolean }).__motionReady = true;

    const main = document.querySelector('main');
    if (!main) return;

    const reveal = (els: Element[]) => {
      els
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        .forEach((el, i) => {
          const h = el as HTMLElement;
          // 見出しは文字ごとに delay を持つので要素側には付けない
          if (h.classList.contains('m-split')) {
            h.classList.add('m-in');
            return;
          }
          const delay = Math.min(i * STAGGER_MS, MAX_STAGGER_MS);
          if (delay) h.style.transitionDelay = `${delay}ms`;
          h.classList.add('m-anim', 'm-in');
          // 出し終わったら演出用のトランジションと delay を外す（ホバー等の後続トランジションを妨げない）
          setTimeout(() => {
            h.classList.remove('m-anim');
            h.style.transitionDelay = '';
          }, delay + 2000);
        });
    };

    // 写真は clip-path で面積 0 にして隠しているため、写真自身は「画面に入った」と判定されない。
    // 親要素の出入りを監視し、入ったらその中の写真を出す
    const proxied = new Map<Element, Element[]>();
    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries
          .filter((e) => e.isIntersecting)
          .flatMap((e) => {
            io.unobserve(e.target);
            const imgs = proxied.get(e.target);
            proxied.delete(e.target);
            return imgs ?? [e.target];
          });
        if (hits.length) reveal(hits);
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );

    // 監視済みの印は DOM に書かず、この effect の実行ごとに持つ（開発時の effect 二重実行で
    // 1回目の印が残り、2回目に何も監視されなくなるのを防ぐ。DOM 属性だと hydration の差分にもなる）
    const observed = new WeakSet<Element>();
    const watch = (el: Element) => {
      if (observed.has(el)) return;
      observed.add(el);
      if (el instanceof HTMLImageElement && el.parentElement) {
        const host = el.parentElement;
        const list = proxied.get(host);
        if (list) list.push(el);
        else {
          proxied.set(host, [el]);
          io.observe(host);
        }
        return;
      }
      io.observe(el);
    };
    const isTarget = (el: Element) => !el.closest(EXCLUDE) && !el.classList.contains('m-in');
    const scan = () => {
      main.querySelectorAll('h1.font-mincho, h2.font-mincho').forEach((el) => {
        if (!isTarget(el)) return;
        splitChars(el as HTMLElement);
        watch(el);
      });
      main.querySelectorAll(`${TEXT_TARGETS}, img`).forEach((el) => {
        if (!isTarget(el)) return;
        // 入れ子の対象（li 内の p 等）は外側だけ動かす（CSS 側も同じ条件で隠していない）
        if (el.parentElement?.closest(TEXT_TARGETS) && !(el instanceof HTMLImageElement)) return;
        watch(el);
      });
    };

    // 絞り込み・ページ送り・カルーセル等で後から追加される要素も対象にする
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    // 文字分割などで DOM を書き換えるので、React の hydration（Suspense 境界の後追い分を含む）が
    // 終わってから始める。それまで対象は CSS で隠れたまま
    const start = window.setTimeout(() => {
      scan();
      mo.observe(main, { childList: true, subtree: true });
    }, 250);

    return () => {
      window.clearTimeout(start);
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
