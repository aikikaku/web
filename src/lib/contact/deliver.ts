import { INQUIRY_CATEGORIES, type Inquiry, type InquiryCategory } from './inquiry';

/**
 * お問い合わせを届ける（サーバー専用。API キーを使うのでブラウザ側から import しない）。順番は CRM への記録 → 社内への通知メール → お客様への自動返信。
 * - 社内への通知メールが届かなければ失敗として扱う（お客様に再送か電話をお願いする）。
 * - CRM の記録と自動返信は失敗しても受付は成立させる。CRM に書けなかったことは通知メールに書いて、手で補えるようにする。
 *
 * 必要な環境変数:
 *   RESEND_API_KEY        Resend の API キー
 *   CONTACT_FROM          送信元。例: アイ企画 <noreply@aikikaku.net>（Resend で認証済みのドメイン）
 *   CONTACT_TO            通知先。カンマ区切りで複数可
 *   CODA_API_TOKEN        Superhuman Docs（Coda）の API トークン。未設定なら CRM への記録はしない
 *   CODA_DOC_ID / CODA_TABLE_ID  書き込み先の Doc と表
 */

export interface InquiryProperty {
  title: string;
  url: string;
}

export type DeliveryResult = { ok: true } | { ok: false; reason: 'not_configured' | 'notify_failed' };

const TIMEOUT_MS = 8000;

function config() {
  const resend =
    process.env.RESEND_API_KEY && process.env.CONTACT_FROM && process.env.CONTACT_TO
      ? {
          apiKey: process.env.RESEND_API_KEY,
          from: process.env.CONTACT_FROM,
          to: process.env.CONTACT_TO.split(',').map((s) => s.trim()).filter(Boolean),
        }
      : null;
  const crm =
    process.env.CODA_API_TOKEN && process.env.CODA_DOC_ID && process.env.CODA_TABLE_ID
      ? { token: process.env.CODA_API_TOKEN, docId: process.env.CODA_DOC_ID, tableId: process.env.CODA_TABLE_ID }
      : null;
  return { resend, crm };
}

function receivedAt(date: Date): string {
  return date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo', dateStyle: 'medium', timeStyle: 'short' });
}

function summaryLines(inquiry: Inquiry, property: InquiryProperty | null): string[] {
  return [
    `種類：${INQUIRY_CATEGORIES[inquiry.category]}`,
    ...(property ? [`物件：${property.title}`, `　　　${property.url}`] : []),
    `お名前：${inquiry.name}`,
    `メール：${inquiry.email}`,
    `電話：${inquiry.phone || '（未入力）'}`,
    '',
    '【お問い合わせ内容】',
    inquiry.message,
  ];
}

async function sendEmail(
  apiKey: string,
  mail: { from: string; to: string[]; subject: string; text: string; replyTo?: string },
): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: mail.from, to: mail.to, subject: mail.subject, text: mail.text, reply_to: mail.replyTo }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  }).catch((e: unknown) => {
    console.error('[contact] Resend request failed', e);
    return null;
  });
  if (!res) return false;
  if (!res.ok) console.error('[contact] Resend responded', res.status, await res.text().catch(() => ''));
  return res.ok;
}

/** 案件管理CRM の「お問い合わせ」表の選択肢。表側の文字列と完全に一致させる（一致しないと選択肢に入らない） */
const CRM_SOURCE: Record<InquiryCategory, string> = {
  property: '物件お問い合わせ',
  buy: '購入相談',
  sell: '売却相談',
  parking: '総合お問い合わせ',
  other: '総合お問い合わせ',
};
const CRM_TOPIC: Record<InquiryCategory, string> = {
  property: '',
  buy: '買いたい',
  sell: '売りたい',
  parking: '借りたい',
  other: 'その他',
};

/** 列名は案件管理CRM の「お問い合わせ」表と同じ。受付日時は表の初期値 Now() に任せる */
async function recordToCrm(
  crm: { token: string; docId: string; tableId: string },
  inquiry: Inquiry,
  property: InquiryProperty | null,
  pageUrl: string,
): Promise<boolean> {
  const cells = [
    { column: '問い合わせ元フォーム', value: CRM_SOURCE[inquiry.category] },
    { column: 'お問い合わせ大分類', value: CRM_TOPIC[inquiry.category] },
    { column: 'お名前', value: inquiry.name },
    { column: 'メールアドレス', value: inquiry.email },
    { column: '電話番号', value: inquiry.phone },
    { column: 'お問い合わせ物件', value: property?.title ?? '' },
    { column: 'お問い合わせ内容', value: inquiry.message },
    { column: '送信元ページURL', value: pageUrl },
    { column: 'プライバシーポリシー同意', value: true },
    { column: '対応状況', value: '未対応' },
  ].filter((cell) => cell.value !== '');
  const url = `https://coda.io/apis/v1/docs/${encodeURIComponent(crm.docId)}/tables/${encodeURIComponent(crm.tableId)}/rows`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${crm.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ rows: [{ cells }] }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  }).catch((e: unknown) => {
    console.error('[contact] CRM request failed', e);
    return null;
  });
  if (!res) return false;
  if (!res.ok) console.error('[contact] CRM responded', res.status, await res.text().catch(() => ''));
  return res.ok;
}

export async function deliverInquiry(inquiry: Inquiry, property: InquiryProperty | null, pageUrl: string): Promise<DeliveryResult> {
  const { resend, crm } = config();
  const at = new Date();

  if (!resend) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[contact] メールの設定がないため、送信せずに内容だけ表示します\n' + summaryLines(inquiry, property).join('\n'));
      return { ok: true };
    }
    console.error('[contact] RESEND_API_KEY / CONTACT_FROM / CONTACT_TO が設定されていません');
    return { ok: false, reason: 'not_configured' };
  }

  const crmNote = !crm
    ? '※ CRM の設定がないため、CRM には記録していません。'
    : (await recordToCrm(crm, inquiry, property, pageUrl))
      ? 'CRM（Superhuman Docs）に記録しました。'
      : '※ CRM（Superhuman Docs）への記録に失敗しました。お手数ですが手で追加してください。';

  const notified = await sendEmail(resend.apiKey, {
    from: resend.from,
    to: resend.to,
    replyTo: inquiry.email,
    subject: `【HP問い合わせ】${INQUIRY_CATEGORIES[inquiry.category]}｜${inquiry.name}様`,
    text: [
      `ホームページからお問い合わせがありました（${receivedAt(at)}）。`,
      'このメールに返信すると、お客様に届きます。',
      '',
      ...summaryLines(inquiry, property),
      '',
      '---',
      crmNote,
    ].join('\n'),
  });
  if (!notified) return { ok: false, reason: 'notify_failed' };

  await sendEmail(resend.apiKey, {
    from: resend.from,
    to: [inquiry.email],
    replyTo: resend.to[0],
    subject: '【アイ企画】お問い合わせを受け付けました',
    text: [
      `${inquiry.name} 様`,
      '',
      'このたびはアイ企画にお問い合わせいただき、ありがとうございます。',
      '以下の内容で受け付けました。内容を確認のうえ、担当者よりご連絡いたします。',
      '2〜3日たっても連絡がない場合は、お手数ですがお電話（055-976-5300）でお知らせください。',
      '',
      ...summaryLines(inquiry, property),
      '',
      '---',
      '※ このメールは自動でお送りしています。このメールに返信いただくと、担当者に届きます。',
      '',
      '有限会社アイ企画',
      '静岡県三島市加茂18番地の7',
      'TEL 055-976-5300（9:00〜19:00／日曜・祝日定休）',
    ].join('\n'),
  });

  return { ok: true };
}
