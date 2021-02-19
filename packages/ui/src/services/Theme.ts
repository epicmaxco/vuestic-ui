import { GlobalConfig, useGlobalConfig } from './GlobalConfigPlugin'

// Most default color - fallback when nothing else is found.
export const DEFAULT_COLOR = '#000000'

// This object is intended to be mutable, so that other services can observe it.
export const DEFAULT_THEME = {
  primary: '#23e066',
  secondary: '#002c85',
  success: '#40e583',
  info: '#2c82e0',
  danger: '#e34b4a',
  warning: '#ffc200',
  gray: '#b4b6b9',
  dark: '#34495e',
}

export const THEME_NAMES = {
  DEFAULT: 'DEFAULT',
  CORPORATE: 'CORPORATE',
}

export const COLOR_THEMES = [
  {
    name: THEME_NAMES.DEFAULT,
    themes: {
      primary: '#40e583',
      secondary: '#002c85',
      success: '#40e583',
      info: '#2c82e0',
      danger: '#e34b4a',
      warning: '#ffc200',
      gray: '#babfc2',
      dark: '#34495e',
    },
  },
  {
    name: THEME_NAMES.CORPORATE,
    themes: {
      primary: '#6c7fee',
      secondary: '#6e7ff1',
      success: '#8ddc88',
      info: '#71baff',
      danger: '#f8706d',
      warning: '#ffd652',
      gray: '#8396a5',
      dark: '#34495e',
    },
  },
]

export const useTheme = () => {
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
