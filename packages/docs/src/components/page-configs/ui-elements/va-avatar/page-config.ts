import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaAvatar from 'vuestic-ui/src/components/va-avatar/VaAvatar.vue'
import apiOptions from './api-options'

const config: ApiDocsBlock[] = [
  DocsHelper.title('avatar.title'),
  DocsHelper.paragraph('avatar.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'avatar.examples.default.title',
    'avatar.examples.default.text',
    'va-avatar/Default',
  ),
  DocsHelper.headline('avatar.examples.color.title'),
  DocsHelper.example('va-avatar/Color'),
  ...DocsHelper.exampleBlock(
    'avatar.examples.size.title',
    'avatar.examples.size.text',
    'va-avatar/Size',
  ),
  ...DocsHelper.exampleBlock(
    'avatar.examples.withImage.title',
    'avatar.examples.withImage.text',
    'va-avatar/WithImage',
  ),
  ...DocsHelper.exampleBlock(
    'avatar.examples.withIcon.title',
    'avatar.examples.withIcon.text',
    'va-avatar/WithIcon',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaAvatar, apiOptions),
]

export default config
