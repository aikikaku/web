/**
 * お問い合わせ 1 件の形と、その検証。フォーム（ブラウザ）と /api/contact（サーバー）の両方で使う。
 * 旧サイトの一般・購入相談・売却相談・物件詳細の 4 フォームを、種別の選択 1 つにまとめている。
 */

export const INQUIRY_CATEGORIES = {
  property: '掲載中の物件について',
  buy: '購入のご相談',
  sell: '売却・活用のご相談',
  parking: '月極駐車場について',
  other: 'その他',
} as const;

export type InquiryCategory = keyof typeof INQUIRY_CATEGORIES;

export function isInquiryCategory(value: unknown): value is InquiryCategory {
  return typeof value === 'string' && Object.hasOwn(INQUIRY_CATEGORIES, value);
}

export interface Inquiry {
  category: InquiryCategory;
  name: string;
  email: string;
  phone: string;
  message: string;
  /** 物件詳細ページから来たときの microCMS の物件 ID */
  propertyId: string;
}

/** フォームの入力欄そのまま（すべて文字列・チェックボックスは真偽値）。送信時の JSON もこの形 */
export interface InquiryInput {
  category: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId: string;
  consent: boolean;
  /** 人には見えない入力欄。ここが埋まっていたら機械による送信とみなす */
  website: string;
}

export type InquiryErrors = Partial<Record<'category' | 'name' | 'email' | 'phone' | 'message' | 'consent', string>>;

export type ParseResult = { ok: true; inquiry: Inquiry } | { ok: false; errors: InquiryErrors };

const LIMITS = { name: 100, email: 254, phone: 30, message: 5000, propertyId: 100 };

function text(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export function parseInquiry(raw: unknown): ParseResult {
  const input = (typeof raw === 'object' && raw !== null ? raw : {}) as Partial<Record<keyof InquiryInput, unknown>>;
  const name = text(input.name, LIMITS.name);
  const email = text(input.email, LIMITS.email);
  const phone = text(input.phone, LIMITS.phone);
  const message = text(input.message, LIMITS.message);
  const propertyId = text(input.propertyId, LIMITS.propertyId);
  const errors: InquiryErrors = {};

  if (!isInquiryCategory(input.category)) errors.category = 'お問い合わせの種類を選んでください';
  if (!name) errors.name = 'お名前を入力してください';
  if (!email) errors.email = 'メールアドレスを入力してください';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'メールアドレスの形式が正しくありません';
  if (phone && !/^[\d\-+() ー－‐（）　]+$/.test(phone)) errors.phone = '電話番号は数字とハイフンで入力してください';
  if (!message) errors.message = 'お問い合わせ内容を入力してください';
  if (input.consent !== true) errors.consent = 'プライバシーポリシーへの同意が必要です';

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    inquiry: { category: input.category as InquiryCategory, name, email, phone, message, propertyId },
  };
}

export function isBot(raw: unknown): boolean {
  return typeof raw === 'object' && raw !== null && typeof (raw as InquiryInput).website === 'string' && (raw as InquiryInput).website !== '';
}
