export type CssColor = string

export type ColorConfigEssentialColors = {
  // Accent colors
  primary: CssColor,
  secondary: CssColor,
  success: CssColor,
  info: CssColor,
  danger: CssColor,
  warning: CssColor,
  // Background colors
  backgroundPrimary: CssColor,
  backgroundTertiary: CssColor,
  backgroundSecondary: CssColor,
  // TODO: Think about better name
  /** Form background in switch and borders in checkbox, ratio etc */
  backgroundElement: CssColor,
  // Text colors
  textLight: CssColor,
  textDark: CssColor,
  // Misc
  /** Cards, Navbar etc. shadow */
  shadow: CssColor,
  /** Outline color when component is focused */
  focus: CssColor,
}

export type ColorConfig = { [colorName: string]: CssColor } & ColorConfigEssentialColors
