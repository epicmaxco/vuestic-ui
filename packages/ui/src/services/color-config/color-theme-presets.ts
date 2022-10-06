import type { EssentialVariables } from './types'

export const colorsPresets: Record<string, EssentialVariables> = {
  light: {
    primary: '#154ec1',
    secondary: '#767C88',
    success: '#40e583',
    info: '#2c82e0',
    danger: '#DE1041',
    warning: '#FFAC0A',

    backgroundPrimary: '#ffffff',
    backgroundTertiary: '#ffffff',
    backgroundSecondary: '#f4f8fa',
    backgroundElement: '#babfc2',

    // Default
    textLight: '#fff',
    textDark: '#1B1A1F',
    // Misc
    shadow: 'rgba(0, 0, 0, 0.12)',
    focus: '#FF0',
  },
  dark: {
    // Accent
    primary: '#00b4d8',
    secondary: '#767C88',
    success: '#40e583',
    info: '#2c82e0',
    danger: '#de1041',
    warning: '#ffac0a',
    // Text Colors
    textDark: '#242424',
    textLight: '#f1f1f1',
    // Background Colors
    backgroundPrimary: '#1F1F1F',
    backgroundSecondary: '#333333',
    backgroundTertiary: '#262626',
    backgroundElement: '#767C88',
    // Misc
    shadow: 'rgba(0, 0, 0, 0.37)',
    focus: '#FF0',
  },
}
