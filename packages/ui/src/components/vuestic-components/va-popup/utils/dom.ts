/* eslint-disable */
// @ts-nocheck

export function offset (el) {
  if (!el || el === window) {
    return { top: 0, left: 0 }
  }
  const { top, left } = el.getBoundingClientRect()

  return { top, left }
}

export function style (el, property) {
  return window.getComputedStyle(el).getPropertyValue(property)
}

export function height (el) {
  if (el === window) {
    return window.innerHeight
  }
  return parseFloat(style(el, 'height'))
}

export function width (el) {
  if (el === window) {
    return window.innerWidth
  }
  return parseFloat(style(el, 'width'))
}

export function css (element, css) {
  const style = element.style

  Object.keys(css).forEach(prop => {
    style[prop] = css[prop]
  })
}

export function ready (fn) {
  if (typeof fn !== 'function') {
    return
  }

  if (document.readyState !== 'loading') {
    return fn()
  }

  document.addEventListener('DOMContentLoaded', fn, false)
}

const prefix = ['-webkit-', '-moz-', '-ms-', '-o-']

export function cssTransform (val) {
  const o = { transform: val }
  prefix.forEach(p => {
    o[p + 'transform'] = val
  })
  return o
}

export default {
  offset,
  style,
  height,
  width,
  css,
  ready,
  cssTransform,
}
