import { getCustomerVoices } from '@/lib/microcms/queries';
import VoiceContent from '@/components/voice/VoiceContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お客様の声',
  description: 'アイ企画をご利用いただいたお客様からの声をご紹介します。',
};

export const revalidate = 3600;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-kikaku.co.jp';

export default async function VoicePage() {
  const data = await getCustomerVoices().catch(() => ({
    contents: [],
    totalCount: 0,
    offset: 0,
    limit: 50,
  }));

  return (
    <div className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'ホーム', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'お客様の声' },
            ],
          }),
        }}
      />

      {/* Section heading + Voice list (Figma SP 4211:11177: pt-60 / gap-60 / pb-120) */}
      <section className="px-4 tablet:px-[75px] pt-[60px] tablet:pt-24 pb-[120px] tablet:pb-36 max-w-[1440px] mx-auto flex flex-col gap-[60px] tablet:gap-24">
        <div className="max-w-[1290px] flex flex-col gap-4 tablet:gap-8">
          <h1 className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[0.04em] text-dark-green text-left">
            お客様の声
          </h1>
          <p className="font-gothic font-medium text-[16px] leading-[1.5] tablet:leading-[1.6] text-dark-green">
            アイ企画をご利用いただいた皆さまから、うれしいお言葉をいただいています。
          </p>
        </div>
        <VoiceContent voices={data.contents} />
      </section>
    </div>
  );
}
