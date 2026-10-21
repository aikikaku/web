import Breadcrumb from '@/components/ui/navigation/Breadcrumb';

/**
 * 物件詳細の読み込み中表示。親の /properties/loading.tsx（「物件を探す」の見出し＋ローディングバー）が
 * 詳細ページにも出ていたため、詳細ページのヒーローと同じ枠のスケルトンにする。
 * 寸法は page.tsx のヒーロー（緑のカード）と PropertyDetailClient（画像 646:485・PC 幅 646px）に合わせる。
 */
export default function Loading() {
  const block = 'bg-dark-green/10 animate-pulse';
  return (
    <div className="bg-cream" aria-busy="true" aria-label="ページを読み込み中">
      <Breadcrumb items={[{ label: '物件を探す', href: '/properties' }, { label: '' }]} />
      <section className="tablet:px-[2.8125rem] pt-2 tablet:pt-12 max-w-[90rem] mx-auto">
        <div className="bg-light-green tablet:rounded-[2rem] px-4 py-8 tablet:p-[1.875rem]">
          <div className="flex flex-col tablet:flex-row tablet:gap-[3.75rem] w-full">
            <div className="w-full tablet:w-[40.375rem] tablet:shrink-0">
              <div className={`aspect-[646/485] rounded-2xl tablet:rounded-3xl ${block}`} />
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-6 tablet:gap-10 pt-6 tablet:pt-3">
              <div className="hidden tablet:flex gap-3">
                <div className={`h-7 w-20 rounded-full ${block}`} />
                <div className={`h-7 w-24 rounded-full ${block}`} />
              </div>
              {/* タイトル2行ぶん */}
              <div className="flex flex-col gap-3 px-2 tablet:px-0">
                <div className={`h-7 tablet:h-9 w-full rounded-lg ${block}`} />
                <div className={`h-7 tablet:h-9 w-2/3 rounded-lg ${block}`} />
              </div>
              {/* 価格・間取り */}
              <div className={`h-[5.5rem] w-full rounded-lg ${block}`} />
              <div className="flex flex-col gap-2 px-2">
                <div className={`h-5 w-1/2 rounded ${block}`} />
                <div className={`h-5 w-1/3 rounded ${block}`} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
