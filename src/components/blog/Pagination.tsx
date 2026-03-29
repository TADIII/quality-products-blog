import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
}

export function Pagination({ currentPage, totalPages, basePath = '/' }: PaginationProps) {
  const pages = []
  const showEllipsis = totalPages > 7

  if (showEllipsis) {
    // Always show first page
    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    // Pages around current
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i)
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    // Always show last page
    if (!pages.includes(totalPages)) {
      pages.push(totalPages)
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  }

  const getPageUrl = (page: number) => {
    if (page === 1) return basePath
    return `${basePath}?page=${page}`
  }

  return (
    <nav className="flex items-center justify-start gap-4 pt-12 border-t">
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="text-muted-foreground px-2">
              ...
            </span>
          )
        }

        const pageNum = page as number
        const isActive = pageNum === currentPage

        return (
          <Link
            key={pageNum}
            href={getPageUrl(pageNum)}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors ${
              isActive
                ? 'border-2 border-primary text-primary font-bold'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {pageNum}
          </Link>
        )
      })}
    </nav>
  )
}
