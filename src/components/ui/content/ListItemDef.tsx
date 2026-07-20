interface Props {
  label: string;
  value: string;
  className?: string;
}

/**
 * 定義リストの1行(ラベル + 値)。Figma「List Item-def」4211:25259 準拠。
 * - ラベル: 固定幅・dark-green(SP 16px / PC Body L 18px)
 * - 値: 左寄せ・black、改行(\n)は保持
 * 上端に区切り線(border-t)を持ち、リストコンテナ側で border-b を付ける想定。
 */
export default function ListItemDef({ label, value, className = '' }: Props) {
  return (
    <div className={`flex gap-[1.875rem] items-start py-6 border-t border-dark-green/10 ${className}`}>
      <p className="font-gothic font-medium text-[1rem] leading-[1.8] tablet:text-body-l text-dark-green w-[7.5rem] tablet:w-[9.1875rem] shrink-0">
        {label}
      </p>
      <p className="flex-1 font-gothic font-medium text-[1rem] leading-[1.8] tablet:text-body-l text-black whitespace-pre-line">
        {value}
      </p>
    </div>
  );
}
