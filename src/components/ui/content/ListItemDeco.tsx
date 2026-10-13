interface Props {
  label: string;
  value: string;
  /** MAP バッジのリンク先。省略時は静的な MAP バッジを表示 */
  mapUrl?: string;
  className?: string;
}

/**
 * MAP バッジ付きの定義リスト1行。Figma「List Item-deco」4211:25250 準拠。
 * ラベル + 値 + 末尾に MAP タグ(`.tag` = light-blue の pill)。
 * mapUrl があれば外部リンク、無ければ静的表示。
 * レイアウト・タイポグラフィは [[ListItemDef]] と共通
 * （PC 4470:14377 横並び / SP 4470:14946 List Item-deco-sp 縦積み・値 dark-green）。
 */
export default function ListItemDeco({ label, value, mapUrl, className = '' }: Props) {
  return (
    <div className={`flex flex-col gap-3 pr-6 tablet:flex-row tablet:gap-[1.875rem] tablet:items-center tablet:pr-0 py-6 border-t border-dark-green/20 first:border-t-0 ${className}`}>
      <p className="font-gothic font-medium text-body-m tablet:text-body-l text-dark-green tablet:w-[9.1875rem] shrink-0">
        {label}
      </p>
      <div className="flex-1 flex items-center justify-between gap-3">
        <p className="font-gothic font-medium text-body-m tablet:text-body-l text-dark-green tablet:text-black whitespace-pre-line">
          {value}
        </p>
        {mapUrl ? (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tag shrink-0 hover:opacity-70 transition-opacity"
          >
            MAP
          </a>
        ) : (
          <span className="tag shrink-0">MAP</span>
        )}
      </div>
    </div>
  );
}
