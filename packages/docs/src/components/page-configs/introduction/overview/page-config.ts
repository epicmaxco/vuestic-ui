import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('overview.title'),
  DocsHelper.paragraph('overview.description'),
  DocsHelper.subtitle('overview.featuresOverview'),
  DocsHelper.paragraph('overview.vueThreeCompatible'),
  DocsHelper.paragraph('overview.featureRich'),
  DocsHelper.paragraph('overview.configurable'),
  DocsHelper.paragraph('overview.responsive'),
  DocsHelper.paragraph('overview.translatable'),
] as ApiDocsBlock[]
