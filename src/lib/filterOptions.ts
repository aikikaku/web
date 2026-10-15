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

/**
 * 「絞り込み」ボタンに出す該当件数（デザインレビュー3 コメント NWv6SpfgM7n2 / f4RwHBCdJbD5）を
 * 押す前に数えるための、絞り込みに使う項目だけの一覧。ページ（サーバー）で全件分を作って渡す。
 * microCMS のセレクトは配列で返ることがあるため、どちらでも数えられるよう配列にそろえる。
 */
export interface PropertyCountItem {
  status: string[];
  type: string[];
  category: string[];
  regions: string[];
}
export interface StoryCountItem {
  category: string[];
  regions: string[];
}

const asArray = (v: unknown): string[] =>
  (Array.isArray(v) ? v : v == null || v === '' ? [] : [v]).map(String);

export function toPropertyCountItem(p: {
  status?: unknown;
  type?: unknown;
  category?: unknown;
  regions?: { name: string }[];
}): PropertyCountItem {
  return {
    status: asArray(p.status),
    type: asArray(p.type),
    category: asArray(p.category),
    regions: (p.regions ?? []).map((r) => r.name),
  };
}

export function toStoryCountItem(s: { category?: unknown; regions?: { name: string }[] }): StoryCountItem {
  return { category: asArray(s.category), regions: (s.regions ?? []).map((r) => r.name) };
}

/** /properties のサーバー側の絞り込み（page.tsx）と同じ条件で数える */
export function countProperties(
  items: PropertyCountItem[],
  { status, types, regions }: { status: string; types: string[]; regions: string[] },
): number {
  return items.filter((p) => {
    if (status !== 'all' && !p.status.some((s) => s === 'available' || s === 'negotiating')) return false;
    if (
      types.length > 0 &&
      !types.some((t) => {
        const [type, category] = t.split('_');
        return p.type.includes(type) && p.category.includes(category);
      })
    )
      return false;
    if (regions.length > 0 && !p.regions.some((r) => regions.includes(r))) return false;
    return true;
  }).length;
}

/** /stories のサーバー側の絞り込み（page.tsx）と同じ条件で数える */
export function countStories(
  items: StoryCountItem[],
  { category, regions }: { category: string; regions: string[] },
): number {
  return items.filter((s) => {
    if (category && !s.category.includes(category)) return false;
    if (regions.length > 0 && !s.regions.some((r) => regions.includes(r))) return false;
    return true;
  }).length;
}

/** 「絞り込み（12件）」。件数がまだ分からない時は「絞り込み」のまま */
export function sortLabel(count: number | undefined): string {
  return count === undefined ? '絞り込み' : `絞り込み（${count}件）`;
}
