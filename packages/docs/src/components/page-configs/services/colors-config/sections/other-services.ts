import { ApiDocsBlock } from '../../../../../types/configTypes'
import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { componentsConfigCode, iconsConfigCode } from '../code-examples'

const pathConfig = 'services/colors-config'

const config: ApiDocsBlock[] = [
  DocsHelper.subtitle('colorsConfig.otherServices.subtitle'),

  DocsHelper.paragraph('colorsConfig.otherServices.components'),
  DocsHelper.code(componentsConfigCode),

  DocsHelper.paragraph('colorsConfig.otherServices.icons'),
  DocsHelper.code(iconsConfigCode),

  DocsHelper.paragraph('colorsConfig.otherServices.css'),
  DocsHelper.example(pathConfig, 'css-variable'),
]

export default config
