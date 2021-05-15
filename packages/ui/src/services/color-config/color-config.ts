import { GlobalConfig, setGlobalConfig, getGlobalConfig } from '../global-config/global-config'
import {
  getBoxShadowColor,
  getHoverColor, getFocusColor,
  getGradientBackground, isCssColor,
  getTextColor, shiftHSLAColor,
} from './color-functions'

export type CssColor = string
export type ColorConfig = { [colorName: string]: CssColor }

// Most default color - fallback when nothing else is found.
export const DEFAULT_COLOR = '#000000'

export const setColors = (colors: ColorConfig): void => {
  setGlobalConfig((config: GlobalConfig) => ({
    ...config,
    colors: { ...config.colors, ...colors },
  }))
}

export const getColors = (): ColorConfig => {
  return getGlobalConfig().colors || {}
}

export const getColor = (prop?: string, defaultColor: string = DEFAULT_COLOR): CssColor => {
  const colors = getColors()

  if (!prop) {
    prop = defaultColor
  }

  if (colors[prop]) {
    return colors[prop]
  }

  if (isCssColor(prop)) {
    return prop
  }

  return defaultColor
}

// Here expose methods that user wants to use in vue component
export const useColors = () => {
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
  }
}
