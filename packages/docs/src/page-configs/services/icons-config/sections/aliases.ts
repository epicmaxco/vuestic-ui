import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { aliasCodeExample, aliasesTransformationsExample } from '../code-examples'

const path = 'services/icons-config'
const block = new PageGenerationHelper(path)

export const config: ApiDocsBlock[] = [
  block.subtitle('iconsConfig.aliases.title'),
  block.paragraph('iconsConfig.aliases.about'),

  block.headline('iconsConfig.aliases.example.title'),
  block.code(aliasCodeExample),

  block.paragraph('iconsConfig.aliases.example.about'),
  block.code(aliasesTransformationsExample),
  block.paragraph('iconsConfig.aliases.example.explain'),
]
