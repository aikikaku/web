'use client';

import { useEffect } from 'react';
import ButtonPrimary from '@/components/ui/interactive/ButtonPrimary';
import ButtonPrimarySp from '@/components/ui/interactive/ButtonPrimarySp';

/**
 * ページの表示中に想定外のエラーが起きたとき（microCMS が応答しない等）の画面。
 * ヘッダー・フッターは残したまま、404 ページと同じ組み方で案内する。
 */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-cream">
      <section className="px-4 tablet:px-[4.6875rem] pt-[3.75rem] tablet:pt-24 pb-[7.5rem] tablet:pb-36 max-w-[90rem] mx-auto">
        <div className="w-full tablet:max-w-[44rem] mx-auto flex flex-col items-center text-center">
          <div className="flex flex-col gap-4 pb-8 tablet:pb-12 text-black">
            <h1 className="font-mincho text-heading-24 tablet:text-heading-32" style={{ fontFeatureSettings: "'palt' 1" }}>
              ページを表示できませんでした
            </h1>
            <p className="font-gothic font-medium text-[0.875rem] leading-[1.8] tablet:text-[1rem] tablet:leading-[2]">
              一時的な不具合の可能性があります。<br className="tablet:hidden" />時間をおいて、もう一度お試しください。
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="font-gothic font-medium text-[0.875rem] tablet:text-[1rem] text-dark-green underline underline-offset-4 hover:opacity-60 transition-opacity mb-8"
          >
            もう一度読み込む
          </button>
          <ButtonPrimary href="/" label="トップページへ戻る" className="hidden tablet:inline-flex !w-auto" />
          <ButtonPrimarySp href="/" label="トップページへ戻る" className="tablet:hidden" />
        </div>
      </section>
    </div>
  );
}
