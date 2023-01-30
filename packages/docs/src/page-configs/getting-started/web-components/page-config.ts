import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { installationCode, installationCssCode, exampleRegister, usageInIndexHTML, usageOfGlobalConfig, treeShakeCode } from './code'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('webComponents.title'),
  block.alert('all.alerts.beta', 'warning'),
  block.paragraph('webComponents.description'),

  block.subtitle('webComponents.installation.title'),
  block.paragraph('webComponents.installation.description'),
  block.paragraph('webComponents.installation.create'),
  block.link('webComponents.installation.installVuestic', '/getting-started/installation#manual-installation'),
  block.code(installationCode),

  block.subtitle('webComponents.css.title'),
  block.paragraph('webComponents.css.description'),
  block.code(installationCssCode),

  block.subtitle('webComponents.example.title'),
  block.paragraph('webComponents.example.description'),
  block.paragraph('webComponents.example.steps[0]'),
  block.code(exampleRegister),
  block.paragraph('webComponents.example.steps[1]'),
  block.code(usageInIndexHTML, 'html'),
  block.paragraph('webComponents.example.steps[2]'),
  block.code(usageOfGlobalConfig, 'html'),
  block.link('webComponents.example.seeMore', 'https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/sandbox/web-components'),

  block.subtitle('webComponents.treeShaking.title'),
  block.paragraph('webComponents.treeShaking.description'),
  block.code(treeShakeCode),
]

export default config
