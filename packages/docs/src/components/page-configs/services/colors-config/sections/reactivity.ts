import { ApiDocsBlock } from '../../../../../types/configTypes'
import { DocsHelper } from '../../../../../helpers/DocsHelper'

const p = (t: string) => `colorsConfig.reactivity.${t}`

export default [
  DocsHelper.subtitle('colorsConfig.reactivity.subtitle'),
  DocsHelper.paragraph('colorsConfig.reactivity.about'),

] as ApiDocsBlock[]
