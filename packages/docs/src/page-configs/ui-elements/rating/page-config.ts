import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaRating from 'vuestic-ui/src/components/va-rating/VaRating.vue'
import apiOptions from './api-options'

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
const cssVariables = import('!raw-loader!vuestic-ui/src/components/va-rating/_variables.scss')

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('rating.title'),
  block.paragraph('rating.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'rating.examples.default.title',
    'rating.examples.default.text',
    'Default',
  ),
  ...block.exampleBlock(
    'rating.examples.color.title',
    'rating.examples.color.text',
    'Color',
  ),
  ...block.exampleBlock(
    'rating.examples.size.title',
    'rating.examples.size.text',
    'Size',
  ),
  ...block.exampleBlock(
    'rating.examples.hover.title',
    'rating.examples.hover.text',
    'Hover',
  ),
  ...block.exampleBlock(
    'rating.examples.halves.title',
    'rating.examples.halves.text',
    'Halves',
  ),
  ...block.exampleBlock(
    'rating.examples.numbers.title',
    'rating.examples.numbers.text',
    'Numbers',
  ),
  ...block.exampleBlock(
    'rating.examples.customIcons.title',
    'rating.examples.customIcons.text',
    'CustomIcons',
  ),
  ...block.exampleBlock(
    'rating.examples.itemSlot.title',
    'rating.examples.itemSlot.text',
    'ItemSlot',
  ),
  ...block.exampleBlock(
    'rating.examples.texts.title',
    'rating.examples.texts.text',
    'Texts',
  ),
  ...block.exampleBlock(
    'rating.examples.clearable.title',
    'rating.examples.clearable.text',
    'Clearable',
  ),

  block.subtitle('all.api'),
  block.api(VaRating, apiOptions),

  block.subtitle('all.cssVariables'),
  block.file(cssVariables),

  block.subtitle('all.faq'),

  block.headline('rating.faq.questions[0].question'),
  block.paragraph('rating.faq.questions[0].answer'),

  block.headline('rating.faq.questions[1].question'),
  block.paragraph('rating.faq.questions[1].answer'),
]

export default config
