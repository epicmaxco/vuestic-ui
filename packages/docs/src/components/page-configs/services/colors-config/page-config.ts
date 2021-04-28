import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { componentsConfigCode } from './code'
import { api, reactivity, otherServices } from './sections'

const p = (t: string) => `colorsConfig.${t}`
const example = (t: string) => p(`example.${t}`)
const componentsExample = (t: string) => p(`exampleWithComponentsConfig.${t}`)

export default [
  DocsHelper.title(p('title')),
  DocsHelper.paragraph(p('about')),

  DocsHelper.paragraph(example('about')),
  DocsHelper.paragraph(example('demo')),
  DocsHelper.example('colors-config/change-colors'),

  ...reactivity,
  ...otherServices,
  ...api,
] as ApiDocsBlock[]
