import type { EssentialVariables } from './types'

export const colorsPresets: Record<string, EssentialVariables> = {
  light: {
    // Accent
    primary: '#154ec1',
    secondary: '#767C88',
    success: '#3D9209',
    info: '#158DE3',
    danger: '#E42222',
    warning: '#FFD43A',

    // Background Colors
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#F5F9FB',
    backgroundElement: '#F5F9FB',
    backgroundBorder: '#DEE5F2',

    // Text Colors
    textPrimary: '#262824',
    textInverted: '#fff',
    // Misc
    shadow: 'rgba(0, 0, 0, 0.12)',
    focus: '#FF0',
  },
  dark: {
    // Accent
    primary: '#00b4d8',
    secondary: '#767C88',
    success: '#3D9209',
    info: '#158DE3',
    danger: '#E42222',
    warning: '#FFD43A',
    // Text Colors
    textPrimary: '#f1f1f1',
    textInverted: '#242424',
    // Background Colors
    backgroundPrimary: '#1F1F1F',
    backgroundElement: '#262626',
    backgroundSecondary: '#262626',
    backgroundBorder: '#363636',

    // backgroundElementTEMP: '#767C88',
    // Misc
    shadow: 'rgba(0, 0, 0, 0.37)',
    focus: '#FF0',
  },
}
