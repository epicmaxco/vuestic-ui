import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const path = 'introduction/browser-support'
const block = new PageGenerationHelper(path)

const config: ApiDocsBlock[] = [
  block.title('overview.title'),
  block.paragraph('overview.description'),
  block.subtitle('overview.featuresOverview'),
  block.list([
    'overview.vueThreeCompatible',
    'overview.featureRich',
    'overview.configurable',
    'overview.responsive',
    'overview.translatable',
  ]),
]

export default config
