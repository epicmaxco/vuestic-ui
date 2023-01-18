import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaButton from 'vuestic-ui/src/components/va-button/VaButton.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-button/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('button.title'),
  block.paragraph('button.summaryText'),

  block.subtitle('all.examples'),
  ...block.exampleBlock(
    'button.examples.default.title',
    'button.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'button.examples.presets.title',
    'button.examples.presets.text',
    'Presets',
  ),
  ...block.exampleBlock(
    'button.examples.withColor.title',
    'button.examples.withColor.text',
    'WithColor',
  ),
  ...block.exampleBlock(
    'button.examples.withGradient.title',
    'button.examples.withGradient.text',
    'WithGradient',
  ),
  ...block.exampleBlock(
    'button.examples.withTextColor.title',
    'button.examples.withTextColor.text',
    'WithTextColor',
  ),
  ...block.exampleBlock(
    'button.examples.withSize.title',
    'button.examples.withSize.text',
    'WithSize',
  ),
  ...block.exampleBlock(
    'button.examples.withRound.title',
    'button.examples.withRound.text',
    'WithRound',
  ),
  ...block.exampleBlock(
    'button.examples.withOutline.title',
    'button.examples.withOutline.text',
    'WithOutline',
  ),
  ...block.exampleBlock(
    'button.examples.withIcon.title',
    'button.examples.withIcon.text',
    'WithIcon',
  ),
  ...block.exampleBlock(
    'button.examples.withLoading.title',
    'button.examples.withLoading.text',
    'WithLoading',
  ),
  ...block.exampleBlock(
    'button.examples.behavior.title',
    'button.examples.behavior.text',
    'Behavior',
  ),
  ...block.exampleBlock(
    'button.examples.disabled.title',
    'button.examples.disabled.text',
    'Disabled',
  ),
  ...block.exampleBlock(
    'button.examples.tag.title',
    'button.examples.tag.text',
    'Tag',
  ),

  block.subtitle('all.api'),
  block.api(VaButton, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
