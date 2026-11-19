import { withBotId } from 'botid/next/config';
import { withSentryConfig } from '@sentry/nextjs/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ヒーロー画像 (12MB+ jpg) を Next/Image dev で 3840 まで再生成すると遅延が発生し
    // 表示されない問題が出ていたため、上限を 1920 に。1600px 縮小済みアセットと整合。
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Next.js 16 から、ここにない画質は使われない（近い値に丸められる）。写真の一部は quality={90} で出している
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

// BotID（問い合わせフォームの bot 判定）が使う通信の経路を足す
const config = withBotId(nextConfig);

// Sentry（エラーの記録）を使うときだけ、ビルドに Sentry の処理を足す（設定が無い間は今までと同じビルド）。
// SENTRY_AUTH_TOKEN・SENTRY_ORG・SENTRY_PROJECT があれば、エラーの発生箇所を元のコードの行で読めるようソースマップを送る
export default process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(config, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: !process.env.CI,
      telemetry: false,
    })
  : config;
