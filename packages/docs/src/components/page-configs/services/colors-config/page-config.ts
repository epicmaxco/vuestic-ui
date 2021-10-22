import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { api, reactivity, otherServices } from './sections'

const configPath = 'services/colors-config'
const config: ApiDocsBlock[] = [
  DocsHelper.title('colorsConfig.title'),
  DocsHelper.paragraph('colorsConfig.about'),

  DocsHelper.paragraph('colorsConfig.example.about'),
  DocsHelper.paragraph('colorsConfig.example.demo'),
  DocsHelper.example(configPath, 'change-colors'),

  ...reactivity,
  ...otherServices,
  ...api,
]

export default config
