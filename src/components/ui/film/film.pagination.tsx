import { calculatePageList } from '~/lib/pagination'

import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../pagination'

export interface FilmCardProps {
  currentPage: number
  totalPage: number
}

export function FilmPagination({ currentPage, totalPage }: FilmCardProps) {
  const PAGE_TO_DISPLAY = 2
  const pageList = calculatePageList(currentPage, PAGE_TO_DISPLAY, totalPage)
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <>
            <PaginationItem>
              <PaginationFirst
                href="/"
                tabIndex={currentPage <= 1 ? -1 : undefined}
                className={
                  currentPage <= 1
                    ? 'pointer-events-none opacity-50'
                    : undefined
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                href={`/?page=${currentPage - 1}`}
                tabIndex={currentPage <= 1 ? -1 : undefined}
                className={
                  currentPage <= 1
                    ? 'pointer-events-none opacity-50'
                    : undefined
                }
              />
            </PaginationItem>
          </>
        )}
        {pageList.map(pageItem => (
          <PaginationItem key={pageItem}>
            <PaginationLink
              href={`/?page=${pageItem}`}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              isActive={pageItem === currentPage}
            >
              {pageItem}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < totalPage && (
          <>
            <PaginationItem>
              <PaginationNext
                href={`/?page=${currentPage + 1}`}
                tabIndex={currentPage === totalPage ? -1 : undefined}
                className={
                  currentPage === totalPage
                    ? 'pointer-events-none opacity-50'
                    : undefined
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                href={`/?page=${totalPage}`}
                tabIndex={currentPage <= 1 ? -1 : undefined}
                className={
                  currentPage >= totalPage
                    ? 'pointer-events-none opacity-50'
                    : undefined
                }
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  )
}
