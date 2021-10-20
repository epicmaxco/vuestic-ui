const getTopCoordinate = (element: HTMLElement) => element.offsetTop
const getBottomCoordinate = (element: HTMLElement) => element.offsetTop + element.offsetHeight
const getCenterCoordinate = (element: HTMLElement) => element.offsetTop + element.offsetHeight / 2

const getScrollTop = (element: HTMLElement, scrollTarget: HTMLElement, verticalAlignment?: 'start' | 'end' | 'center' | 'any') => {
  const viewHeight = scrollTarget.offsetHeight
  const currentPosition = scrollTarget.scrollTop
  const top = getTopCoordinate(element) - scrollTarget.offsetTop
  const center = getCenterCoordinate(element) - scrollTarget.offsetTop
  const bottom = getBottomCoordinate(element) - scrollTarget.offsetTop

  if (verticalAlignment === 'start') {
    return top
  }

  if (verticalAlignment === 'end') {
    return bottom - viewHeight
  }

  if (verticalAlignment === 'center') {
    return center - viewHeight / 2
  }

  if (verticalAlignment === 'any') {
    if (top - currentPosition < 0) {
      return top
    }

    if (bottom - currentPosition > viewHeight) {
      return bottom - viewHeight
    }
  }
}

/**
 * @param options.scrollTarget - element that will be scrolled
 */
export const scrollToElement = (element: HTMLElement, options: {
  scrollTarget?: HTMLElement,
  verticalAlignment?: 'start' | 'end' | 'center' | 'any',
  smooth?: boolean,
} = {
  scrollTarget: element.parentElement!,
  verticalAlignment: 'any',
  smooth: false,
}) => {
  const scrollTarget = options.scrollTarget || element.parentElement!

  const top = getScrollTop(element, scrollTarget, options.verticalAlignment)

  if (top === undefined) { return }

  scrollTarget.scroll({
    top: top,
    behavior: options.smooth ? 'smooth' : 'auto',
  })
}
