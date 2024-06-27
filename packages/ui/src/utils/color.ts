const HEX_TEST_REGEX = /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6,8})$/
const RGB_TEST_REGEX = /^rgba?\(([\d.]+, ?){2}[\d.]+(, ?[\d.]+)?\)$/
/**
 * DIGIT - [\d.]+ - any number of digits and dots
 * MAYBE_ANGLE - (deg|rad|turn|grad)? - optional angle unit: may be 200deg or 200
 * SEPARATOR - ,?\s - optional comma and space: may be 200deg, 50% or 200deg 50%
 * MAYBE_PERCENT - %? - any number of digits and dots, optional percent: may be 50% or 50
 * MAYBE_SLASH - (\/\s)? - optional slash and space: may be 50% or 50 / 50%
 *
 * hsla?(DIGIT MAYBE_ANGLE SEPARATOR DIGIT MAYBE_PERCENT SEPARATOR DIGIT MAYBE_PERCENT (SEPARATOR MAYBE_SLASH DIGIT MAYBE_PERCENT)?)
 */
const HSL_TEST_REGEX = /hsla?\([\d.]+(deg|rad|turn|grad)?(,?\s?[\d.]+%?){2}(,?\s?(\/\s?)?[\d.]+%?)?\)/

export const isColor = (strColor: string): boolean => {
  return HEX_TEST_REGEX.test(strColor) || RGB_TEST_REGEX.test(strColor) || HSL_TEST_REGEX.test(strColor)
}

export type HSLObject = { h: number; s: number; l: number; a: number }
export type RGBObject = { r: number; g: number; b: number; a: number }

const isHSLObject = (obj: unknown): obj is HSLObject => {
  if (typeof obj !== 'object' || obj === null) { return false }
  return 'h' in obj && 's' in obj && 'l' in obj
}

const isRGBObject = (obj: unknown): obj is RGBObject => {
  if (typeof obj !== 'object' || obj === null) { return false }
  return 'r' in obj && 'g' in obj && 'b' in obj
}

const tryParseHex = (color: string): RGBObject | null => {
  if (!HEX_TEST_REGEX.test(color)) {
    return null
  }

  const hex = color.replace('#', '')
  const isShort = hex.length < 6
  const [r, g, b, a] = isShort
    ? hex.split('').map((char) => parseInt(char + char, 16))
    : hex.match(/.{2}/g)!.map((hex) => parseInt(hex, 16))

  return { r, g, b, a: a ?? 1 }
}

const tryParseRgb = (color: string): RGBObject | null => {
  if (!RGB_TEST_REGEX.test(color)) {
    return null
  }

  const [r, g, b, a = 1] = color.match(/[\d.]+/g)!.map(Number)
  return { r, g, b, a: a }
}

const tryParseHsla = (color: string): HSLObject | null => {
  if (!HSL_TEST_REGEX.test(color)) {
    return null
  }

  const [h, s, l, a = '1'] = color.match(/[\d.]+%?/g)!

  return {
    h: Number(h),
    s: Number(s.replace('%', '')),
    l: Number(l.replace('%', '')),
    a: (a.endsWith('%') ? Number(a.replace('%', '')) / 100 : Number(a)),
  }
}

export const rgbaToHsla = (rgba: RGBObject): HSLObject => {
  const r = rgba.r / 255
  const g = rgba.g / 255
  const b = rgba.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h *= 60
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100), a: rgba.a }
}

const hueToRgb = (p: number, q: number, t: number) => {
  if (t < 0) { t += 1 }
  if (t > 1) { t -= 1 }
  if (t < 1 / 6) { return p + (q - p) * 6 * t }
  if (t < 1 / 2) { return q }
  if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6 }
  return p
}

export const hslaToRgba = (hsla: HSLObject): RGBObject => {
  const h = hsla.h / 360
  const s = hsla.s / 100
  const l = hsla.l / 100

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q

  const r = hueToRgb(p, q, h + 1 / 3)
  const g = hueToRgb(p, q, h)
  const b = hueToRgb(p, q, h - 1 / 3)

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a: hsla.a }
}

export const parseColorToHSL = (color: string | HSLObject | RGBObject) => {
  if (isHSLObject(color)) { return { ...color } }
  if (isRGBObject(color)) { return rgbaToHsla(color) }

  const rgb = tryParseHex(color) ?? tryParseRgb(color)

  if (rgb) { return rgbaToHsla(rgb) }

  const hsl = tryParseHsla(color)

  if (hsl) { return hsl }

  throw new Error(`Color ${color} is not valid. Please, provide valid color.`)
}

export const hslToString = ({ h, s, l, a }: HSLObject) => {
  return `hsla(${h},${s}%,${l}%,${a ?? 1})`
}

export const parseColorToRGB = (color: string | HSLObject | RGBObject) => {
  if (isRGBObject(color)) { return { ...color } }
  if (isHSLObject(color)) { return hslaToRgba(color) }

  const hsl = tryParseHsla(color)

  if (hsl) { return hslaToRgba(hsl) }

  const rgb = tryParseHex(color) ?? tryParseRgb(color)

  if (rgb) { return rgb }

  throw new Error(`Color ${color} is not valid. Please, provide valid color.`)
}

export const rgbToString = ({ r, g, b, a }: RGBObject) => {
  if (a === 1) {
    return `rgb(${r},${g},${b})`
  }
  return `rgba(${r},${g},${b},${a ?? 1})`
}

export const colorToString = (color: string | HSLObject | RGBObject) => {
  if (isHSLObject(color)) { return hslToString(color) }
  if (isRGBObject(color)) { return rgbToString(color) }
  if (typeof color === 'string') { return color }

  throw new Error(`Color ${color} is not valid. Please, provide valid color.`)
}

export const setHSLA = (color: string | HSLObject | RGBObject, { h, s, l, a }: Partial<HSLObject>) => {
  const parsedColor = parseColorToHSL(color)

  parsedColor.a = parsedColor.a ?? 1

  parsedColor.h = h ?? parsedColor.h
  parsedColor.s = s ?? parsedColor.s
  parsedColor.l = l ?? parsedColor.l
  parsedColor.a = a ?? parsedColor.a

  if (parsedColor.h < 0) { parsedColor.h = 360 + parsedColor.h }
  if (parsedColor.h > 360) { parsedColor.h = parsedColor.h - 360 }

  parsedColor.s = Math.max(0, Math.min(100, parsedColor.s))
  parsedColor.l = Math.max(0, Math.min(100, parsedColor.l))
  parsedColor.a = Math.max(0, Math.min(1, parsedColor.a))

  return parsedColor
}

export const shiftHSLA = (color: string | HSLObject | RGBObject, { h, s, l, a }: Partial<HSLObject>) => {
  const parsedColor = parseColorToHSL(color)

  parsedColor.a = parsedColor.a ?? 1

  parsedColor.h += h ?? 0
  parsedColor.s += s ?? 0
  parsedColor.l += l ?? 0
  parsedColor.a += a ?? 0

  if (parsedColor.h < 0) { parsedColor.h = 360 + parsedColor.h }
  if (parsedColor.h > 360) { parsedColor.h = parsedColor.h - 360 }

  parsedColor.s = Math.max(0, Math.min(100, parsedColor.s))
  parsedColor.l = Math.max(0, Math.min(100, parsedColor.l))
  parsedColor.a = Math.max(0, Math.min(1, parsedColor.a))

  return parsedColor
}
