interface Props {
  /** 表示テキスト。既定「検索中...」 */
  label?: string;
}

/**
 * 検索ローディング表示 (デザインレビュー #25 / UwAjq03F7iD5)。
 * 「検索中...」の下に 8px の余白を空け、角丸・高さ8px のプログレスバー。
 * バーは light-blue(#D9E9F4) → blue(#3CB1FF) のグラデーションが流れる
 * ローディングアニメーション（CSS のみ・サーバーコンポーネントのまま）。
 */
export default function SearchProgress({ label = '検索中...' }: Props) {
  return (
    <div className="flex flex-col items-center py-12">
      <p className="font-gothic font-medium text-[16px] leading-[2] text-dark-green/60">
        {label}
      </p>
      <div
        className="search-progress mt-2 h-2 w-[200px] rounded-full overflow-hidden"
        role="progressbar"
        aria-label={label}
      />
    </div>
  );
}
