'use client';

import { useState } from 'react';
import { CustomerVoice } from '@/types/microcms';

const categories = [
  { key: 'all', label: 'すべて' },
  { key: 'inherited', label: '不動産を継承した方' },
  { key: 'found', label: '不動産を見つけた方' },
  { key: 'other', label: 'その他' },
];

function getCategoryKey(voice: CustomerVoice): string {
  const pt = voice.propertyType || '';
  if (pt.includes('相続') || pt.includes('売却')) return 'inherited';
  if (pt.includes('購入') || pt.includes('見つ')) return 'found';
  return 'other';
}

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
            {voice.customerName}　{voice.location} / {voice.propertyType}
          </p>
          <p className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green/60">
            {voice.date}
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
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredVoices =
    activeCategory === 'all'
      ? voices
      : voices.filter((v) => getCategoryKey(v) === activeCategory);

  return (
    <div className="flex flex-col tablet:flex-row gap-8 tablet:gap-16">
      {/* カテゴリフィルター - PC: 左サイドバー, SP: 上部ピル */}
      <div className="shrink-0">
        {/* SP: ピルボタン */}
        <div className="flex flex-wrap gap-2 tablet:hidden">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full font-gothic font-medium text-[14px] leading-none transition-colors ${
                activeCategory === cat.key
                  ? 'bg-dark-green text-white'
                  : 'bg-light-green text-dark-green'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* PC: サイドバーリスト */}
        <nav className="hidden tablet:block tablet:w-[200px]">
          <ul className="flex flex-col gap-1">
            {categories.map((cat) => (
              <li key={cat.key}>
                <button
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-3 w-full text-left py-2 font-gothic font-medium text-[14px] leading-[1.8] transition-colors ${
                    activeCategory === cat.key
                      ? 'text-dark-green'
                      : 'text-dark-green/50'
                  }`}
                >
                  <span
                    className={`w-[8px] h-[8px] rounded-full shrink-0 ${
                      activeCategory === cat.key
                        ? 'bg-dark-green'
                        : 'bg-dark-green/30'
                    }`}
                  />
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ボイスリスト */}
      <div className="w-full tablet:flex-1 tablet:max-w-[704px]">
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
