import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { t } from '../../../../../helpers/I18nHelper'

export const config = [
  DocsHelper.subtitle('colorsConfig.api.title'),

  DocsHelper.headline('colorsConfig.api.types'),
  DocsHelper.table(
    ['Name', { title: 'Type', type: 'code' }, { title: 'Description', type: 'markdown' }],
    [
      ['ColorConfig', '{ [colorName: string]: string; }', 'colorsConfig.api.ColorConfig'],
      ['ColorInput', 'string', 'colorsConfig.api.ColorInput'],
    ],
  ),

  DocsHelper.headline('colorsConfig.api.methods'),
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
      ['setColors', '(colors: ColorConfig) => void', 'colorsConfig.api.setColors'],
      ['getColors', '() => ColorConfig', 'colorsConfig.api.getColors'],
      ['getColor', '(prop?: string | undefined, defaultColor?: string) => string', 'colorsConfig.api.getColor'],
    ],
  ),

  DocsHelper.headline('useColor ' + t('colorsConfig.api.hookMethods')),
  DocsHelper.table(
    ['Method', { title: 'Type', type: 'code' }, { title: 'Description', type: 'markdown' }],
    [
      ['setColors', '(colors: Record<string, string>) => void', 'colorsConfig.api.setColors'],
      ['getColors', '() => ColorConfig', 'colorsConfig.api.getColors'],
      ['getColor', '(prop?: string | undefined, defaultColor?: string) => string', 'colorsConfig.api.getColor'],
      ['getBoxShadowColor', '(color: ColorInput) => string', 'colorsConfig.api.getBoxShadowColor'],
      ['getHoverColor', '(color: ColorInput) => string', 'colorsConfig.api.getHoverColor'],
      ['getFocusColor', '(color: ColorInput) => string', 'colorsConfig.api.getFocusColor'],
      ['getGradientBackground', '(color: string) => string', 'colorsConfig.api.getGradientBackground'],
    ],
  ),
]
