export const setPaginationRange = (value: number, visiblePages: number, pages: number, includeBoundary = false) => {
  let start = 0

  if (visiblePages > pages) {
    visiblePages = pages
  }

  const paginationMiddlePage = visiblePages / 2
  if (value - paginationMiddlePage <= 0 || value > pages) {
    start = 1
  } else {
    start = value + paginationMiddlePage > pages
      ? pages - visiblePages + 1
      : Math.ceil(value - paginationMiddlePage)
  }

  const range: Array<string | number> = []

  for (let i = 0; i < visiblePages; i++) {
    range.push(start + i)
  }

  if (includeBoundary) {
    start !== 1 && range.splice(0, 2, 1, '...')
    range[range.length - 1] !== pages && range.splice(-2, 2, '...', pages)
  }

  return range
}
