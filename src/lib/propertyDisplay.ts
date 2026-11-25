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

const formatNumber = (n: number) => n.toLocaleString('ja-JP', { maximumFractionDigits: 4 });

/**
 * 円の金額を、数字と単位に分けた表示にする。CMS の「価格」は円で入力する（38000000 → 3,800 万円）。
 * 1億円以上は「1億2,000 万円」、ちょうどの時は「1 億円」。
 */
export function formatYen(yen: number): { amount: string; unit: string } {
  const oku = Math.floor(yen / 100_000_000);
  const man = (yen - oku * 100_000_000) / 10_000;
  if (oku === 0) return { amount: formatNumber(man), unit: '万円' };
  if (man === 0) return { amount: formatNumber(oku), unit: '億円' };
  return { amount: `${formatNumber(oku)}億${formatNumber(man)}`, unit: '万円' };
}

/** 円の金額を1つの文字列にする（38000000 → 「3,800万円」）。説明文など、数字と単位を分けない所で使う */
export function formatYenText(yen: number): string {
  const { amount, unit } = formatYen(yen);
  return amount + unit;
}

/** 価格/賃料の表示用フォーマット。PropertyCard/PickupCard/物件詳細で共通。価格は円、賃料は円/月で入力されている。 */
export function formatPropertyPrice(property: Property, isSold: boolean) {
  if (isSold) return { amount: '-', unit: '万円' };
  if (property.price) return formatYen(property.price);
  if (property.rent) return { amount: property.rent.toLocaleString('ja-JP'), unit: '円/月' };
  return { amount: '応談', unit: '' };
}
