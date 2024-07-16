export default definePageConfig({
  blocks: [
    block.title('CSS Layers'),

    block.paragraph('CSS layers is a compiler feature that allows you to make Vuestic UI styles less specific and easier to override.'),
    block.paragraph('It is very important to control the specificity of CSS selectors when you deal with tree-shaking. Because components load styles only when component is used on page, there are likely situations when Vuestic styles can override your global styles (or Tailwind) simply because it loads later in the bundle.'),
    block.paragraph('To prevent this kind of issues, you can use `cssLayers` option in `@vuestic/compiler` to make Vuestic styles less specific. This way you can override Vuestic styles with your own styles without using `!important` or other hacks.'),
    block.paragraph('Though, it is important to remember that all of your global styles will override Vuestic built-in styles. Make sure to not use global selectors like `*`, because it will have the highest specificity and will override all Vuestic styles.'),

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
    vuestic({
      cssLayers: true,
    }),
    vue(),
  ],
})
`,
    }),

    block.subtitle('Tailwind and Normalize.css'),

    block.paragraph('If you use Tailwind CSS or Normalize.css in your project, with `cssLayers` all the styles from these libraries will have higher priority over Vuestic styles.'),
    block.paragraph('This will break Vuestic styles, because Tailwind and Normalize.css have a lot of global selectors that will override Vuestic styles.'),
    block.paragraph('To fix this issue, make sure to import these global styles after vuestic styles and cover them into its own css layer:'),

    block.code({
      'main.js': `
import 'vuestic-ui/styles'
import 'assets/styles/tailwind.css'
    `,
    }, 'js'),

    block.paragraph('Now include `tailwind/base` into own css layer:'),

    block.code({
      'assets/styles/tailwind.css': `
@layer tailwind {
  @import "tailwindcss/base";
}

@tailwind components;
@tailwind utilities;
    `
    }, 'css'),

    block.paragraph('This way, Normalize.css will have lower priority than Vuestic styles and will not break them, but Tailwind utilities will have higher priority and will override Vuestic styles regardless of load order.'),
  ]
})
