import Link from 'next/link';
import Image from 'next/image';

/**
 * お問い合わせバナー（PC・SP 兼用）。Figma 4211:10744 (SP) に準拠。
 * SP: pt-[32px] pb-[60px] px-[16px] rounded-[16px]、テキスト + 縦積みピル ボタン2つ。
 * PC: 既存の横並びレイアウト維持。
 */
export default function ContactBanner() {
  return (
    <section className="px-4 tablet:px-12 pb-[60px] tablet:pb-24">
      {/* SP */}
      <div className="tablet:hidden relative rounded-2xl overflow-hidden pt-8 pb-[60px] px-4 min-h-[425px] flex flex-col justify-between">
        <div className="absolute inset-0">
          <Image src="/images/home/cta-banner.jpg" alt="" fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(-46deg, rgba(39,51,59,0.1) 0%, rgba(39,51,59,0.25) 87%)' }}
          />
        </div>
        <div className="relative z-10 flex flex-col gap-2 text-white">
          <p className="font-gothic font-medium text-[14px] leading-[1.8]">お問い合わせ</p>
          <p
            className="font-mincho text-[24px] leading-[1.6] tracking-[0.96px]"
            style={{ fontFeatureSettings: "'palt' 1" }}
          >
            不動産に関すること、<br />
            ぜひご相談ください。
          </p>
        </div>
        <div className="relative z-10 flex flex-col gap-4 items-center">
          <Link
            href="/for-customer"
            className="flex items-center justify-center w-full max-w-[326px] h-12 rounded-full bg-cream/95 border border-cream shadow-[0_0_16px_rgba(0,0,0,0.16)] font-gothic font-medium text-[16px] leading-none text-dark-green hover:opacity-70 transition-opacity"
          >
            不動産をお探しの方
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center w-full max-w-[326px] h-12 rounded-full bg-cream/95 border border-cream shadow-[0_0_16px_rgba(0,0,0,0.16)] font-gothic font-medium text-[16px] leading-none text-dark-green hover:opacity-70 transition-opacity"
          >
            その他のお問い合わせ
          </Link>
        </div>
      </div>

      {/* PC（既存レイアウト維持） */}
      <div className="hidden tablet:block relative rounded-3xl overflow-hidden px-[30px] py-[96px]">
        <div className="absolute inset-0">
          <Image src="/images/home/cta-banner.jpg" alt="" fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(218deg, rgba(39,51,59,0.1) 26.6%, rgba(39,51,59,0.25) 72.5%)' }}
          />
        </div>
        <div className="relative z-10 flex gap-[30px] items-start">
          <div className="text-white shrink-0">
            <p className="text-body-m font-gothic font-medium leading-[2] mb-2">お問い合わせ</p>
            <p
              className="font-mincho text-[32px] leading-[1.5] tracking-[1.28px] whitespace-nowrap"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              不動産に関すること、<br />
              ぜひご相談ください。
            </p>
          </div>
          <div className="flex-1 flex gap-3 justify-end">
            <Link
              href="/for-customer"
              className="bg-cream/95 rounded-3xl px-[30px] pt-10 pb-[30px] text-center w-[264px] flex flex-col items-center gap-[30px] hover:opacity-70 transition-opacity"
            >
              <span className="font-gothic font-medium text-[20px] leading-[1.6] text-dark-green">
                不動産をお探しの方
              </span>
              <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
            <Link
              href="/contact"
              className="bg-cream/95 rounded-3xl px-[30px] pt-10 pb-[30px] text-center w-[264px] flex flex-col items-center gap-[30px] hover:opacity-70 transition-opacity"
            >
              <span className="font-gothic font-medium text-[20px] leading-[1.6] text-dark-green">
                その他のお問い合わせ
              </span>
              <span className="bg-accent-blue w-12 h-12 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
