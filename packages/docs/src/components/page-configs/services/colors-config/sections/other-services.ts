import { ApiDocsBlock } from '../../../../../types/configTypes'
import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { componentsConfigCode, iconsConfigCode } from '../code'

const p = (t: string) => `colorsConfig.otherServices.${t}`

export default [
  DocsHelper.subtitle(p('subtitle')),

  DocsHelper.paragraph(p('components')),
  DocsHelper.code(componentsConfigCode),

  DocsHelper.paragraph(p('icons')),
  DocsHelper.code(iconsConfigCode),

  DocsHelper.paragraph(p('css')),
  DocsHelper.example('colors-config/css-variable'),
] as ApiDocsBlock[]
