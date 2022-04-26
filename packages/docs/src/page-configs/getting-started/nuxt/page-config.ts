import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { pluginCode, nuxtConfigCode } from './code-examples'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('nuxt.title'),
  block.paragraph('nuxt.description'),

  block.subtitle('nuxt.installation.title'),
  block.paragraph('nuxt.installation.plugin'),
  block.code(pluginCode),

  block.paragraph('nuxt.installation.nuxtConfig'),
  block.code(nuxtConfigCode),
]

export default config
