import type { ColorConfigEssentialColors } from './types'

export const colorsPresets: Record<string, ColorConfigEssentialColors> = {
  default: {
    // Accent
    primary: '#154ec1',
    secondary: '#767C88',
    success: '#40e583',
    info: '#2c82e0',
    danger: '#DE1041',
    warning: '#FFAC0A',
    // Text Colors
    textDark: '#242424',
    textLight: '#F1F1F1',
    // Background Colors
    backgroundPrimary: '#161b21',
    backgroundSecondary: '#0d1118',
    backgroundTertiary: '#21262c',
    backgroundElement: '#babfc2',
    // Misc
    shadow: 'rgba(0, 0, 0, 0.12)',
    focus: '#ffc700',
  },
}
