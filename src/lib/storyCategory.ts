/** ストーリーのカテゴリ → 表示ラベル（一覧・詳細・トップで共通利用） */
const STORY_CATEGORY_LABELS: { value: string; label: string }[] = [
  { value: 'daily', label: '日々のこと' },
  { value: 'regional', label: '地域のこと' },
  { value: 'property', label: '物件のつづき' },
];

export function getStoryCategoryLabel(category?: string): string {
  return STORY_CATEGORY_LABELS.find((c) => c.value === category)?.label || '日々のこと';
}
