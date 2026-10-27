import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isBot, parseInquiry } from './inquiry';
import { deliverInquiry } from './deliver';

const person = { name: ' 山田 太郎 ', kana: 'ヤマダ タロウ', phone: '090-1234-5678', email: 'yamada@example.jp' };

describe('parseInquiry', () => {
  it('前後の空白を落とし、空欄の項目は含めない', () => {
    const result = parseInquiry({
      kind: 'general',
      values: { ...person, subject: '  ', message: '駐車場を借りたいです', contactMethod: '電話' },
      propertyId: '',
      consent: true,
      website: '',
    });
    expect(result.ok && result.inquiry.values).toEqual({
      name: '山田 太郎',
      kana: 'ヤマダ タロウ',
      phone: '090-1234-5678',
      email: 'yamada@example.jp',
      message: '駐車場を借りたいです',
      contactMethod: '電話',
    });
  });

  it('足りない項目と形式の誤りをすべて返す', () => {
    expect(
      parseInquiry({ kind: 'buy', values: { name: '山田', email: 'yamada', phone: 'abc', contactMethod: 'FAX' }, consent: false }),
    ).toEqual({
      ok: false,
      errors: {
        kana: 'フリガナを入力してください',
        phone: '電話番号は数字とハイフンで入力してください',
        email: 'メールアドレスの形式が正しくありません',
        requests: 'お問い合わせ内容を選んでください',
        message: '詳細を入力してください',
        contactMethod: '希望連絡方法を選び直してください',
        consent: 'プライバシーポリシーへの同意が必要です',
      },
    });
  });

  it('複数選択は、そのフォームの選択肢にないものを落とす', () => {
    const result = parseInquiry({
      kind: 'sell',
      values: { ...person, address: '三島市加茂', propertyLocation: '三島市加茂', requests: ['訪問査定', 'オンライン相談がしたい'] },
      consent: true,
    });
    expect(result.ok && result.inquiry.values.requests).toEqual(['訪問査定']);
  });

  it('物件お問い合わせは物件 ID がないと受け付けない', () => {
    const result = parseInquiry({ kind: 'property', values: { ...person, requests: ['実際に物件を見たい'], message: '内見したい' }, consent: true });
    expect(result).toEqual({ ok: false, errors: { property: 'お問い合わせの物件が見つかりません。物件のページからもう一度お試しください' } });
  });

  it('種類がわからなければ受け付けない', () => {
    expect(parseInquiry(null)).toEqual({ ok: false, errors: { kind: 'お問い合わせの種類を選んでください' } });
  });

  it('見えない入力欄が埋まっていたら機械とみなす', () => {
    expect(isBot({ website: 'http://spam' })).toBe(true);
    expect(isBot({ website: '' })).toBe(false);
  });
});

describe('deliverInquiry', () => {
  const parsed = parseInquiry({
    kind: 'property',
    values: { ...person, requests: ['実際に物件を見たい', '周辺環境を知りたい'], message: '内見したいです', buyTiming: '3ヶ月以内' },
    propertyId: 'abc',
    consent: true,
  });
  if (!parsed.ok) throw new Error('fixture');
  const inquiry = parsed.inquiry;
  const property = { title: '加茂の平屋', location: '三島市加茂18-7', url: 'https://www.aikikaku.net/properties/abc' };
  const page = 'https://www.aikikaku.net/contact?property=abc';
  const tableLink = 'https://coda.io/d/_diKDbkvhAl-/_subCVJdv#_tuXgtV2Z';
  let calls: { method: string; url: string; body: Record<string, unknown> | null }[];

  function stubFetch(status: Record<string, number>) {
    calls = [];
    vi.stubGlobal('fetch', async (url: string, init: RequestInit = {}) => {
      const method = init.method ?? 'GET';
      calls.push({ method, url, body: init.body ? JSON.parse(init.body as string) : null });
      const res = status[new URL(url).host] ?? 200;
      return new Response(JSON.stringify(method === 'GET' ? { browserLink: tableLink } : {}), { status: res });
    });
  }
  const posts = () => calls.filter((c) => c.method === 'POST');

  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('RESEND_API_KEY', 're_test');
    vi.stubEnv('CONTACT_FROM', 'アイ企画 <noreply@aikikaku.net>');
    vi.stubEnv('CONTACT_TO', 'info@aikikaku.net, staff@aikikaku.net');
    vi.stubEnv('CODA_API_TOKEN', 'coda_test');
    vi.stubEnv('CODA_DOC_ID', 'doc1');
    vi.stubEnv('CODA_TABLE_ID', 'grid-1');
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('CRM の表の列に合わせて記録し、社内に通知し、お客様に自動返信する', async () => {
    stubFetch({});
    expect(await deliverInquiry(inquiry, property, page)).toEqual({ ok: true });

    expect(posts().map((c) => c.url)).toEqual([
      'https://coda.io/apis/v1/docs/doc1/tables/grid-1/rows',
      'https://api.resend.com/emails',
      'https://api.resend.com/emails',
    ]);
    expect(posts()[0].body).toEqual({
      rows: [
        {
          cells: [
            { column: '問い合わせ元フォーム', value: '物件お問い合わせ' },
            { column: 'お名前', value: '山田 太郎' },
            { column: 'フリガナ', value: 'ヤマダ タロウ' },
            { column: '電話番号', value: '090-1234-5678' },
            { column: 'メールアドレス', value: 'yamada@example.jp' },
            { column: 'お問い合わせ種別', value: ['実際に物件を見たい', '周辺環境を知りたい'] },
            { column: 'お問い合わせ内容', value: '内見したいです' },
            { column: '購入希望時期', value: '3ヶ月以内' },
            { column: 'お問い合わせ物件', value: '三島市加茂18-7（加茂の平屋）' },
            { column: '送信元ページURL', value: page },
            { column: 'プライバシーポリシー同意', value: true },
            { column: '対応状況', value: '未対応' },
          ],
        },
      ],
    });
    expect(posts()[1].body).toMatchObject({
      to: ['info@aikikaku.net', 'staff@aikikaku.net'],
      reply_to: 'yamada@example.jp',
      subject: '【HP問い合わせ】物件お問い合わせ｜山田 太郎様',
    });
    expect(posts()[1].body!.text).toContain('お問い合わせ内容：実際に物件を見たい、周辺環境を知りたい');
    expect(posts()[1].body!.text).toContain(`「お問い合わせ」表に記録しました。\n${tableLink}`);
    expect(posts()[2].body).toMatchObject({ to: ['yamada@example.jp'], reply_to: 'info@aikikaku.net' });
  });

  it('CRM に書けなくても受け付け、通知メールにそのことを書く', async () => {
    stubFetch({ 'coda.io': 500 });
    expect(await deliverInquiry(inquiry, property, page)).toEqual({ ok: true });
    expect(posts()[1].body!.text).toContain('CRM（Superhuman Docs）への記録に失敗しました');
  });

  it('社内への通知が届かなければ失敗にし、自動返信も送らない', async () => {
    stubFetch({ 'api.resend.com': 500 });
    expect(await deliverInquiry(inquiry, property, page)).toEqual({ ok: false, reason: 'notify_failed' });
    expect(posts()).toHaveLength(2);
  });

  it('本番でメールの設定がなければ失敗にする', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    stubFetch({});
    expect(await deliverInquiry(inquiry, property, page)).toEqual({ ok: false, reason: 'not_configured' });
    expect(calls).toHaveLength(0);
  });
});
