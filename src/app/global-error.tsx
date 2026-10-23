'use client';

/**
 * レイアウト自体が落ちたときの最終手段の画面。globals.css もフォントも読み込めない前提で、
 * 素の HTML とインラインのスタイルだけで組む。
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, background: '#FCFFF7', color: '#2A363B', fontFamily: 'sans-serif' }}>
        <main style={{ maxWidth: 560, margin: '0 auto', padding: '96px 16px', textAlign: 'center', lineHeight: 1.8 }}>
          <h1 style={{ fontSize: 24, fontWeight: 500, margin: '0 0 16px' }}>ページを表示できませんでした</h1>
          <p style={{ margin: '0 0 32px' }}>一時的な不具合の可能性があります。時間をおいて、もう一度お試しください。</p>
          <p style={{ display: 'flex', gap: 24, justifyContent: 'center', margin: 0 }}>
            <button type="button" onClick={reset} style={{ font: 'inherit', color: 'inherit', background: 'none', border: 0, textDecoration: 'underline', cursor: 'pointer' }}>
              もう一度読み込む
            </button>
            <a href="/" style={{ color: 'inherit' }}>トップページへ戻る</a>
          </p>
        </main>
      </body>
    </html>
  );
}
