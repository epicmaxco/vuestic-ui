import { IconsConfig } from '../types'
import { fontPresets } from './fonts'
import DemoAliases from './demo-aliases'
import DocsAliases from './docs-aliases'
import FrameworkAliases from './framework-aliases'

// TODO: Move tihs preset to global config automaticly and
// remove code from book-main.ts
const config: {
  VaIcon: { iconsConfig: IconsConfig }
} = {
  VaIcon: {
    iconsConfig: fontPresets,
  },
}

export default config
