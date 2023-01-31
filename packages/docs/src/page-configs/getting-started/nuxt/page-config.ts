import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { nuxtConfigCode, installationObject, nuxtConfigCssCode } from './code-examples'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('nuxt.title'),
  block.paragraph('nuxt.description'),

  block.subtitle('nuxt.createVuestic.title'),
  block.paragraph('nuxt.createVuestic.description'),
  block.link('nuxt.createVuestic.link', '/getting-started/installation#create-vuestic'),

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

  block.subtitle('nuxt.options.title'),
  block.table(
    [{ title: 'options', type: 'strong' }, { title: 'description', type: 'markdown' }, { title: 'type', type: 'code' }, { title: 'default', type: 'code' }],
    [
      ['config', 'nuxt.options.option.config', 'Object', '{}'],
      ['css', 'nuxt.options.option.css', "Array<'typography' | 'grid' | 'reset'> | boolean", 'true'],
      ['fonts', 'nuxt.options.option.fonts', 'boolean', 'true'],
    ],
  ),
]

export default config
