import SearchProgress from '@/components/ui/SearchProgress';

export default function Loading() {
  return (
    <div className="bg-cream">
      <section className="pt-[60px] tablet:pt-24 pb-[120px] tablet:pb-0">
        <div className="max-w-[1440px] mx-auto px-4 tablet:px-[45px]">
          <h1
            className="font-mincho text-[32px] tablet:text-[48px] leading-[1.5] tracking-[1.92px] text-dark-green mb-8 tablet:mb-12"
            style={{ fontFeatureSettings: "'palt' 1" }}
          >
            物件を探す
          </h1>
          <SearchProgress />
        </div>
      </section>
    </div>
  );
}
