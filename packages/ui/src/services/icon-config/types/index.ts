export type IconFontName = string

export type IconFont = {
  name: IconFontName | RegExp,
  type: 'ligature' | 'css' | 'component'
  iconClass?: string | ((code: string, font: string) => string)
  component?: any
  // resolution? (iconConfig => iconConfig?) // Different icon solution resolve differently.
}

export type IconFonts = IconFont[]

export type IconConfig = {
  code: string,
  font?: IconFontName
  tag?: string
  component?: any
  color?: string
  rotation?: number | string
  spin?: 'clockwise' | 'counterclock-wise' | 'none'
}

export type IconsConfig = {
  // In many cases application requires icon with all customization applied.
  // <va-icon alias="star"/> - so you just use something like this, and color, size, and correct icon implementation are applied.
  // Aliases shouldn't have fallback. So if alias is not defined - things should break :).
  // Aliases are recommended way to use icons and prevent a lot of duplication.
  aliases: Record<string, IconConfig>,
  iconFont: IconFontName, // default icon font
  iconFonts: IconFonts // Here we can probably use generics to make TS complain if IconFontName is invalid. Not 100% sure.
}
