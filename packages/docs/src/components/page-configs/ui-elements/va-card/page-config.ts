import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaCard from 'vuestic-ui/src/components/va-card/VaCard.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('card.title'),
  DocsHelper.paragraph('card.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'card.examples.default.title',
    'card.examples.default.text',
    'va-card/Default',
  ),

  DocsHelper.headline('card.examples.colorAndGradient.title'),
  DocsHelper.example('va-card/ColorAndGradient'),

  ...DocsHelper.exampleBlock(
    'card.examples.tag.title',
    'card.examples.tag.text',
    'va-card/Tag',
  ),

  DocsHelper.headline('card.examples.borderAndShape.title'),
  DocsHelper.example('va-card/BorderAndShape'),

  DocsHelper.headline('card.examples.disabled.title'),
  DocsHelper.example('va-card/Disabled'),

  DocsHelper.headline('card.examples.link.title'),
  DocsHelper.example('va-card/Link'),

  DocsHelper.headline('card.examples.stripe.title'),
  DocsHelper.example('va-card/Stripe'),

  DocsHelper.headline('card.examples.image.title'),
  DocsHelper.example('va-card/Image'),

  DocsHelper.headline('card.examples.actions.title'),
  DocsHelper.paragraph('card.examples.actions.purpose'),
  DocsHelper.paragraph('card.examples.actions.props'),
  DocsHelper.paragraph('card.examples.actions.values'),
  DocsHelper.example('va-card/Actions'),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaCard, apiOptions),

  DocsHelper.subtitle('all.faq'),
  DocsHelper.headline('card.faq.questions[0].question'),
  DocsHelper.paragraph('card.faq.questions[0].answer'),

  DocsHelper.headline('card.faq.questions[1].question'),
  DocsHelper.paragraph('card.faq.questions[1].answer'),
]

export default config
