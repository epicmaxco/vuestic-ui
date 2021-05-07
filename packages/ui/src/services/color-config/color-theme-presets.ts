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
}

export const colorsPresets: Record<string, VuesticColorsPreset> = {
  default: {
    primary: '#3a6ed2',
    secondary: '#002c85',
    success: '#40e583',
    info: '#2c82e0',
    danger: '#e34b4a',
    warning: '#ffc200',
    gray: '#babfc2',
    dark: '#34495e',
  },
  corporate: {
    primary: '#6c7fee',
    secondary: '#6e7ff1',
    success: '#8ddc88',
    info: '#71baff',
    danger: '#f8706d',
    warning: '#ffd652',
    gray: '#8396a5',
    dark: '#34495e',
  },
}
