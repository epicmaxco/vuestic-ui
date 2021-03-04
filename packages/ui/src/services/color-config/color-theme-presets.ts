import { HexColor } from './color-config'

type VuesticThemePreset = {
  primary: HexColor,
  secondary: HexColor,
  success: HexColor,
  info: HexColor,
  danger: HexColor,
  warning: HexColor,
  gray: HexColor,
  dark: HexColor,
}

export const colorThemes: Record<string, VuesticThemePreset> = {
  default: {
    primary: '#23e066',
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
  }
}
