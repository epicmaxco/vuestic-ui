import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { aliasCodeExample, aliasesTransformationsExample } from '../examples'

export const config = [
  DocsHelper.subtitle('iconsConfig.aliases.title'),
  DocsHelper.paragraph('iconsConfig.aliases.about'),
  DocsHelper.headline('iconsConfig.aliases.example.title'),
  DocsHelper.code(aliasCodeExample),
  DocsHelper.paragraph('iconsConfig.aliases.example.about'),
  DocsHelper.code(aliasesTransformationsExample),
  DocsHelper.paragraph('iconsConfig.aliases.example.explain'),
]
