import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaBadge from 'vuestic-ui/src/components/va-badge/VaBadge.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-badge/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('badge.title'),
  block.paragraph('badge.summaryText'),

  block.subtitle('all.examples'),
  ...block.exampleBlock(
    'badge.examples.default.title',
    'badge.examples.default.text',
    'Default',
  ),

  block.headline('badge.examples.position.title'),
  block.example('Position'),

  block.headline('badge.examples.color.title'),
  block.example('Color'),

  block.headline('badge.examples.dot.title'),
  block.example('Dot'),

  block.headline('badge.examples.transparent.title'),
  block.example('Transparent'),

  block.headline('badge.examples.withCard.title'),
  block.example('WithCard'),

  block.headline('badge.examples.withAvatar.title'),
  block.example('WithAvatar'),

  block.subtitle('all.api'),
  block.api(VaBadge, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
