import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const config: ApiDocsBlock[] = [
  DocsHelper.title('typography.title'),
  DocsHelper.paragraph('typography.description'),

  DocsHelper.subtitle('typography.headings'),
  DocsHelper.example('typography/headings', { forceShowCode: true }),

  DocsHelper.headline('typography.titled'),
  DocsHelper.example('typography/title'),

  DocsHelper.headline('typography.textStyles'),
  DocsHelper.example('typography/textStyles'),

  DocsHelper.headline('typography.codeSnippet'),
  DocsHelper.example('typography/codeSnippet'),

  DocsHelper.headline('typography.textCode'),
  DocsHelper.example('typography/textCode'),

  DocsHelper.subtitle('typography.other'),

  DocsHelper.headline('typography.orderedList'),
  DocsHelper.example('typography/orderedList'),

  DocsHelper.headline('typography.unorderedList'),
  DocsHelper.example('typography/unorderedList'),

  DocsHelper.headline('typography.links'),
  DocsHelper.example('typography/links'),

  DocsHelper.headline('typography.textHighlighted'),
  DocsHelper.example('typography/textHighlighted'),

  DocsHelper.headline('typography.blockquote'),
  DocsHelper.example('typography/blockquote'),

  DocsHelper.headline('typography.textBlock'),
  DocsHelper.example('typography/textBlock'),
]

export default config
