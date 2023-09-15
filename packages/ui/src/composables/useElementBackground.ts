import { Ref, ref, watchEffect } from 'vue'
import { useCurrentElement } from './useCurrentElement'

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

const getParentsWithBackground = (el: HTMLElement): HTMLElement[] => {
  const parents = []

  let currentEl: HTMLElement | null = el
  while (currentEl) {
    if (!(currentEl instanceof HTMLElement) || !currentEl) {
      return parents
    }

    // TODO: Handle will-change maybe?
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

// Add fake transition to element to make it trigger transitionend event
const fakeBackgroundTransition = '0.0000001s background-color ease'

const watchElementBackground = (el: HTMLElement, cb: () => void) => {
  if (!el.style.transition?.includes('background-color')) {
    el.style.transition = fakeBackgroundTransition
  }

  el.addEventListener('transitionend', cb)

  return () => {
    el.style.transition = el.style.transition.replace(fakeBackgroundTransition, '')
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
export const applyColors = (color1: RGBAColorParsed, color2: RGBAColorParsed): RGBAColorParsed => {
  const weight = color2[3]

  if (weight === 1) { return color2 }
  if (weight === 0) { return color1 }

  const c1 = Math.round((color1[0]) * (1 - weight) + (color2[0]) * weight)
  const c2 = Math.round((color1[1]) * (1 - weight) + (color2[1]) * weight)
  const c3 = Math.round((color1[2]) * (1 - weight) + (color2[2]) * weight)

  return [c1, c2, c3, 1]
}

const getColorFromElements = (els: HTMLElement[]): RGBAColorParsed => {
  const colors = els.map((el) => window.getComputedStyle(el).backgroundColor).reverse()

  return colors
    .reduce((color1, color2) => applyColors(color1, parseRgba(color2 as RGBAColorString)), [0, 0, 0, 0])
}

export const useElementBackground = (el: Ref<HTMLElement | undefined | null>) => {
  const color = ref<string>('rgba(0, 0, 0, 0)')
  let unWatch = () => void 0 as void

  watchEffect(() => {
    unWatch()

    if (el.value) {
      const parents = getParentsWithBackground(el.value)

      unWatch = watchElementsBackground(parents, () => {
        color.value = `rgba${getColorFromElements(parents).join(', ')}`
      })

      color.value = `rgba${getColorFromElements(parents).join(', ')}`
    }
  })

  return color
}
