import { IconsConfig } from '../types'
import { iconConfigsArray } from './fonts'
import DocsAliases from './docs-aliases'
import { VuesticAliases } from './vuestic-aliases'

export const iconsPresets: IconsConfig = [
  ...DocsAliases,
  ...VuesticAliases,
  ...iconConfigsArray,
]
