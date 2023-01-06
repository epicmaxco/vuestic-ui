import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('browserSupport.title'),
  block.paragraph('browserSupport.description'),
  block.component('browsers-table'),
]

export default config
