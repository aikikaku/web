'use client';

import { useEffect, useState } from 'react';

/**
 * 開閉する UI（メニュー・ドロップダウン・モーダル等）を、出す時も消す時もふわっとフェードさせるための状態。
 * 条件付きレンダリング（open && ...）のままだと、開いた瞬間に出て閉じた瞬間に消える「機械的な点滅」になるため、
 * - 開く: まず描画（mounted）→ 次のフレームで visible にしてフェードイン
 * - 閉じる: visible を外してフェードアウト → exitMs 後に取り除く
 * reduced-motion の人には presenceClass が transition を付けないので即時に切り替わる。
 */
export function usePresence(open: boolean, exitMs = 300) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    setVisible(false);
    const t = setTimeout(() => setMounted(false), exitMs);
    return () => clearTimeout(t);
  }, [open, exitMs]);

  // 透明な状態で描画されたのを確定させてから（2フレーム後に）濃くする。
  // 描画の確定前に濃くすると、透明→不透明の変化が同じフレームにまとまってフェードしない
  useEffect(() => {
    if (!open || !mounted) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setVisible(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [open, mounted]);

  return { mounted, visible };
}

/** usePresence と組み合わせる透明度の切り替え（閉じている間は操作も受け付けない） */
export function presenceClass(visible: boolean, duration = 'duration-300') {
  return `transition-opacity ${duration} ease-out motion-reduce:transition-none ${
    visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`;
}
