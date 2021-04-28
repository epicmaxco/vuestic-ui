import { ApiDocsBlock } from '../../../../../types/configTypes'
import { DocsHelper } from '../../../../../helpers/DocsHelper'

const p = (t: string) => `colorsConfig.reactivity.${t}`

export default [
  DocsHelper.subtitle(p('subtitle')),
  DocsHelper.paragraph(p('about')),

] as ApiDocsBlock[]
