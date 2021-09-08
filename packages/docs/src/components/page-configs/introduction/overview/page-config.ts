import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const config: ApiDocsBlock[] = [
  DocsHelper.title('overview.title'),
  DocsHelper.paragraph('overview.description'),
  DocsHelper.subtitle('overview.featuresOverview'),
  DocsHelper.list([
    'overview.vueThreeCompatible',
    'overview.featureRich',
    'overview.configurable',
    'overview.responsive',
    'overview.translatable',
  ]),
]

export default config
