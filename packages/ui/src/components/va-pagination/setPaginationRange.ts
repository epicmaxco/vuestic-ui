import { warn } from '../../services/utils'

export const setPaginationRange = (value = 1, visiblePages: number, pages: number, includeBoundary = false) => {
  let start = 0

  if (pages === 0) {
    pages = 1
  }

  if (visiblePages > pages) {
    visiblePages = pages
  }
  if (visiblePages === 0) {
    start = 1
    visiblePages = pages
  } else {
    const paginationMiddlePage = visiblePages / 2
    if (value - paginationMiddlePage <= 0 || value > pages) {
      start = 1
    } else {
      start = value + paginationMiddlePage > pages
        ? pages - visiblePages + 1
        : Math.ceil(value - paginationMiddlePage)
    }
  }

  const range: Array<'...' | number> = []

  for (let i = 0; i < visiblePages; i++) {
    range.push(start + i)
  }

  if (includeBoundary && visiblePages < 7) {
    warn(
      '[va-pagination] To work in a proper way, the `boundaryNumbers` prop needs at least 7 visible pages to be set via the `visiblePages` prop (first, last, 2 boundaries, current, previous, next).',
    )
  } else if (includeBoundary) {
    start !== 1 && range.splice(0, 2, 1, '...')
    range[range.length - 1] !== pages && range.splice(-2, 2, '...', pages)
  }

  return range
}
