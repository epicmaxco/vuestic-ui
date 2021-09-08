import { ApiDocsBlock } from '../../../../../types/configTypes'
import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { TableData, TableColumn } from '../../../../../components/DocsTable/DocsTable'

const columnsApiTypes: TableColumn[] = [
  'name',
  { title: 'type', type: 'code' },
  { title: 'description', type: 'markdown' },
]

const columnsApiMethods: TableColumn[] = [
  'method',
  { title: 'type', type: 'code' },
  { title: 'description', type: 'markdown' },
]

const tableDataApiTypes: TableData = [
  ['ColorConfig', '{ [colorName: string]: string; }', 'colorsConfig.api.ColorConfig'],
  ['ColorInput', 'string', 'colorsConfig.api.ColorInput'],
]

const tableDataApiMethods: TableData = [
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
    'colorsConfig.api.useColor',
  ],
]

const tableDataApiHookMethods: TableData = [
  ['setColors', '(colors: Record<string, string>) => void', 'colorsConfig.api.setColors'],
  ['getColors', '() => ColorConfig', 'colorsConfig.api.getColors'],
  ['getColor', '(prop?: string | undefined, defaultColor?: string) => string', 'colorsConfig.api.getColor'],
  ['getBoxShadowColor', '(color: ColorInput) => string', 'colorsConfig.api.getBoxShadowColor'],
  ['getHoverColor', '(color: ColorInput) => string', 'colorsConfig.api.getHoverColor'],
  ['getFocusColor', '(color: ColorInput) => string', 'colorsConfig.api.getFocusColor'],
  ['getGradientBackground', '(color: string) => string', 'colorsConfig.api.getGradientBackground'],
]

export const config: ApiDocsBlock[] = [
  DocsHelper.subtitle('colorsConfig.api.title'),

  DocsHelper.headline('colorsConfig.api.types'),
  DocsHelper.table(columnsApiTypes, tableDataApiTypes),

  DocsHelper.headline('colorsConfig.api.methods'),
  DocsHelper.table(columnsApiMethods, tableDataApiMethods),

  DocsHelper.headline('colorsConfig.api.hookMethods'),
  DocsHelper.table(columnsApiMethods, tableDataApiHookMethods),
]
