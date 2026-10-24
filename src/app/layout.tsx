import type { Metadata } from 'next';
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/ui/navigation/Navigation';
import Footer from '@/components/ui/footer/Footer';
import { Analytics } from '@vercel/analytics/next';
import MotionProvider from '@/components/common/MotionProvider';
import { SITE_URL } from '@/lib/site';

const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-shippori-mincho',
  display: 'swap',
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-zen-kaku',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'アイ企画 | 静岡県三島市の不動産情報',
    template: '%s | アイ企画',
  },
  description:
    '静岡県三島市を中心に、不動産の売買・賃貸情報をお届けします。物件探しから暮らしの情報まで、アイ企画にお任せください。',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'アイ企画',
    title: 'アイ企画 | 静岡県三島市の不動産情報',
    description:
      '静岡県三島市を中心に、不動産の売買・賃貸情報をお届けします。物件探しから暮らしの情報まで、アイ企画にお任せください。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'アイ企画 | 静岡県三島市の不動産情報',
    description:
      '静岡県三島市を中心に、不動産の売買・賃貸情報をお届けします。物件探しから暮らしの情報まで、アイ企画にお任せください。',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // motion-ready は下の inline script がクライアントで付けるため、html の class 差分の警告を抑止
    <html lang="ja" className={`${shipporiMincho.variable} ${zenKaku.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        {/* 表示演出（MotionProvider）の準備。main の描画前に html.motion-ready を付け、対象を最初から隠しておく
            （後から隠すと一瞬表示されてちらつく）。reduced-motion では付けない。
            MotionProvider が 4 秒以内に動かなければ外して、中身が見えなくなる事故を防ぐ */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('motion-ready');setTimeout(function(){if(!window.__motionReady)d.classList.remove('motion-ready')},4000)}catch(e){}})()",
          }}
        />
        {/* JS 無効時はフェードイン (#74) を無効化して確実に表示する */}
        <noscript>
          {/* eslint-disable-next-line react/no-danger */}
          <style dangerouslySetInnerHTML={{ __html: '.reveal{opacity:1!important;transform:none!important}' }} />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '有限会社アイ企画',
              url: SITE_URL,
              logo: `${SITE_URL}/icon.svg`,
              description:
                '静岡県三島市を中心に、不動産の売買・賃貸情報をお届けします。',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '加茂18番地の7',
                addressLocality: '三島市',
                addressRegion: '静岡県',
                addressCountry: 'JP',
              },
              telephone: '055-976-5300',
              faxNumber: '055-976-5301',
              foundingDate: '1986-12',
              areaServed: {
                '@type': 'Place',
                name: '静岡県三島市',
              },
            }),
          }}
        />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <MotionProvider />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
