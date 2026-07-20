import Link from 'next/link';
import { BookIcon } from '@/components/ui/icons/icons';

interface Props {
  href: string;
  label?: string;
  className?: string;
}

/**
 * SP用プライマリボタン(小)。Figma Button Primary Small Sp 4211:26143 準拠。
 * bg-accent-blue の内容幅ピル、book アイコン+ラベル。
 */
export default function ButtonPrimarySmallSp({ href, label = 'もっと知る', className }: Props) {
  return (
    <Link
      href={href}
      className={`self-start inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-blue rounded-full font-gothic font-medium text-[1rem] leading-none text-white active:opacity-60 transition-opacity ${className ?? ''}`}
    >
      <BookIcon />
      {label}
    </Link>
  );
}
