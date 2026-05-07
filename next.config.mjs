/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ヒーロー画像 (12MB+ jpg) を Next/Image dev で 3840 まで再生成すると遅延が発生し
    // 表示されない問題が出ていたため、上限を 1920 に。1600px 縮小済みアセットと整合。
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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

export default nextConfig;
