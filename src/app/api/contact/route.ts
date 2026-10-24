import { NextResponse } from 'next/server';
import { isBot, parseInquiry } from '@/lib/contact/inquiry';
import { deliverInquiry, type InquiryProperty } from '@/lib/contact/deliver';
import { getProperty } from '@/lib/microcms/queries';
import { SITE_URL } from '@/lib/site';

/** 物件名はブラウザから受け取らず、ID から microCMS で引き直す（書き換えられた物件名がメールに載らないように） */
async function findProperty(id: string): Promise<InquiryProperty | null> {
  if (!id) return null;
  const property = await getProperty(id).catch(() => null);
  return property ? { title: property.title, url: `${SITE_URL}/properties/${property.id}` } : null;
}

export async function POST(request: Request) {
  const raw: unknown = await request.json().catch(() => null);

  // 機械による送信には、成功したように見せて何もしない
  if (isBot(raw)) return NextResponse.json({ ok: true });

  const parsed = parseInquiry(raw);
  if (!parsed.ok) return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 400 });

  const property = await findProperty(parsed.inquiry.propertyId);
  const result = await deliverInquiry(parsed.inquiry, property);
  if (!result.ok) return NextResponse.json({ ok: false }, { status: 502 });

  return NextResponse.json({ ok: true });
}
