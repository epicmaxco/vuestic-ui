import { ApiDocsBlock } from '../../../types/configTypes'
import { DocsHelper } from '../../../helpers/DocsHelper'
import VaAvatar from 'vuestic-ui/src/components/va-avatar/VaAvatar.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/avatar'

const config: ApiDocsBlock[] = [
  DocsHelper.title('avatar.title'),
  DocsHelper.paragraph('avatar.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'avatar.examples.default.title',
    'avatar.examples.default.text',
    configPath,
    'Default',
  ),
  DocsHelper.headline('avatar.examples.color.title'),
  DocsHelper.example(configPath, 'Color'),
  ...DocsHelper.exampleBlock(
    'avatar.examples.size.title',
    'avatar.examples.size.text',
    configPath,
    'Size',
  ),
  ...DocsHelper.exampleBlock(
    'avatar.examples.withImage.title',
    'avatar.examples.withImage.text',
    configPath,
    'WithImage',
  ),
  ...DocsHelper.exampleBlock(
    'avatar.examples.withIcon.title',
    'avatar.examples.withIcon.text',
    configPath,
    'WithIcon',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaAvatar, apiOptions),
]

export default config
