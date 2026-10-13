interface Props {
  label: string;
  value: string;
  className?: string;
}

/**
 * 定義リストの1行(ラベル + 値)。Figma「List Item-def」4211:25259 準拠。
 * - PC (4470:14378): 横並び gap-30・items-center、ラベル固定幅 147px・dark-green / 値 black、Body L 18px
 * - SP (4470:14947 List Item-def-sp): ラベルの下に値を縦積み gap-12・pr-24、16px 行間 2、値も dark-green
 * 上端に区切り線(dark-green 20%)を持ち、リストコンテナ側で border-b を付ける想定。
 * リスト先頭行は上線なし（コンテナに上線が無い Figma 4470:14376 に合わせる）。
 */
export default function ListItemDef({ label, value, className = '' }: Props) {
  return (
    <div className={`flex flex-col gap-3 pr-6 tablet:flex-row tablet:gap-[1.875rem] tablet:items-center tablet:pr-0 py-6 border-t border-dark-green/20 first:border-t-0 ${className}`}>
      <p className="font-gothic font-medium text-body-m tablet:text-body-l text-dark-green tablet:w-[9.1875rem] shrink-0">
        {label}
      </p>
      <p className="flex-1 font-gothic font-medium text-body-m tablet:text-body-l text-dark-green tablet:text-black whitespace-pre-line">
        {value}
      </p>
    </div>
  );
}
