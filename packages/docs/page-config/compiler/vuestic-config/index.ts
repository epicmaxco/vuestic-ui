export default definePageConfig({
  blocks: [
    block.title('Vuestic Config'),

    block.paragraph('Vuestic config is a file that allows you to configure Vuestic UI components. You can customize the theme, layout, and other settings.'),
    block.paragraph('Compiler can automatically add Vuestic config to your project, but you need to manually create file `vuestic.config.ts` in the root of your project. You can find the example of the config file below.'),

    block.code({
      'vuestic.config.ts': `
import { defineVuesticConfig } from 'vuestic-ui'

export default defineVuesticConfig({
  // Config here
})
      `
    }),

    block.alert('It is new recommended way to configure Vuestic UI components', 'info'),

    block.subtitle('Installation'),

    block.code({
      npm: 'npm install @vuestic/compiler@latest --save-dev',
      yarn: 'yarn add @vuestic/compiler@latest --dev'
    }, 'bash'),

    block.paragraph('Add `@vuestic/compiler` to your `vite.config.js` or `vite.config.ts` file and set `cssLayers` option to `true`:'),

    block.code({
      'vite.config.js': `
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vuestic } from '@vuestic/compiler/vite'

export default defineConfig({
  plugins: [
    vuestic(),
    vue(),
  ],
})
`,
    }),

    block.subtitle('Typescript and IDE suggestions'),

    block.paragraph('Vuestic compiler will generate typescript types, so you can get suggestions from your IDE for things like color names, i18n keys, icon names.'),

    block.paragraph('Make sure to include generated types to your tsconfig.json:'),

    block.code({
      'tsconfig.json': `
{
  "include": ["node_modules/.vuestic/*.d.ts", "src/**/*"]
}
      `
    }),

    block.paragraph('In future versions, we can use the Vuestic config to generate code in compile time, that will reduce your bundle size and improve performance.'),
  ]
})
