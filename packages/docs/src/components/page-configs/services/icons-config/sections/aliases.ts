import { ApiDocsBlock } from '../../../../../types/configTypes'
import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { aliasCodeExample, aliasesTransformationsExample } from '../code-examples'

export const config: ApiDocsBlock[] = [
  DocsHelper.subtitle('iconsConfig.aliases.title'),
  DocsHelper.paragraph('iconsConfig.aliases.about'),

  DocsHelper.headline('iconsConfig.aliases.example.title'),
  DocsHelper.code(aliasCodeExample),

  DocsHelper.paragraph('iconsConfig.aliases.example.about'),
  DocsHelper.code(aliasesTransformationsExample),
  DocsHelper.paragraph('iconsConfig.aliases.example.explain'),
]
