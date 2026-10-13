import FaqAccordion from '@/components/ui/content/FaqAccordion';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
  title?: string;
  /**
   * セクション上下余白。ページ内の位置で Figma の値が異なるため呼び出し側で指定する。
   * - /for-customer (PC 4470:15587 pt96 pb144 / SP 4470:16046 pt60 pb120)
   * - /for-owner    (PC 4470:15643 py96 / SP 4470:16117 py60) = 既定値
   */
  sectionPaddingClassName?: string;
}

/**
 * よくある質問セクション (Figma 4211:11894 SP / 該当 PC).
 *
 * /for-customer + /for-owner 等の複数ページで共通使用するため componentize。
 *
 * - PC: 左 410px 見出し + 右側 アコーディオン (justify-between)
 * - SP: 縦積み、heading 24px / accordion question 14px gothic
 */
export default function FaqSection({
  items,
  title = 'よくある質問',
  sectionPaddingClassName = 'py-[3.75rem] tablet:py-[6rem]',
}: Props) {
  return (
    <section className={`bg-cream ${sectionPaddingClassName}`}>
      <div className="px-4 tablet:px-[4.6875rem] max-w-[90rem] mx-auto">
        <div className="flex flex-col tablet:flex-row tablet:justify-between gap-8 tablet:gap-[3.75rem] items-start">
          <div className="tablet:w-[25.625rem] shrink-0">
            <h2
              className="font-mincho text-[1.5rem] tablet:text-[2rem] leading-[1.5] tracking-[0.06rem] tablet:tracking-[0.08rem] text-dark-green"
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
