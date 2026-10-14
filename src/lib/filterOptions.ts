/**
 * 物件を探す / 暮らしを知る の絞り込みで共通の選択肢と判定。
 * 地域名は microCMS の regions（name）と一致させること（不一致だと絞り込んでも何もヒットしない）。
 */
export const REGION_NAMES = [
  '三島市',
  '長泉町',
  '清水町',
  '沼津市',
  '裾野市',
  '函南町',
  '伊豆の国市',
  'そのほかの地域',
] as const;

export const REGION_OPTIONS = REGION_NAMES.map((r) => ({ value: r, label: r }));

/** 2つの文字列配列が同じ要素集合かどうか（順序無視）。「絞り込み」ボタンを押せるかの判定に使う */
export function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sb = new Set(b);
  return a.every((x) => sb.has(x));
}
