import Link from 'next/link';
import Image from 'next/image';
import CardContact from '@/components/ui/card/CardContact';

/**
 * お問い合わせバナー（PC・SP 兼用）。Figma 4211:10744 (SP) に準拠。
 * SP: pt-[2rem] pb-[3.75rem] px-[1rem] rounded-[1rem]、テキスト + 縦積みピル ボタン2つ。
 * PC: 既存の横並びレイアウト維持。
 */
export default function ContactBanner() {
  return (
    <section className="px-4 tablet:px-12 pb-[3.75rem] tablet:pb-24">
      {/* SP */}
      <div className="tablet:hidden relative rounded-2xl overflow-hidden pt-8 pb-[3.75rem] px-4 min-h-[26.5625rem] flex flex-col justify-between">
        <div className="absolute inset-0">
          <Image src="/images/home/cta-banner.jpg" alt="" fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(-46deg, rgb(var(--overlay-dark) / 0.1) 0%, rgb(var(--overlay-dark) / 0.25) 87%)' }}
          />
        </div>
        <div className="relative z-10 flex flex-col gap-2 text-white">
          <p className="font-gothic font-medium text-body-s">お問い合わせ</p>
          <p
            className="font-mincho text-heading-24"
            style={{ fontFeatureSettings: "'palt' 1" }}
          >
            不動産に関すること、<br />
            ぜひご相談ください。
          </p>
        </div>
        <div className="relative z-10 flex flex-col gap-4 items-center">
          <Link
            href="/for-customer"
            className="flex items-center justify-center w-full max-w-[20.375rem] h-12 rounded-full bg-cream/95 border border-cream shadow-[0_0_16px_rgba(0,0,0,0.16)] font-gothic font-medium text-[1rem] leading-none text-dark-green hover:opacity-70 transition-opacity"
          >
            不動産をお探しの方
          </Link>
          <Link
            href="/for-owner"
            className="flex items-center justify-center w-full max-w-[20.375rem] h-12 rounded-full bg-cream/95 border border-cream shadow-[0_0_16px_rgba(0,0,0,0.16)] font-gothic font-medium text-[1rem] leading-none text-dark-green hover:opacity-70 transition-opacity"
          >
            不動産をお持ちの方
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center w-full max-w-[20.375rem] h-12 rounded-full bg-cream/95 border border-cream shadow-[0_0_16px_rgba(0,0,0,0.16)] font-gothic font-medium text-[1rem] leading-none text-dark-green hover:opacity-70 transition-opacity"
          >
            その他のお問い合わせ
          </Link>
        </div>
      </div>

      {/* PC（既存レイアウト維持） */}
      <div className="hidden tablet:block relative rounded-3xl overflow-hidden px-[1.875rem] py-[6rem]">
        <div className="absolute inset-0">
          <Image src="/images/home/cta-banner.jpg" alt="" fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(218deg, rgb(var(--overlay-dark) / 0.1) 26.6%, rgb(var(--overlay-dark) / 0.25) 72.5%)' }}
          />
        </div>
        <div className="relative z-10 flex gap-[1.875rem] items-start">
          <div className="text-white shrink-0">
            <p className="text-body-m font-gothic font-medium mb-2">お問い合わせ</p>
            <p
              className="font-mincho text-heading-32 whitespace-nowrap"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              不動産に関すること、<br />
              ぜひご相談ください。
            </p>
          </div>
          <div className="flex-1 flex gap-3 justify-end">
            <CardContact href="/for-customer" label="不動産をお探しの方" />
            <CardContact href="/for-owner" label="不動産をお持ちの方" display="hidden desktop:flex" />
            <CardContact href="/contact" label="その他のお問い合わせ" />
          </div>
        </div>
      </div>
    </section>
  );
}
