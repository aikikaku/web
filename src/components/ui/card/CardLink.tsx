import Link from 'next/link';
import Arrow from '@/components/ui/interactive/Arrow';

interface Props {
  href: string;
  label: string;
  /** trueなら新規タブで開く外部/ファイルリンク、falseなら内部Link遷移 */
  external?: boolean;
}

// SP: Card-link-sp (Figma 4470:14957) px-24 py-20・高さは内容なり(84) / PC: Card-link (4470:14388) p-30・高さ 108
const CLASS_NAME =
  'group flex-1 bg-dark-green rounded-2xl px-6 py-5 tablet:p-[1.875rem] tablet:h-[6.75rem] flex items-center justify-between gap-[1.875rem]';

/**
 * ダーク背景+矢印の資料・お問い合わせ導線カード。Figma Card Link 4211:25008 準拠。
 * properties/[id]/page.tsx内で4箇所(物件資料/お問い合わせ × 外部リンク/内部リンク)重複していたマークアップを抽出。
 */
export default function CardLink({ href, label, external = false }: Props) {
  const content = (
    <>
      {/* SP: 16px / 行間 2 / cream / px-8、PC: 20px (Category Title 2) / white / px-12 */}
      <p className="font-gothic font-medium text-body-m text-cream px-2 tablet:text-category-2 tablet:text-white tablet:px-3">{label}</p>
      <Arrow variant="cream" sizeClassName="w-11 h-11 tablet:w-12 tablet:h-12" />
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
