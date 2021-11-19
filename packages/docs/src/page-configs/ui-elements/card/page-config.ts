import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import VaCard from 'vuestic-ui/src/components/va-card/VaCard.vue'
import apiOptions from './api-options'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('card.title'),
  block.paragraph('card.summaryText'),

  block.subtitle('all.examples'),

  ...block.exampleBlock(
    'card.examples.default.title',
    'card.examples.default.text',
    'Default',
  ),

  block.headline('card.examples.colorAndGradient.title'),
  block.example('ColorAndGradient'),

  ...block.exampleBlock(
    'card.examples.tag.title',
    'card.examples.tag.text',
    'Tag',
  ),

  block.headline('card.examples.borderAndShape.title'),
  block.example('BorderAndShape'),

  block.headline('card.examples.disabled.title'),
  block.example('Disabled'),

  block.headline('card.examples.link.title'),
  block.example('Link'),

  block.headline('card.examples.stripe.title'),
  block.example('Stripe'),

  block.headline('card.examples.image.title'),
  block.example('Image'),

  block.headline('card.examples.actions.title'),
  block.paragraph('card.examples.actions.purpose'),
  block.paragraph('card.examples.actions.props'),
  block.paragraph('card.examples.actions.values'),
  block.example('Actions'),

  block.subtitle('all.api'),
  block.api(VaCard, apiOptions),

  block.subtitle('all.faq'),
  block.headline('card.faq.questions[0].question'),
  block.paragraph('card.faq.questions[0].answer'),

  block.headline('card.faq.questions[1].question'),
  block.paragraph('card.faq.questions[1].answer'),
]

export default config
