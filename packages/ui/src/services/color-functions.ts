import { ColorTranslator } from 'colortranslator'
import { HSLObject, ColorInput } from 'colortranslator/dist/@types'

export const colorToRgba = (color: ColorInput, opacity: number) => {
  return new ColorTranslator(color).setA(opacity).RGBA
}

export const getBoxShadowColor = (color: ColorInput) => {
  return new ColorTranslator(color).setA(0.4).RGBA
}

export const getHoverColor = (color: ColorInput) => {
  return new ColorTranslator(color).setA(0.2).RGBA
}

export const getFocusColor = (color: ColorInput) => {
  return new ColorTranslator(color).setA(0.3).RGBA
}

export const shiftHslColor = (color: ColorInput, offset: { h?: number; s?: number; l?: number; a?: number }) => {
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

  return result.HSL
}

/**
 * This method guesses second color for gradient based on first one.
 * Calculation method should differ for different colors, so we split color circle
 * in zones.
 *
 * @param color
 */
export const shiftGradientColor = (color: ColorInput): string => {
  const newColor = ColorTranslator.toHSL(color, false) as HSLObject

  // Gray
  if (newColor.s < 10) {
    return shiftHslColor(newColor, { h: 2, s: 5, l: 10 })
  }
  // Unsaturated (too pale, gray-ish, monotone)
  // For unsaturated color, hue change does nothing.
  if (newColor.s < 30) {
    return shiftHslColor(newColor, { s: -14, l: 11 })
  }
  // Red
  if ((newColor.h >= 0 && newColor.h < 44) || (newColor.h >= 285)) {
    return shiftHslColor(newColor, { h: 11, s: 27, l: 8 })
  }
  // Yellow
  if (newColor.h >= 44 && newColor.h < 85) {
    return shiftHslColor(newColor, { h: 3, l: 9 })
  }
  // Green
  if (newColor.h >= 85 && newColor.h < 165) {
    return shiftHslColor(newColor, { h: 16, l: 14 })
  }
  // Blue
  if (newColor.h >= 165 && newColor.h < 285) {
    return shiftHslColor(newColor, { h: -15, s: 3, l: 2 })
  }

  throw new Error('This method should handle all colors. But it didn\'t for some reason.')
}

export const getGradientBackground = (color: string) => {
  const colorLeft = shiftGradientColor(color)
  const colorRight = ColorTranslator.toHSL(color)

  return `linear-gradient(to right, ${colorLeft}, ${colorRight})`
}
