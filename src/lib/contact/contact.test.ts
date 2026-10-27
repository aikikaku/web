import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isBot, parseInquiry } from './inquiry';
import { deliverInquiry } from './deliver';

const valid = {
  category: 'sell',
  name: ' 山田 太郎 ',
  email: 'yamada@example.jp',
  phone: '090-1234-5678',
  message: '実家の売却を相談したいです',
  propertyId: '',
  consent: true,
  website: '',
};

describe('parseInquiry', () => {
  it('前後の空白を落として受け付ける', () => {
    expect(parseInquiry(valid)).toEqual({
      ok: true,
      inquiry: {
        category: 'sell',
        name: '山田 太郎',
        email: 'yamada@example.jp',
        phone: '090-1234-5678',
        message: '実家の売却を相談したいです',
        propertyId: '',
      },
    });
  });

  it('足りない項目をすべて返す', () => {
    expect(parseInquiry({ ...valid, category: 'hack', name: '', email: 'yamada', phone: 'abc', message: ' ', consent: false })).toEqual({
      ok: false,
      errors: {
        category: 'お問い合わせの種類を選んでください',
        name: 'お名前を入力してください',
        email: 'メールアドレスの形式が正しくありません',
        phone: '電話番号は数字とハイフンで入力してください',
        message: 'お問い合わせ内容を入力してください',
        consent: 'プライバシーポリシーへの同意が必要です',
      },
    });
  });

  it('JSON でないものは全項目エラー', () => {
    expect(parseInquiry(null).ok).toBe(false);
  });

  it('見えない入力欄が埋まっていたら機械とみなす', () => {
    expect(isBot({ ...valid, website: 'http://spam' })).toBe(true);
    expect(isBot(valid)).toBe(false);
  });
});

describe('deliverInquiry', () => {
  const inquiry = { category: 'property' as const, name: '山田 太郎', email: 'yamada@example.jp', phone: '', message: '内見したいです', propertyId: 'abc' };
  const property = { title: '加茂の平屋', url: 'https://www.aikikaku.net/properties/abc' };
  const page = 'https://www.aikikaku.net/contact?property=abc';
  let calls: { url: string; body: Record<string, unknown> }[];

  function stubFetch(status: Record<string, number>) {
    calls = [];
    vi.stubGlobal('fetch', async (url: string, init: RequestInit) => {
      calls.push({ url, body: JSON.parse(init.body as string) });
      const host = new URL(url).host;
      return new Response('{}', { status: status[host] ?? 200 });
    });
  }

  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('RESEND_API_KEY', 're_test');
    vi.stubEnv('CONTACT_FROM', 'アイ企画 <noreply@aikikaku.net>');
    vi.stubEnv('CONTACT_TO', 'info@aikikaku.net, staff@aikikaku.net');
    vi.stubEnv('CODA_API_TOKEN', 'coda_test');
    vi.stubEnv('CODA_DOC_ID', 'doc1');
    vi.stubEnv('CODA_TABLE_ID', '問い合わせ');
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('CRM に記録し、社内に通知し、お客様に自動返信する', async () => {
    stubFetch({});
    expect(await deliverInquiry(inquiry, property, page)).toEqual({ ok: true });

    expect(calls.map((c) => c.url)).toEqual([
      'https://coda.io/apis/v1/docs/doc1/tables/%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B/rows',
      'https://api.resend.com/emails',
      'https://api.resend.com/emails',
    ]);
    expect(calls[0].body).toEqual({
      rows: [
        {
          cells: [
            { column: '問い合わせ元フォーム', value: '物件お問い合わせ' },
            { column: 'お名前', value: '山田 太郎' },
            { column: 'メールアドレス', value: 'yamada@example.jp' },
            { column: 'お問い合わせ物件', value: '加茂の平屋' },
            { column: 'お問い合わせ内容', value: '内見したいです' },
            { column: '送信元ページURL', value: 'https://www.aikikaku.net/contact?property=abc' },
            { column: 'プライバシーポリシー同意', value: true },
            { column: '対応状況', value: '未対応' },
          ],
        },
      ],
    });
    expect(calls[1].body).toMatchObject({
      to: ['info@aikikaku.net', 'staff@aikikaku.net'],
      reply_to: 'yamada@example.jp',
      subject: '【HP問い合わせ】掲載中の物件について｜山田 太郎様',
    });
    expect(calls[1].body.text).toContain('CRM（Superhuman Docs）に記録しました。');
    expect(calls[2].body).toMatchObject({ to: ['yamada@example.jp'], reply_to: 'info@aikikaku.net' });
  });

  it('CRM に書けなくても受け付け、通知メールにそのことを書く', async () => {
    stubFetch({ 'coda.io': 500 });
    expect(await deliverInquiry(inquiry, property, page)).toEqual({ ok: true });
    expect(calls[1].body.text).toContain('CRM（Superhuman Docs）への記録に失敗しました');
  });

  it('社内への通知が届かなければ失敗にし、自動返信も送らない', async () => {
    stubFetch({ 'api.resend.com': 500 });
    expect(await deliverInquiry(inquiry, property, page)).toEqual({ ok: false, reason: 'notify_failed' });
    expect(calls).toHaveLength(2);
  });

  it('本番でメールの設定がなければ失敗にする', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    stubFetch({});
    expect(await deliverInquiry(inquiry, property, page)).toEqual({ ok: false, reason: 'not_configured' });
    expect(calls).toHaveLength(0);
  });
});
