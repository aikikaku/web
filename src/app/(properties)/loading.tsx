import SearchProgress from '@/components/common/SearchProgress';
import Breadcrumb from '@/components/ui/navigation/Breadcrumb';

/**
 * 一覧の外から来た時だけ出す読み込み表示。ルートグループに置くのは、ページ送り・絞り込み（?page= 等の変更）で
 * 出さないため。properties/ 直下に置くと検索条件ごとに作り直されて毎回スケルトンに切り替わり、今の一覧が消える。
 */
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
