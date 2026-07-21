import Link from 'next/link';
import Arrow from '@/components/ui/interactive/Arrow';

/**
 * 駐車場バナー（PC・SP 兼用）。Figma 4211:10353 (PC) / 4211:10741 (SP) に準拠。
 * - PC: section py-[6rem] px-[2.8125rem]、Card max-w-[40.375rem] h-[11.25rem] pt-24 pb-32 px-30、サブ→タイトル順
 * - SP: section pb-[3.75rem] px-4、Card pt-36 pb-40 px-16、タイトル→サブ順
 */
export default function ParkingBanner() {
  return (
    <section className="pb-[3.75rem] tablet:py-[6rem]">
      <div className="px-4 tablet:px-[2.8125rem] tablet:flex tablet:justify-center">
        <Link
          href="/for-customer"
          className="block bg-light-green rounded-2xl tablet:rounded-[1.5rem] pt-9 pb-10 px-4 tablet:p-[1.875rem] tablet:h-[11.25rem] tablet:flex tablet:flex-col tablet:justify-center tablet:max-w-[40.375rem] tablet:w-[40.375rem] w-full group"
        >
          <div className="flex items-center tablet:items-end justify-between gap-6 tablet:gap-4">
            <div className="flex flex-col gap-2 min-w-0">
              {/* SP: タイトル先 */}
              <p
                className="tablet:hidden font-mincho text-heading-24 text-dark-green"
                style={{ fontFeatureSettings: "'palt' 1" }}
              >
                三島市で駐車場を<br />お探しの方へ
              </p>
              <p className="tablet:hidden font-gothic font-medium text-body-m text-dark-green">駐車場を借りたい</p>

              {/* PC: サブ先 */}
              <p className="hidden tablet:block font-gothic font-medium text-body-m text-dark-green">駐車場を借りたい</p>
              <p
                className="hidden tablet:block font-mincho text-heading-32 text-dark-green whitespace-nowrap"
                style={{ fontFeatureSettings: "'palt' 1" }}
              >
                三島市で駐車場をお探しの方へ
              </p>
            </div>
            <Arrow sizeClassName="w-11 h-11 tablet:w-12 tablet:h-12" />
          </div>
        </Link>
      </div>
    </section>
  );
}
