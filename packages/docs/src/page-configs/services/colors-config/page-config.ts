import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { api, reactivity, otherServices } from './sections'

const path = 'services/colors-config'
const block = new PageGenerationHelper(path)

const config: ApiDocsBlock[] = [
  block.title('colorsConfig.title'),
  block.paragraph('colorsConfig.about'),

  block.paragraph('colorsConfig.example.about'),
  block.paragraph('colorsConfig.example.demo'),
  block.example('change-colors'),

  ...reactivity,
  ...otherServices,
  ...api,
]

export default config
