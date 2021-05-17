import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { componentsConfigCode } from './code'
import { api, reactivity, otherServices } from './sections'

const p = (t: string) => `colorsConfig.${t}`
const example = (t: string) => p(`colorsConfig.example.${t}`)

export default [
  DocsHelper.title('colorsConfig.title'),
  DocsHelper.paragraph('colorsConfig.about'),

  DocsHelper.paragraph('colorsConfig.example.about'),
  DocsHelper.paragraph('colorsConfig.example.demo'),
  DocsHelper.example('colors-config/change-colors'),

  ...reactivity,
  ...otherServices,
  ...api,
] as ApiDocsBlock[]
