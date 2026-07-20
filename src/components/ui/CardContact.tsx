import Link from 'next/link';
import ArrowButton from '@/components/ui/ArrowButton';

interface Props {
  href: string;
  label: string;
  /** 表示切り替え(display)クラス。省略時は常時flex。呼び出し側の表示制御はこれで完全に置き換わる。 */
  display?: string;
}

/**
 * お問い合わせ導線カード（PC）。Figma Card Contact 4211:24998 準拠。
 * ContactBanner.tsx の3枚並びで共通利用（統合前は同一マークアップが3箇所に手書きされていた）。
 */
export default function CardContact({ href, label, display = 'flex' }: Props) {
  return (
    <Link
      href={href}
      className={`group bg-cream/95 rounded-3xl px-[1.875rem] pt-10 pb-[1.875rem] text-center w-[16.5rem] flex-col items-center gap-[1.875rem] ${display}`}
    >
      <span className="font-gothic font-medium text-category-2 text-dark-green">
        {label}
      </span>
      <ArrowButton />
    </Link>
  );
}
