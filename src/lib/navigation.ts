/**
 * ページ移動の最中か。サイト全体で「今のページを出したまま、上端の細いバー（NavigationProgress）で待ち、
 * 届いたら 1 回で切り替える」にそろえるための共有状態。
 * - リンクのクリック・戻る/進むは NavigationProgress が、router.push（ページ送り・絞り込み）は呼び出し側が startNavigation する
 * - 移動の最中に出る CmsImage は写真の読み込みを待ち、写真がそろってから切り替える（空の枠が一瞬出て点滅して見えるのを防ぐ）
 * - URL が変わったら NavigationProgress が endNavigation する
 */
let pending = false;
let startedAt = 0;
const listeners = new Set<() => void>();
// 写真を待つのは移動の開始からこの時間まで。URL が変わらない移動（同じ条件での絞り込み等）で
// 印が残っても、後から出る写真を待ち続けないための保険
const IMAGE_WAIT_WINDOW_MS = 8000;

export const isNavigating = () => pending;
export const isWaitingForImages = () => pending && performance.now() - startedAt < IMAGE_WAIT_WINDOW_MS;

export function subscribeNavigation(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function set(value: boolean) {
  if (pending === value) return;
  pending = value;
  if (value) startedAt = performance.now();
  listeners.forEach((l) => l());
}

export const startNavigation = () => set(true);
export const endNavigation = () => set(false);
