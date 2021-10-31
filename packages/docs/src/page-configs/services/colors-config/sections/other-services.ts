import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { componentsConfigCode, iconsConfigCode } from '../code-examples'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.subtitle('colorsConfig.otherServices.subtitle'),

  block.paragraph('colorsConfig.otherServices.components'),
  block.code(componentsConfigCode),

  block.paragraph('colorsConfig.otherServices.icons'),
  block.code(iconsConfigCode),

  block.paragraph('colorsConfig.otherServices.css'),
  block.example('css-variable'),
]

export default config
