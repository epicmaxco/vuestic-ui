import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { treeShakingExample } from './code-examples'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('treeShaking.title'),
  block.paragraph('treeShaking.description'),

  block.paragraph('treeShaking.example.title'),
  block.code(treeShakingExample),
  block.paragraph('treeShaking.example.footer'),

  block.paragraph('treeShaking.plugins.title'),
  block.list([
    'treeShaking.plugins.GlobalConfigPlugin',
    'treeShaking.plugins.ColorHelpersPlugin',
    'treeShaking.plugins.VaToastPlugin',
    'treeShaking.plugins.VaDropdownPlugin',
  ]),
]

export default config
