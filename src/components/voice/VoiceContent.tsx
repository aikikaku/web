'use client';

import { useEffect, useRef, useState } from 'react';
import { CustomerVoice } from '@/types/microcms';

const categories = [
  { key: 'all', label: 'すべて' },
  { key: 'inherited', label: '不動産を継承した方' },
  { key: 'found', label: '不動産を見つけた方' },
  { key: 'other', label: 'その他' },
] as const;

type CategoryKey = (typeof categories)[number]['key'];

function getCategoryKey(voice: CustomerVoice): Exclude<CategoryKey, 'all'> {
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
            {new Date(voice.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
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

/**
 * /voice ページのコンテンツ。Figma 4211:11517 準拠。
 *
 * - カテゴリ別に voice を group 分けし、各 group を section (id="voice-cat-{key}") としてレンダリング
 * - 左サイドバーは sticky で、スクロール位置に応じて active カテゴリを更新
 * - サイドバー click で該当 section へ smooth scroll
 *
 * 「すべて」は最上部の主見出し用 anchor。下にスクロールすると個別カテゴリ section に切り替わる。
 */
export default function VoiceContent({ voices }: { voices: CustomerVoice[] }) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  // カテゴリ別に分類
  const grouped: Record<Exclude<CategoryKey, 'all'>, CustomerVoice[]> = {
    inherited: [],
    found: [],
    other: [],
  };
  for (const v of voices) {
    grouped[getCategoryKey(v)].push(v);
  }

  // スクロール位置から active カテゴリを更新
  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.3;
      let current: CategoryKey = 'all';
      for (const cat of categories) {
        const el = document.getElementById(`voice-cat-${cat.key}`);
        if (el && el.offsetTop <= scrollY) {
          current = cat.key;
        }
      }
      setActiveCategory(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const handleClick = (key: CategoryKey) => {
    const el = document.getElementById(`voice-cat-${key}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col tablet:flex-row gap-8 tablet:justify-between">
      {/* カテゴリナビ - PC: 左サイドバー (sticky), SP: 上部ピル */}
      <div className="shrink-0">
        {/* SP: ピルボタン (現状維持) */}
        <div className="flex flex-wrap gap-2 tablet:hidden">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleClick(cat.key)}
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

        {/* PC: サイドバー (sticky, scroll 連動) */}
        <div className="hidden tablet:block tablet:w-[323px]">
          <div className="bg-light-green rounded-[32px] px-[30px] py-[45px] sticky top-24">
            <nav className="flex flex-col gap-6">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => handleClick(cat.key)}
                    className={`flex items-center gap-3 text-left cursor-pointer transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    <div
                      className={`w-[10px] h-[10px] rounded-full shrink-0 transition-colors ${
                        isActive ? 'bg-dark-green' : 'bg-dark-green/40'
                      }`}
                    />
                    <span className="font-gothic font-medium text-[16px] leading-[1.5] text-dark-green">
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* ボイスリスト (カテゴリ別 section) */}
      <div className="w-full tablet:flex-1 tablet:max-w-[704px]">
        {/* 最上部 anchor (= 「すべて」). このスクロール領域に入っている間 = active="all" */}
        <div id="voice-cat-all" />

        {(['inherited', 'found', 'other'] as const).map((key) => {
          const cat = categories.find((c) => c.key === key)!;
          const list = grouped[key];
          if (list.length === 0) return null;
          return (
            <section key={key} id={`voice-cat-${key}`} className="pt-8 first:pt-0">
              <h2 className="font-mincho text-[20px] tablet:text-[24px] leading-[1.5] tracking-[0.04em] text-dark-green mb-4 tablet:mb-6">
                {cat.label}
              </h2>
              {list.map((voice, index) => (
                <VoiceItem key={voice.id} voice={voice} defaultOpen={index === 0 && key === 'inherited'} />
              ))}
            </section>
          );
        })}

        {voices.length === 0 && (
          <p className="font-gothic text-[16px] text-dark-green/60 py-12">
            まだお客様の声はありません
          </p>
        )}
      </div>
    </div>
  );
}
