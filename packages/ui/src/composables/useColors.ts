import type { ColorVariables, CssColor } from '../services/color'
import { computed } from 'vue'
import { useGlobalConfig } from '../services/global-config/global-config'
import { warn } from '../utils/console'
import { useCache } from './useCache'
import { useReactiveComputed } from './useReactiveComputed'
import {
  getBoxShadowColor,
  getBoxShadowColorFromBg,
  getHoverColor,
  getFocusColor,
  getGradientBackground,
  isColor,
  shiftHSLAColor,
  setHSLAColor,
  isCSSVariable,
  colorToRgba,
  getStateMaskGradientBackground,
  getColorLightness,
  cssVariableName,
  normalizeColorName,
  type ColorInput,
} from '../services/color/utils'
import kebabCase from 'lodash/kebabCase'

/**
 * You can add these props to any component by destructuring them inside props option.
 * @example
 * props: { ...useColorProps, componentsOwnProp, etc. }
 * It's better to add props at the beginning to make sure that component own props will be used instead in case of collision.
 */
export const useColorProps = {
  color: {
    type: String,
    default: '',
  },
}

export const useColors = () => {
  const gc = useGlobalConfig()

  if (!gc) {
    throw new Error('useColors must be used in setup function or Vuestic GlobalConfigPlugin is not registered!')
  }

  const { globalConfig } = gc

  const colors = useReactiveComputed<ColorVariables>({
    get: () => globalConfig.value.colors!.presets[globalConfig.value.colors!.currentPresetName],
    set: (v: ColorVariables) => { setColors(v) },
  })

  const setColors = (colors: Partial<ColorVariables>): void => {
    globalConfig.value.colors!.presets[globalConfig.value.colors!.currentPresetName] = {
      ...globalConfig.value.colors.variables,
      ...colors,
    } as ColorVariables
  }

  const getColors = (): ColorVariables => {
    return colors
  }

  /**
   * Returns color from config variables by name or return prop if color is a valid hex, hsl, hsla, rgb or rgba color.
   * @param prop - should be color name or color in hex, hsl, hsla, rgb or rgba format.
   * @param preferVariables - function should return (if possible) CSS variable instead of hex (hex is needed to set opacity).
   * @param defaultColor - this color will be used if prop is invalid.
   */
  const getColor = (prop?: string, defaultColor?: string, preferVariables?: boolean): CssColor => {
    if (!defaultColor) {
      /**
       * Most default color - fallback when nothing else is found.
       */
      defaultColor = getColors().primary
    }

    if (prop === 'transparent') {
      return '#ffffff00'
    }

    if (prop === 'currentColor') {
      return prop
    }

    const colors = getColors()

    if (!prop) {
      prop = getColor(defaultColor)
    }

    const colorValue = colors[prop] || colors[normalizeColorName(prop)]
    if (colorValue) {
      return preferVariables ? `var(${cssVariableName(prop)})` : colorValue
    }

    if (isColor(prop)) {
      return prop
    }

    if (preferVariables && isCSSVariable(prop)) {
      return prop
    }

    warn(`'${prop}' is not a proper color! Use HEX or default color themes
      names (https://vuestic.dev/en/styles/colors#default-color-themes)`)

    return getColor(defaultColor)
  }

  const getComputedColor = (color: string) => {
    return computed({
      get () { return getColor(color) },
      set (v: string) { setColors({ [color]: v }) },
    })
  }

  const colorsToCSSVariable = (colors: { [colorName: string]: string | undefined }, prefix = 'va') => {
    return Object
      .keys(colors)
      .filter((key) => colors[key] !== undefined)
      .reduce((acc: Record<string, any>, colorName: string) => {
        acc[`--${prefix}-${kebabCase(colorName)}`] = getColor(colors[colorName], undefined, true)
        acc[`--${prefix}-on-${kebabCase(colorName)}`] = getColor(getTextColor(getColor(colors[colorName]!)), undefined, true)
        return acc
      }, {})
  }

  const cache = useCache()

  const getColorLightnessFromCache = (color: ColorInput) => {
    if (typeof color !== 'string') {
      return getColorLightness(color)
    }

    if (!cache.colorContrast[color]) {
      cache.colorContrast[color] = getColorLightness(color)
    }

    return cache.colorContrast[color]
  }

  const computedDarkColor = computed(() => {
    return getColorLightnessFromCache(getColor('textPrimary')) > globalConfig.value.colors.threshold ? 'textInverted' : 'textPrimary'
  })

  const computedLightColor = computed(() => {
    return getColorLightnessFromCache(getColor('textPrimary')) > globalConfig.value.colors.threshold ? 'textPrimary' : 'textInverted'
  })

  const getTextColor = (color: ColorInput, darkColor?: string, lightColor?: string) => {
    darkColor = darkColor || computedDarkColor.value
    lightColor = lightColor || computedLightColor.value
    return getColorLightnessFromCache(color) > globalConfig.value.colors.threshold ? darkColor : lightColor
  }

  const currentPresetName = computed<string>({
    get: () => globalConfig.value.colors!.currentPresetName,
    set: (v: string) => { applyPreset(v) },
  })
  const presets = computed(() => globalConfig.value.colors!.presets)

  const applyPreset = (presetName: string) => {
    globalConfig.value.colors!.currentPresetName = presetName
    if (!globalConfig.value.colors!.presets[presetName]) {
      return warn(`Preset ${presetName} does not exist`)
    }
  }

  return {
    colors,
    currentPresetName,
    presets,
    applyPreset,
    setColors,
    getColors,
    getColor,
    getComputedColor,
    getBoxShadowColor,
    getBoxShadowColorFromBg,
    getHoverColor,
    getFocusColor,
    getGradientBackground,
    getTextColor,
    shiftHSLAColor,
    setHSLAColor,
    colorsToCSSVariable,
    colorToRgba,
    getStateMaskGradientBackground,
  }
}

export * from '../services/color/utils'
export * from '../services/color'
