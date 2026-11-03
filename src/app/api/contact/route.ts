import { NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { isBot, parseInquiry } from '@/lib/contact/inquiry';
import { deliverInquiry, type InquiryProperty } from '@/lib/contact/deliver';
import { getProperty } from '@/lib/microcms/queries';
import { SITE_URL } from '@/lib/site';

/** 物件名はブラウザから受け取らず、ID から microCMS で引き直す（書き換えられた物件名がメールに載らないように） */
async function findProperty(id: string): Promise<InquiryProperty | null> {
  if (!id) return null;
  const property = await getProperty(id).catch(() => null);
  return property ? { title: property.title, location: property.location ?? '', url: `${SITE_URL}/properties/${property.id}` } : null;
}

/** 送信したページの URL。自サイトのもの以外は記録しない */
function sourcePageUrl(request: Request): string {
  const referer = request.headers.get('referer');
  if (!referer) return '';
  try {
    return new URL(referer).host === new URL(request.url).host ? referer : '';
  } catch {
    return '';
  }
}

export async function POST(request: Request) {
  // Vercel BotID（基本の判定・無料）。ハニーポットをすり抜ける、人間のように振る舞う bot を止める。
  // 人を bot と誤判定した時に送れたと思わせないよう、成功のふりはせず 403 を返す（画面は「送信できませんでした」になり、電話を案内する）。
  // 判定自体が失敗した時（Vercel の外で動かした時や設定の不備）は、問い合わせを止めないよう受け付けてハニーポットだけで守る
  const verification = await checkBotId().catch((e: unknown) => {
    console.error('[contact] BotID check failed', e);
    return null;
  });
  if (verification?.isBot) return NextResponse.json({ ok: false }, { status: 403 });

  const raw: unknown = await request.json().catch(() => null);

  // 機械による送信には、成功したように見せて何もしない
  if (isBot(raw)) return NextResponse.json({ ok: true });

  const parsed = parseInquiry(raw);
  if (!parsed.ok) return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 400 });

  const property = await findProperty(parsed.inquiry.propertyId);
  if (parsed.inquiry.form.kind === 'property' && !property) {
    return NextResponse.json({ ok: false, errors: { property: 'お問い合わせの物件が見つかりません。物件のページからもう一度お試しください' } }, { status: 400 });
  }
  const result = await deliverInquiry(parsed.inquiry, property, sourcePageUrl(request));
  if (!result.ok) return NextResponse.json({ ok: false }, { status: 502 });

  return NextResponse.json({ ok: true });
}
