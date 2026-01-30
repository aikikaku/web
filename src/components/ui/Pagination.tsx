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
    <nav aria-label="ページネーション" className="flex justify-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="px-3 py-2 border rounded hover:bg-gray-100 transition-colors"
        >
          前へ
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={`px-3 py-2 border rounded transition-colors ${
            page === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="px-3 py-2 border rounded hover:bg-gray-100 transition-colors"
        >
          次へ
        </Link>
      )}
    </nav>
  );
}
