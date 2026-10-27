import SearchProgress from '@/components/common/SearchProgress';
import Breadcrumb from '@/components/ui/navigation/Breadcrumb';

/**
 * 一覧の外から来た時だけ出す読み込み表示。ルートグループに置くのは、ページ送り・絞り込み（?page= 等の変更）で
 * 出さないため。properties/ 直下に置くと検索条件ごとに作り直されて毎回スケルトンに切り替わり、今の一覧が消える。
 * ページ本体（page.tsx）のパンくず・見出し・リード文と同じ配置にし、読み込み完了時にずれないようにする。
 */
export default function Loading() {
  return (
    <div className="bg-cream">
      <Breadcrumb items={[{ label: '暮らしを知る' }]} />
      <section className="px-4 tablet:px-[4.6875rem] pt-[3.75rem] pb-8 tablet:py-24 max-w-[90rem] mx-auto">
        <div className="flex flex-col gap-8 tablet:gap-12">
          <div className="flex flex-col gap-2">
            <h1
              className="font-mincho text-heading-32 tablet:text-heading-48 text-dark-green"
              style={{ fontFeatureSettings: "'palt' 1" }}
            >
              暮らしを知る
            </h1>
          </div>
          <p className="font-gothic font-medium text-[1rem] leading-[2] tablet:text-body-l text-dark-green max-w-[48rem]">
            物件だけじゃわからない、<br className="tablet:hidden" />三島での暮らしのこと。
            <br />
            ここで一緒に、のぞいてみませんか？
          </p>
        </div>
      </section>
      <div className="px-4 tablet:px-[4.6875rem] max-w-[90rem] mx-auto">
        <SearchProgress />
      </div>
    </div>
  );
}
