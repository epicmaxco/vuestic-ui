import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('typography.title'),
  block.paragraph('typography.description'),

  block.subtitle('typography.headings'),
  block.example('headings', { forceShowCode: true }),

  block.headline('typography.titled'),
  block.example('title'),

  block.headline('typography.textStyles'),
  block.example('textStyles'),

  block.headline('typography.codeSnippet'),
  block.example('codeSnippet'),

  block.headline('typography.textCode'),
  block.example('textCode'),

  block.subtitle('typography.other'),

  block.headline('typography.orderedList'),
  block.example('orderedList'),

  block.headline('typography.unorderedList'),
  block.example('unorderedList'),

  block.headline('typography.links'),
  block.example('links'),

  block.headline('typography.textHighlighted'),
  block.example('textHighlighted'),

  block.headline('typography.blockquote'),
  block.example('blockquote'),

  block.headline('typography.textBlock'),
  block.example('textBlock'),
]

export default config
