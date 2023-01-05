import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { treeShakingExample, cssCodeSplit } from './code-examples'
import bundleSizeData from 'sandbox/tree-shaking.md'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('treeShaking.title'),
  block.paragraph('treeShaking.components.title'),
  block.paragraph('treeShaking.description'),

  block.paragraph('treeShaking.example.title'),
  block.code(treeShakingExample),
  block.paragraph('treeShaking.example.footer'),

  block.paragraph('treeShaking.plugins.title'),
  block.list([
    'treeShaking.plugins.GlobalConfigPlugin',
    'treeShaking.plugins.ColorHelpersPlugin',
    'treeShaking.plugins.VaToastPlugin',
    'treeShaking.plugins.VaModalPlugin',
    'treeShaking.plugins.VaDropdownPlugin',
  ]),

  block.subtitle('treeShaking.css.title'),
  block.paragraph('treeShaking.css.description'),
  block.code(cssCodeSplit),

  block.subtitle('treeShaking.bundleSize.title'),
  block.paragraph('treeShaking.bundleSize.description'),
  block.markdown(bundleSizeData),
]

export default config
