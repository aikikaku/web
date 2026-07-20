import Link from 'next/link';
import Arrow from '@/components/ui/interactive/Arrow';

interface Props {
  href: string;
  label: string;
  /** trueなら新規タブで開く外部/ファイルリンク、falseなら内部Link遷移 */
  external?: boolean;
}

const CLASS_NAME =
  'group flex-1 bg-dark-green rounded-2xl p-[1.875rem] h-[6.75rem] flex items-center justify-between';

/**
 * ダーク背景+矢印の資料・お問い合わせ導線カード。Figma Card Link 4211:25008 準拠。
 * properties/[id]/page.tsx内で4箇所(物件資料/お問い合わせ × 外部リンク/内部リンク)重複していたマークアップを抽出。
 */
export default function CardLink({ href, label, external = false }: Props) {
  const content = (
    <>
      <p className="font-gothic font-medium text-category-2 text-white px-3">{label}</p>
      <Arrow variant="cream" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={CLASS_NAME}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={CLASS_NAME}>
      {content}
    </Link>
  );
}
