import { Ref, ref, watchEffect } from 'vue'

/**
 * This module works with element background
 * Finding element background is not so easy, because it may be transparent
 * So we need to find all parent elements with background and apply them
 * It is not performant, but it is the only way to do it
 * So there is used ugly code which work fast enough
 */

/** Value returned from window.getComputedStyle(el).backgroundColor */
type RGBAColorString = `rgba(${number}, ${number}, ${number}, $${number})`
/** Parsed value [r, g, b, a] */
type RGBAColorParsed = [number, number, number, number]

const parseRgba = (rgba: RGBAColorString): RGBAColorParsed => {
  let values: any[]

  if (rgba.startsWith('rgba')) {
    values = rgba
      .substring(5, rgba.length - 1) // Remove 'rgba(' and ')'
      .split(',')
  } else {
    values = rgba
      .substring(4, rgba.length - 1) // Remove 'rgb(' and ')'
      .split(',')
  }

  values[0] = Number(values[0])
  values[1] = Number(values[1])
  values[2] = Number(values[2])
  if (values[3] === undefined) {
    values[3] = 1
  } else {
    values[3] = Number(values[3])
  }

  return values as RGBAColorParsed
}

const toHex = (color: RGBAColorParsed): string => {
  return '#' +
    (color[0] | 1 << 8).toString(16).slice(1) +
    (color[1] | 1 << 8).toString(16).slice(1) +
    (color[2] | 1 << 8).toString(16).slice(1) +
    (color[3] * 255 | 1 << 8).toString(16).slice(1)
}

const getParentsWithBackground = (el: HTMLElement): HTMLElement[] => {
  const parents = []

  let currentEl: HTMLElement | null = el
  while (currentEl) {
    if (!(currentEl instanceof HTMLElement) || !currentEl) {
      return parents
    }

    const { backgroundColor, willChange } = window.getComputedStyle(currentEl)

    const bgWillChange = willChange.includes('background')

    const parsedColor = parseRgba(backgroundColor as RGBAColorString)

    // In case color is not transparent, we can stop
    if (parsedColor[3] === 1 && !bgWillChange) {
      parents.push(currentEl)
      return parents
    }

    // If color is not fully transparent we need to add it to parents
    if (parsedColor[3] !== 0 || bgWillChange) {
      parents.push(currentEl)
    }

    currentEl = currentEl.parentElement
  }

  return parents
}

// Add fake transition to element to make it trigger transitionend event, add as first class to not break other transitions
const WATCHER_CLASS = 'va-background-watcher'

const watchElementBackground = (el: HTMLElement, cb: () => void) => {
  el.className = WATCHER_CLASS + ' ' + el.className

  el.addEventListener('transitionend', (e) => {
    if (e.target !== el) { return }
    cb()
  })

  return () => {
    el.className = el.className.replace(WATCHER_CLASS, '')
    el.removeEventListener('transitionend', cb)
  }
}

const watchElementsBackground = (els: HTMLElement[], cb: () => void) => {
  const unwatchers = els.map((el) => watchElementBackground(el, cb))

  return () => {
    unwatchers.forEach((unwatch) => unwatch())
  }
}

/** It is not ideal. browser applies colors in a bit different way */
const applyColors = (color1: RGBAColorParsed, color2: RGBAColorParsed): RGBAColorParsed => {
  const weight = color2[3]

  if (weight === 1) { return color2 }
  if (weight === 0) { return color1 }

  const c1 = Math.round((color1[0]) * (1 - weight) + (color2[0]) * weight)
  const c2 = Math.round((color1[1]) * (1 - weight) + (color2[1]) * weight)
  const c3 = Math.round((color1[2]) * (1 - weight) + (color2[2]) * weight)

  return [c1, c2, c3, 1]
}

const getColorFromElements = (els: HTMLElement[]): RGBAColorParsed => {
  let currentColor = [0, 0, 0, 0] as RGBAColorParsed

  for (let i = els.length - 1; i >= 0; i--) {
    currentColor = applyColors(currentColor, parseRgba(window.getComputedStyle(els[i]).backgroundColor as RGBAColorString))
  }

  return currentColor
}

/**
 * Returns undefined on server, otherwise returns ref with color
 */
export const useElementBackground = (el: Ref<HTMLElement | undefined | null>) => {
  const color = ref<string | undefined>(undefined)
  let unWatchAll = () => void 0 as void

  watchEffect(() => {
    unWatchAll()

    if (el.value) {
      const parents = getParentsWithBackground(el.value)

      unWatchAll = watchElementsBackground(parents, () => {
        color.value = toHex(getColorFromElements(parents))
      })

      color.value = toHex(getColorFromElements(parents))
    }
  })

  return color
}
