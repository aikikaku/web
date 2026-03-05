'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CustomerVoice } from '@/types/microcms';

const categories = [
  { value: 'all', label: 'すべて' },
  { value: 'inherited', label: '不動産を継承した方' },
  { value: 'found', label: '不動産を見つけた方' },
  { value: 'other', label: 'その他' },
] as const;

function VoiceItem({
  voice,
  defaultOpen = false,
}: {
  voice: CustomerVoice;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-dark-green/20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between pr-2 py-6 text-left"
      >
        <div className="flex-1 min-w-0">
          <p className="font-gothic font-medium text-[16px] leading-[2] text-black">
            {voice.title}
          </p>
          <p className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green/60">
            {voice.customerName}
          </p>
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 ml-4 text-dark-green transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="bg-light-green rounded-2xl px-[30px] py-8 mb-6">
          <div
            className="font-gothic font-medium text-[16px] leading-[2] text-black whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: voice.content }}
          />
          {voice.image && (
            <div className="mt-12 aspect-[260/368] relative w-full">
              <Image
                src={voice.image.url}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function VoiceContent({
  voices,
}: {
  voices: CustomerVoice[];
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredVoices =
    selectedCategory === 'all'
      ? voices
      : voices.filter((v) => v.category === selectedCategory);

  return (
    <div className="flex items-start justify-between gap-16">
      {/* Left sidebar filter */}
      <div className="hidden tablet:block w-[323px] shrink-0">
        <div className="bg-light-green rounded-[32px] px-[30px] py-[45px]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center w-full h-[40px] rounded-[5px] overflow-hidden ${
                  !isActive ? 'opacity-50' : ''
                }`}
              >
                <div className="w-[40px] h-full flex items-center justify-center shrink-0">
                  <span
                    className={`w-[10px] h-[10px] rounded-full border-2 border-dark-green ${
                      isActive ? 'bg-dark-green' : ''
                    }`}
                  />
                </div>
                <span className="font-gothic font-medium text-[16px] leading-[1.5] text-dark-green text-left">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile filter */}
      <div className="tablet:hidden w-full mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full bg-light-green rounded-2xl px-6 py-4 font-gothic font-medium text-[16px] text-dark-green border-none"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Right content - accordion */}
      <div className="flex-1 max-w-[704px]">
        {filteredVoices.length > 0 ? (
          filteredVoices.map((voice, index) => (
            <VoiceItem
              key={voice.id}
              voice={voice}
              defaultOpen={index === 0}
            />
          ))
        ) : (
          <p className="font-gothic text-[16px] text-dark-green/60 py-12">
            該当するお客様の声はありません
          </p>
        )}
      </div>
    </div>
  );
}
