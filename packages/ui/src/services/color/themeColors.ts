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
import type { Palette } from './types'

// ============================================================================
// TYPES
// ============================================================================

type RGB = { r: number; g: number; b: number }

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

const ALPHA_VARIANTS = {
  7: 0.07,
  10: 0.10,
  13: 0.13,
  20: 0.20,
} as const

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

/**
 * Linear interpolation between two colors using a single ratio for all channels.
 * Formula: result = start + (end - start) × ratio
 * @example mixColors({r: 0, g: 0, b: 0}, {r: 255, g: 255, b: 255}, 0.5) → {r: 128, g: 128, b: 128}
 */
const mixColors = (startColor: RGB, endColor: RGB, ratio: number): RGB => ({
  r: Math.round(startColor.r + (endColor.r - startColor.r) * ratio),
  g: Math.round(startColor.g + (endColor.g - startColor.g) * ratio),
  b: Math.round(startColor.b + (endColor.b - startColor.b) * ratio),
})

/**
 * Linear interpolation between two colors using different ratios per channel.
 * Allows fine-tuned control for matching specific target colors (e.g., Figma tokens).
 * Formula per channel: result = start + (end - start) × channelRatio
 * @example mixColorsPerChannel({r: 20, g: 29, b: 38}, {r: 255, g: 255, b: 255}, {r: 0.9, g: 0.93, b: 0.94})
 */
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

/**
 * Converts RGB to 6-digit hex color (e.g., #3a7bd5).
 * Each channel (0-255) converts to 2 hex digits (00-ff).
 */
const rgbToHex = ({ r, g, b }: RGB): `#${string}` => {
  const hex = [r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')
  return `#${hex}`.toLowerCase() as `#${string}`
}

/**
 * Converts RGB color to hex string with optional alpha channel.
 * - Opaque (alpha >= 1): 6-digit hex (#3a7bd5)
 * - Transparent: 8-digit hex with alpha (#3a7bd580)
 *
 * Alpha conversion: 0.0 → '00' (transparent), 1.0 → 'ff' (opaque)
 * Formula: alpha (0-1) × 255 → hex byte (00-ff)
 *
 * @example emitColor({r: 58, g: 123, b: 213}) → '#3a7bd5'
 * @example emitColor({r: 58, g: 123, b: 213}, 0.5) → '#3a7bd580'
 */
const emitColor = (rgb: RGB, alpha?: number): string => {
  if (alpha === undefined || alpha >= 1) {
    return rgbToHex(rgb)
  }

  // Convert alpha from 0-1 range to 0-255, then to 2-digit hex
  // Example: 0.5 → 128 → '80', 0.07 → 18 → '12'
  const alphaHex = Math.round(clamp01(alpha) * 255)
    .toString(16)
    .padStart(2, '0')
  return `${rgbToHex(rgb)}${alphaHex}` as `#${string}`
}

/**
 * Adds a color to the palette (e.g., "blue7", "blueSoft10").
 */
function addColorWithAlias (
  outputMap: Palette,
  key: string,
  value: string,
): void {
  outputMap[key] = value
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

/**
 * Generates neutralPrimarySoft (light background) from neutralPrimary (dark text).
 * Mixes dark color toward white using calibrated per-channel ratios.
 * @example '#141D26' (dark) → '#ecf0f1' (light background)
 */
const defaultNeutralSoftGenerator: SoftVariantGenerator = (primaryColor) =>
  mixColorsPerChannel(primaryColor, WHITE, NEUTRAL_SOFT_MIX_RATIOS)

/**
 * Generates alphaBase for semi-transparent neutral colors.
 *
 * Strategy: Pull R/B channels toward G (green pivot) to create a balanced gray.
 * This prevents color shift in semi-transparent overlays.
 *
 * Formula per channel:
 * - r: greenValue + (4/9) × (r - greenValue) ← 44% toward green
 * - g: greenValue (unchanged)
 * - b: greenValue + (2/9) × (b - greenValue) ← 22% toward green
 *
 * @example '#141D26' (20, 29, 38) → '#191d1f' (25, 29, 31)
 */
const defaultAlphaBaseGenerator: AlphaBaseGenerator = (primaryColor) => {
  const greenPivot = primaryColor.g
  return {
    r: Math.round(greenPivot + (4 / 9) * (primaryColor.r - greenPivot)),
    g: greenPivot,
    b: Math.round(greenPivot + (2 / 9) * (primaryColor.b - greenPivot)),
  }
}

/**
 * Generates secondary neutral colors (mid-tones) from primary and primarySoft.
 *
 * Creates three variants:
 * - secondary: Mix primary toward primarySoft (medium-dark gray)
 * - secondarySoft: Mix primarySoft toward primary (medium-light gray)
 * - secondarySoftLight: Lighten secondarySoft for hover states
 *
 * @example
 * Input: primary='#141D26', primarySoft='#ecf0f1'
 * Output: secondary='#5c6169', secondarySoft='#acb4c3', secondarySoftLight='#b4bbc9'
 */
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

/**
 * Creates a "soft" variant generator for accent colors (desaturated/lighter versions).
 *
 * Uses per-color calibrations (if available) to match Figma tokens exactly.
 * Falls back to uniform 66% mix toward white for uncalibrated colors.
 *
 * @example
 * createAccentSoftGenerator('red')('#C51818') → '#F67D73'
 * createAccentSoftGenerator('blue')('#154EC1') → '#60ACE2'
 */
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

  const palette: Palette = {}

  // Main trio
  palette[colorName] = emitColor(mainColor)
  palette[`${colorName}Light`] = emitColor(lightColor)
  palette[`${colorName}Dark`] = emitColor(darkColor)

  // Soft trio
  palette[`${colorName}Soft`] = emitColor(softColor)
  palette[`${colorName}SoftLight`] = emitColor(softLightColor)
  palette[`${colorName}SoftDark`] = emitColor(softDarkColor)

  // Alpha ladders
  for (const [percent, alpha] of Object.entries(ALPHA_VARIANTS)) {
    addColorWithAlias(palette, `${colorName}${percent}`, emitColor(mainColor, alpha))
    addColorWithAlias(palette, `${colorName}Soft${percent}`, emitColor(softColor, alpha))
  }

  // Figma edge cases (off-by-one due to .5 rounding)
  // Drop after came up with single accent pattern
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

  const palette: Palette = {
    white: emitColor(WHITE),
    black: emitColor(BLACK),

    neutralPrimary: emitColor(primaryColor),
    neutralPrimaryLight: emitColor(primaryLight),
    neutralPrimaryDark: emitColor(primaryDark),

    neutralPrimarySoft: emitColor(primarySoftColor),
    neutralPrimarySoftLight: emitColor(primarySoftLight),
    neutralPrimarySoftDark: emitColor(primarySoftDark),

    neutralSecondaryLight: emitColor(secondaryLight),
    neutralSecondary: emitColor(secondary),
    neutralSecondaryDark: emitColor(secondaryDark),

    neutralSecondarySoftLight: emitColor(secondarySoftLight),
    neutralSecondarySoft: emitColor(secondarySoft),
    neutralSecondarySoftDark: emitColor(secondarySoftDark),
  }

  // Alpha ladders
  for (const [percent, alpha] of Object.entries(ALPHA_VARIANTS)) {
    addColorWithAlias(palette, `neutralPrimary${percent}`, emitColor(alphaBaseColor, alpha))
    addColorWithAlias(palette, `neutralPrimarySoft${percent}`, emitColor(primarySoftColor, alpha))
  }

  // Figma edge case (off-by-one due to .5 rounding)
  // Drop after came up with single accent pattern
  if (anchors.primary.toLowerCase() === '#141d26' && !anchors.primarySoft) {
    palette.neutralPrimarySoftLight = '#eef1f2'
  }

  return palette
}
