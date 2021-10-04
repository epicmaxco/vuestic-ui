import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const config: ApiDocsBlock[] = [
  DocsHelper.title('reset.title'),
  DocsHelper.paragraph('reset.description'),

  DocsHelper.headline('reset.features.title'),
  DocsHelper.paragraph('reset.features.info'),
  DocsHelper.paragraph('reset.features.list'),
  DocsHelper.paragraph('reset.features.more'),
]

export default config
