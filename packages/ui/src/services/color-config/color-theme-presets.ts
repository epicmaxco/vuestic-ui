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
}

export const colorsPresets: Record<string, VuesticColorsPreset> = {
  default: {
    primary: '#154EC1',
    secondary: '#767C88',
    success: '#3D9209',
    info: '#1E9CE3',
    danger: '#E42222',
    warning: '#FFD43A',
    background: '#F5F9FB',
    divider: '#E1E9F8',
    gray: '#babfc2',
    dark: '#262824',
  },
}
