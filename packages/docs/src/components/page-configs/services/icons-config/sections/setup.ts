import { ApiDocsBlock } from '../../../../../types/configTypes'
import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { setupCodeExample } from '../code-examples'

export const config: ApiDocsBlock[] = [
  DocsHelper.subtitle('iconsConfig.setup.title'),
  DocsHelper.paragraph('iconsConfig.setup.about'),
  DocsHelper.code(setupCodeExample),
]
