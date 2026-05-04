'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface PaginationProps {
  totalCount: number;
  perPage: number;
  currentPage: number;
  basePath: string;
  searchParams?: Record<string, string>;
  /** クリック時に scrollIntoView する要素の id（指定がなければ window 先頭） */
  scrollTargetId?: string;
}

export default function Pagination({
  totalCount,
  perPage,
  currentPage,
  basePath,
  searchParams = {},
  scrollTargetId,
}: PaginationProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalCount / perPage);

  const buildHref = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      if (page > 1) params.set('page', page.toString());
      else params.delete('page');
      const qs = params.toString();
      return qs ? `${basePath}?${qs}` : basePath;
    },
    [searchParams, basePath],
  );

  const handleNavigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
      if (page === currentPage || page < 1 || page > totalPages) return;
      e.preventDefault();
      router.push(buildHref(page), { scroll: false });
      // 一覧の先頭へ smooth scroll（Pagination がページ切替後に再描画されても同じ id 要素が残るのでズレない）
      requestAnimationFrame(() => {
        if (scrollTargetId) {
          const target = document.getElementById(scrollTargetId);
          if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    [router, buildHref, currentPage, totalPages, scrollTargetId],
  );

  if (totalPages <= 1) return null;

  // Build page numbers with ellipsis
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [];
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      aria-label="ページネーション"
      className="flex justify-center items-center gap-2 mt-16 tablet:mt-24"
    >
      <Link
        href={currentPage > 1 ? buildHref(currentPage - 1) : '#'}
        onClick={(e) => handleNavigate(e, currentPage - 1)}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
          currentPage > 1
            ? 'bg-light-green text-dark-green hover:bg-light-green/80'
            : 'bg-light-green/40 text-dark-green pointer-events-none'
        }`}
        aria-label="前のページ"
        aria-disabled={currentPage <= 1}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {pageNumbers.map((page, index) =>
        page === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="w-8 h-8 flex items-center justify-center font-gothic font-medium text-[14px] text-dark-green"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(page)}
            onClick={(e) => handleNavigate(e, page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`w-8 h-8 inline-flex items-center justify-center font-gothic font-medium text-[14px] rounded-full transition-colors ${
              page === currentPage
                ? 'bg-dark-green text-white pointer-events-none'
                : 'text-dark-green hover:bg-cream'
            }`}
          >
            {page}
          </Link>
        ),
      )}

      <Link
        href={currentPage < totalPages ? buildHref(currentPage + 1) : '#'}
        onClick={(e) => handleNavigate(e, currentPage + 1)}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
          currentPage < totalPages
            ? 'bg-dark-green text-white hover:opacity-90'
            : 'bg-dark-green/40 text-white pointer-events-none'
        }`}
        aria-label="次のページ"
        aria-disabled={currentPage >= totalPages}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </nav>
  );
}
