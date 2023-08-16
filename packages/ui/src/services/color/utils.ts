import kebabCase from 'lodash/kebabCase.js'
import camelCase from 'lodash/camelCase.js'
import { ColorTranslator } from 'colortranslator'
import type { HSLObject, HEXObject, RGBObject } from 'colortranslator'
import { warn } from 'vue'

export type ColorInput = string | HEXObject | HSLObject | RGBObject

const makeColor = (color: ColorInput) => {
  try {
    return new ColorTranslator(color)
  } catch (e) {
    throw new Error(`Color ${color} is not valid. Please, provide valid color.`, {
      cause: e,
    })
  }
}

export const isCSSVariable = (strColor: string): boolean => /var\(--.+\)/.test(strColor)
export const cssVariableName = (colorName: string) => `--va-${kebabCase(colorName)}`
export const normalizeColorName = (colorName: string) => camelCase(colorName)

export const colorToRgba = (color: ColorInput, opacity: number) => {
  return makeColor(color).setA(opacity).RGBA
}

export const getColorLightness = (color: ColorInput) => {
  const { R, G, B } = makeColor(color)
  return Math.sqrt(R * R * 0.241 + G * G * 0.691 + B * B * 0.068)
}

export const getBoxShadowColor = (color: ColorInput, opacity = 0.4) => {
  return makeColor(color).setA(opacity).RGBA
}

export const getBoxShadowColorFromBg = (background: ColorInput, opacity = 0.4) => {
  return makeColor(background).setA(opacity).RGBA
}

export const getHoverColor = (color: ColorInput, opacity = 0.2) => {
  return makeColor(color).setA(opacity).RGBA
}

export const getFocusColor = (color: ColorInput, opacity = 0.3) => {
  return makeColor(color).setA(opacity).RGBA
}

export const shiftHSLAColor = (color: ColorInput, offset: { h?: number; s?: number; l?: number; a?: number }) => {
  const result = makeColor(color)

  if (offset.h) { result.setH(result.H + offset.h) }

  if (offset.s) { result.setS(result.S + offset.s) }

  if (offset.l) { result.setL(result.L + offset.l) }

  if (offset.a) { result.setA(result.A + offset.a) }

  return result.HSLA
}

export const setHSLAColor = (color: ColorInput, newColor: { h?: number; s?: number; l?: number; a?: number }) => {
  const result = makeColor(color)

  if (newColor.h !== undefined) { result.setH(newColor.h) }

  if (newColor.s !== undefined) { result.setS(newColor.s) }

  if (newColor.l !== undefined) { result.setL(newColor.l) }

  if (newColor.a !== undefined) { result.setA(newColor.a) }

  return result.HSLA
}

/**
 * This method guesses second color for gradient based on first one.
 * Calculation method should differ for different colors, so we split color circle
 * in zones.
 *
 * @param color
 */
export const shiftGradientColor = (color: ColorInput): string => {
  const newColor = ColorTranslator.toHSLA(color, false) as HSLObject

  // Gray
  if (newColor.s < 10) {
    return shiftHSLAColor(newColor, { h: 2, s: 5, l: 10 })
  }
  // Unsaturated (too pale, gray-ish, monotone)
  // For unsaturated color, hue change does nothing.
  if (newColor.s < 30) {
    return shiftHSLAColor(newColor, { s: -14, l: 11 })
  }
  // Red
  if ((newColor.h >= 0 && newColor.h < 44) || (newColor.h >= 285)) {
    return shiftHSLAColor(newColor, { h: 11, s: 27, l: 8 })
  }
  // Yellow
  if (newColor.h >= 44 && newColor.h < 85) {
    return shiftHSLAColor(newColor, { h: 3, l: 9 })
  }
  // Green
  if (newColor.h >= 85 && newColor.h < 165) {
    return shiftHSLAColor(newColor, { h: 16, l: 14 })
  }
  // Blue
  if (newColor.h >= 165 && newColor.h < 285) {
    return shiftHSLAColor(newColor, { h: -15, s: 3, l: 2 })
  }

  throw new Error('This method should handle all colors. But it didn\'t for some reason.')
}

export const getGradientBackground = (color: string) => {
  const colorLeft = shiftGradientColor(color)
  const colorRight = ColorTranslator.toHSLA(color)

  return `linear-gradient(to right, ${colorLeft}, ${colorRight})`
}

export const getStateMaskGradientBackground = (color: string, maskColor: string, maskOpacity: number) => {
  const mask = colorToRgba(maskColor, maskOpacity)

  return `linear-gradient(0deg, ${mask}, ${mask}), ${color}`
}

/**
 * Check if color is valid hsl, hsla, rga, rgba or hex color
 * Taken from https://www.regextester.com/103656
 * Check options <or> isCSSVariable(prop) <or> CSS.supports('color', prop) deleted due to problems with SSR and opacity
 * Details are in the discussion: https://github.com/epicmaxco/vuestic-ui/pull/1589
 * @param strColor
 */
export const isColor = (strColor: string): boolean => {
  // Need to use Regex instead of DOM methods because we support SSR
  const cssColorRegex = /^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$|(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1)?\)/

  return cssColorRegex.test(strColor.toLocaleLowerCase())
}

export const applyColors = (color1: ColorInput, color2: ColorInput) => {
  const c1 = makeColor(color1)
  const c2 = makeColor(color2)
  const weight = c2.A

  if (weight === 1) { return c2.RGBA }
  if (weight === 0) { return c1.RGBA }

  c1.setR(Math.round((c1.R) * (1 - weight) + (c2.R) * weight))
  c1.setG(Math.round((c1.G) * (1 - weight) + (c2.G) * weight))
  c1.setB(Math.round((c1.B) * (1 - weight) + (c2.B) * weight))

  return c1.RGBA
}

export const isColorTransparent = (color: ColorInput) => {
  if (!color) { return false }
  if (color === 'transparent') { return true }

  return makeColor(color).A <= 0.1
}
