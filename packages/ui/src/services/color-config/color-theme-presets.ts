import type { EssentialVariables } from './types'

export const colorsPresets: Record<string, EssentialVariables> = {
  light: {
    // Accent
    primary: '#154EC1',
    secondary: '#767C88',
    success: '#3D9209',
    info: '#158DE3',
    danger: '#E42222',
    warning: '#FFD43A',

    // Background Colors
    backgroundPrimary: '#FFFFFF',
    backgroundSecondary: '#FFFFFF',
    backgroundElement: '#F5F9FB',
    backgroundBorder: '#DEE5F2',

    // Text Colors
    textPrimary: '#262824',
    textInverted: '#FFFFFF',

    // Misc
    shadow: 'rgba(0, 0, 0, 0.12)',
    focus: '#FFFF00',
  },
  dark: {
    // Accent
    primary: '#00B4D8',
    secondary: '#767C88',
    success: '#3D9209',
    info: '#158DE3',
    danger: '#E42222',
    warning: '#FFD43A',

    // Background Colors
    backgroundPrimary: '#1F1F1F',
    backgroundSecondary: '#191919',
    backgroundElement: '#262626',
    backgroundBorder: '#363636',

    // Text Colors
    textPrimary: '#F1F1F1',
    textInverted: '#242424',

    // Misc
    shadow: 'rgba(0, 0, 0, 0.37)',
    focus: '#FF0',
  },
}
