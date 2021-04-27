import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('overview.title'),
  DocsHelper.paragraph('overview.description'),
  DocsHelper.subtitle('overview.whyVuestic.title'),
  // DocsHelper.paragraph('overview.whyVuestic.description'),
  // DocsHelper.headline('overview.vueThreeCompatible.title'),
  DocsHelper.paragraph('overview.vueThreeCompatible.description'),
  // DocsHelper.headline('overview.featureRich.title'),
  DocsHelper.paragraph('overview.featureRich.description'),
  // DocsHelper.headline('overview.themesPreset.title'),
  DocsHelper.paragraph('overview.themesPreset.description'),
  DocsHelper.paragraph('overview.configurations.description'),
  // DocsHelper.headline('overview.responsive.title'),
  DocsHelper.paragraph('overview.responsive.description'),
  // DocsHelper.headline('overview.translatable.title'),
  DocsHelper.paragraph('overview.translatable.description'),
] as ApiDocsBlock[]
