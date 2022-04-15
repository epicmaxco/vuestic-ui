import { GlobalConfig, useGlobalConfig } from '../global-config/global-config'
import {
  getBoxShadowColor,
  getHoverColor,
  getFocusColor,
  getGradientBackground,
  isColor,
  getTextColor,
  shiftHSLAColor,
  setHSLAColor,
} from './color-functions'

export type CssColor = string
export type ColorConfig = { [colorName: string]: CssColor }

// Here expose methods that user wants to use in vue component
export const useColors = () => {
  const { setGlobalConfig, getGlobalConfig } = useGlobalConfig()

  const setColors = (colors: ColorConfig): void => {
    setGlobalConfig((config: GlobalConfig) => ({
      ...config,
      colors: { ...config.colors, ...colors },
    }))
  }

  const getColors = (): ColorConfig => {
    return getGlobalConfig().colors || {}
  }

  /**
   * Most default color - fallback when nothing else is found.
   */
  const DEFAULT_COLOR = getColors().primary

  /**
   * Returns color from config by name or return prop if color is a valid hex, hsl, hsla, rgb or rgba color.
   * @param prop - should be color name or color in hex, hsl, hsla, rgb or rgba format.
   * @param preferVariables - function should return (if possible) CSS variable instead of hex (hex is needed to set opacity).
   * @param defaultColor - this color will be used if prop is invalid.
   */
  const getColor = (prop?: string, defaultColor: string = DEFAULT_COLOR, preferVariables?: boolean): CssColor => {
    const colors = getColors()

    if (!prop) {
      prop = defaultColor
    }

    if (colors[prop]) {
      return preferVariables ? `var(--va-${prop})` : colors[prop]
    }

    if (isColor(prop)) {
      return prop
    }

    if (process.env.NODE_ENV !== 'production') {
      console.warn(`'${prop}' is not a proper color! Use HEX or default color themes
    names (https://vuestic.dev/en/styles/colors#default-color-themes)`)
    }

    return defaultColor
  }

  const colorsToCSSVariable = (colors: { [colorName: string]: string | undefined }, prefix = 'va') => {
    return Object
      .keys(colors)
      .filter((key) => colors[key] !== undefined)
      .reduce((acc: Record<string, any>, colorName: string) => {
        acc[`--${prefix}-${colorName}`] = getColor(colors[colorName], DEFAULT_COLOR, true)
        return acc
      }, {})
  }

  return {
    setColors,
    getColors,
    getColor,
    getBoxShadowColor,
    getHoverColor,
    getFocusColor,
    getGradientBackground,
    getTextColor,
    shiftHSLAColor,
    setHSLAColor,
    colorsToCSSVariable,
  }
}

export const setColors = (colors: ColorConfig): void => {
  useColors().setColors(colors)
}

export const getColors = (): ColorConfig => {
  return useColors().getColors()
}

/**
 * Returns color from config by name or return prop if color is a valid hex, hsl, hsla, rgb or rgba color.
 * @param prop - should be color name or color in hex, hsl, hsla, rgb or rgba format.
 * @param preferVariables - function should return (if possible) CSS variable instead of hex (hex is needed to set opacity).
 * @param defaultColor - this color will be used if prop is invalid.
 */
export const getColor = (prop?: string, defaultColor?: string, preferVariables?: boolean): CssColor => {
  return useColors().getColor(prop, defaultColor, preferVariables)
}

export const colorsToCSSVariable = (colors: { [colorName: string]: string | undefined }, prefix = 'va') => {
  return useColors().colorsToCSSVariable(colors, prefix)
}
