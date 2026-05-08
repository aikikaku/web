'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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

// 暫定: microCMS の image フィールドを設定するまでの間、デモ用に id 指定で写真付きを再現する。
// 本番運用では voice.image (microCMS image field) が入った時点でこの map は削除する。
const demoVoiceImages: Record<string, { url: string; width: number; height: number }> = {
  'voice-2': { url: '/images/voice/letter-1.png', width: 1058, height: 1496 },
};

function VoiceItem({
  voice,
  defaultOpen = false,
}: {
  voice: CustomerVoice;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);
  const image = voice.image ?? demoVoiceImages[voice.id];

  useEffect(() => {
    if (!contentRef.current) return;
    setMaxHeight(open ? contentRef.current.scrollHeight : 0);
  }, [open, voice.content, image]);

  // Figma 4211:11537: 質問アコーディオン (FaqAccordion) と同パターン
  // border-b + py-6 + smooth max-h transition (duration-500 ease-in-out)
  return (
    <div className="border-b border-dark-green/20 py-6 flex flex-col gap-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between pr-2 text-left cursor-pointer hover:opacity-70 transition-opacity gap-3"
      >
        <div className="flex-1 min-w-0">
          <p className="font-gothic font-medium text-[16px] leading-[2] text-black">
            {voice.title || voice.customerName}
          </p>
          <p className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green/60">
            {voice.customerName}
            {voice.location && `　${voice.location}`}
            {voice.propertyType && ` / ${voice.propertyType}`}
          </p>
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={`shrink-0 mt-0.5 transition-transform duration-500 ease-in-out ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" stroke="#2a363b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        <div className="bg-light-green rounded-2xl px-5 py-8 tablet:px-[30px] tablet:py-8 flex flex-col gap-12">
          <div
            className="font-gothic font-medium text-[16px] leading-[2] text-black whitespace-pre-line voice-rich"
            dangerouslySetInnerHTML={{ __html: voice.content }}
          />
          {image && (
            <div className="relative w-full aspect-[260/368] overflow-hidden rounded-2xl">
              <Image
                src={image.url}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 992px) 704px, 100vw"
              />
            </div>
          )}
        </div>
      </div>
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
      {/* SP: floating 検索バー (Figma 4211:12143/12157) — 別コンポーネント MobileVoiceFilter で実装 */}
      <MobileVoiceFilter activeKey={activeCategory} onSelect={handleClick} />

      {/* PC: 左サイドバー (sticky, scroll 連動).
          sticky の containing block を「PC では tablet:w-[323px]」「flex row stretch で tall」にすると、
          sticky 要素が containing block の height 内に room を持って top-24 で stick する */}
      <aside className="hidden tablet:block tablet:w-[323px] shrink-0">
        <div className="sticky top-24 bg-light-green rounded-[32px] px-[30px] py-[45px]">
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
      </aside>

      {/* ボイスリスト (カテゴリ別 section).
          data-voice-filter-start: SP floating 絞り込みバーをここから表示開始
          data-voice-filter-end: ここで非表示に戻る */}
      <div className="w-full tablet:flex-1 tablet:max-w-[704px]" data-voice-filter-start>
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
        {/* SP 絞り込みバーをここで非表示に戻す sentinel */}
        <div data-voice-filter-end />
      </div>
    </div>
  );
}

/**
 * SP 用の floating カテゴリ絞り込みボタン + モーダル。
 * Figma 4211:12143 (closed) / 4211:12157 (open) 準拠。
 *
 * - bottom-4 中央に「絞り込む + filter icon」のピル
 * - クリックで全画面モーダル表示 → カテゴリ radio リスト + 「絞り込み」ボタン + ×
 * - 「絞り込み」 = 選択カテゴリへ smooth scroll、× = キャンセル
 */
function MobileVoiceFilter({
  activeKey,
  onSelect,
}: {
  activeKey: CategoryKey;
  onSelect: (key: CategoryKey) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [draftKey, setDraftKey] = useState<CategoryKey>(activeKey);

  // /properties や /staff-interview と同じパターン:
  // [data-voice-filter-start] が viewport に入ってから [data-voice-filter-end] を抜けるまでの間だけ floating bar を表示
  useEffect(() => {
    const start = document.querySelector('[data-voice-filter-start]');
    const end = document.querySelector('[data-voice-filter-end]');
    if (!start) return;

    const checkVisibility = () => {
      const startRect = start.getBoundingClientRect();
      const isPastStart = startRect.top < window.innerHeight * 0.8;
      let isBeforeEnd = true;
      if (end) {
        const endRect = end.getBoundingClientRect();
        isBeforeEnd = endRect.top > window.innerHeight * 0.5;
      }
      setShowBar(isPastStart && isBeforeEnd);
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  const open = () => {
    setDraftKey(activeKey);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };
  const apply = () => {
    onSelect(draftKey);
    close();
  };

  return (
    <div className="tablet:hidden">
      {/* Closed: 中央寄せピル (Figma 4211:12143 358×56) — voice list 範囲内のみ表示 */}
      <button
        type="button"
        onClick={open}
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 inline-flex items-center bg-cream border border-dark-green/20 rounded-full pl-10 pr-5 py-2 shadow-[0_-1px_4px_rgba(0,0,0,0.1)] w-[342px] h-14 transition-opacity duration-300 ${showBar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="カテゴリを絞り込む"
      >
        <span className="flex-1 text-center font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
          絞り込む
        </span>
        <span className="size-5 inline-flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 10h14" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 15h14" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="5" r="1.5" fill="#fcfff7" stroke="#2a363b" strokeWidth="1.5" />
            <circle cx="13" cy="10" r="1.5" fill="#fcfff7" stroke="#2a363b" strokeWidth="1.5" />
            <circle cx="9" cy="15" r="1.5" fill="#fcfff7" stroke="#2a363b" strokeWidth="1.5" />
          </svg>
        </span>
      </button>

      {/* Open: 全画面モーダル (Figma 4211:12157) */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={close} />
          <div className="absolute inset-0 flex items-center justify-center px-6 py-12">
            <div className="flex flex-col items-end gap-2 w-full max-w-[342px]">
              {/* close (×) right-top */}
              <button
                type="button"
                onClick={close}
                className="size-11 rounded-full bg-dark-green flex items-center justify-center shrink-0"
                aria-label="閉じる"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* main panel */}
              <div className="bg-cream rounded-3xl shadow-[0_0_8px_rgba(0,0,0,0.16)] w-full px-6 py-8 flex flex-col gap-8">
                {/* category radio list */}
                <ul className="flex flex-col gap-1">
                  {categories.map((cat) => {
                    const isActive = draftKey === cat.key;
                    return (
                      <li key={cat.key}>
                        <button
                          type="button"
                          onClick={() => setDraftKey(cat.key)}
                          className="flex items-center gap-3 h-10 w-full text-left"
                        >
                          <span
                            className={`size-[10px] rounded-full shrink-0 transition-colors ${
                              isActive ? 'bg-dark-green' : 'bg-dark-green/40'
                            }`}
                          />
                          <span className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green">
                            {cat.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* action: 絞り込み + × clear */}
                <div className="flex gap-2 h-10 shrink-0">
                  <button
                    type="button"
                    onClick={apply}
                    className="flex-1 h-full bg-dark-green text-white rounded-lg font-gothic font-medium text-[14px] leading-none"
                  >
                    絞り込み
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="w-[61px] h-full border border-dark-green rounded-lg flex items-center justify-center shrink-0"
                    aria-label="キャンセル"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9" stroke="#2a363b" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
