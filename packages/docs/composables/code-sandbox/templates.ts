import packageUi from 'vuestic-ui/package.json'

export { default as tsconfig } from './ts-configs/example-tsconfig.json'
export { default as tsconfigNode } from './ts-configs/example-tsconfig.node.json'

export const main = `import { createApp } from "vue"
import App from "./App.vue"
import { createVuestic } from "vuestic-ui"
import 'vuestic-ui/css'

const app = createApp(App)
app.use(createVuestic())
app.mount("#app")
`

export const viteConfig = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
`

export const viteEnv = `declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
`

export const defaultExample = `<template>
  <div class="p-6">
    Hello, Vuestic-UI v${packageUi.version}
  </div>
</template>
`

export const iconsStyles = `
  <!-- Font Awesome 5 -->
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
    rel="stylesheet"
  />
  <!-- Ionic icons -->
  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
`

export const iconsConfig = `
  import { createApp } from "vue"
  import App from "./App.vue"
  import { createVuestic, createIconsConfig } from "vuestic-ui"
  import 'vuestic-ui/css'

  const fonts = [
    {
      name: 'md-{content}',
      class: 'material-icons',
      resolve: ({ content }) => ({ content: content }),
    },
    {
      name: 'ion-{code}',
      resolve: ({ code }) => ({
        tag: 'ion-icon',
        attrs: { name: code },
      }),
    },
    {
      name: 'ion-{code}-outline',
      resolve: ({ code }) => ({
        tag: 'ion-icon',
        attrs: { name: code + '-outline' },
      }),
    },
    {
      name: /(fas|far|fal|fad|fab)-(.*)/,
      resolveFromRegex: (font, code) => ({ class: font + ' fa-' + code +' fa-fw' }),
    },
  ]

  const app = createApp(App)
    .use(createVuestic({
      config: {
        icons: createIconsConfig({ fonts }),
      }
    }))

  app.mount("#app")
`
