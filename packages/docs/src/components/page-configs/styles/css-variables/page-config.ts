import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { generalScheme, componentScheme, overriding } from './code-examples'

const config: ApiDocsBlock[] = [
  DocsHelper.title('cssVariables.title'),
  DocsHelper.paragraph('cssVariables.description'),

  DocsHelper.subtitle('cssVariables.convention.title'),
  DocsHelper.paragraph('cssVariables.convention.description'),
  DocsHelper.code(generalScheme),
  DocsHelper.code(componentScheme),

  DocsHelper.subtitle('cssVariables.overriding.title'),
  DocsHelper.paragraph('cssVariables.overriding.description'),
  DocsHelper.code(overriding, 'scss'),
]

export default config
