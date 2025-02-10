import type { ColorVariables, CssColor } from '../services/color'
import { capitalize, computed } from 'vue'
import { useGlobalConfig } from '../services/global-config/global-config'
import { warn } from '../utils/console'
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
import { camelCaseToKebabCase } from '../utils/text-case'
import { useAppGlobal } from './std'

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
      defaultColor = colors.primary
    }

    if (prop === 'transparent') {
      return '#ffffff00'
    }

    if (prop === 'currentColor') {
      return prop
    }

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

    if (prop?.startsWith('on')) {
      const colorName = prop.slice(2)

      if (colors[normalizeColorName(colorName)]) {
        return getColor(getTextColor(getColor(colorName)), undefined, preferVariables)
      }
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
        acc[`--${prefix}-${camelCaseToKebabCase(colorName)}`] = getColor(colors[colorName], undefined, true)
        acc[`--${prefix}-on-${camelCaseToKebabCase(colorName)}`] = getColor(getTextColor(getColor(colors[colorName]!)), undefined, true)
        return acc
      }, {})
  }

  const colorContrastCache = useAppGlobal('colorContrastCache', new Map<string, number>())

  const getColorLightnessFromCache = (color: ColorInput) => {
    if (typeof color !== 'string') {
      return getColorLightness(color)
    }

    if (!colorContrastCache.value.has(color)) {
      colorContrastCache.value.set(color, getColorLightness(color))
    }

    return colorContrastCache.value.get(color)!
  }

  const computedDarkColor = computed(() => {
    return getColorLightnessFromCache(getColor('textPrimary')) > (255 / 2) ? 'textInverted' : 'textPrimary'
  })

  const computedLightColor = computed(() => {
    return getColorLightnessFromCache(getColor('textPrimary')) > (255 / 2) ? 'textPrimary' : 'textInverted'
  })

  const getTextColor = (color: ColorInput, darkColor?: string, lightColor?: string) => {
    const onColorName = `on${capitalize(String(color))}`
    if (colors[onColorName]) {
      return colors[onColorName]
    }

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
