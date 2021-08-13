/* eslint-disable */

import { css } from './dom'

export function getScrollTarget (el: HTMLElement | any) {
  return el.closest('.scroll,.scroll-y,.overflow-auto') || window
}

export function getScrollHeight (el: HTMLElement | any) {
  return (el === window ? document.body : el).scrollHeight
}

export function getScrollPosition (scrollTarget: HTMLElement | any) {
  if (scrollTarget === window) {
    return window.pageYOffset || window.scrollY || document.body.scrollTop || 0
  }
  return scrollTarget.scrollTop
}

export function getHorizontalScrollPosition (scrollTarget: HTMLElement | any) {
  if (scrollTarget === window) {
    return window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
  }
  return scrollTarget.scrollLeft
}

export function animScrollTo (el: HTMLElement | any, to: any, duration: any) {
  if (duration <= 0) {
    return
  }

  const pos = getScrollPosition(el)

  requestAnimationFrame(() => {
    setScroll(el, pos + (to - pos) / Math.max(16, duration) * 16)
    if (el.scrollTop !== to) {
      animScrollTo(el, to, duration - 16)
    }
  })
}

function setScroll (scrollTarget: HTMLElement | any, offset: any) {
  if (scrollTarget === window) {
    document.documentElement.scrollTop = offset
    document.body.scrollTop = offset
    return
  }
  scrollTarget.scrollTop = offset
}

export function setScrollPosition (scrollTarget: HTMLElement | any, offset: any, duration: any) {
  if (duration) {
    animScrollTo(scrollTarget, offset, duration)
    return
  }
  setScroll(scrollTarget, offset)
}

let size: number

export function getScrollbarWidth () {
  if (size !== undefined) {
    return size
  }

  const inner = document.createElement('p')
  const outer = document.createElement('div')

  css(inner, {
    width: '100%',
    height: '200px',
  })
  css(outer, {
    position: 'absolute',
    top: '0px',
    left: '0px',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden',
  })

  outer.appendChild(inner)

  document.body.appendChild(outer)

  const w1 = inner.offsetWidth
  outer.style.overflow = 'scroll'
  let w2 = inner.offsetWidth

  if (w1 === w2) {
    w2 = outer.clientWidth
  }

  outer.remove()
  size = w1 - w2

  return size
}

export function hasScrollbar (el: HTMLElement, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false
  }

  return onY
    ? (
      el.scrollHeight > el.clientHeight && (
        el.classList.contains('scroll') ||
        el.classList.contains('overflow-auto') ||
        ['auto', 'scroll'].includes((window as any).getComputedStyle(el)['overflow-y'])
      )
    )
    : (
      el.scrollWidth > el.clientWidth && (
        el.classList.contains('scroll') ||
        el.classList.contains('overflow-auto') ||
        ['auto', 'scroll'].includes((window as any).getComputedStyle(el)['overflow-x'])
      )
    )
}

export default {
  getScrollTarget,
  getScrollHeight,
  getScrollPosition,
  animScrollTo,
  setScrollPosition,
  getScrollbarWidth,
  hasScrollbar,
}
