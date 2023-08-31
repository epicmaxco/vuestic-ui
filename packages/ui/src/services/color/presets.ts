import type { EssentialVariables } from './types'

export const presets: Record<string, EssentialVariables> = {
  light: {
    // Accent
    primary: '#154EC1',
    secondary: '#767C88',
    success: '#3D9209',
    info: '#158DE3',
    danger: '#E42222',
    warning: '#FFD43A',

    // Background Colors
    backgroundPrimary: '#f6f6f6',
    backgroundSecondary: '#FFFFFF',
    backgroundElement: '#ECF0F1',
    backgroundBorder: '#DEE5F2',

    // Text Colors
    textPrimary: '#262824',
    textInverted: '#FFFFFF',

    // Misc
    shadow: 'rgba(0, 0, 0, 0.12)',
    focus: '#49A8FF',
    transparent: 'rgba(0, 0, 0, 0)',
  },
  dark: {
    // Accent
    primary: '#3472F0',
    secondary: '#767C88',
    success: '#66BE33',
    info: '#3EAAF8',
    danger: '#F34030',
    warning: '#FFD952',

    // Background Colors
    backgroundPrimary: '#050A10',
    backgroundSecondary: '#1F262F',
    backgroundElement: '#131A22',
    backgroundBorder: '#3D4C58',

    // Text Colors
    textPrimary: '#F1F1F1',
    textInverted: '#0B121A',

    // Misc
    shadow: 'rgba(255, 255, 255, 0.12)',
    focus: '#49A8FF',
    transparent: 'rgba(0, 0, 0, 0)',
  },
}
