import { ApiDocsBlock } from '../../../types/configTypes'
import { PageGenerationHelper } from '../../../helpers/DocsHelper'
import VaCounter from 'vuestic-ui/src/components/va-counter/VaCounter.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-counter/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('counter.title'),
  block.paragraph('counter.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'counter.examples.default.title',
    'counter.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'counter.examples.style.title',
    'counter.examples.style.text',
    'Style',
  ),
  ...block.exampleBlock(
    'counter.examples.buttons.title',
    'counter.examples.buttons.text',
    'Buttons',
  ),
  ...block.exampleBlock(
    'counter.examples.width.title',
    'counter.examples.width.text',
    'Width',
  ),
  ...block.exampleBlock(
    'counter.examples.buttonsStyle.title',
    'counter.examples.buttonsStyle.text',
    'ButtonsStyle',
  ),
  ...block.exampleBlock(
    'counter.examples.iconsColors.title',
    'counter.examples.iconsColors.text',
    'IconsColors',
  ),
  ...block.exampleBlock(
    'counter.examples.state.title',
    'counter.examples.state.text',
    'State',
  ),
  ...block.exampleBlock(
    'counter.examples.maxMinStep.title',
    'counter.examples.maxMinStep.text',
    'MaxMinStep',
  ),
  ...block.exampleBlock(
    'counter.examples.slots.title',
    'counter.examples.slots.text',
    'Slots',
  ),

  block.subtitle('all.api'),
  block.api(VaCounter, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),
]

export default config
