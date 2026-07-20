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
 * レイアウト・タイポグラフィは [[ListItemDef]] と共通。
 */
export default function ListItemDeco({ label, value, mapUrl, className = '' }: Props) {
  return (
    <div className={`flex gap-[1.875rem] items-start py-6 border-t border-dark-green/10 ${className}`}>
      <p className="font-gothic font-medium text-[1rem] leading-[1.8] tablet:text-body-l text-dark-green w-[7.5rem] tablet:w-[9.1875rem] shrink-0">
        {label}
      </p>
      <div className="flex-1 flex items-center justify-between gap-3">
        <p className="font-gothic font-medium text-[1rem] leading-[1.8] tablet:text-body-l text-black whitespace-pre-line">
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
