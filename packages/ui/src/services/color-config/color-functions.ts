// import colortranslator, { ColorTranslator as CTClass } from 'colortranslator'
import { ColorTranslator } from 'colortranslator'
import { HSLObject, ColorInput } from 'colortranslator/dist/@types'

export const colorToRgba = (color: ColorInput, opacity: number) => {
  return new ColorTranslator(color).setA(opacity).RGBA
}

export const isLightBackground = (color: ColorInput, opacity = 1) => {
  // TODO: replace with color mixin (doesn't play any role in dark theme)
  const { R, G, B } = new ColorTranslator(color)
  return opacity < 0.6 || Math.sqrt(R * R * 0.241 + G * G * 0.691 + B * B * 0.068) > 120
}

export const getTextColor = (color: ColorInput, darkColor = 'textDark', lightColor = 'textLight') => {
  return isLightBackground(color) ? darkColor : lightColor
}

export const getBoxShadowColor = (color: ColorInput) => {
  return new ColorTranslator(color).setA(0.4).RGBA
}

export const getBoxShadowColorFromBg = (background: ColorInput) => {
  return (new ColorTranslator(background)).setA(0.4).RGBA
}

export const getHoverColor = (color: ColorInput) => {
  return new ColorTranslator(color).setA(0.2).RGBA
}

export const getFocusColor = (color: ColorInput) => {
  return new ColorTranslator(color).setA(0.3).RGBA
}

export const shiftHSLAColor = (color: ColorInput, offset: { h?: number; s?: number; l?: number; a?: number }) => {
  const result = new ColorTranslator(color)

  if (offset.h) { result.setH(result.H + offset.h) }

  if (offset.s) { result.setS(result.S + offset.s) }

  if (offset.l) { result.setL(result.L + offset.l) }

  if (offset.a) { result.setA(result.A + offset.a) }

  return result.HSLA
}

export const setHSLAColor = (color: ColorInput, newColor: { h?: number; s?: number; l?: number; a?: number }) => {
  const result = new ColorTranslator(color)

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

export const isCSSVariable = (strColor: string): boolean => /var\(--.+\)/.test(strColor)

export const appyColors = (color1: ColorInput, color2: ColorInput) => {
  const c1 = new ColorTranslator(color1)
  const c2 = new ColorTranslator(color2)
  const weight = c2.A

  if (weight === 1) { return c2.RGBA }
  if (weight === 0) { return c1.RGBA }

  c1.setR(Math.round((c1.R) * (1 - weight) + (c2.R) * weight))
  c1.setG(Math.round((c1.G) * (1 - weight) + (c2.G) * weight))
  c1.setB(Math.round((c1.B) * (1 - weight) + (c2.B) * weight))

  return c1.RGBA
}
