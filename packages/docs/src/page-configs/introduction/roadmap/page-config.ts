import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('roadmap.title'),
  block.paragraph('roadmap.description'),
  block.subtitle('roadmap.inDevelopment.title'),
  block.paragraph('roadmap.inDevelopment.description'),

  block.headline('roadmap.1-2.title'),
  block.paragraph('roadmap.1-2.description'),

  block.subtitle('roadmap.released.title'),
  block.paragraph('roadmap.released.description'),

  block.headline('roadmap.1-1.title'),
  block.paragraph('roadmap.1-1.description'),

  block.headline('roadmap.1-0.title'),
  block.paragraph('roadmap.1-0.description'),

  block.headline('roadmap.0-1.title'),
  block.paragraph('roadmap.0-1.description'),
]

export default config
