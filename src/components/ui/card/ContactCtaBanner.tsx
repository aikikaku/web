import Image from 'next/image';
import Link from 'next/link';
import Arrow from '@/components/ui/interactive/Arrow';

interface CtaItem {
  label: string;
  href: string;
}

interface Props {
  /** バナー背景画像 */
  bgImage: string;
  /** ヘディング (改行は <br /> で 2 行可) */
  heading: React.ReactNode;
  /** 上の小ラベル ("お問い合わせ" 等) */
  caption?: string;
  /** CTA 2 つ */
  ctas: [CtaItem, CtaItem];
  /**
   * セクション外側の上下余白。ページ内の位置で Figma の値が異なるため呼び出し側で指定する。
   * - /for-customer (Figma PC 4470:15576 pb96 / SP 4470:16028 pt60 pb120)
   * - /for-owner    (Figma PC 4470:15647 pb144 / SP 4470:16121 pt0 pb120。ページ最下部)
   */
  sectionPaddingClassName?: string;
}

/**
 * お問い合わせ CTA バナー (Figma banner-contact 4470:15577 / banner-contact-sp 4470:16029).
 *
 * /for-customer + /for-owner 共通。dark gradient overlay 上に caption + 大見出し +
 * 2 つの CTA カード。SP では高さ 425 の中で見出し(上)とボタン(下)を振り分け、ボタンは全幅ピル型。
 */
export default function ContactCtaBanner({
  bgImage,
  heading,
  caption = 'お問い合わせ',
  ctas,
  sectionPaddingClassName = 'pt-[3.75rem] pb-[7.5rem] tablet:pt-0 tablet:pb-24',
}: Props) {
  return (
    <section className={`px-4 tablet:px-[2.8125rem] ${sectionPaddingClassName}`}>
      <div className="relative overflow-hidden rounded-2xl tablet:rounded-3xl max-w-[84.375rem] mx-auto">
        {/* PC: pl60 / pr30 / py96。SP: px16 / pt32 / pb60、h-425 */}
        <div className="relative flex flex-col h-[26.5625rem] tablet:h-auto px-4 pt-8 pb-[3.75rem] tablet:pl-[3.75rem] tablet:pr-[1.875rem] tablet:py-[6rem]">
          <Image src={bgImage} alt="" fill className="object-cover" />
          {/* Figma banner-contact: 写真に Paper 40% */}
          <div aria-hidden className="paper-overlay" />
          {/* PC gradient (4470:15577) */}
          <div
            className="absolute inset-0 hidden tablet:block"
            style={{
              backgroundImage:
                'linear-gradient(216deg, rgb(var(--overlay-dark) / 0.1) 26.6%, rgb(var(--overlay-dark) / 0.25) 72.5%)',
            }}
          />
          {/* SP gradient (4470:16029) */}
          <div
            className="absolute inset-0 tablet:hidden"
            style={{
              backgroundImage:
                'linear-gradient(-46.16deg, rgb(var(--overlay-dark) / 0.1) 0%, rgb(var(--overlay-dark) / 0.25) 86.8%)',
            }}
          />
          <div className="relative z-10 flex flex-1 flex-col tablet:flex-row items-stretch tablet:items-start justify-between gap-8 tablet:gap-[1.875rem]">
            <div className="text-white">
              <p className="font-gothic font-medium text-body-s tablet:text-body-m mb-2">
                {caption}
              </p>
              <h2
                className="text-white font-mincho text-heading-24 tablet:text-[2rem] tablet:leading-[1.5] tablet:tracking-[0.08rem]"
                style={{ fontFeatureSettings: "'palt' 1" }}
              >
                {heading}
              </h2>
            </div>
            {/* SP: button-primary-sp (h48, rounded-full, cream 枠 + Shadow-Select) gap16 / PC: card-contact 264 幅 gap12 */}
            <div className="flex flex-col tablet:flex-row gap-4 tablet:gap-3 w-full tablet:w-auto">
              {ctas.map((cta, i) => (
                <Link
                  key={i}
                  href={cta.href}
                  className="group bg-cream/[0.96] rounded-full border border-cream shadow-[0px_0px_16px_0px_rgba(0,0,0,0.16)] tablet:rounded-3xl tablet:border-0 tablet:shadow-none h-12 tablet:h-auto px-6 tablet:px-[1.875rem] tablet:pt-[2.5rem] tablet:pb-[1.875rem] flex tablet:flex-col items-center justify-center tablet:gap-[1.875rem] w-full tablet:w-[16.5rem]"
                >
                  <span className="font-gothic font-medium text-[1rem] tablet:text-[1.25rem] leading-none tablet:leading-[1.6] text-dark-green text-center">
                    {cta.label}
                  </span>
                  <span className="hidden tablet:block shrink-0">
                    <Arrow />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
