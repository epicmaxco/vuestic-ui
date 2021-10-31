import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { setupCodeExample } from '../code-examples'

const path = 'services/icons-config'
const block = new PageGenerationHelper(__dirname)

export const config: ApiDocsBlock[] = [
  block.subtitle('iconsConfig.setup.title'),
  block.paragraph('iconsConfig.setup.about'),
  block.code(setupCodeExample),
]
