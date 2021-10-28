import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import { generalScheme, componentScheme, overriding } from './code-examples'

const path = 'styles/css-variables'
const block = new PageGenerationHelper(path)

const config: ApiDocsBlock[] = [
  block.title('cssVariables.title'),
  block.paragraph('cssVariables.description'),

  block.subtitle('cssVariables.convention.title'),
  block.paragraph('cssVariables.convention.description'),
  block.code(generalScheme),
  block.code(componentScheme),

  block.subtitle('cssVariables.overriding.title'),
  block.paragraph('cssVariables.overriding.description'),
  block.code(overriding, 'scss'),
]

export default config
