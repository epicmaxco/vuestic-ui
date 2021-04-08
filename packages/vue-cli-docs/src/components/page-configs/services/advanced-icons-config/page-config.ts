import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

const prefix = (text: string) => `advancedIconsConfig.${text}`

export default [
  DocsHelper.title(prefix('title')),
  DocsHelper.paragraph(prefix('subtitle')),

  // TODO: Draw image example how works searching in flat array.

  // TODO: How to use Component and pass props to define own data-attrs or smth else
] as ApiDocsBlock[]
