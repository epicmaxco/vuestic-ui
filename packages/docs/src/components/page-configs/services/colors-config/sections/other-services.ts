import { ApiDocsBlock } from '../../../../../types/configTypes'
import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { componentsConfigCode, iconsConfigCode } from '../code-examples'

const config: ApiDocsBlock[] = [
  DocsHelper.subtitle('colorsConfig.otherServices.subtitle'),

  DocsHelper.paragraph('colorsConfig.otherServices.components'),
  DocsHelper.code(componentsConfigCode),

  DocsHelper.paragraph('colorsConfig.otherServices.icons'),
  DocsHelper.code(iconsConfigCode),

  DocsHelper.paragraph('colorsConfig.otherServices.css'),
  DocsHelper.example('colors-config/css-variable'),
]

export default config
