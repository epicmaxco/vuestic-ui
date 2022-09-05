import type { ColorConfig, CssColor } from '../services/color-config'
import { computed } from 'vue'
import { GlobalConfig, useGlobalConfigSafe } from '../services/global-config/global-config'
import {
  getBoxShadowColor,
  getBoxShadowColorFromBg,
  getHoverColor,
  getFocusColor,
  getGradientBackground,
  isColor,
  getTextColor,
  shiftHSLAColor,
  setHSLAColor,
  isCSSVariable,
  isLightBackground,
  colorToRgba,
  getStateMaskGradientBackground,
} from '../services/color-config/color-functions'

import { cssVariableName, normalizeColorName } from '../services/color-config/utils'

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
  const gc = useGlobalConfigSafe()

  if (!gc) {
    throw new Error('useColors must be used in setup function or Vuestic GlobalConfigPlugin is not registered!')
  }

  const { setGlobalConfig, getGlobalConfig, globalConfig } = gc

  const colors = computed(() => globalConfig.value.colors || {})

  const setColors = (colors: Partial<ColorConfig>): void => {
    setGlobalConfig((config: GlobalConfig) => ({
      ...config,
      colors: { ...config.colors, ...colors } as ColorConfig,
    }))
  }

  const getColors = (): ColorConfig => {
    return getGlobalConfig().colors!
  }

  /**
   * Returns color from config by name or return prop if color is a valid hex, hsl, hsla, rgb or rgba color.
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

    const colors = getColors()

    if (!prop) {
      prop = getColor(defaultColor)
    }

    const normalizedColor = normalizeColorName(prop)

    if (colors[normalizedColor]) {
      return preferVariables ? `var(${cssVariableName(prop)}` : colors[normalizedColor]
    }

    if (isColor(prop)) {
      return prop
    }

    if (preferVariables && isCSSVariable(prop)) {
      return prop
    }

    if (process.env.NODE_ENV !== 'production') {
      console.warn(`'${prop}' is not a proper color! Use HEX or default color themes
      names (https://vuestic.dev/en/styles/colors#default-color-themes)`)
    }

    return getColor(defaultColor)
  }

  const getComputedColor = (color: string) => {
    return computed(() => getColor(color))
  }

  const colorsToCSSVariable = (colors: { [colorName: string]: string | undefined }, prefix = 'va') => {
    return Object
      .keys(colors)
      .filter((key) => colors[key] !== undefined)
      .reduce((acc: Record<string, any>, colorName: string) => {
        acc[`--${prefix}-${colorName}`] = getColor(colors[colorName], undefined, true)
        return acc
      }, {})
  }

  return {
    colors,
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
    isLightBackground,
    colorToRgba,
    getStateMaskGradientBackground,
  }
}

export * from '../services/color-config/color-functions'
export * from '../services/color-config'
