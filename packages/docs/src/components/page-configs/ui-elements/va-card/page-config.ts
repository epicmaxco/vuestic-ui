import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaCard from 'vuestic-ui/src/components/va-card/VaCard.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-card'

const config: ApiDocsBlock[] = [
  DocsHelper.title('card.title'),
  DocsHelper.paragraph('card.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'card.examples.default.title',
    'card.examples.default.text',
    configPath,
    'Default',
  ),

  DocsHelper.headline('card.examples.colorAndGradient.title'),
  DocsHelper.example(configPath, 'ColorAndGradient'),

  ...DocsHelper.exampleBlock(
    'card.examples.tag.title',
    'card.examples.tag.text',
    configPath,
    'Tag',
  ),

  DocsHelper.headline('card.examples.borderAndShape.title'),
  DocsHelper.example(configPath, 'BorderAndShape'),

  DocsHelper.headline('card.examples.disabled.title'),
  DocsHelper.example(configPath, 'Disabled'),

  DocsHelper.headline('card.examples.link.title'),
  DocsHelper.example(configPath, 'Link'),

  DocsHelper.headline('card.examples.stripe.title'),
  DocsHelper.example(configPath, 'Stripe'),

  DocsHelper.headline('card.examples.image.title'),
  DocsHelper.example(configPath, 'Image'),

  DocsHelper.headline('card.examples.actions.title'),
  DocsHelper.paragraph('card.examples.actions.purpose'),
  DocsHelper.paragraph('card.examples.actions.props'),
  DocsHelper.paragraph('card.examples.actions.values'),
  DocsHelper.example(configPath, 'Actions'),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaCard, apiOptions),

  DocsHelper.subtitle('all.faq'),
  DocsHelper.headline('card.faq.questions[0].question'),
  DocsHelper.paragraph('card.faq.questions[0].answer'),

  DocsHelper.headline('card.faq.questions[1].question'),
  DocsHelper.paragraph('card.faq.questions[1].answer'),
]

export default config
