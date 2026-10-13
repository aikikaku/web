import { Property } from '@/types/microcms';

/**
 * 物件種別ごとの表示切替（Figma 付箋「物件種別での表示」4470:16568）。
 * - 価格: 【貸物件】【貸土地】では「賃料」と表示
 * - 間取り: 【売土地】【貸土地】では「広さ」として土地面積を表示
 * PickupCard / CardProperty / 物件詳細 hero で共通利用。
 */
export function getPriceLabel(property: Pick<Property, 'type'>): string {
  return property.type === 'rent' ? '賃料' : '価格';
}

/** 価格セル右隣のセル（間取り or 広さ）。表示する値が無ければ null */
export function getPropertyLayoutCell(
  property: Pick<Property, 'category' | 'layout' | 'landArea'>,
): { label: string; value: string } | null {
  if (property.category === 'land') {
    return property.landArea ? { label: '広さ', value: `${property.landArea}㎡` } : null;
  }
  return property.layout ? { label: '間取り', value: property.layout } : null;
}
