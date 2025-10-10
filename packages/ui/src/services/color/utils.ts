import { camelCaseToKebabCase, kebabCaseToCamelCase } from '@/utils/text-case'

import { setHSLA, shiftHSLA, parseColorToRGB, parseColorToHSL, rgbToString, hslToString, colorToString, type RGBObject, type HSLObject } from '@/utils/color'

export const isCSSVariable = (strColor: string): boolean => /var\(--.+\)/.test(strColor)
export const cssVariableName = (colorName: string) => `--va-${camelCaseToKebabCase(colorName)}`
export const normalizeColorName = (colorName: string) => kebabCaseToCamelCase(colorName)

export type ColorInput = string | RGBObject | HSLObject

export const colorToRgba = (color: string, opacity: number) => {
  const { r, g, b } = parseColorToRGB(color)

  return rgbToString({ r, g, b, a: opacity })
}

export const getColorLightness = (color: ColorInput) => {
  const { r, g, b } = parseColorToRGB(color)
  return Math.sqrt(r * r * 0.241 + g * g * 0.691 + b * b * 0.068)
}

export const getBoxShadowColor = (color: string, opacity = 0.4) => {
  return colorToRgba(color, opacity)
}

export const getBoxShadowColorFromBg = (background: string, opacity = 0.4) => {
  return colorToRgba(background, opacity)
}

export const getHoverColor = (color: string, opacity = 0.2) => {
  return colorToRgba(color, opacity)
}

export const getFocusColor = (color: string, opacity = 0.3) => {
  return colorToRgba(color, opacity)
}

export const shiftHSLAColor = (color: string | RGBObject | HSLObject, shift: { h?: number; s?: number; l?: number; a?: number }) => {
  return hslToString(shiftHSLA(parseColorToHSL(color), shift))
}

export const setHSLAColor = (color: string | RGBObject | HSLObject, shift: { h?: number; s?: number; l?: number; a?: number }) => {
  return hslToString(setHSLA(parseColorToHSL(color), shift))
}

/**
 * This method guesses second color for gradient based on first one.
 * Calculation method should differ for different colors, so we split color circle
 * in zones.
 *
 * @param color
 */
export const shiftGradientColor = (color: string): string => {
  const newColor = parseColorToHSL(color)

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

  return `linear-gradient(to right, ${colorLeft}, ${colorToString(color)})`
}

export const getStateMaskGradientBackground = (color: string, maskColor: string, maskOpacity: number) => {
  const mask = colorToRgba(maskColor, maskOpacity)

  return `linear-gradient(0deg, ${mask}, ${mask}), ${color}`
}

export const applyColors = (color1: string, color2: string) => {
  const c1 = parseColorToRGB(color1)
  const c2 = parseColorToRGB(color2)
  const weight = c2.a

  if (weight === 1) { return rgbToString(c2) }
  if (weight === 0) { return rgbToString(c1) }

  return rgbToString({
    r: Math.round((c1.r) * (1 - weight) + (c2.r) * weight),
    g: Math.round((c1.g) * (1 - weight) + (c2.g) * weight),
    b: Math.round((c1.b) * (1 - weight) + (c2.b) * weight),
    a: c1.a,
  })
}

/**
 * Returns `true` if color is FULLY transparent
 */
export const isColorTransparent = (color: string) => {
  if (!color) { return false }
  if (color === 'transparent') { return true }

  return parseColorToRGB(color).a <= 0.1
}

export { isColor } from './../../utils/color'

type Palette = Record<string, string>

// Values in a theme config can be:
// - a token string ("blue10")
// - a prioritized list of token strings (["redPaleDark","redSoftDark"])
// - a nested object (e.g., { brand: "...", danger: "..." })
type ConfigValue = string | string[] | Record<string, any>
type Config = Record<string, ConfigValue>

/**
 * resolveColors
 *
 * Replaces token references in a config using a palette. Behavior:
 *  - string:   replace with palette[token] if present; otherwise keep as-is
 *  - string[]: treat as fallback list; return the first palette hit;
 *              if none hit, return the first element unchanged
 *  - object:   recurse into properties
 *
 * Example:
 *  dangerPressed: ["redPaleDark", "redSoftDark"]
 *    -> resolves to palette["redPaleDark"] if it exists,
 *       otherwise palette["redSoftDark"] if it exists,
 *       otherwise "redPaleDark" (the first item) unchanged.
 */
export function resolveColors (config: Config, palette: Palette): Config {
  const replaceValues = (obj: any): any => {
    // simple token string
    if (typeof obj === 'string') {
      return palette[obj] ?? obj
    }

    // arrays
    if (Array.isArray(obj)) {
      // If it's a list of strings, treat as fallback tokens
      if (obj.every((x) => typeof x === 'string')) {
        for (const token of obj) {
          if (palette[token]) { return palette[token] }
        }
        // no token matched: return the first entry unchanged (best-effort fallback)
        return obj[0]
      }
      // Mixed array / non-strings: preserve previous behavior (map recursively)
      return obj.map(replaceValues)
    }

    // objects (recurse)
    if (obj && typeof obj === 'object') {
      const result: Record<string, any> = {}
      for (const key of Object.keys(obj)) {
        result[key] = replaceValues(obj[key])
      }
      return result
    }

    // everything else (numbers, null, etc.)
    return obj
  }

  return replaceValues(config)
}
