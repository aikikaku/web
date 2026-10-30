/**
 * お問い合わせフォームの定義と検証。フォーム（ブラウザ）と /api/contact（サーバー）の両方で使う。
 * 項目・列名・選択肢は「【aikikaku HP】お問い合わせフォーム仕様書」（2026-10-27）のとおり。
 * 列名と選択肢は案件管理CRM の「お問い合わせ」表と全角記号まで完全に一致させる（一致しないと選択肢に入らない）。
 */

export type FieldType = 'text' | 'tel' | 'email' | 'select' | 'multi' | 'textarea';

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  /** 書き込み先の列名 */
  column: string;
  options?: readonly string[];
  placeholder?: string;
  autoComplete?: string;
}

export type FormKind = 'general' | 'buy' | 'sell' | 'property';

export interface FormDef {
  kind: FormKind;
  /** タブの表示名 */
  label: string;
  /** 「問い合わせ元フォーム」列に入れる値 */
  source: string;
  fields: readonly FieldDef[];
}

const REFERRAL = ['検索', 'SNS', '紹介', 'チラシ', 'その他'] as const;
const CONTACT_METHOD = ['メール', '電話'] as const;

const name: FieldDef = { name: 'name', label: 'お名前', type: 'text', required: true, column: 'お名前', placeholder: '例: 山田 太郎', autoComplete: 'name' };
const kana: FieldDef = { name: 'kana', label: 'フリガナ', type: 'text', required: true, column: 'フリガナ', placeholder: '例: ヤマダ タロウ' };
const phone: FieldDef = { name: 'phone', label: '電話番号', type: 'tel', required: true, column: '電話番号', placeholder: '例: 090-1234-5678', autoComplete: 'tel' };
const email: FieldDef = { name: 'email', label: 'メールアドレス', type: 'email', required: true, column: 'メールアドレス', placeholder: '例: yamada@example.jp', autoComplete: 'email' };
const contactMethod: FieldDef = { name: 'contactMethod', label: '希望連絡方法', type: 'select', required: false, column: '希望連絡方法', options: CONTACT_METHOD };
const callTimes: FieldDef = {
  name: 'callTimes',
  label: 'お電話できる時間帯（複数選択可）',
  type: 'multi',
  required: false,
  column: '連絡可能な時間帯',
  options: ['09：00〜12：00', '12：00〜13：00', '13：00〜15：00', '15：00〜18：00', '18：00〜19：00', '19：00〜21：00', 'いつでも可能'],
};
const note: FieldDef = { name: 'note', label: '備考', type: 'textarea', required: false, column: 'ご質問・ご要望（備考）' };
const referral: FieldDef = { name: 'referral', label: 'このサイトを知ったきっかけ', type: 'select', required: false, column: '流入元', options: REFERRAL };

export const FORMS: Record<FormKind, FormDef> = {
  general: {
    kind: 'general',
    label: '総合お問い合わせ',
    source: '総合お問い合わせ',
    fields: [
      name,
      kana,
      phone,
      email,
      { name: 'topic', label: 'お問い合わせ大分類', type: 'select', required: false, column: 'お問い合わせ大分類', options: ['売りたい', '買いたい', '借りたい', '貸したい／管理', 'その他'] },
      { name: 'subject', label: '件名', type: 'text', required: false, column: '件名' },
      { name: 'message', label: 'お問い合わせ内容', type: 'textarea', required: true, column: 'お問い合わせ内容' },
      contactMethod,
      callTimes,
      note,
      referral,
    ],
  },
  buy: {
    kind: 'buy',
    label: '購入相談',
    source: '購入相談',
    fields: [
      name,
      kana,
      phone,
      email,
      {
        name: 'requests',
        label: 'お問い合わせ内容',
        type: 'multi',
        required: true,
        column: 'お問い合わせ種別',
        options: ['不動産購入の流れについて', '三島市の街の特色を知りたい', '災害リスクの少ない不動産を探したい', '条件に合う物件を紹介してほしい', 'オンライン相談がしたい'],
      },
      { name: 'message', label: '詳細', type: 'textarea', required: true, column: 'お問い合わせ内容', placeholder: '例: 三島市内で、小学校に近い土地を探しています。予算は2,000万円ほどです。' },
      { name: 'lifestyle', label: '購入後どのような暮らし方をしたいか', type: 'textarea', required: false, column: '購入後の暮らし方' },
      contactMethod,
      callTimes,
      note,
      referral,
    ],
  },
  sell: {
    kind: 'sell',
    label: '売却相談',
    source: '売却相談',
    fields: [
      name,
      kana,
      { name: 'postalCode', label: '郵便番号', type: 'text', required: false, column: '郵便番号', placeholder: '例: 411-0000', autoComplete: 'postal-code' },
      { name: 'address', label: 'ご住所', type: 'text', required: true, column: '住所', autoComplete: 'street-address' },
      phone,
      email,
      { name: 'requests', label: 'ご希望内容', type: 'multi', required: false, column: 'お問い合わせ種別', options: ['訪問査定', '机上査定', 'まずは相談にのって欲しい', 'オンライン相談'] },
      { name: 'propertyTypes', label: '査定不動産の種類', type: 'multi', required: false, column: '物件種別', options: ['土地', '一戸建て', 'マンション', '店舗・収益物件', 'その他'] },
      { name: 'sellTiming', label: 'ご売却希望時期', type: 'select', required: false, column: '売却希望時期', options: ['3ヶ月以内', '6ヶ月以内', '1年以内', 'その他'] },
      { name: 'propertyLocation', label: '査定不動産の所在地', type: 'text', required: true, column: '物件所在地' },
      callTimes,
      { name: 'message', label: 'ご質問・ご要望', type: 'textarea', required: false, column: 'お問い合わせ内容' },
      contactMethod,
      referral,
    ],
  },
  property: {
    kind: 'property',
    label: '物件お問い合わせ',
    source: '物件お問い合わせ',
    fields: [
      name,
      kana,
      phone,
      email,
      {
        name: 'requests',
        label: 'お問い合わせ内容',
        type: 'multi',
        required: true,
        column: 'お問い合わせ種別',
        options: ['物件の詳細を知りたい', '実際に物件を見たい', '最新の状況を知りたい', '周辺環境を知りたい', '来店して相談したい', 'オンライン相談がしたい'],
      },
      { name: 'message', label: '詳細', type: 'textarea', required: true, column: 'お問い合わせ内容', placeholder: '例: 内見を希望します。土日の午前中だと助かります。' },
      { name: 'buyTiming', label: '購入希望時期', type: 'select', required: false, column: '購入希望時期', options: ['すぐに', '3ヶ月以内', 'いいものがあれば', '検討中'] },
      contactMethod,
      callTimes,
      note,
      referral,
    ],
  },
};

/** /contact のタブに出すフォーム。物件お問い合わせは物件ページからだけ開く */
export const TAB_KINDS = ['general', 'buy', 'sell'] as const satisfies readonly FormKind[];

export function isFormKind(value: unknown): value is FormKind {
  return typeof value === 'string' && Object.hasOwn(FORMS, value);
}

export type FieldValue = string | string[];
export type FieldValues = Record<string, FieldValue>;

/** 送信する JSON の形 */
export interface InquiryInput {
  kind: string;
  values: FieldValues;
  /** 物件ページから来たときの microCMS の物件 ID */
  propertyId: string;
  consent: boolean;
  /** 人には見えない入力欄。ここが埋まっていたら機械による送信とみなす */
  website: string;
}

export interface Inquiry {
  form: FormDef;
  /** 入力された項目だけ（空欄は含めない）。フォームの定義順 */
  values: FieldValues;
  propertyId: string;
}

export type InquiryErrors = Record<string, string>;
export type ParseResult = { ok: true; inquiry: Inquiry } | { ok: false; errors: InquiryErrors };

const MAX_LENGTH: Record<FieldType, number> = { text: 200, tel: 30, email: 254, select: 50, multi: 50, textarea: 5000 };

function readField(field: FieldDef, raw: unknown): { value: FieldValue; error?: string } {
  if (field.type === 'multi') {
    const picked = Array.isArray(raw) ? field.options!.filter((option) => raw.includes(option)) : [];
    return { value: picked, error: field.required && picked.length === 0 ? `${field.label}を選んでください` : undefined };
  }
  const value = typeof raw === 'string' ? raw.trim().slice(0, MAX_LENGTH[field.type]) : '';
  if (!value) {
    const verb = field.type === 'select' ? '選んでください' : '入力してください';
    return { value, error: field.required ? `${field.label}を${verb}` : undefined };
  }
  if (field.type === 'select' && !field.options!.includes(value)) return { value: '', error: `${field.label}を選び直してください` };
  if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return { value, error: 'メールアドレスの形式が正しくありません' };
  if (field.type === 'tel' && !/^[\d\-+() ー－‐（）　０-９]+$/.test(value)) return { value, error: '電話番号は数字とハイフンで入力してください' };
  if (field.name === 'postalCode' && !/^[\d０-９]{3}[-ー－‐]?[\d０-９]{4}$/.test(value)) return { value, error: '郵便番号は7桁の数字で入力してください' };
  return { value };
}

export function parseInquiry(raw: unknown): ParseResult {
  const input = (typeof raw === 'object' && raw !== null ? raw : {}) as Partial<Record<keyof InquiryInput, unknown>>;
  if (!isFormKind(input.kind)) return { ok: false, errors: { kind: 'お問い合わせの種類を選んでください' } };

  const form = FORMS[input.kind];
  const rawValues = (typeof input.values === 'object' && input.values !== null ? input.values : {}) as Record<string, unknown>;
  const propertyId = typeof input.propertyId === 'string' ? input.propertyId.trim().slice(0, 100) : '';
  const values: FieldValues = {};
  const errors: InquiryErrors = {};

  for (const field of form.fields) {
    const { value, error } = readField(field, rawValues[field.name]);
    if (error) errors[field.name] = error;
    if (value.length > 0) values[field.name] = value;
  }
  if (form.kind === 'property' && !propertyId) errors.property = 'お問い合わせの物件が見つかりません。物件のページからもう一度お試しください';
  if (input.consent !== true) errors.consent = 'プライバシーポリシーへの同意が必要です';

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, inquiry: { form, values, propertyId } };
}

export function isBot(raw: unknown): boolean {
  return typeof raw === 'object' && raw !== null && typeof (raw as InquiryInput).website === 'string' && (raw as InquiryInput).website !== '';
}

/** メールの本文や確認画面に出す「項目：値」の並び */
export function describeValues(inquiry: Pick<Inquiry, 'form' | 'values'>): { label: string; value: string }[] {
  return inquiry.form.fields
    .filter((field) => inquiry.values[field.name] !== undefined)
    .map((field) => {
      const value = inquiry.values[field.name];
      return { label: field.label, value: Array.isArray(value) ? value.join('、') : value };
    });
}
