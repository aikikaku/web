import Image from 'next/image';
import Link from 'next/link';

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
    <section className="px-4 tablet:px-[45px] py-[60px] tablet:py-0 tablet:pb-24">
      <div className="relative overflow-hidden rounded-3xl max-w-[1350px] mx-auto">
        <div className="relative px-6 tablet:px-[30px] py-12 tablet:py-[96px]">
          <Image src={bgImage} alt="" fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(218deg, rgba(39, 51, 59, 0.1) 26.6%, rgba(39, 51, 59, 0.25) 72.5%)',
            }}
          />
          <div className="relative z-10 flex flex-col tablet:flex-row items-stretch tablet:items-center justify-between gap-8 tablet:gap-[30px]">
            <div className="text-white">
              <p className="font-gothic font-medium text-[14px] tablet:text-[18px] leading-[1.8] mb-2">
                {caption}
              </p>
              <h2
                className="text-white font-mincho text-[28px] tablet:text-[32px] leading-[1.5] tracking-[1.12px] tablet:tracking-[1.28px]"
                style={{ fontFeatureSettings: "'palt' 1" }}
              >
                {heading}
              </h2>
            </div>
            <div className="flex flex-col tablet:flex-row gap-3">
              {ctas.map((cta, i) => (
                <Link
                  key={i}
                  href={cta.href}
                  className="bg-cream/[0.96] rounded-3xl px-[30px] py-6 tablet:pt-[40px] tablet:pb-[30px] flex flex-row tablet:flex-col items-center justify-between tablet:gap-[30px] w-full tablet:w-[264px] hover:opacity-70 transition-opacity"
                >
                  <span className="font-gothic font-medium text-[16px] tablet:text-[20px] leading-[1.6] text-dark-green text-left tablet:text-center">
                    {cta.label}
                  </span>
                  <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
