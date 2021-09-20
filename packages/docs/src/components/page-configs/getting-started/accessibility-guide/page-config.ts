import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const config: ApiDocsBlock[] = [
  DocsHelper.title('accessibilityGuide.title'),
  DocsHelper.paragraph('accessibilityGuide.description'),

  DocsHelper.subtitle('accessibilityGuide.keyboardInteractions.title'),
  DocsHelper.paragraph('accessibilityGuide.keyboardInteractions.description'),
]

export default config
