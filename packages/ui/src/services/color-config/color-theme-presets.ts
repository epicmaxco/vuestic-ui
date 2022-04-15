import { CssColor } from './color-config'

type VuesticColorsPreset = {
  primary: CssColor,
  secondary: CssColor,
  success: CssColor,
  info: CssColor,
  danger: CssColor,
  warning: CssColor,
  gray: CssColor,
  dark: CssColor,
  background: CssColor,
  divider: CssColor,
  white: CssColor,
  black: CssColor,
}

export const colorsPresets: Record<string, VuesticColorsPreset> = {
  default: {
    primary: '#2C82E0',
    secondary: '#767C88',
    background: '#f4f8fa',
    success: '#40e583',
    info: '#2c82e0',
    danger: '#DE1041',
    warning: '#FFAC0A',
    gray: '#babfc2',
    dark: '#1B1A1F',
    divider: '#E1E9F8',
    white: '#ffffff',
    black: '#000000',
  },
}
