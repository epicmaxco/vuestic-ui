import { GlobalConfig, useGlobalConfig } from '../GlobalConfigPlugin'

export type HexColor = string // Hex color
export type ColorConfig = Record<string, HexColor>

// Most default color - fallback when nothing else is found.
export const DEFAULT_COLOR = '#000000'

export const useColors = () => {
  const { setGlobalConfig, getGlobalConfig } = useGlobalConfig()

  const setColors = (colors: Record<string, string>): void => {
    setGlobalConfig((config: GlobalConfig) => ({
      ...config,
      colors: { ...config.colors, ...colors },
    }))
  }

  const getColors = (): Record<string, string> | undefined => {
    return getGlobalConfig().colors
  }

  return {
    setColors,
    getColors,
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

export const useColor = () => {
  const { getColors = () => ({}) } = useColors() as any || {}
  const colors = getColors() || {}

  return (prop?: string, defaultColor: string = DEFAULT_COLOR): string => {
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
}
