import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
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
] as ApiDocsBlock[]
