import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.subtitle('colorsConfig.reactivity.subtitle'),
  block.paragraph('colorsConfig.reactivity.about'),
]

export default config
