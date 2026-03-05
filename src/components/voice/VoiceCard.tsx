import Image from 'next/image';
import { CustomerVoice } from '@/types/microcms';

interface VoiceCardProps {
  voice: CustomerVoice;
}

export default function VoiceCard({ voice }: VoiceCardProps) {
  return (
    <div className="bg-cream rounded-3xl pt-12 pb-14 px-[58px] w-[644px] overflow-hidden">
      {/* Quote mark */}
      <div className="relative w-8 h-6 mb-4">
        <Image
          src="/images/mock/quote-mark.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h3
        className="font-mincho text-[32px] leading-[1.5] tracking-[0.04em] text-dark-green mb-4"
        style={{ fontFeatureSettings: "'palt' 1" }}
      >
        {voice.title}
      </h3>

      {/* Content excerpt */}
      <p className="font-gothic font-medium text-[16px] leading-[2] text-black line-clamp-3 mb-0">
        {voice.content.replace(/<[^>]*>/g, '')}
      </p>

      {/* Name + Location/Type */}
      <div className="mt-12 flex gap-3 items-center font-gothic font-medium text-[16px] text-dark-green">
        <div className="flex items-center opacity-60">
          {voice.location && <span className="leading-[2]">{voice.location}</span>}
          {voice.location && voice.propertyType && (
            <span className="leading-[1.4] mx-0">｜</span>
          )}
          {voice.propertyType && <span className="leading-[2]">{voice.propertyType}</span>}
        </div>
        <span className="leading-[2] opacity-60">{voice.customerName}</span>
      </div>
    </div>
  );
}
