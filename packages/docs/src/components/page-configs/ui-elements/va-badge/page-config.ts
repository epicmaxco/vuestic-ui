import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaBadge from 'vuestic-ui/src/components/va-badge/VaBadge.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-badge'
const config: ApiDocsBlock[] = [
  DocsHelper.title('badge.title'),
  DocsHelper.paragraph('badge.summaryText'),

  DocsHelper.subtitle('all.examples'),
  ...DocsHelper.exampleBlock(
    'badge.examples.default.title',
    'badge.examples.default.text',
    configPath,
    'Default',
  ),

  DocsHelper.headline('badge.examples.position.title'),
  DocsHelper.example(configPath, 'Position'),

  DocsHelper.headline('badge.examples.color.title'),
  DocsHelper.example(configPath, 'Color'),

  DocsHelper.headline('badge.examples.dot.title'),
  DocsHelper.example(configPath, 'Dot'),

  DocsHelper.headline('badge.examples.transparent.title'),
  DocsHelper.example(configPath, 'Transparent'),

  DocsHelper.headline('badge.examples.withCard.title'),
  DocsHelper.example(configPath, 'WithCard'),

  DocsHelper.headline('badge.examples.withAvatar.title'),
  DocsHelper.example(configPath, 'WithAvatar'),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaBadge, apiOptions),
]

export default config
