'use client';

import { useState, useRef, useEffect } from 'react';

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
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, item.answer]);

  return (
    <div className="border-b border-dark-green/20 py-4 tablet:py-6 flex flex-col gap-4 tablet:gap-6">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-start justify-between w-full pr-2 text-left cursor-pointer hover:opacity-70 transition-opacity gap-3"
      >
        <p className="font-gothic font-medium text-[14px] tablet:text-[16px] leading-[1.8] tablet:leading-[2] text-black">
          {item.question}
        </p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={`shrink-0 mt-0.5 transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" stroke="#2a363b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        <div className="bg-light-green rounded-2xl px-5 py-5 tablet:px-[30px] tablet:py-[32px]">
          <p className="font-gothic font-medium text-[14px] tablet:text-[16px] leading-[1.8] tablet:leading-[2] text-black whitespace-pre-line">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
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
    <div className="w-full tablet:w-[792px] tablet:flex-1">
      {items.map((item, i) => (
        <FaqItemRow
          key={i}
          item={item}
          isOpen={openIndices.has(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
