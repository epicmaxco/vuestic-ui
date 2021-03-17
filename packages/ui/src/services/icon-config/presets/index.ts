import { IconsConfig } from '../types'
import { fontPressetsArray } from './fonts'
import DocsAliases from './docs-aliases'
import { VuesticAliases } from './vuestic-aliases'

export const iconsPresets: IconsConfig = [
  ...DocsAliases,
  ...VuesticAliases,
  ...fontPressetsArray,
]
