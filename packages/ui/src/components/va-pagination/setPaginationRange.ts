import { warn } from '../../services/utils'

export const setPaginationRange = (
  currentPage = 1,
  visiblePages: number,
  pages: number,
  includeBoundary = false) => {
  let start = 0
  if (pages === 0) { pages = 1 }
  if (visiblePages > pages) { visiblePages = pages }

  if (visiblePages === 0) {
    start = 1

    // to prevent extra long pagination, can be overwritten by user via `visiblePages` property
    visiblePages = pages > 10 ? 10 : pages
  } else {
    const paginationMiddlePage = visiblePages / 2
    if (currentPage - paginationMiddlePage <= 0 || currentPage > pages) {
      start = 1
    } else {
      start = currentPage + paginationMiddlePage > pages
        ? pages - visiblePages + 1
        : Math.ceil(currentPage - paginationMiddlePage)
    }
  }

  const range: Array<'...' | number> = []

  for (let i = 0; i < visiblePages; i++) {
    range.push(start + i)
  }

  if (includeBoundary && visiblePages < 7) {
    pages >= 7 && warn(
      '[va-pagination] To work in a proper way, the `boundaryNumbers` prop needs at least 7 visible pages to be set via the `visiblePages` prop (first, last, 2 boundaries, current, previous, next).',
    )
  } else if (includeBoundary) {
    start !== 1 && range.splice(0, 2, 1, '...')
    range[range.length - 1] !== pages && range.splice(-2, 2, '...', pages)
  }

  return range
}
