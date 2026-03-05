import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'アイ企画 | 静岡県三島市の不動産情報';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2a363b',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#ffffff',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '2px solid #ffffff',
              padding: '4px 6px',
              fontSize: '18px',
              lineHeight: '1.2',
              fontFamily: 'sans-serif',
            }}
          >
            <span>有限</span>
            <span>会社</span>
          </div>
          <span
            style={{
              fontSize: '48px',
              fontFamily: 'sans-serif',
              fontWeight: 700,
              letterSpacing: '4px',
            }}
          >
            アイ企画
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
