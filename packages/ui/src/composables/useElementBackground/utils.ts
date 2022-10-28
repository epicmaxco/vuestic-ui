import { getWindow } from '../../utils/ssr-utils'
import { isCSSVariable } from '../useColors'

export type ColorArray = [number, number, number, number]

const FLOAT_NUMBERS_REGEX = /\d+(\.\d+)?/g

export const parseRGBA = (color: string): ColorArray | undefined => color
  .match(FLOAT_NUMBERS_REGEX)?.map((n) => parseFloat(n ?? 1)) as ColorArray

const window = getWindow()

/** Remove `var()` from css variable declaration */
const getCSSVariableNameFromDeclaration = (color: string) => color.slice(4, -1)

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
      if (!el.matches((cssRule as CSSPageRule).selectorText)) { return bg }

      if (cssRule instanceof CSSStyleRule) {
        return cssRule.style.background || cssRule.style.backgroundColor || bg
      }
      return bg
    }, '')

  if (isCSSVariable(color)) {
    return window?.getComputedStyle(el)
      .getPropertyValue(getCSSVariableNameFromDeclaration(color))
  }

  return color
}

export const getElementBackground = (element: HTMLElement) => {
  return window?.getComputedStyle(element).backgroundColor
}
