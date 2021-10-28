import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { problem, fonts, aliases, setup, api } from './sections'

const path = 'services/icons-config'
const block = new PageGenerationHelper(path)

const config: ApiDocsBlock[] = [
  block.title('iconsConfig.title'),
  block.paragraph('iconsConfig.about'),
  block.link('iconsConfig.readBeforeStart', '/ui-elements/icon'),

  ...problem,
  ...fonts,
  ...aliases,
  ...setup,
  ...api,
]

export default config
