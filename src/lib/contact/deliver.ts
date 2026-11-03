import { describeValues, type Inquiry } from './inquiry';

/**
 * お問い合わせを届ける（サーバー専用。API キーを使うのでブラウザ側から import しない）。順番は CRM への記録 → 社内への通知メール → お客様への自動返信。
 * - 社内への通知メールが届かなければ失敗として扱う（お客様に再送か電話をお願いする）。
 * - CRM の記録と自動返信は失敗しても受付は成立させる。CRM に書けなかったことは通知メールに書いて、手で補えるようにする。
 *
 * 必要な環境変数:
 *   RESEND_API_KEY        Resend の API キー
 *   CONTACT_FROM          送信元のアドレス。例: noreply@mail.aikikaku.net（Resend で認証済みのドメイン）。
 *                         「名前 <アドレス>」の形でもよいが、名前は使わず SENDER_NAMES の名前で送る
 *   CONTACT_TO            通知先。カンマ区切りで複数可
 *   CODA_API_TOKEN        Superhuman Docs（Coda）の API トークン。未設定なら CRM への記録はしない
 *   CODA_DOC_ID / CODA_TABLE_ID  書き込み先の Doc と表
 */

export interface InquiryProperty {
  title: string;
  /** 所在地 */
  location: string;
  url: string;
}

export type DeliveryResult = { ok: true } | { ok: false; reason: 'not_configured' | 'notify_failed' };

const TIMEOUT_MS = 8000;

/** 送信者名（アイ企画からの依頼）。お客様が受信箱で見分けやすい名前と、社内で HP からの問い合わせと分かる名前 */
const SENDER_NAMES = { customer: 'アイ企画', staff: 'アイ企画 HPお問い合わせ' };

/** 「名前 <アドレス>」からアドレスだけを取り出す */
function addressOf(from: string): string {
  return from.match(/<([^>]+)>/)?.[1]?.trim() ?? from.trim();
}

function sender(name: string, address: string): string {
  return `"${name}" <${address}>`;
}

function config() {
  const resend =
    process.env.RESEND_API_KEY && process.env.CONTACT_FROM && process.env.CONTACT_TO
      ? {
          apiKey: process.env.RESEND_API_KEY,
          from: addressOf(process.env.CONTACT_FROM),
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
    `種類：${inquiry.form.label}`,
    ...(property ? [`物件：${property.title}`, `　　　${property.url}`] : []),
    ...describeValues(inquiry).map(({ label, value }) => (value.includes('\n') ? `【${label}】\n${value}` : `${label}：${value}`)),
  ];
}

/** お客様のお名前・メールアドレス（どのフォームにもある必須項目） */
function customer(inquiry: Inquiry): { name: string; email: string } {
  return { name: String(inquiry.values.name), email: String(inquiry.values.email) };
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

type Crm = { token: string; docId: string; tableId: string };

function crmTableUrl(crm: Crm): string {
  return `https://coda.io/apis/v1/docs/${encodeURIComponent(crm.docId)}/tables/${encodeURIComponent(crm.tableId)}`;
}

/** 通知メールに載せる「お問い合わせ」表へのリンク。取れなければ空 */
async function crmTableLink(crm: Crm): Promise<string> {
  const res = await fetch(crmTableUrl(crm), {
    headers: { Authorization: `Bearer ${crm.token}` },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  }).catch(() => null);
  if (!res?.ok) return '';
  const table = (await res.json().catch(() => null)) as { browserLink?: string } | null;
  return table?.browserLink ?? '';
}

/** 列名は案件管理CRM の「お問い合わせ」表と同じ。受付日時は表の初期値 Now() に任せる */
async function recordToCrm(crm: Crm, inquiry: Inquiry, property: InquiryProperty | null, pageUrl: string): Promise<boolean> {
  const cells: { column: string; value: string | string[] | boolean }[] = [
    { column: '問い合わせ元フォーム', value: inquiry.form.source },
    ...inquiry.form.fields
      .filter((field) => inquiry.values[field.name] !== undefined)
      .map((field) => ({ column: field.column, value: inquiry.values[field.name] })),
    ...(property ? [{ column: 'お問い合わせ物件', value: property.location ? `${property.location}（${property.title}）` : property.title }] : []),
    ...(pageUrl ? [{ column: '送信元ページURL', value: pageUrl }] : []),
    { column: 'プライバシーポリシー同意', value: true },
    { column: '対応状況', value: '未対応' },
  ];
  const res = await fetch(`${crmTableUrl(crm)}/rows`, {
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

  const { name, email } = customer(inquiry);
  const [recorded, tableLink] = crm ? await Promise.all([recordToCrm(crm, inquiry, property, pageUrl), crmTableLink(crm)]) : [false, ''];
  const crmNote = !crm
    ? '※ CRM の設定がないため、CRM には記録していません。'
    : recorded
      ? `CRM（Superhuman Docs）の「お問い合わせ」表に記録しました。${tableLink ? `\n${tableLink}` : ''}`
      : '※ CRM（Superhuman Docs）への記録に失敗しました。お手数ですが手で追加してください。';

  const notified = await sendEmail(resend.apiKey, {
    from: sender(SENDER_NAMES.staff, resend.from),
    to: resend.to,
    replyTo: email,
    subject: `【HP問い合わせ】${inquiry.form.label}｜${name}様`,
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
    from: sender(SENDER_NAMES.customer, resend.from),
    to: [email],
    replyTo: resend.to[0],
    subject: '【アイ企画】お問い合わせを受け付けました',
    text: [
      `${name} 様`,
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
