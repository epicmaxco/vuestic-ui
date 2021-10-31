import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('reset.title'),
  block.paragraph('reset.description'),

  block.headline('reset.features.title'),
  block.paragraph('reset.features.info'),
  block.paragraph('reset.features.list'),
  block.paragraph('reset.features.more'),
]

export default config
