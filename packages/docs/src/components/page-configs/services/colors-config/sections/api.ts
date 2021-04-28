import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { te, t } from '../../../../../helpers/I18nHelper'

const prefix = (text: string) => {
  const stringPath = `colorsConfig.api.${text}`
  // Check if exists
  return te(stringPath) ? t(stringPath) : ''
}

export const config = [
  DocsHelper.subtitle(prefix('title')),

  DocsHelper.headline(prefix('types')),
  DocsHelper.table(
    ['Name', { title: 'Type', type: 'code' }, { title: 'Description', type: 'markdown' }],
    [
      ['ColorConfig', '{ [colorName: string]: string; }', prefix('ColorConfig')],
      ['ColorInput', 'string', prefix('ColorInput')],
    ],
  ),

  DocsHelper.headline(prefix('methods')),
  DocsHelper.table(
    ['Method', { title: 'Type', type: 'code' }, { title: 'Description', type: 'markdown' }],
    [
      [
        'useColors',
        `() => {
          setColors,
          getColors,
          getColor,
          getBoxShadowColor,
          getHoverColor,
          getFocusColor,
          getGradientBackground
        }`,
      ],
      ['setColors', '(colors: ColorConfig) => void', prefix('setColors')],
      ['getColors', '() => ColorConfig', prefix('getColors')],
      ['getColor', '(prop?: string | undefined, defaultColor?: string) => string', prefix('getColor')],
    ],
  ),

  DocsHelper.headline('useColor ' + t(prefix('hookMethods'))),
  DocsHelper.table(
    ['Method', { title: 'Type', type: 'code' }, { title: 'Description', type: 'markdown' }],
    [
      ['setColors', '(colors: Record<string, string>) => void', prefix('setColors')],
      ['getColors', '() => ColorConfig', prefix('getColors')],
      ['getColor', '(prop?: string | undefined, defaultColor?: string) => string', prefix('getColor')],
      ['getBoxShadowColor', '(color: ColorInput) => string', prefix('getBoxShadowColor')],
      ['getHoverColor', '(color: ColorInput) => string', prefix('getHoverColor')],
      ['getFocusColor', '(color: ColorInput) => string', prefix('getFocusColor')],
      ['getGradientBackground', '(color: string) => string', prefix('getGradientBackground')],
    ],
  ),
]
