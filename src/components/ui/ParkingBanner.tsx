import Link from 'next/link';

/**
 * 駐車場バナー（PC・SP 兼用）。Figma 4211:10353 (PC) / 4211:10741 (SP) に準拠。
 * - PC: section py-[96px] px-[45px]、Card max-w-[646px] h-[180px] pt-24 pb-32 px-30、サブ→タイトル順
 * - SP: section pb-[60px] px-4、Card pt-36 pb-40 px-16、タイトル→サブ順
 */
export default function ParkingBanner() {
  return (
    <section className="pb-[60px] tablet:py-[96px]">
      <div className="px-4 tablet:px-[45px] tablet:flex tablet:justify-center">
        <Link
          href="/for-customer"
          className="block bg-light-green rounded-2xl tablet:rounded-[24px] pt-9 pb-10 px-4 tablet:pt-6 tablet:pb-8 tablet:px-[30px] tablet:max-w-[646px] tablet:w-[646px] w-full group"
        >
          <div className="flex items-center justify-between gap-6 tablet:gap-4">
            <div className="flex flex-col gap-2 min-w-0">
              {/* SP: タイトル先 */}
              <p
                className="tablet:hidden font-mincho text-[24px] leading-[1.6] tracking-[0.96px] text-dark-green"
                style={{ fontFeatureSettings: "'palt' 1" }}
              >
                三島市で駐車場を<br />お探しの方へ
              </p>
              <p className="tablet:hidden font-gothic font-medium text-[16px] leading-[2] text-dark-green">駐車場を借りたい</p>

              {/* PC: サブ先 */}
              <p className="hidden tablet:block font-gothic font-medium text-[16px] leading-[2] text-dark-green">駐車場を借りたい</p>
              <p
                className="hidden tablet:block font-mincho text-[32px] leading-[1.5] tracking-[1.28px] text-dark-green whitespace-nowrap"
                style={{ fontFeatureSettings: "'palt' 1" }}
              >
                三島市で駐車場をお探しの方へ
              </p>
            </div>
            <span className="bg-accent-blue w-11 h-11 tablet:w-12 tablet:h-12 rounded-full inline-flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
