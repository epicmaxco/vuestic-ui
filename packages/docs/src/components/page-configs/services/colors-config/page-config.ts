import { ApiDocsBlock } from '@/types/configTypes'
import { DocsHelper } from '@/helpers/DocsHelper'
import { api, reactivity, otherServices } from './sections'

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
