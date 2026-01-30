import { getCustomerVoices } from '@/lib/microcms/queries';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await getCustomerVoices().catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 50 }));

  return NextResponse.json(data);
}
