interface Props {
  value: string;
  /** 文字色（カードは PC で dark-green、詳細は black 等） */
  className?: string;
}

/**
 * 物件カード・PICK UP カード・物件詳細の「間取り」の値。
 * 「6LDK（住宅部分）」のように括弧の補足がある場合は、補足を2行目に小さく出す。
 * 補足がなくても長い場合は、左右に余白を取って中央寄せで折り返す（罫線にくっつかないように）。
 */
export default function LayoutValue({ value, className = 'text-black' }: Props) {
  const m = value.match(/^(.+?)\s*([（(].+[)）])$/);
  const main = m ? m[1] : value;
  const note = m ? m[2] : null;
  return (
    <span className={`flex flex-col items-center text-center px-2 font-gothic font-medium ${className}`}>
      <span className="text-category-2 tablet:text-category-1 leading-[1.3]">{main}</span>
      {note && <span className="text-body-s leading-[1.4] mt-0.5">{note}</span>}
    </span>
  );
}
