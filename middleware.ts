import { NextRequest, NextResponse } from 'next/server';

/**
 * 公開前の Basic 認証ミドルウェア。
 *
 * - 環境変数 BASIC_AUTH_USER / BASIC_AUTH_PASSWORD が設定されている時のみ有効。
 *   未設定なら認証なし (本番公開後に環境変数を外せば全公開モードに戻せる)。
 * - 認証は HTTP Basic 認証 (Authorization: Basic base64(user:pass))。
 * - /_next/static, favicon, /robots.txt 等の公開アセットは除外。
 *
 * Vercel での使い方:
 *   BASIC_AUTH_USER=ai-kikaku
 *   BASIC_AUTH_PASSWORD=ai-kikaku
 */
export function middleware(req: NextRequest) {
  const user = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;

  // 環境変数未設定 → 認証スキップ
  if (!user || !password) {
    return NextResponse.next();
  }

  const auth = req.headers.get('authorization');
  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      // Edge Runtime では atob が使える
      const decoded = atob(encoded);
      const idx = decoded.indexOf(':');
      const u = decoded.slice(0, idx);
      const p = decoded.slice(idx + 1);
      if (u === user && p === password) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="ai-kikaku preview"',
    },
  });
}

// 静的アセット系・public 配下は認証対象から除外
export const config = {
  matcher: [
    // 全ページに適用しつつ、以下を除外:
    //   /_next/static, /_next/image, /favicon.ico, /images, /robots.txt, /sitemap.xml
    '/((?!_next/static|_next/image|favicon\\.ico|images|robots\\.txt|sitemap\\.xml).*)',
  ],
};
