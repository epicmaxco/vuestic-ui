export const enum ThemeName {
  DEFAULT = 'DEFAULT',
  DARK = 'DARK',
  // CORPORATE = 'CORPORATE',
}

export const ThemeNameIterator = [
  ThemeName.DEFAULT,
  // ThemeName.CORPORATE,
  ThemeName.DARK,
]

export const COLOR_THEMES: Record<ThemeName, Record<string, string>> = {
  [ThemeName.DEFAULT]: {
    primary: '#2550c0',
    secondary: '#767c88',
    success: '#40e583',
    info: '#2c82e0',
    danger: '#de1041',
    warning: '#ffac0a',

    backgroundPrimary: '#ffffff',
    backgroundTertiary: '#ffffff',
    backgroundSecondary: '#f4f8fa',
    backgroundElement: '#babfc2',

    // Default
    textLight: '#ffffff',
    textDark: '#1b1a1f',
    // Misc
    shadow: 'rgba(0, 0, 0, 0.12)',
    focus: '#ffff00',
  },
  [ThemeName.DARK]: {
    // Accent
    primary: '#00b4d8',
    secondary: '#767c88',
    success: '#40e583',
    info: '#2c82e0',
    danger: '#de1041',
    warning: '#ffac0a',
    // Text Colors
    textDark: '#242424',
    textLight: '#f1f1f1',
    // Background Colors
    backgroundPrimary: '#1f1f1f',
    backgroundSecondary: '#333333',
    backgroundTertiary: '#262626',
    backgroundElement: '#767c88',
    // Misc
    shadow: 'rgba(0, 0, 0, 0.37)',
    focus: '#ffff00',
  },
}
