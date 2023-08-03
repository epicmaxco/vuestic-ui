import { type Preview, setup } from "@storybook/vue3";
import './storybook-main.scss'
import VbCard from './components/VbCard.vue'
import VbDemo from './components/VbDemo.vue'

import {
  createIconsConfig,
  createVuesticEssential,
  VaToastPlugin,
  VaModalPlugin,
  VaDropdownPlugin,
  BreakpointConfigPlugin,
} from './../src/main'
import demoIconAliases from './vuestic-config/demo-icon-aliases'
import demoIconFonts from './vuestic-config/demo-icon-fonts'
import { themes } from '@storybook/theming'

setup((app) => {
// TODO Taken from vue-book. We might want to streamline this code.
  app.component('VbDemo', VbDemo)
  app.component('VbCard', VbCard)
  // Register global helpers
  const loremString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  app.config.globalProperties.$vb = {
    log: (message?: any, ...optionalParams: any[]): void => {
      // eslint-disable-next-line no-console
      console.log(message, ...optionalParams)
    },
    alert: (message?: any): void => {
      alert(message)
    },
    lorem: (length = loremString.length): string => {
      return [
        ...Array(Math.floor(length / loremString.length)).fill(loremString),
        loremString.slice(0, (length % loremString.length)),
      ].join(' ')
    },
  }

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
    darkMode: {
      // Override the default dark theme
      dark: {
        ...themes.dark,
        brandImage: "logo.png"
      },
      // Override the default light theme
      light: {
        ...themes.light,
        brandImage: "logo.png",
      },
    },
  },
};

export default preview;
