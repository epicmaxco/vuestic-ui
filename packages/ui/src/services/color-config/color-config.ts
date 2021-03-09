import { GlobalConfig, useGlobalConfig } from '../GlobalConfigPlugin'

export type HexColor = string // Hex color
export type ColorConfig = Record<string, HexColor>

// Most default color - fallback when nothing else is found.
export const DEFAULT_COLOR = '#000000'

export const setupColors = () => {
  const { setGlobalConfig, getGlobalConfig } = useGlobalConfig()

  if (!setGlobalConfig && !getGlobalConfig) {
    return
  }

  const setColors = (theme: Record<string, string>): void => {
    setGlobalConfig((config: GlobalConfig) => ({
      ...config,
      theme: { ...config.colors, ...theme },
    }))
  }

  const getColors = (): Record<string, string> | undefined => {
    return getGlobalConfig().theme
  }

  return {
    setColors,
    getColors,
  }
}
