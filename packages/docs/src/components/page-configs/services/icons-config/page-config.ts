import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { problem, fonts, aliases, setup, api } from './sections'

const prefix = (text: string) => `iconsConfig.${text}`

export default [
  DocsHelper.title('iconsConfig.title'),
  DocsHelper.paragraph('iconsConfig.about'),
  DocsHelper.link('iconsConfig.readBeforeStart', `/ui-elements/icon`),

  ...problem,
  ...fonts,
  ...aliases,
  ...setup,
  ...api,
] as ApiDocsBlock[]
