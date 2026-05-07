import Image from 'next/image';
import Link from 'next/link';

/**
 * 「不動産をお探しの方へ / お持ちの方へ」CTA セクション。
 * /, /about, /message, /staff-interview, /for-customer 等で共有。
 *
 * Figma 4211:10153 / 4211:11110 / 4211:11395 等。
 *
 * 背景は home /service と同じ空写真。Figma の
 * `background: url(...) lightgray -263.466px -6.76px / 205.327% 353.941% no-repeat`
 * を CSS background-image で完全再現する。
 */
export default function ServiceCTA({
  customerImage = '/images/about/service-customer.jpg',
  ownerImage = '/images/about/service-owner.jpg',
}: {
  customerImage?: string;
  ownerImage?: string;
}) {
  return (
    <section className="relative py-[60px] tablet:py-[96px] overflow-hidden bg-[#d9d9d9]">
      {/* SP 背景: 空のみが見える専用画像 / cover 中央 */}
      <div
        aria-hidden
        className="tablet:hidden absolute inset-0 bg-[#d9d9d9] pointer-events-none select-none"
        style={{
          backgroundImage: "url('/images/home/service-bg-sp.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 50%',
          backgroundSize: 'cover',
        }}
      />
      {/* PC 背景: Figma の `-263.466px -6.76px / 205.327% 353.941% no-repeat` を完全転記 */}
      <div
        aria-hidden
        className="hidden tablet:block absolute inset-0 bg-[#d9d9d9] pointer-events-none select-none"
        style={{
          backgroundImage: "url('/images/home/service-bg.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '-263.466px -6.76px',
          backgroundSize: '205.327% 353.941%',
        }}
      />
      <div className="relative px-4 tablet:px-[45px] max-w-[1440px] mx-auto">
        {/* SP: 縦積みカード (背景画像 + ダーク gradient overlay) */}
        <div className="flex flex-col gap-6 tablet:hidden">
          <Link
            href="/for-customer"
            className="group relative flex items-center gap-6 rounded-2xl overflow-hidden px-4 pt-9 pb-10"
          >
            <div className="absolute inset-0 -z-0">
              <Image
                src={customerImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 992px) 100vw, 0px"
              />
              <div
                className="absolute inset-0"
                style={{ backgroundImage: 'linear-gradient(-28deg, rgba(39,51,59,0.2) 1.5%, rgba(39,51,59,0.5) 39.7%)' }}
              />
            </div>
            <div className="relative z-10 flex-1 min-w-0 flex flex-col gap-2 text-white">
              <h3 className="font-mincho text-[24px] leading-[1.6] tracking-[0.96px]" style={{ fontFeatureSettings: "'palt' 1" }}>
                不動産を<br />お探しの方
              </h3>
              <p className="text-body-m font-gothic font-medium leading-[2]">買いたい・借りたい</p>
            </div>
            <span className="relative z-10 inline-flex items-center justify-center size-11 rounded-full bg-accent-blue shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>

          <Link
            href="/for-owner"
            className="group relative flex items-center gap-6 rounded-2xl overflow-hidden px-4 pt-9 pb-10"
          >
            <div className="absolute inset-0 -z-0">
              <Image
                src={ownerImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 992px) 100vw, 0px"
              />
              <div
                className="absolute inset-0"
                style={{ backgroundImage: 'linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)' }}
              />
            </div>
            <div className="relative z-10 flex-1 min-w-0 flex flex-col gap-2 text-white">
              <h3 className="font-mincho text-[24px] leading-[1.6] tracking-[0.96px]" style={{ fontFeatureSettings: "'palt' 1" }}>
                不動産を<br />お持ちの方へ
              </h3>
              <p className="text-body-m font-gothic font-medium leading-[2]">売りたい・貸したい</p>
            </div>
            <span className="relative z-10 inline-flex items-center justify-center size-11 rounded-full bg-accent-blue shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>

        {/* PC: 横並び 2 カード (cream bg + 右に画像) */}
        <div className="hidden tablet:flex flex-row items-center justify-between gap-6">
          <Link
            href="/for-customer"
            className="group bg-cream rounded-3xl p-[30px] flex flex-row gap-[30px] items-start w-[646px] hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="flex flex-col justify-between flex-1 min-w-0 h-[220px] pt-2 px-3">
              <div className="flex flex-col gap-2">
                <h3 className="font-mincho text-[32px] leading-[1.5] tracking-[1.28px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                  不動産を<br />お探しの方へ
                </h3>
                <p className="text-[18px] leading-[1.8] font-gothic font-medium text-dark-green">買いたい・借りたい</p>
              </div>
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="w-[294px] h-[220px] relative rounded-xl overflow-hidden shrink-0">
              <Image
                src={customerImage}
                alt="不動産をお探しの方へ"
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="294px"
              />
            </div>
          </Link>

          <Link
            href="/for-owner"
            className="group bg-cream rounded-3xl p-[30px] flex flex-row gap-[30px] items-start w-[646px] hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="flex flex-col justify-between flex-1 min-w-0 h-[220px] pt-2 px-3">
              <div className="flex flex-col gap-2">
                <h3 className="font-mincho text-[32px] leading-[1.5] tracking-[1.28px] text-dark-green" style={{ fontFeatureSettings: "'palt' 1" }}>
                  不動産を<br />お持ちの方へ
                </h3>
                <p className="text-[18px] leading-[1.8] font-gothic font-medium text-dark-green">売りたい・貸したい</p>
              </div>
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="w-[294px] h-[220px] relative rounded-xl overflow-hidden shrink-0">
              <Image
                src={ownerImage}
                alt="不動産をお持ちの方へ"
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="294px"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
