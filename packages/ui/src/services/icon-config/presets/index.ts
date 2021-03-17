import { IconsConfig } from '../types'
import { iconConfigsArray } from './fonts'
import DemoAliases from './demo-aliases'
import DocsAliases from './docs-aliases'
import FrameworkAliases from './framework-aliases'

export const iconsPresets: IconsConfig = [
  ...DemoAliases,
  ...DocsAliases,
  ...FrameworkAliases,
  ...iconConfigsArray,
]
