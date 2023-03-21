import { getWindow } from '../../utils/ssr'
import { isCSSVariable } from '../useColors'
import { isDev } from '../../utils/env'

export type ColorArray = [number, number, number, number]

const FLOAT_NUMBERS_REGEX = /\d+(\.\d+)?/g

export const parseRGBA = (color: string): ColorArray | undefined => color
  .match(FLOAT_NUMBERS_REGEX)?.map((n) => parseFloat(n ?? 1)) as ColorArray

const window = getWindow()

/** Remove `var()` from css variable declaration */
const getCSSVariableNameFromDeclaration = (color: string) => color.slice(4, -1)

/**
 * Super slow function. Must be covered with cache as much as possible.
 * It actually goes through all CSS and search for value.
 * This is needed to prevent transition delay when changing background color.
 */
export const getElementBackgroundFromCSS = (el: HTMLElement) => {
  const color = [...el.ownerDocument.styleSheets]
    .filter((s) => {
      try {
        // Might be a cross-origin stylesheet
        return (s as CSSStyleSheet).cssRules
      } catch {
        return false
      }
    })
    .map(s => [...s.cssRules || []])
    .flat()
    .reduce((bg, cssRule) => {
      const { selectorText } = (cssRule as CSSPageRule)

      try {
        if (!el.matches(selectorText)) { return bg }
      } catch (error) {
        if (isDev) {
          console.warn(error, selectorText)
        }
      }

      if (cssRule instanceof CSSStyleRule) {
        return cssRule.style.background || cssRule.style.backgroundColor || bg
      }

      return bg
    }, '')
    .trim()

  if (isCSSVariable(color)) {
    return window?.getComputedStyle(el)
      .getPropertyValue(getCSSVariableNameFromDeclaration(color)).trim()
  }

  return color
}

const EMPTY_TRANSITION = 'all 0s ease 0s'

export const getElementBackground = (element: HTMLElement) => {
  const computedStyle = window?.getComputedStyle(element)

  if (!computedStyle) { return }

  if (computedStyle.transition.trim() !== EMPTY_TRANSITION) {
    return getElementBackgroundFromCSS(element)
  }

  return computedStyle.backgroundColor
}
