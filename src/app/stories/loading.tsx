import SearchProgress from '@/components/ui/misc/SearchProgress';

export default function Loading() {
  return (
    <div className="bg-cream">
      <section className="pt-[3.75rem] tablet:pt-24 pb-[7.5rem] tablet:pb-0">
        <div className="max-w-[90rem] mx-auto px-4 tablet:px-[2.8125rem]">
          <h1
            className="font-mincho text-[2rem] tablet:text-[3rem] leading-[1.5] tracking-[0.12rem] text-dark-green mb-8 tablet:mb-12"
            style={{ fontFeatureSettings: "'palt' 1" }}
          >
            暮らしを知る
          </h1>
          <SearchProgress />
        </div>
      </section>
    </div>
  );
}
