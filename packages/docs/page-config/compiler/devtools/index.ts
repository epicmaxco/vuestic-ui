export default definePageConfig({
  blocks: [
    block.title('Devtools'),

    block.alert('This feature is in active development state', 'warning'),

    block.paragraph('Devtools is feature that comes with `@vuestic/compiler` package.'),
    block.paragraph('Devtools injects a UI for editing component props, slots and code to your application in development mode.'),

    block.subtitle('Installation'),

    block.paragraph('Install `@vuestic/compiler` package:'),

    block.code({
      npm: 'npm install @vuestic/compiler@latest --save-dev',
      yarn: 'yarn add @vuestic/compiler@latest --dev'
    }, 'bash'),

    block.paragraph('Add `@vuestic/compiler` to your `vite.config.js` or `vite.config.ts` file:'),

    block.code(`
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vuestic } from '@vuestic/compiler/vite'

export default defineConfig({
  plugins: [
    vuestic({
      devtools: true,
    }),
    vue(),
  ],
})
`),

    block.alert('Make sure to register `vuestic` plugin before `vue` plugin', 'info'),
    block.paragraph('Webpack and Nuxt support will be available later.'),

    block.subtitle('Usage'),

    block.paragraph('Start your application in development mode and open it in the browser. To open Devtools, press `ALT` + `F12` (or `OPTION` + `F12` on macOS) to enter in dev mode.'),

    block.subtitle('Features'),

    block.paragraph('Right now with devtools you can:'),
    block.list([
      'Click on component to see its props, slots, source code in the right sidebar',
      'Edit component props, event with UI',
      'Edit component source code in Devtools editor',
      'Review components tree in the left sidebar',
      'Use mouse to move application window, mouse wheel to zoom in/out',
    ]),
  ]
})
