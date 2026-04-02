import type { Metadata } from 'next';
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp'),
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
    <html lang="ja" className={`${shipporiMincho.variable} ${zenKaku.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '有限会社アイ企画',
              url: process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp',
              logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp'}/icon.svg`,
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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
