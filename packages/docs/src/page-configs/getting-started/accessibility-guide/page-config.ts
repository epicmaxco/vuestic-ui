import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('accessibilityGuide.title'),
  block.paragraph('accessibilityGuide.description'),

  block.subtitle('accessibilityGuide.keyboardInteractions.title'),
  block.paragraph('accessibilityGuide.keyboardInteractions.description'),
]

export default config
