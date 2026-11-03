import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  /** 省略時はリンクなし（「アイ企画を知る」のようなページを持たない階層や、現在ページ） */
  href?: string;
}

interface BreadcrumbProps {
  /** 「ホーム」より後ろの階層。最後の要素が現在ページ */
  items: BreadcrumbItem[];
}

/**
 * パンくずリスト（Figma Handoff 20260724: breadcrumbs 4470:14140 / breadcrumbs_sp 4470:17370）。
 * ヘッダー直下に置く。祖先は 50% 透過、現在ページは不透過で、長い場合は省略記号で切る。
 * PC: 14px Medium / 左右 45px、SP: 12px Regular / 左右 16px。
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  const trail: BreadcrumbItem[] = [{ label: 'ホーム', href: '/' }, ...items];

  return (
    <nav aria-label="パンくずリスト" className="max-w-[90rem] mx-auto px-4 tablet:px-[2.8125rem]">
      <ol className="flex items-stretch min-w-0 font-gothic text-[0.75rem] tablet:text-[0.875rem] leading-[1.8] text-dark-green">
        {trail.map((item, i) => {
          const isCurrent = i === trail.length - 1;
          return (
            <li key={i} className={`flex items-stretch ${isCurrent ? 'min-w-0' : 'shrink-0'}`}>
              {i > 0 && (
                <span aria-hidden className="flex items-end px-1 pb-1 opacity-50">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M6.08072 11.3306L9.75154 7.65981C10.116 7.29532 10.116 6.70468 9.75154 6.34019L6.08072 2.66937C5.94404 2.53269 5.72275 2.53269 5.58607 2.66937C5.44938 2.80606 5.44938 3.02734 5.58607 3.16403L9.25689 6.83485C9.34801 6.92597 9.34801 7.07403 9.25689 7.16515L5.58607 10.836C5.44938 10.9727 5.44938 11.1939 5.58607 11.3306C5.72275 11.4673 5.94404 11.4673 6.08072 11.3306Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              )}
              {isCurrent ? (
                <span aria-current="page" className="font-normal tablet:font-medium truncate">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  // SP は文字 12px・高さ約 22px と小さく指で押しにくいため、見た目を変えずに押せる範囲を上下左右へ広げる
                  className="relative font-normal tablet:font-medium whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity after:absolute after:-inset-x-2 after:-top-2 after:-bottom-3 after:content-['']"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-normal tablet:font-medium whitespace-nowrap opacity-50">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
