import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('overview.title'),
  block.paragraph('overview.description'),
  block.subtitle('overview.featuresOverview'),
  block.list([
    'overview.vueThreeCompatible',
    'overview.darkTheme',
    'overview.accessibility',
    'overview.configurable',
    'overview.responsive',
    'overview.translatable',
    'overview.support',
  ]),
]

export default config
