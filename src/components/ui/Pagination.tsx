import Link from 'next/link';

interface PaginationProps {
  totalCount: number;
  perPage: number;
  currentPage: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

export default function Pagination({
  totalCount,
  perPage,
  currentPage,
  basePath,
  searchParams = {},
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / perPage);

  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  // Build page numbers with ellipsis
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [];

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Show pages around current
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="ページネーション" className="flex justify-center items-center gap-2 mt-16 tablet:mt-24">
      {/* Prev arrow - light-green bg with opacity when disabled-looking */}
      <Link
        href={currentPage > 1 ? buildHref(currentPage - 1) : '#'}
        scroll={false}
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
            scroll={false}
            className={`w-8 h-8 flex items-center justify-center font-gothic font-medium text-[14px] rounded transition-colors ${
              page === currentPage
                ? 'text-dark-green'
                : 'text-dark-green hover:bg-cream'
            }`}
          >
            {page}
          </Link>
        )
      )}

      {/* Next arrow - dark-green bg, white arrow */}
      <Link
        href={currentPage < totalPages ? buildHref(currentPage + 1) : '#'}
        scroll={false}
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
