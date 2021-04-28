import { ColorTranslator } from 'colortranslator'
import { HSLObject, ColorInput } from 'colortranslator/dist/@types'

export const colorToRgba = (color: ColorInput, opacity: number) => {
  return new ColorTranslator(color).setA(opacity).RGBA
}

export const getBoxShadowColor = (color: ColorInput) => {
  return new ColorTranslator(color).setA(0.4).RGBA
}

export const getHoverColor = (color: ColorInput) => {
  return new ColorTranslator(color).setA(0.08).RGBA
}

export const getFocusColor = (color: ColorInput) => {
  return new ColorTranslator(color).setA(0.08).RGBA
}

export const shiftHSLAColor = (color: ColorInput, offset: { h?: number; s?: number; l?: number; a?: number }) => {
  const result = new ColorTranslator(color)

  if (offset.h) {
    result.setH(result.H + offset.h)
  }

  if (offset.s) {
    result.setS(result.S + offset.s)
  }

  if (offset.l) {
    result.setL(result.L + offset.l)
  }

  if (offset.a) {
    result.setA(result.A + offset.a)
  }

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

/**
 * Check if color is valid css color
 * Taken from https://stackoverflow.com/a/56266358/5783475
 * @param strColor
 */
export const isCssColor = (strColor: string): boolean => {
  const s = new Option().style
  s.color = strColor
  return s.color !== ''
}
