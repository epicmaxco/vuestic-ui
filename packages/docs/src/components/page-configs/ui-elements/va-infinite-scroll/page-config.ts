import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import VaInfiniteScroll from 'vuestic-ui/src/components/va-infinite-scroll/VaInfiniteScroll.vue'
import apiOptions from './api-options'

const configPath = 'ui-elements/va-infinite-scroll'

const config: ApiDocsBlock[] = [
  DocsHelper.title('infiniteScroll.title'),
  DocsHelper.paragraph('infiniteScroll.summaryText'),

  DocsHelper.subtitle('all.examples'),

  ...DocsHelper.exampleBlock(
    'infiniteScroll.examples.default.title',
    'infiniteScroll.examples.default.text',
    configPath,
    'Default',
  ),
  ...DocsHelper.exampleBlock(
    'infiniteScroll.examples.reverse.title',
    'infiniteScroll.examples.reverse.text',
    configPath,
    'Reverse',
  ),
  ...DocsHelper.exampleBlock(
    'infiniteScroll.examples.disabled.title',
    'infiniteScroll.examples.disabled.text',
    configPath,
    'Disabled',
  ),
  ...DocsHelper.exampleBlock(
    'infiniteScroll.examples.customTarget.title',
    'infiniteScroll.examples.customTarget.text',
    configPath,
    'CustomTarget',
  ),

  DocsHelper.subtitle('all.api'),
  DocsHelper.api(VaInfiniteScroll, apiOptions),
]

export default config
