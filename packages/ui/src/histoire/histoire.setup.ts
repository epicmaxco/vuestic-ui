import { defineSetupVue3 } from '@histoire/plugin-vue'

import demoIconAliases from '../vue-book/vuestic-config/demo-icon-aliases'
import demoIconFonts from '../vue-book/vuestic-config/demo-icon-fonts'
import './vuestic.css'

import {
  createIconsConfig,
  createVuesticEssential,
  // VaToastPlugin,
  // VaModalPlugin,
  // VaDropdownPlugin,
  // BreakpointConfigPlugin,
} from '../main'

export const setupVue3 = defineSetupVue3(({ app, story, variant }) => {
  app.use(createVuesticEssential({
    config: {
      icons: createIconsConfig({
        aliases: demoIconAliases,
        fonts: demoIconFonts,
      }),
      colors: {
        variables: {
          banana: '#d0f55d',
        },
      },
    },
    // plugins: { VaToastPlugin, VaDropdownPlugin, VaModalPlugin, BreakpointConfigPlugin },
  }))
})
