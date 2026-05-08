import FaqAccordion from '@/components/ui/FaqAccordion';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
  title?: string;
}

/**
 * よくある質問セクション (Figma 4211:11894 SP / 該当 PC).
 *
 * /for-customer + /for-owner 等の複数ページで共通使用するため componentize。
 *
 * - PC: 左 410px 見出し + 右側 アコーディオン (justify-between)
 * - SP: 縦積み、heading 24px / accordion question 14px gothic
 */
export default function FaqSection({ items, title = 'よくある質問' }: Props) {
  return (
    <section className="bg-cream py-[60px] tablet:py-[96px]">
      <div className="px-4 tablet:px-[75px] max-w-[1440px] mx-auto">
        <div className="flex flex-col tablet:flex-row tablet:justify-between gap-8 tablet:gap-[60px] items-start">
          <div className="tablet:w-[410px] shrink-0">
            <h2
              className="font-mincho text-[24px] tablet:text-[32px] leading-[1.5] tracking-[0.96px] tablet:tracking-[1.28px] text-dark-green"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              {title}
            </h2>
          </div>
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
