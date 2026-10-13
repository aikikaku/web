import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/navigation/Breadcrumb';
import ButtonPrimary from '@/components/ui/interactive/ButtonPrimary';
import ButtonPrimarySp from '@/components/ui/interactive/ButtonPrimarySp';

export const metadata: Metadata = {
  title: 'お探しのページが見つかりませんでした',
  robots: { index: false },
};

/**
 * 404 ページ (Figma Handoff 20260724: PC 4470:17384 / SP 4470:17368)。
 * SP のボタン文言は Figma 上「もっと知る」だが、PC と同じ「トップページへ戻る」に揃えている。
 */
export default function NotFound() {
  return (
    <div className="bg-cream">
      <Breadcrumb items={[{ label: '404' }]} />
      <section className="px-4 tablet:px-[4.6875rem] pt-[3.75rem] tablet:pt-24 pb-[7.5rem] tablet:pb-36 max-w-[90rem] mx-auto">
        <div className="w-full tablet:max-w-[44rem] mx-auto flex flex-col items-center text-center">
          <p
            aria-hidden
            className="font-mincho text-heading-56 tablet:text-[7.5rem] tablet:leading-normal tablet:tracking-[0.06em] text-dark-green pb-8 tablet:pb-12"
            style={{ fontFeatureSettings: "'palt' 1" }}
          >
            404
          </p>
          <div className="flex flex-col gap-4 pb-8 tablet:pb-12 text-black">
            <h1 className="font-mincho text-heading-24 tablet:text-heading-32" style={{ fontFeatureSettings: "'palt' 1" }}>
              お探しのページが<br className="tablet:hidden" />見つかりませんでした
            </h1>
            <p className="font-gothic font-medium text-[0.875rem] leading-[1.8] tablet:text-[1rem] tablet:leading-[2]">
              ご覧になろうとしたページは、<br className="tablet:hidden" />移動または削除された可能性があります。
            </p>
          </div>
          {/* ButtonPrimary は「すべて見る」用に幅 186px 固定なので、長いラベルに合わせて自動幅にする */}
          <ButtonPrimary href="/" label="トップページへ戻る" className="hidden tablet:inline-flex !w-auto" />
          <ButtonPrimarySp href="/" label="トップページへ戻る" className="tablet:hidden" />
        </div>
      </section>
    </div>
  );
}
