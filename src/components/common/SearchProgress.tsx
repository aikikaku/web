interface Props {
  /** 表示テキスト。既定「ページを読み込み中...」 */
  label?: string;
}

/**
 * 検索ローディング表示 (デザインレビュー #25 / UwAjq03F7iD5)。
 * 「検索中...」の下に 8px の余白を空け、角丸・高さ8px のプログレスバー。
 * バーは light-blue(#D9E9F4) → blue(#3CB1FF) のグラデーションが流れる
 * ローディングアニメーション（CSS のみ・サーバーコンポーネントのまま）。
 * 読み込みが 0.3 秒以上かかる時だけ、ふわっと出る。
 */
export default function SearchProgress({ label = 'ページを読み込み中...' }: Props) {
  return (
    // 読み込みがすぐ終わる時に一瞬出て消える点滅を避けるため、0.3 秒待ってからふわっと出す（.search-progress-in）。
    // 全体の表示演出（MotionProvider）とは二重にしない（data-no-motion）
    <div data-no-motion className="search-progress-in flex flex-col items-center py-12">
      <p className="font-gothic font-medium text-body-m text-dark-green/60">
        {label}
      </p>
      <div
        className="search-progress mt-2 h-2 w-[12.5rem] rounded-full overflow-hidden"
        role="progressbar"
        aria-label={label}
      />
    </div>
  );
}
