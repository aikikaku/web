import Image from 'next/image';
import Link from 'next/link';
import ArrowButton from '@/components/ui/ArrowButton';

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
}

/**
 * お問い合わせ CTA バナー (Figma 4211:11813/11873).
 *
 * /for-customer + /for-owner 共通。dark gradient overlay 上に caption + 大見出し +
 * 2 つの CTA カード。SP では full-width で縦積み。
 */
export default function ContactCtaBanner({ bgImage, heading, caption = 'お問い合わせ', ctas }: Props) {
  return (
    <section className="px-4 tablet:px-[2.8125rem] pt-[3.75rem] pb-[7.5rem] tablet:pt-0 tablet:pb-[7.5rem]">
      <div className="relative overflow-hidden rounded-3xl max-w-[84.375rem] mx-auto">
        <div className="relative px-6 tablet:px-[1.875rem] py-12 tablet:py-[6rem]">
          <Image src={bgImage} alt="" fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(218deg, rgb(var(--overlay-dark) / 0.1) 26.6%, rgb(var(--overlay-dark) / 0.25) 72.5%)',
            }}
          />
          <div className="relative z-10 flex flex-col tablet:flex-row items-stretch tablet:items-center justify-between gap-8 tablet:gap-[1.875rem]">
            <div className="text-white">
              <p className="font-gothic font-medium text-body-s tablet:text-body-l mb-2">
                {caption}
              </p>
              <h2
                className="text-white font-mincho text-[1.75rem] tablet:text-[2rem] leading-[1.5] tracking-[0.07rem] tablet:tracking-[0.08rem]"
                style={{ fontFeatureSettings: "'palt' 1" }}
              >
                {heading}
              </h2>
            </div>
            <div className="flex flex-col tablet:flex-row gap-3 w-full tablet:w-auto">
              {ctas.map((cta, i) => (
                <Link
                  key={i}
                  href={cta.href}
                  className="group bg-cream/[0.96] rounded-2xl tablet:rounded-3xl h-12 tablet:h-auto px-6 tablet:px-[1.875rem] tablet:pt-[2.5rem] tablet:pb-[1.875rem] flex tablet:flex-col items-center justify-center tablet:gap-[1.875rem] w-full tablet:w-[16.5rem]"
                >
                  <span className="font-gothic font-medium text-[0.875rem] tablet:text-[1.25rem] leading-none tablet:leading-[1.6] text-dark-green text-center">
                    {cta.label}
                  </span>
                  <span className="hidden tablet:block shrink-0">
                    <ArrowButton />
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
