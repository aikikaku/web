import SearchProgress from '@/components/common/SearchProgress';
import Breadcrumb from '@/components/ui/navigation/Breadcrumb';

export default function Loading() {
  return (
    <div className="bg-cream">
      {/* ページ本体（page.tsx）と同じくパンくずを出し、読み込み完了時に見出しがずれないようにする */}
      <Breadcrumb items={[{ label: '物件を探す' }]} />
      <section className="pt-[3.75rem] tablet:pt-24 pb-[7.5rem] tablet:pb-0">
        <div className="max-w-[90rem] mx-auto px-4 tablet:px-[2.8125rem]">
          <h1
            className="font-mincho text-[2rem] tablet:text-[3rem] leading-[1.5] tracking-[0.12rem] text-dark-green mb-8 tablet:mb-12"
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
