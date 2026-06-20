/**
 * Typeform お問い合わせフォームの URL を組み立てる。
 *
 * 環境変数 `NEXT_PUBLIC_TYPEFORM_FORM_ID` に Typeform のフォームID
 * （例: `abcDEF12`）またはフォームのフルURL（例: `https://form.typeform.com/to/abcDEF12`）
 * を設定すると有効になる。未設定なら null を返し、呼び出し側は従来導線にフォールバックする。
 *
 * 物件情報は Typeform の Hidden Fields（URLハッシュパラメータ）で渡す。
 * ※ Typeform フォーム側に `property_id` / `property_url` / `property_title` の
 *    Hidden Field を事前登録しておく必要がある（未登録キーは無視される）。
 */
export function getTypeformContactUrl(property: {
  id: string;
  title: string;
}): string | null {
  const form = process.env.NEXT_PUBLIC_TYPEFORM_FORM_ID;
  if (!form) return null;

  const base = form.startsWith('http')
    ? form
    : `https://form.typeform.com/to/${form}`;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp';
  const propertyUrl = `${baseUrl}/properties/${property.id}`;

  // Hidden Fields は `#key=value&key2=value2` 形式。各値は URL エンコードする
  const params = [
    `property_id=${encodeURIComponent(property.id)}`,
    `property_url=${encodeURIComponent(propertyUrl)}`,
    `property_title=${encodeURIComponent(property.title)}`,
  ].join('&');

  return `${base}#${params}`;
}
