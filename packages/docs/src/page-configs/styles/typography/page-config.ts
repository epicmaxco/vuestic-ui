import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { fontUsing } from './code-examples/font'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('typography.title'),
  block.paragraph('typography.description'),

  block.headline('typography.textStyles'),
  block.example('headings/heading1'),
  block.example('headings/heading2'),
  block.example('headings/heading3'),
  block.example('headings/heading4'),
  block.example('headings/heading5'),
  block.example('headings/heading6'),
  block.example('title'),
  block.example('text/default'),
  block.example('text/secondary'),

  block.headline('typography.codeSnippet'),
  block.example('codeSnippet'),
  block.example('textCode'),
  block.alert('typography.codeSnippetWarn', 'warning'),
  block.code(fontUsing, 'html'),

  block.headline('typography.list'),
  block.example('orderedList'),
  block.example('unorderedList'),

  block.headline('typography.links'),
  block.example('links'),

  block.headline('typography.blockquote'),
  block.example('blockquote'),

  block.headline('typography.textBlock'),
  block.example('textBlock'),

  block.headline('typography.textUtils'),
  block.example('text-utils/alignment'),
  block.example('text-utils/transform'),
]

export default config
