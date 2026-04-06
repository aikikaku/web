'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="flex-1 tablet:w-[792px]">
      {items.map((item, i) => {
        const isOpen = openIndices.has(i);
        return (
          <div key={i} className="border-b border-dark-green/20">
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex items-center justify-between w-full py-6 pr-2 text-left cursor-pointer"
            >
              <p className="font-gothic font-medium text-[16px] leading-[2] text-black">
                {item.question}
              </p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={`shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" stroke="#2a363b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isOpen && (
              <div className="pb-6">
                <div className="bg-cream rounded-2xl p-6 tablet:p-[30px]">
                  <p className="font-gothic font-medium text-[16px] leading-[2] text-dark-green whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
