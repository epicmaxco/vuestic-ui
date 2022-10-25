export type CssColor = string

export type EssentialVariables = {
  // // Accent colors
  // primary: CssColor,
  // secondary: CssColor,
  // success: CssColor,
  // info: CssColor,
  // danger: CssColor,
  // warning: CssColor,
  // // Background colors
  // backgroundPrimary: CssColor,
  // background-element: CssColor,
  // backgroundElement: CssColor,
  // // TODO: Think about better name
  // /** Form background in switch and borders in checkbox, ratio etc */
  // backgroundTertiary: CssColor,
  // // Text colors
  // textInverted: CssColor,
  // textPrimary: CssColor,
  // // Misc
  // /** Cards, Navbar etc. shadow */
  // shadow: CssColor,
  // /** Outline color when component is focused */
  // focus: CssColor,
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
