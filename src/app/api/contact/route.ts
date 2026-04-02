import { NextResponse } from 'next/server';

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  category: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();

    // Server-side validation
    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: 'お名前は必須です' },
        { status: 400 },
      );
    }

    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: '正しいメールアドレスを入力してください' },
        { status: 400 },
      );
    }

    if (!body.category) {
      return NextResponse.json(
        { error: 'お問い合わせ種別は必須です' },
        { status: 400 },
      );
    }

    if (!body.message?.trim()) {
      return NextResponse.json(
        { error: 'お問い合わせ内容は必須です' },
        { status: 400 },
      );
    }

    // Log the submission (email sending can be added later)
    console.log('=== Contact Form Submission ===');
    console.log('Name:', body.name);
    console.log('Email:', body.email);
    console.log('Phone:', body.phone || '(未入力)');
    console.log('Category:', body.category);
    console.log('Message:', body.message);
    console.log('Timestamp:', new Date().toISOString());
    console.log('===============================');

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'リクエストの処理に失敗しました' },
      { status: 500 },
    );
  }
}
