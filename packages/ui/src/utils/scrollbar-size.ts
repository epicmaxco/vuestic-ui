export const getScrollbarSize = (element: HTMLElement | null | undefined) => {
  if (!element) { return 0 }

  const scrollbarWidth = element.offsetWidth - element.clientWidth
  const scrollbarHeight = element.offsetHeight - element.clientHeight
  return Math.max(scrollbarWidth, scrollbarHeight)
}
