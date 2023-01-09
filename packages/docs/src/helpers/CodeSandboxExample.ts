import { getParameters } from 'codesandbox/lib/api/define'
import { iconsStyles, iconsConfig } from './CodeSandboxIconsHelper'
import { CodesandboxConfig } from '../types/configTypes'

import packageUi from 'vuestic-ui/package.json'
import exampleTsconfig from './codesandbox-example-config/example-tsconfig.json'
import exampleTsConfigNode from './codesandbox-example-config/example-tsconfig.node.json'

const main = `import { createApp } from "vue"
import App from "./App.vue"
import { createVuestic } from "vuestic-ui"
import 'vuestic-ui/css'

const app = createApp(App)
app.use(createVuestic())
app.mount("#app")
`

const viteConfig = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
`

const viteEnv = `declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
`

const defaultExample = `<template>
  <div class="p-6">
    Hello, Vuestic-UI v${packageUi.version}
  </div>
</template>
`

const getCodeSandboxHtml = ({ requireIcons = false }: CodesandboxConfig): string => {
  return `
    <link
      href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap"
      rel="stylesheet"
    >
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    >
    <link
      href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    >
    ${requireIcons ? iconsStyles : ''}
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  `
}

const getCodeSandboxMain = ({ requireIcons = false }: CodesandboxConfig): string => {
  if (requireIcons) { return iconsConfig }

  return main
}

const packageJson = ({ dependencies = {}, devDependencies = {} }: CodesandboxConfig): string => {
  const commonDeps = {
    vue: 'latest',
    'vuestic-ui': `${packageUi.version}`,
  }
  const commonDevDeps = {
    '@vitejs/plugin-vue': '~3.0.0',
    typescript: '^4.7.4',
    'vue-tsc': 'latest',
    vite: 'latest',
    sass: 'latest',
  }
  return JSON.stringify({
    type: 'module',
    scripts: {
      serve: 'vite',
    },
    dependencies: Object.assign(commonDeps, dependencies),
    devDependencies: Object.assign(commonDevDeps, devDependencies),
  }, null, 2)
}

export default (code: string = defaultExample, config: CodesandboxConfig = {}): string => getParameters({
  files: {
    'package.json': {
      content: packageJson(config),
      isBinary: false,
    },
    'vite.config.js': {
      content: viteConfig,
      isBinary: false,
    },
    'tsconfig.json': {
      content: JSON.stringify(exampleTsconfig),
      isBinary: false,
    },
    'tsconfig.node.json': {
      content: JSON.stringify(exampleTsConfigNode),
      isBinary: false,
    },
    'src/vite-env.d.ts': {
      content: viteEnv,
      isBinary: false,
    },
    'src/main.ts': {
      content: getCodeSandboxMain(config),
      isBinary: false,
    },
    'src/App.vue': {
      content: code,
      isBinary: false,
    },
    'index.html': {
      content: getCodeSandboxHtml(config),
      isBinary: false,
    },
  },
})
