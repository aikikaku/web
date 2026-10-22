import Breadcrumb from '@/components/ui/navigation/Breadcrumb';

/**
 * ストーリー詳細の読み込み中表示。親の /stories/loading.tsx（「暮らしを知る」の見出し＋ローディングバー）が
 * 詳細ページにも出ていたため、詳細ページのヒーロー（左に写真・右にタグ＋タイトル）と同じ枠のスケルトンにする。
 */
export default function Loading() {
  const block = 'bg-dark-green/10 animate-pulse';
  return (
    <div className="bg-cream" aria-busy="true" aria-label="ページを読み込み中">
      <Breadcrumb items={[{ label: '暮らしを知る', href: '/stories' }, { label: '' }]} />
      <section className="pt-12 pb-24 px-[2.8125rem] max-w-[90rem] mx-auto max-tablet:px-4 max-tablet:py-[3.75rem]">
        <div className="flex max-tablet:flex-col gap-0 max-tablet:gap-8">
          <div className={`max-tablet:order-2 tablet:w-[42.1875rem] shrink-0 h-[40rem] max-tablet:h-auto max-tablet:aspect-square rounded-3xl ${block}`} />
          <div className="max-tablet:order-1 flex-1 flex flex-col gap-4 tablet:gap-8 items-start tablet:items-center justify-center tablet:pl-[5.5625rem] tablet:pr-[3.75rem]">
            <div className={`h-7 w-24 rounded-full ${block}`} />
            <div className="flex flex-col gap-3 w-full items-start tablet:items-center">
              <div className={`h-10 tablet:h-14 w-full rounded-lg ${block}`} />
              <div className={`h-10 tablet:h-14 w-2/3 rounded-lg ${block}`} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
