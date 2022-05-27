export const enum ThemeName {
  DEFAULT = 'DEFAULT',
  DARK = 'DARK',
  CORPORATE = 'CORPORATE',
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
    success: '#40e583',
    info: '#2c82e0',
    danger: '#DE1041',
    warning: '#FFAC0A',

    background: '#ffffff',
    backgroundSoft: '#ffffff',
    backgroundMute: '#f4f8fa',

    // Default
    textLight: '#fff',
    textDark: '#1B1A1F',

    // Old
    gray: '#babfc2',
    dark: '#1B1A1F',
    white: '#ffffff',
  },
  [ThemeName.CORPORATE]: {
    primary: '#46DA8A',
    secondary: '#042F83',
    success: '#1FBDA1',
    info: '#71baff',
    danger: '#DE1041',
    warning: '#ffd652',
    gray: '#8396a5',
    dark: '#34495e',
  },
  [ThemeName.DARK]: {
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
    background: '#0d1117',
    backgroundMute: '#0a0d12',
    backgroundSoft: '#161b22',
    // Misc
    shadow: 'rgba(0, 0, 0, 0.37)',
    focus: 'yellow',
  },
}
