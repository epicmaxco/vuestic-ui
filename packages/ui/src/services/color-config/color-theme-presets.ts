import { CssColor } from '../../composables'

type VuesticColorsPreset = {
  // Accent colors
  primary: CssColor,
  secondary: CssColor,
  success: CssColor,
  info: CssColor,
  danger: CssColor,
  warning: CssColor,
  // Background colors
  background: CssColor,
  backgroundSoft: CssColor,
  backgroundMute: CssColor,
  // Text colors
  textLight: CssColor,
  textDark: CssColor,
  // Misc
  /** Cards, Navbar etc. shadow */
  shadow: CssColor,
  /** Outline color when component is focused */
  focus: CssColor,

  // TODO: Think about better name
  /** Form background in switch and borders in checkbox, ratio etc */
  form: CssColor,
}

export const colorsPresets: Record<string, VuesticColorsPreset> = {
  default: {
    // Accent
    primary: '#2C82E0',
    secondary: '#767C88',
    success: '#40e583',
    info: '#2c82e0',
    danger: '#DE1041',
    warning: '#FFAC0A',
    // Text Colors
    textDark: '#242424',
    textLight: '#F1F1F1',
    // Background Colors
    background: '#161b21',
    backgroundMute: '#0d1118',
    backgroundSoft: '#21262c',
    // Misc
    shadow: 'rgba(0, 0, 0, 0.12)',
    focus: '#ffc700',
    form: '#babfc2',
  },
}
