import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const configPath = 'styles/typography'
const config: ApiDocsBlock[] = [
  DocsHelper.title('typography.title'),
  DocsHelper.paragraph('typography.description'),

  DocsHelper.subtitle('typography.headings'),
  DocsHelper.example(configPath, 'headings', { forceShowCode: true }),

  DocsHelper.headline('typography.titled'),
  DocsHelper.example(configPath, 'title'),

  DocsHelper.headline('typography.textStyles'),
  DocsHelper.example(configPath, 'textStyles'),

  DocsHelper.headline('typography.codeSnippet'),
  DocsHelper.example(configPath, 'codeSnippet'),

  DocsHelper.headline('typography.textCode'),
  DocsHelper.example(configPath, 'textCode'),

  DocsHelper.subtitle('typography.other'),

  DocsHelper.headline('typography.orderedList'),
  DocsHelper.example(configPath, 'orderedList'),

  DocsHelper.headline('typography.unorderedList'),
  DocsHelper.example(configPath, 'unorderedList'),

  DocsHelper.headline('typography.links'),
  DocsHelper.example(configPath, 'links'),

  DocsHelper.headline('typography.textHighlighted'),
  DocsHelper.example(configPath, 'textHighlighted'),

  DocsHelper.headline('typography.blockquote'),
  DocsHelper.example(configPath, 'blockquote'),

  DocsHelper.headline('typography.textBlock'),
  DocsHelper.example(configPath, 'textBlock'),
]

export default config
