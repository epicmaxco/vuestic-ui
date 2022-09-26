import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('accessibilityGuide.title'),
  block.paragraph('accessibilityGuide.description'),

  block.subtitle('accessibilityGuide.keyboardInteractions.title'),
  block.paragraph('accessibilityGuide.keyboardInteractions.description'),
  block.example('KeyboardInteractions'),

  block.subtitle('accessibilityGuide.waiAria.title'),
  block.paragraph('accessibilityGuide.waiAria.description'),
  block.example('WaiAria'),
]

export default config
