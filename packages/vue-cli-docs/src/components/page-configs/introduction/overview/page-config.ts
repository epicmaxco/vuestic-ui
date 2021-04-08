import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('overview.title'),
  DocsHelper.paragraph('overview.description'),
  DocsHelper.subtitle('overview.whyVuestic.title'),
  DocsHelper.paragraph('overview.whyVuestic.vueThreeCompatible'),
  DocsHelper.paragraph('overview.whyVuestic.featureRich'),
  DocsHelper.paragraph('overview.whyVuestic.themesPreset'),
  DocsHelper.paragraph('overview.whyVuestic.configurations'),
  DocsHelper.paragraph('overview.whyVuestic.responsive'),
  DocsHelper.paragraph('overview.whyVuestic.translatable'),
] as ApiDocsBlock[]
