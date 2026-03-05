import { getCustomerVoices } from '@/lib/microcms/queries';
import Breadcrumb from '@/components/ui/Breadcrumb';
import VoiceContent from '@/components/voice/VoiceContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お客様の声',
  description: 'アイ企画をご利用いただいたお客様からの声をご紹介します。',
};

export const revalidate = 3600;

export default async function VoicePage() {
  const data = await getCustomerVoices().catch(() => ({
    contents: [],
    totalCount: 0,
    offset: 0,
    limit: 50,
  }));

  return (
    <div className="bg-cream">
      <div className="page-container">
        <Breadcrumb items={[{ label: 'お客様の声' }]} />
      </div>

      {/* Section heading */}
      <section className="px-[75px] py-24 max-tablet:px-4">
        <div className="max-w-[1290px]">
          <h1 className="font-mincho text-[48px] leading-[1.5] tracking-[0.04em] text-dark-green text-left mb-8">
            お客様の声
          </h1>
          <p className="font-gothic font-medium text-[16px] leading-[1.6] text-dark-green">
            アイ企画をご利用いただいた皆さまから、うれしいお言葉をいただいています。
          </p>
        </div>
      </section>

      {/* Voice list */}
      <section className="px-[75px] pb-36 max-tablet:px-4">
        <VoiceContent voices={data.contents} />
      </section>
    </div>
  );
}
