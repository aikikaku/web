'use client';

import { useState } from 'react';
import { useAccordionHeight } from '@/lib/useAccordionHeight';
import AccordionChevron from './AccordionChevron';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

interface FaqItemRowProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItemRow({ item, isOpen, onToggle }: FaqItemRowProps) {
  const { contentRef, maxHeight } = useAccordionHeight(isOpen, [item.answer]);

  return (
    // Figma Question (PC 4715:18839) / Question-sp (SP 4671:15725):
    // 上下 24・質問と回答の間 24。区切り線 PC rgba(42,54,59,.2) / SP light-green (SP は最終行のみ線なし)
    // 質問と回答の間 24 は回答側 (開閉する領域) の pt に持たせる。flex gap だと閉じた行にも 24 が残るため
    <div className="border-b border-light-green last:border-b-0 tablet:border-dark-green/20 tablet:last:border-b py-6">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-start tablet:items-center justify-between w-full pl-2 tablet:pl-0 tablet:pr-2 text-left cursor-pointer hover:opacity-70 transition-opacity gap-3"
      >
        {/* 質問: SP 16px dark-green / PC 16px black */}
        <p className="font-gothic font-medium text-body-m text-dark-green tablet:text-black">
          {item.question}
        </p>
        <AccordionChevron isOpen={isOpen} className="mt-0.5" />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        <div className="pt-6">
          {/* Item-open: SP px29 py32 r12 / PC px30 py32 r16。本文 SP dark-green / PC black */}
          <div className="bg-[rgba(225,237,225,0.5)] paper-texture paper-texture-light rounded-xl tablet:rounded-2xl px-[1.8125rem] tablet:px-[1.875rem] py-8">
            <p className="font-gothic font-medium text-body-m text-dark-green tablet:text-black whitespace-pre-line">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  // 常に 1 つだけ開く（別の項目を開くと他は閉じる）。初期は先頭を開く
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full tablet:w-[49.5rem] tablet:flex-1">
      {items.map((item, i) => (
        <FaqItemRow
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
