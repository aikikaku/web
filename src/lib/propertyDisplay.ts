import { Property } from '@/types/microcms';

/** 状態ラベル: 成約済み or 商談中（案内中は非表示）(#35)。PropertyCard/PickupCard共通。 */
export function getPropertyStatus(property: Property) {
  const isSold = property.status === 'sold';
  const isNegotiating = property.status === 'negotiating';
  const label = isSold ? '成約済み' : isNegotiating ? '商談中' : null;
  return { isSold, isNegotiating, label };
}

/** ピルは CMS の label を優先。未設定なら category+type から算出 (#30)。PropertyCard/PickupCard共通。 */
export function getPropertyCategoryLabel(property: Property): string {
  return (
    property.label ||
    (property.category === 'property'
      ? property.type === 'sell'
        ? '中古住宅'
        : '賃貸物件'
      : property.type === 'sell'
        ? '売土地'
        : '貸土地')
  );
}

/** 価格/賃料の表示用フォーマット。PropertyCard/PickupCard共通。 */
export function formatPropertyPrice(property: Property, isSold: boolean) {
  const amount = isSold
    ? '-'
    : property.price
      ? property.price.toLocaleString()
      : property.rent
        ? property.rent.toLocaleString()
        : '応談';
  const unit = isSold ? '万円' : property.price ? '万円' : property.rent ? '円/月' : '';
  return { amount, unit };
}
