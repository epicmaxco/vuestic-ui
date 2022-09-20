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
    primary: '#2550C0',
    secondary: '#767C88',
    success: '#40E583',
    info: '#2C82E0',
    danger: '#DE1041',
    warning: '#FFAC0A',

    backgroundPrimary: '#FFFFFF',
    backgroundTertiary: '#FFFFFF',
    backgroundSecondary: '#F4F8FA',
    backgroundElement: '#BABFC2',

    // Default
    textLight: '#FFF',
    textDark: '#1B1A1F',
    // Misc
    shadow: 'rgba(0, 0, 0, 0.12)',
    focus: '#FF0',
  },
  [ThemeName.DARK]: {
    // Accent
    primary: '#00B4D8',
    secondary: '#767C88',
    success: '#40E583',
    info: '#2C82E0',
    danger: '#DE1041',
    warning: '#FFAC0A',
    // Text Colors
    textDark: '#242424',
    textLight: '#F1F1F1',
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
