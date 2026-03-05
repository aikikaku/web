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

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="ページネーション" className="flex justify-center items-center gap-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="w-8 h-8 flex items-center justify-center text-dark-green hover:bg-cream rounded-full transition-colors"
          aria-label="前のページ"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={`w-8 h-8 flex items-center justify-center text-body-s font-gothic rounded-full transition-colors ${
            page === currentPage
              ? 'bg-dark-green text-white'
              : 'text-dark-green hover:bg-cream'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="w-8 h-8 flex items-center justify-center text-dark-green hover:bg-cream rounded-full transition-colors"
          aria-label="次のページ"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      )}
    </nav>
  );
}
