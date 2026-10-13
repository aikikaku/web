import Image from 'next/image';
import { CustomerVoice } from '@/types/microcms';

interface CardVoiceProps {
  voice: CustomerVoice;
}

export default function CardVoice({ voice }: CardVoiceProps) {
  return (
    <div className="bg-cream rounded-3xl pt-12 pb-14 px-[3.625rem] w-[40.25rem] overflow-hidden">
      {/* Quote mark */}
      <div className="relative w-8 h-6 mb-4">
        <Image
          src="/images/mock/quote-mark.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Content excerpt (見出しなし。タイトルは本文の1行目 / Figma Handoff 20260724 card-voice) */}
      <p className="font-gothic font-medium text-body-m text-black line-clamp-3 mb-0">
        {voice.title && (
          <>
            {voice.title}
            <br />
          </>
        )}
        {voice.content.replace(/<[^>]*>/g, '')}
      </p>

      {/* Name + Location/Type (Figma 4470:14108 card-voice Name: 地名・種別・名前は opacity-60、区切り「｜」は不透過) */}
      <div className="mt-12 flex gap-3 items-center font-gothic font-medium text-[1rem] text-dark-green">
        <div className="flex items-center">
          {voice.location && <span className="leading-[2] opacity-60">{voice.location}</span>}
          {voice.location && voice.propertyType && (
            <span className="leading-[1.4] mx-0">｜</span>
          )}
          {voice.propertyType && <span className="leading-[2] opacity-60">{voice.propertyType}</span>}
        </div>
        <span className="leading-[2] opacity-60">{voice.customerName}</span>
      </div>
    </div>
  );
}
