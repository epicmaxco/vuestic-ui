import { GlobalConfig, setGlobalConfig, getGlobalConfig } from '../global-config/global-config'
import { getBoxShadowColor, getHoverColor, getFocusColor, getGradientBackground } from './color-functions'

export type HexColor = string // Hex color
export type ColorConfig = Record<string, HexColor>

// Most default color - fallback when nothing else is found.
export const DEFAULT_COLOR = '#000000'

export const setColors = (colors: Record<string, string>): void => {
  setGlobalConfig((config: GlobalConfig) => ({
    ...config,
    colors: { ...config.colors, ...colors },
  }))
}

export const getColors = (): Record<string, string> | undefined => {
  return getGlobalConfig().colors
}

export const getColor = (prop?: string, defaultColor: string = DEFAULT_COLOR) => {
  const colors = getColors() || {}

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
  }
}

/**
 * Check if color is valid css color
 * Taken from https://stackoverflow.com/a/56266358/5783475
 * @param strColor
 */
export const isCssColor = (strColor: string): boolean => {
  const s = new Option().style
  s.color = strColor
  return s.color !== ''
}
