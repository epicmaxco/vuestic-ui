import { type Preview, setup } from "@storybook/vue3";

import {
  createIconsConfig,
  createVuesticEssential,
  VaToastPlugin,
  VaModalPlugin,
  VaDropdownPlugin,
  BreakpointConfigPlugin,
} from './../src/main'
import demoIconAliases from '../src/vue-book/vuestic-config/demo-icon-aliases'
import demoIconFonts from '../src/vue-book/vuestic-config/demo-icon-fonts'

setup((app) => {
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
    plugins: { VaToastPlugin, VaDropdownPlugin, VaModalPlugin, BreakpointConfigPlugin },
  }))
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
