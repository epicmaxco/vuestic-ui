export type CssColor = string

export type EssentialVariables = {
  // Accent
  primary: CssColor,
  secondary: CssColor,
  success: CssColor,
  info: CssColor,
  danger: CssColor,
  warning: CssColor,

  // Background Colors
  backgroundPrimary: CssColor,
  backgroundSecondary: CssColor,
  backgroundElement: CssColor,
  backgroundBorder: CssColor,

  // Text Colors
  textPrimary: CssColor,
  textInverted: CssColor,

  // Misc
  shadow: CssColor,
  focus: CssColor,
  transparent: CssColor,
}

export type ColorVariables = { [colorName: string]: CssColor } & EssentialVariables

export type ColorConfig = {
  variables: ColorVariables,
  threshold: number,
  presets: {
    light: ColorVariables,
    dark: ColorVariables,
    [presetName: string]: ColorVariables,
  },
  currentPresetName: string,
}
