import type { ColorConfig, ColorVariables, CssColor } from '../services/color-config'
import { computed } from 'vue'
import { GlobalConfig, useGlobalConfigSafe } from '../services/global-config/global-config'
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
  getTextColor as getTextColorBase,
  colorToRgba,
  getStateMaskGradientBackground,
} from '../services/color-config/color-functions'

import { cssVariableName, normalizeColorName } from '../services/color-config/utils'
import { ColorInput } from 'colortranslator/dist/@types'

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

  const { setGlobalConfig, globalConfig } = gc

  const colors = computed<ColorVariables>(() => globalConfig.value.colors!.variables)

  const setColors = (colors: Partial<ColorVariables>): void => {
    setGlobalConfig((config: GlobalConfig) => ({
      ...config,
      colors: {
        ...config.colors!,
        variables: {
          ...config.colors!.variables,
          ...colors as ColorVariables,
        },
      },
    }))
  }

  const getColors = (): ColorVariables => {
    return colors.value
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

    const colors = getColors()

    if (!prop) {
      prop = getColor(defaultColor)
    }

    const normalizedColor = normalizeColorName(prop)

    if (colors[normalizedColor]) {
      return preferVariables ? `var(${cssVariableName(prop)})` : colors[normalizedColor]
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

  const getTextColor = (color: ColorInput, darkColor = 'textDark', lightColor = 'textLight') => {
    return getTextColorBase(color, darkColor, lightColor, 120)
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
    colorToRgba,
    getStateMaskGradientBackground,
  }
}

export * from '../services/color-config/color-functions'
export * from '../services/color-config'
