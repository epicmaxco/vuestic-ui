import { IconsConfig, IconFont } from './types'

export type IconMixinIcon = {
  iconClass?: string
  content?: string
  component?: any
}

function getClass (code: string, font: IconFont, fontName: string) {
  return typeof font.iconClass === 'function' ? font.iconClass(code, fontName) : font.iconClass
}

function getContent (code: string, font: IconFont) {
  return font.type === 'ligature' ? code : undefined
}

export function getIcon (name: string, iconsConfig: IconsConfig): IconMixinIcon {
  if (!name) { return {} }

  const alias = iconsConfig.aliases[name]
  const iconFontName = alias?.font || iconsConfig.iconFont
  const iconFont = iconsConfig.iconFonts
    .find((font) => iconFontName.match(font.name))

  if (!iconFont) {
    // TODO: we can possibly check for fonts on app start
    throw new Error(`Unknown font ${iconFontName}.`)
  }

  return {
    iconClass: getClass(alias.code, iconFont, iconFontName),
    content: getContent(alias.code, iconFont),
    component: iconFont.component,
  }
}
