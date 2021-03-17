import { IconsConfig } from '../types'
import { iconConfigsArray } from './fonts'
import DemoAliases from './demo-aliases'
import DocsAliases from './docs-aliases'
import { VuesticAliases } from './vuestic-aliases'

export const iconsPresets: IconsConfig = [
  ...DemoAliases,
  ...DocsAliases,
  ...VuesticAliases,
  ...iconConfigsArray,
]
