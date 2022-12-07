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

  ...block.exampleBlock(
    'badge.examples.position.title',
    'badge.examples.position.text',
    'Position',
  ),

  ...block.exampleBlock(
    'badge.examples.color.title',
    'badge.examples.color.text',
    'Color',
  ),

  ...block.exampleBlock(
    'badge.examples.dot.title',
    'badge.examples.dot.text',
    'Dot',
  ),

  ...block.exampleBlock(
    'badge.examples.overlap.title',
    'badge.examples.overlap.text',
    'Overlap',
  ),

  ...block.exampleBlock(
    'badge.examples.transparent.title',
    'badge.examples.transparent.text',
    'Transparent',
  ),

  ...block.exampleBlock(
    'badge.examples.withOtherComponents.title',
    'badge.examples.withOtherComponents.text',
    'WithOtherComponents',
  ),

  ...block.exampleBlock(
    'badge.examples.noContent.title',
    'badge.examples.noContent.text',
    'NoContent',
  ),

  block.subtitle('all.api'),
  block.api(VaBadge, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
