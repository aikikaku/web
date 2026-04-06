import Link from 'next/link';

interface SeeAllLinkProps {
  href: string;
  label?: string;
  className?: string;
}

/**
 * 「すべて見る」共通リンクコンポーネント。
 * Figma: w-[186px], justify-between, テキストにpx-6パディング, 48px青丸矢印
 */
export default function SeeAllLink({ href, label = 'すべて見る', className }: SeeAllLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-between w-[186px] font-gothic font-medium text-[18px] hover:opacity-70 transition-opacity ${className || 'text-dark-green'}`}
    >
      <span className="px-6 py-3">{label}</span>
      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-blue shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
