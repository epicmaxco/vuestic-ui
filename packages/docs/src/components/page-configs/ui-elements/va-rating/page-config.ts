import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaRating from 'vuestic-ui/src/components/va-rating/VaRating.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('rating.title'),
  DocsHelper.paragraph('rating.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'rating.examples.default.title',
    'rating.examples.default.text',
    'va-rating/Default',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.color.title',
    'rating.examples.color.text',
    'va-rating/Color',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.size.title',
    'rating.examples.size.text',
    'va-rating/Size',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.hover.title',
    'rating.examples.hover.text',
    'va-rating/Hover',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.halves.title',
    'rating.examples.halves.text',
    'va-rating/Halves',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.numbers.title',
    'rating.examples.numbers.text',
    'va-rating/Numbers',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.texts.title',
    'rating.examples.texts.text',
    'va-rating/Texts',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.clearable.title',
    'rating.examples.clearable.text',
    'va-rating/Clearable',
  ),
  ...DocsHelper.exampleBlock(
    'rating.examples.customIcons.title',
    'rating.examples.customIcons.text',
    'va-rating/CustomIcons',
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
