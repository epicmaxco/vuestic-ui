import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

export default [
  DocsHelper.title('accessibilityGuide.title'),
  DocsHelper.paragraph('accessibilityGuide.description'),
  DocsHelper.subtitle('accessibilityGuide.keyboardInteractions.title'),
  DocsHelper.paragraph('accessibilityGuide.keyboardInteractions.description'),
  DocsHelper.subtitle('accessibilityGuide.customElements.title'),
  DocsHelper.paragraph('accessibilityGuide.customElements.description'),

] as ApiDocsBlock[]
