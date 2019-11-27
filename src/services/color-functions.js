import { ColorTranslator } from 'colortranslator'

export const colorToRgba = (color, opacity) => {
  return new ColorTranslator(color).setA(opacity).RGBA
}

export const getBoxShadowColor = (color) => {
  return new ColorTranslator(color).setA(0.4).RGBA
}

export const getHoverColor = (color) => {
  return new ColorTranslator(color).setA(0.2).RGBA
}

export const getFocusColor = (color) => {
  return new ColorTranslator(color).setA(0.3).RGBA
}

export const shiftHslColor = (color, offset = { h: 0, s: 0, l: 0, a: 0 }) => {
  const result = new ColorTranslator(color)

  if (!isNaN(Number(offset.h))) {
    result.setH(result.H + offset.h)
  }

  if (!isNaN(Number(offset.s))) {
    result.setS(result.S + offset.s)
  }

  if (!isNaN(Number(offset.l))) {
    result.setL(result.L + offset.l)
  }

  if (!isNaN(Number(offset.a))) {
    result.setA(result.A + offset.a)
  }

  return result.HSL
}

export const shiftGradientColor = (color) => {
  let newColor = ColorTranslator.toHSL(color, false)

  // hue circle degrees approximation
  const isRed = (newColor.h >= 0 && newColor.h < 44) || (newColor.h >= 285)
  const isYellow = newColor.h >= 44 && newColor.h < 85
  const isGreen = newColor.h >= 85 && newColor.h < 165
  const isBlue = newColor.h >= 165 && newColor.h < 285
  const isUndersaturated = newColor.s < 30 // i.e. too pale, gray-ish, monotone

  const isGray = newColor.s < 10

  if (isGray) {
    newColor = shiftHslColor(newColor, { h: 2, s: 5, l: 10 })
  } else if (isUndersaturated) {
    newColor = shiftHslColor(newColor, { s: -14, l: 11 })
  } else if (isRed) {
    newColor = shiftHslColor(newColor, { h: 11, s: 27, l: 8 })
  } else if (isYellow) {
    newColor = shiftHslColor(newColor, { h: 3, l: 9 })
  } else if (isGreen) {
    newColor = shiftHslColor(newColor, { h: 16, l: 14 })
  } else if (isBlue) {
    newColor = shiftHslColor(newColor, { h: -15, s: 3, l: 2 })
  }

  return newColor
}

export const getGradientBackground = (color) => {
  const colorLeft = shiftGradientColor(color)
  const colorRight = ColorTranslator.toHSL(color)

  return `linear-gradient(to right, ${colorLeft}, ${colorRight})`
}
