import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { TableData, TableColumn } from '../../../components/DocsTable/DocsTableTypes'
import { componentsConfigCode, iconsConfigCode } from '@/page-configs/services/colors-config/code-examples'

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

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('colorsConfig.title'),
  block.paragraph('colorsConfig.about'),

  block.paragraph('colorsConfig.example.about'),
  block.paragraph('colorsConfig.example.demo'),
  block.example('change-colors'),

  // reactivity
  block.subtitle('colorsConfig.reactivity.subtitle'),
  block.paragraph('colorsConfig.reactivity.about'),

  // otherServices
  block.subtitle('colorsConfig.otherServices.subtitle'),

  block.paragraph('colorsConfig.otherServices.components'),
  block.code(componentsConfigCode),

  block.paragraph('colorsConfig.otherServices.icons'),
  block.code(iconsConfigCode),

  block.paragraph('colorsConfig.otherServices.css'),
  block.example('css-variable'),

  // api
  block.subtitle('colorsConfig.api.title'),

  block.headline('colorsConfig.api.types'),
  block.table(columnsApiTypes, tableDataApiTypes),

  block.headline('colorsConfig.api.methods'),
  block.table(columnsApiMethods, tableDataApiMethods),

  block.headline('colorsConfig.api.hookMethods'),
  block.table(columnsApiMethods, tableDataApiHookMethods),
]

export default config
