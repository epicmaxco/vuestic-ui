import { GlobalConfig, useGlobalConfig } from '../GlobalConfigPlugin'

export type HexColor = string // Hex color
export type ColorConfig = Record<string, HexColor>

// Most default color - fallback when nothing else is found.
export const DEFAULT_COLOR = '#000000'

export const setupTheme = () => {
  const { setGlobalConfig, getGlobalConfig } = useGlobalConfig()

  if (!setGlobalConfig && !getGlobalConfig) {
    return
  }

  const setTheme = (theme: Record<string, string>): void => {
    setGlobalConfig((config: GlobalConfig) => ({
      ...config,
      theme: { ...config.theme, ...theme },
    }))
  }

  const getTheme = (): Record<string, string> | undefined => {
    return getGlobalConfig().theme
  }

  return {
    setTheme,
    getTheme,
  }
}
