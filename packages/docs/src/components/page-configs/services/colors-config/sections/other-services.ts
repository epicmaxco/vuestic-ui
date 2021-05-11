import { ApiDocsBlock } from '../../../../../types/configTypes'
import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { componentsConfigCode, iconsConfigCode } from '../code'

const p = (t: string) => `colorsConfig.otherServices.${t}`

export default [
  DocsHelper.subtitle('colorsConfig.otherServices.subtitle'),

  DocsHelper.paragraph('colorsConfig.otherServices.components'),
  DocsHelper.code(componentsConfigCode),

  DocsHelper.paragraph('colorsConfig.otherServices.icons'),
  DocsHelper.code(iconsConfigCode),

  DocsHelper.paragraph('colorsConfig.otherServices.css'),
  DocsHelper.example('colors-config/css-variable'),
] as ApiDocsBlock[]
