import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaBadge from 'vuestic-ui/src/components/va-badge/VaBadge.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('badge.title'),
  DocsHelper.paragraph('badge.summaryText'),

  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'badge.examples.default.title',
    'badge.examples.default.text',
    'va-badge/Default',
  ),

  DocsHelper.headline('badge.examples.position.title'),
  DocsHelper.example('va-badge/Position'),

  DocsHelper.headline('badge.examples.color.title'),
  DocsHelper.example('va-badge/Color'),

  DocsHelper.headline('badge.examples.dot.title'),
  DocsHelper.example('va-badge/Dot'),

  DocsHelper.headline('badge.examples.transparent.title'),
  DocsHelper.example('va-badge/Transparent'),

  DocsHelper.headline('badge.examples.withCard.title'),
  DocsHelper.example('va-badge/WithCard'),

  DocsHelper.headline('badge.examples.withAvatar.title'),
  DocsHelper.example('va-badge/WithAvatar'),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaBadge, apiOptions),
]

export default config
