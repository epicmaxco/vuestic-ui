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

/**
 * This is a placeholder meant to be implemented via TypeScript's Module
 * Augmentation feature to allow key type inference
 *
 * @example
 * ```ts
 * declare module 'vuestic-ui' {
 *   interface CustomColorVariables {
 *     newColor: string
 *   }
 * }
 * ```
 *
 * @see https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
export interface CustomColorVariables {}

type Capitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S
type OnColors = `on${Capitalize<keyof EssentialVariables | keyof CustomColorVariables>}`

export type ColorVariables = EssentialVariables & CustomColorVariables & {
  [key in OnColors]?: CssColor
} & Record<string, CssColor>

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
