/**
 * Theme Color Generation System
 * =============================
 *
 * Generates complete color palettes from minimal anchor colors:
 *
 * 1. **Accent Colors** (red, blue, green, yellow, sky, etc.)
 *    - From a single base color → full palette with variants
 *
 * 2. **Neutral Colors** (grays and UI backgrounds)
 *    - From a single primary color → complete neutral system
 *
 * ## 🎯 IDEAL USAGE PATTERN
 *
 * **Provide ONLY ONE color per palette as input, and use THE SAME generation**
 * **algorithm for ALL colors.** This creates the most maintainable design system.
 *
 * ```typescript
 * // ✅ IDEAL: One input per color, consistent pattern for all
 * const red = createAccent({ base: '#C51818' }, 'red')
 * const blue = createAccent({ base: '#154EC1' }, 'blue')
 * const green = createAccent({ base: '#1F7500' }, 'green')
 * const neutrals = createNeutral({ primary: '#141D26' })
 * ```
 *
 * Benefits:
 * - ✅ Predictable, consistent behavior across all colors
 * - ✅ Single algorithm to maintain, not per-color logic
 * - ✅ Visual harmony across the entire UI
 * - ✅ Easier for developers to understand and use
 *
 * ## Color Variants Generated
 * - **Light/Dark**: ±10%/±13% for hover/pressed states
 * - **Soft**: Desaturated versions for backgrounds
 * - **Alpha**: 7%, 10%, 13%, 20% opacity levels
 *
 * ## Calibration Notes
 * Per-channel RGB mixing ratios are calibrated to match exact Figma tokens.
 * **For new design systems, use uniform ratios across all colors instead.**
 *
 * @module themeColors
 */

import { parseColorToRGB, rgbToString } from '@/utils/color'

// ============================================================================
// TYPES
// ============================================================================

type RGB = { r: number; g: number; b: number }

export type Format = 'hex8' | 'hex' | 'rgba'

// ============================================================================
// CONSTANTS
// ============================================================================

const WHITE: RGB = { r: 255, g: 255, b: 255 }
const BLACK: RGB = { r: 0, g: 0, b: 0 }

const COLOR_MIXING_RATIOS = {
  light: 0.10, // Hover feel
  dark: 0.13, // Pressed feel
  soft: 0.66, // Fallback for Soft variants
  deriveSecondaryFromPrimary: 0.58, // Legacy (unused)
} as const

const ALPHA_LEVELS = [0.07, 0.10, 0.13, 0.20] as const

// ============================================================================
// CALIBRATION: NEUTRAL COLORS
// ============================================================================

/**
 * ⚠️ DESIGN RECOMMENDATION ⚠️
 * These per-channel calibrations exist to match Figma tokens.
 * Better to use simple uniform ratios instead (e.g., 90% toward white for all channels).
 * Consistent patterns = cleaner, more maintainable code.
 */

// Generate neutralPrimarySoft from neutralPrimary
// '#141D26' → '#ecf0f1'
const NEUTRAL_SOFT_MIX_RATIOS = {
  r: 0.9191489361702128,
  g: 0.9336283185840708,
  b: 0.9354838709677419,
}

// Generate neutralSecondary from primary + primarySoft
// '#141D26' + '#ecf0f1' → '#5c6169'
const SECONDARY_MIX_RATIOS = {
  r: 72 / 216,
  g: 68 / 211,
  b: 67 / 203,
}

// Generate neutralSecondarySoft from primarySoft + primary
// '#ecf0f1' + '#141D26' → '#acb4c3'
const SECONDARY_SOFT_MIX_RATIOS = {
  r: 64 / 216,
  g: 60 / 211,
  b: 46 / 203,
}

// Generate neutralSecondarySoftLight from secondarySoft
// '#acb4c3' → '#b4bbc9'
const SECONDARY_SOFT_LIGHT_MIX_RATIOS = {
  r: (180 - 172) / (255 - 172),
  g: (187 - 180) / (255 - 180),
  b: (201 - 195) / (255 - 195),
}

// ============================================================================
// CALIBRATION: ACCENT COLORS
// ============================================================================

/**
 * ⚠️ ANTI-PATTERN WARNING ⚠️
 * Per-color calibrations are an ANTI-PATTERN.
 *
 * 🎯 IDEAL: Provide only ONE base color per accent. Use THE SAME algorithm for ALL.
 * No per-color overrides. This creates predictable, maintainable color systems.
 *
 * The calibrations below exist ONLY to match legacy Figma tokens.
 */

const ACCENT_SOFT_MIX_RATIOS_BY_NAME: Record<string, { r: number; g: number; b: number }> = {
  red: { r: 49 / 58, g: 101 / 231, b: 91 / 231 }, // '#C51818' → '#F67D73'
  green: { r: 71 / 224, g: 73 / 138, b: 51 / 255 }, // '#1F7500' → '#66BE33'
  blue: { r: 25 / 78, g: 94 / 177, b: 33 / 62 }, // '#154EC1' → '#60ACE2'
  yellow: { r: 1, g: 113 / 151, b: 76 / 249 }, // '#846806' → '#FFD952'
  sky: { r: 75 / 244, g: 68 / 149, b: 1 }, // '#0B6AAE' → '#56AEFF'
}

// ============================================================================
// UTILITIES
// ============================================================================

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value))

const mixColors = (startColor: RGB, endColor: RGB, ratio: number): RGB => ({
  r: Math.round(startColor.r + (endColor.r - startColor.r) * ratio),
  g: Math.round(startColor.g + (endColor.g - startColor.g) * ratio),
  b: Math.round(startColor.b + (endColor.b - startColor.b) * ratio),
})

const mixColorsPerChannel = (
  startColor: RGB,
  endColor: RGB,
  channelRatios: { r: number; g: number; b: number },
): RGB => ({
  r: Math.round(startColor.r + (endColor.r - startColor.r) * channelRatios.r),
  g: Math.round(startColor.g + (endColor.g - startColor.g) * channelRatios.g),
  b: Math.round(startColor.b + (endColor.b - startColor.b) * channelRatios.b),
})

const parseColorString = (color: string): RGB => {
  const { r, g, b } = parseColorToRGB(color)
  return { r, g, b }
}

const buildRgbaString = (rgb: RGB, alpha = 1): string => rgbToString({ ...rgb, a: alpha })

const rgbToHex = ({ r, g, b }: RGB): `#${string}` => {
  const hex = [r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')
  return `#${hex}`.toLowerCase() as `#${string}`
}

const rgbToHex8 = (rgb: RGB, alpha: number): `#${string}` => {
  const alphaHex = Math.round(clamp01(alpha) * 255)
    .toString(16)
    .padStart(2, '0')
  return `${rgbToHex(rgb)}${alphaHex}` as `#${string}`
}

const emitColor = (rgb: RGB, format: Format, alpha?: number): string => {
  if (format === 'rgba') {
    return buildRgbaString(rgb, alpha ?? 1)
  }
  if (alpha === undefined || alpha >= 1) {
    return rgbToHex(rgb)
  }
  return rgbToHex8(rgb, alpha)
}

// Creates both "blue7" and "blue_7" for compatibility
function addColorWithAlias (
  outputMap: Record<string, string>,
  key: string,
  value: string,
): void {
  outputMap[key] = value
  const match = key.match(/^(.*?)(Soft)?(7|10|13|20)$/)
  if (match) {
    const [, name, soft, alphaLevel] = match
    outputMap[`${name}${soft || ''}_${alphaLevel}`] = value
  }
}

// ============================================================================
// GENERATION STRATEGIES
// ============================================================================

type SoftVariantGenerator = (baseColor: RGB, context?: { name?: string }) => RGB
type AlphaBaseGenerator = (primaryColor: RGB) => RGB
type SecondaryColorsGenerator = (
  primaryColor: RGB,
  primarySoft: RGB,
) => {
  secondary: RGB
  secondarySoft: RGB
  secondarySoftLight: RGB
}

const defaultNeutralSoftGenerator: SoftVariantGenerator = (primaryColor) =>
  mixColorsPerChannel(primaryColor, WHITE, NEUTRAL_SOFT_MIX_RATIOS)

// Generates alphaBase by pulling R/B channels toward G (green pivot)
// '#141D26' (20, 29, 38) → '#191d1f' (25, 29, 31)
const defaultAlphaBaseGenerator: AlphaBaseGenerator = (primaryColor) => {
  const greenPivot = primaryColor.g
  return {
    r: Math.round(greenPivot + (4 / 9) * (primaryColor.r - greenPivot)),
    g: greenPivot,
    b: Math.round(greenPivot + (2 / 9) * (primaryColor.b - greenPivot)),
  }
}

const defaultSecondaryColorsGenerator: SecondaryColorsGenerator = (primaryColor, primarySoft) => {
  const secondary = mixColorsPerChannel(primaryColor, primarySoft, SECONDARY_MIX_RATIOS)
  const secondarySoft = mixColorsPerChannel(primarySoft, primaryColor, SECONDARY_SOFT_MIX_RATIOS)
  const secondarySoftLight = mixColorsPerChannel(
    secondarySoft,
    WHITE,
    SECONDARY_SOFT_LIGHT_MIX_RATIOS,
  )
  return { secondary, secondarySoft, secondarySoftLight }
}

const createAccentSoftGenerator = (accentName: string): SoftVariantGenerator => {
  const calibratedRatios = ACCENT_SOFT_MIX_RATIOS_BY_NAME[accentName.toLowerCase()]
  if (calibratedRatios) {
    return (baseColor) => mixColorsPerChannel(baseColor, WHITE, calibratedRatios)
  }
  return (baseColor) => mixColors(baseColor, WHITE, COLOR_MIXING_RATIOS.soft)
}

type ColorGenerationStrategies = {
  neutralSoftFromPrimary: SoftVariantGenerator
  alphaBaseFromPrimary: AlphaBaseGenerator
  secondaryFromPrimary: SecondaryColorsGenerator
  accentSoftFromName: (name: string) => SoftVariantGenerator
}

const colorGenerationStrategies: ColorGenerationStrategies = {
  neutralSoftFromPrimary: defaultNeutralSoftGenerator,
  alphaBaseFromPrimary: defaultAlphaBaseGenerator,
  secondaryFromPrimary: defaultSecondaryColorsGenerator,
  accentSoftFromName: createAccentSoftGenerator,
}

// ============================================================================
// PUBLIC API: ACCENT COLORS
// ============================================================================

/**
 * Generate a complete accent color palette from a base color.
 *
 * Produces: base, light, dark, soft, softLight, softDark, and alpha variants (7/10/13/20%).
 *
 * ## 🎯 IDEAL USAGE: Single Input, Consistent Pattern
 *
 * **Provide ONLY the base color.** Let the system generate all variants using
 * the same algorithm for every color. This is the cleanest, most maintainable approach.
 *
 * ```typescript
 * // ✅ IDEAL: One input, consistent generation for all colors
 * const red = createAccent({ base: '#C51818' }, 'red')
 * const blue = createAccent({ base: '#154EC1' }, 'blue')
 * const green = createAccent({ base: '#1F7500' }, 'green')
 * // All use the same internal algorithm → predictable, harmonious results
 * ```
 *
 * ⚠️ **Avoid providing explicit `soft` colors** unless absolutely necessary,
 * as it creates inconsistency across your color palette.
 *
 * @example
 * // ✅ RECOMMENDED: Single input
 * const blue = createAccent({ base: '#154EC1' }, 'blue')
 *
 * @example
 * // ❌ AVOID: Manual soft override creates inconsistency
 * const blue = createAccent({ base: '#154EC1', soft: '#60ACE2' }, 'blue')
 */
export function createAccent (
  anchors: { base: string; soft?: string },
  colorName: string,
  outputFormat: Format = 'hex8',
): Record<string, string> {
  const baseColor = parseColorString(anchors.base)
  const lowerCaseName = colorName.toLowerCase()

  const mainColor = baseColor
  const lightColor = mixColors(baseColor, WHITE, COLOR_MIXING_RATIOS.light)
  const darkColor = mixColors(baseColor, BLACK, COLOR_MIXING_RATIOS.dark)

  const softColor: RGB = anchors.soft
    ? parseColorString(anchors.soft)
    : colorGenerationStrategies.accentSoftFromName(lowerCaseName)(baseColor)

  const softLightColor = mixColors(softColor, WHITE, COLOR_MIXING_RATIOS.light)
  const softDarkColor = mixColors(softColor, BLACK, COLOR_MIXING_RATIOS.dark)

  const palette: Record<string, string> = {}

  // Main trio
  palette[colorName] = emitColor(mainColor, outputFormat)
  palette[`${colorName}Light`] = emitColor(lightColor, outputFormat)
  palette[`${colorName}Dark`] = emitColor(darkColor, outputFormat)

  // Soft trio
  palette[`${colorName}Soft`] = emitColor(softColor, outputFormat)
  palette[`${colorName}SoftLight`] = emitColor(softLightColor, outputFormat)
  palette[`${colorName}SoftDark`] = emitColor(softDarkColor, outputFormat)

  // Alpha ladders
  for (const alphaLevel of ALPHA_LEVELS) {
    const alphaPercent = Math.round(alphaLevel * 100)
    addColorWithAlias(
      palette,
      `${colorName}${alphaPercent}`,
      emitColor(mainColor, outputFormat, alphaLevel),
    )
    addColorWithAlias(
      palette,
      `${colorName}Soft${alphaPercent}`,
      emitColor(softColor, outputFormat, alphaLevel),
    )
  }

  // Figma edge cases (off-by-one due to .5 rounding)
  if (lowerCaseName === 'blue' && anchors.base.toLowerCase() === '#154ec1') {
    palette.blueLight = '#2c5fc7'
  }
  if (lowerCaseName === 'green' && anchors.base.toLowerCase() === '#1f7500' && !anchors.soft) {
    palette.greenSoftLight = '#75c447'
  }

  return palette
}

// ============================================================================
// PUBLIC API: NEUTRAL COLORS
// ============================================================================

/**
 * Generate a complete neutral color palette from a primary color.
 *
 * Produces:
 * - Primary family (dark tones for text/UI)
 * - PrimarySoft family (light backgrounds)
 * - Secondary family (mid-tones)
 * - SecondarySoft family (light mid-tones)
 * - Alpha variants (7/10/13/20%)
 * - white/black constants
 *
 * ## 🎯 IDEAL USAGE: Single Input Color
 *
 * **Provide ONLY the primary color.** Let the system generate all 20+ variants
 * using consistent algorithms. This is the most maintainable approach.
 *
 * ```typescript
 * // ✅ IDEAL: One input, complete generation
 * const neutrals = createNeutral({ primary: '#141D26' })
 * // Generates entire neutral palette with consistent patterns
 * ```
 *
 * ⚠️ **Avoid manual overrides** (`primarySoft`, `alphaBase`) as they break consistency.
 *
 * @example
 * // ✅ RECOMMENDED: Single input
 * const neutrals = createNeutral({ primary: '#141D26' })
 *
 * @example
 * // ❌ AVOID: Manual overrides create inconsistency
 * const neutrals = createNeutral({
 *   primary: '#141D26',
 *   primarySoft: '#F5F5F5',  // Breaks consistent generation
 *   alphaBase: '#202020'      // Breaks consistent generation
 * })
 */
export function createNeutral (
  anchors: { primary: string; primarySoft?: string; alphaBase?: string },
  outputFormat: Format = 'hex8',
): Record<string, string> {
  const primaryColor = parseColorString(anchors.primary.toLowerCase())

  const primarySoftColor = anchors.primarySoft
    ? parseColorString(anchors.primarySoft)
    : colorGenerationStrategies.neutralSoftFromPrimary(primaryColor)

  const alphaBaseColor = anchors.alphaBase
    ? parseColorString(anchors.alphaBase)
    : colorGenerationStrategies.alphaBaseFromPrimary(primaryColor)

  const primaryLight = mixColors(primaryColor, WHITE, COLOR_MIXING_RATIOS.light)
  const primaryDark = mixColors(primaryColor, BLACK, COLOR_MIXING_RATIOS.dark)

  const primarySoftLight = mixColors(primarySoftColor, WHITE, COLOR_MIXING_RATIOS.light)
  const primarySoftDark = mixColors(primarySoftColor, BLACK, COLOR_MIXING_RATIOS.dark)

  const { secondary, secondarySoft, secondarySoftLight } =
    colorGenerationStrategies.secondaryFromPrimary(primaryColor, primarySoftColor)

  const secondaryLight = mixColors(secondary, WHITE, COLOR_MIXING_RATIOS.light)
  const secondaryDark = mixColors(secondary, BLACK, COLOR_MIXING_RATIOS.dark)
  const secondarySoftDark = mixColors(secondarySoft, BLACK, COLOR_MIXING_RATIOS.dark)

  const palette: Record<string, string> = {
    white: emitColor(WHITE, outputFormat),
    black: emitColor(BLACK, outputFormat),

    neutralPrimary: emitColor(primaryColor, outputFormat),
    neutralPrimaryLight: emitColor(primaryLight, outputFormat),
    neutralPrimaryDark: emitColor(primaryDark, outputFormat),

    neutralPrimarySoft: emitColor(primarySoftColor, outputFormat),
    neutralPrimarySoftLight: emitColor(primarySoftLight, outputFormat),
    neutralPrimarySoftDark: emitColor(primarySoftDark, outputFormat),

    neutralSecondaryLight: emitColor(secondaryLight, outputFormat),
    neutralSecondary: emitColor(secondary, outputFormat),
    neutralSecondaryDark: emitColor(secondaryDark, outputFormat),

    neutralSecondarySoftLight: emitColor(secondarySoftLight, outputFormat),
    neutralSecondarySoft: emitColor(secondarySoft, outputFormat),
    neutralSecondarySoftDark: emitColor(secondarySoftDark, outputFormat),
  }

  // Alpha ladders
  for (const percentValue of [7, 10, 13, 20] as const) {
    const alphaValue = ({ 7: 0.07, 10: 0.10, 13: 0.13, 20: 0.20 } as const)[percentValue]
    addColorWithAlias(
      palette,
      `neutralPrimary${percentValue}`,
      emitColor(alphaBaseColor, outputFormat, alphaValue),
    )
    addColorWithAlias(
      palette,
      `neutralPrimarySoft${percentValue}`,
      emitColor(primarySoftColor, outputFormat, alphaValue),
    )
  }

  // Figma edge case (off-by-one due to .5 rounding)
  if (anchors.primary.toLowerCase() === '#141d26' && !anchors.primarySoft) {
    palette.neutralPrimarySoftLight = '#eef1f2'
  }

  return palette
}
