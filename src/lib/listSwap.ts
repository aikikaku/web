/**
 * ページ送りで一覧を入れ替えている最中か。この間に出る CmsImage は写真の読み込みを待ち、
 * 今の一覧を出したまま、写真がそろってから 1 回で入れ替える（空の枠が一瞬出て点滅して見えるのを防ぐ）。
 * Pagination が押した時に立て、入れ替え後に PaginationScrollRestorer が下ろす。
 */
let pending = false;

export const isListSwapPending = () => pending;

export function setListSwapPending(value: boolean) {
  pending = value;
}
