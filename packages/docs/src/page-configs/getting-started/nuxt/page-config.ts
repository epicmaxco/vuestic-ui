import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { nuxtConfigCode, installationObject, nuxtConfigCssCode } from './code-examples'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('nuxt.title'),
  block.paragraph('nuxt.description'),

  block.subtitle('nuxt.installation.title'),
  block.paragraph('nuxt.installation.plugin'),
  block.code(installationObject, 'bash'),

  block.paragraph('nuxt.installation.nuxtConfig'),
  block.code(nuxtConfigCode),
  block.link('nuxt.installation.moreAboutConfig', '/getting-started/configuration-guide'),

  block.subtitle('nuxt.treeShaking.title'),
  block.paragraph('nuxt.treeShaking.description'),
  block.paragraph('nuxt.treeShaking.css'),
  block.code(nuxtConfigCssCode),
]

export default config
