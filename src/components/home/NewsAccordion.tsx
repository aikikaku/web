'use client';

import { useState, useRef, useEffect } from 'react';

const mockNews = [
  {
    title: '夏季休業のお知らせ',
    date: '2025.08.01',
    content: `平素は格別のご愛顧くださり心より御礼申し上げます。
さて、本年の夏季休業についてお知らせ申し上げます。

誠に勝手ながら下記日程の期間中はお休みさせていただくこととなりました。
お手数をおかけいたしますが何卒宜しくお願い致します。

夏季休業期間
令和7年8月9日（土）〜8月17日（日）

※前日までにご予約いただけましたら、休業期間中も営業可能です。お電話又はお問い合わせページよりご予約ください。

※令和7年8月18日（月）より平常どおり営業いたします。`,
    link: { label: 'テキストリンク', href: '#' },
  },
  {
    title: 'ゴールデンウィークのお知らせ',
    date: '2025.04.22',
    content: '',
  },
  {
    title: 'スタッフ募集のお知らせ',
    date: '2025.03.27',
    content: '',
  },
];

interface AccordionItemProps {
  item: typeof mockNews[0];
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, item.content]);

  return (
    <div className="border-b border-dark-green/20">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full py-6 pr-2 text-left cursor-pointer hover:opacity-70 transition-opacity"
      >
        <div>
          <p className="font-gothic font-medium text-[16px] leading-[2] text-black">
            {item.title}
          </p>
          <p className="font-gothic font-medium text-[14px] leading-[1.8] text-dark-green opacity-60">
            {item.date}
          </p>
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={`shrink-0 transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" stroke="#2a363b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        {item.content && (
          <div className="pb-6">
            <div className="bg-light-green rounded-2xl pt-[30px] pb-8 px-6 tablet:px-[30px]">
              <p className="font-gothic font-medium text-[16px] leading-[2] text-black whitespace-pre-line">
                {item.content}
              </p>
              {item.link && (
                <a
                  href={item.link.href}
                  className="inline-flex items-center gap-1 font-gothic font-medium text-[14px] leading-none text-dark-green mt-12 hover:opacity-70 transition-opacity"
                >
                  {item.link.label}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NewsAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex-1 tablet:w-[792px]">
      {mockNews.map((item, i) => (
        <AccordionItem
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
