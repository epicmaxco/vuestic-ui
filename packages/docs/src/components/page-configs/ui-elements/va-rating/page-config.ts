import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaRating from 'vuestic-ui/src/components/va-rating/VaRating.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-rating'

const config: ApiDocsBlock[] = [
  DocsHelper.title('rating.title'),
  DocsHelper.paragraph('rating.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'rating.examples.default.title',
    'rating.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.color.title',
    'rating.examples.color.text',
    configPath,
    'Color',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.size.title',
    'rating.examples.size.text',
    configPath,
    'Size',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.hover.title',
    'rating.examples.hover.text',
    configPath,
    'Hover',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.halves.title',
    'rating.examples.halves.text',
    configPath,
    'Halves',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.numbers.title',
    'rating.examples.numbers.text',
    configPath,
    'Numbers',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.texts.title',
    'rating.examples.texts.text',
    configPath,
    'Texts',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.clearable.title',
    'rating.examples.clearable.text',
    configPath,
    'Clearable',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.customIcons.title',
    'rating.examples.customIcons.text',
    configPath,
    'CustomIcons',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaRating, apiOptions),

  DocsHelper.subtitle('all.faq'),

  DocsHelper.headline('rating.faq.questions[0].question'),
  DocsHelper.paragraph('rating.faq.questions[0].answer'),

  DocsHelper.headline('rating.faq.questions[1].question'),
  DocsHelper.paragraph('rating.faq.questions[1].answer'),
]

export default config
