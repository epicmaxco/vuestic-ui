import { GlobalConfig, useGlobalConfigSafe } from '../services/global-config/global-config'
import {
  getBoxShadowColor,
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

export type CssColor = string
export type ColorConfig = { [colorName: string]: CssColor }

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
  const globalConfig = useGlobalConfigSafe()

  if (!globalConfig) {
    throw new Error('useColors must be used in setup function or Vuestic GlobalConfigPlugin is not registered!')
  }

  const { setGlobalConfig, getGlobalConfig } = globalConfig

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
      prop = defaultColor
    }

    if (colors[prop]) {
      return preferVariables ? `var(--va-${prop})` : colors[prop]
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

    return defaultColor
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
    isLightBackground,
    colorToRgba,
    getStateMaskGradientBackground,
  }
}
