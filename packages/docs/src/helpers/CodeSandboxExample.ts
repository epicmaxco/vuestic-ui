import { getParameters } from 'codesandbox/lib/api/define'
// @ts-ignore
import packageUi from 'vuestic-ui/package.json'

const main = `import { createApp } from "vue"
import App from "./App.vue"
import { VuesticPlugin } from "vuestic-ui"
import 'vuestic-ui/dist/vuestic-ui.css'

const app = createApp(App)
app.use(VuesticPlugin)
app.mount("#app")
`

const babel = `export const presets = [
  '@vue/cli-plugin-babel/preset'
];`

const defaultExample = `<template>
  <div class="pa-4">
    Hello, Vuestic-UI v${packageUi.version}
  </div>
</template>
`

const html = `<link
  href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap"
  rel="stylesheet"
>
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
>
<div id="app"></div>`

const packageJson = ({ dependencies = {}, devDependencies = {} }) => {
  const commonDeps = {
    'core-js': '^3.6.5',
    vue: '^3.0.0',
    'vuestic-ui': `${packageUi.version}`,
  }
  const commonDevDeps = {
    '@vue/cli-plugin-babel': '~4.5.0',
    '@vue/cli-service': '~4.5.0',
    '@vue/compiler-sfc': '^3.0.0',
  }
  return JSON.stringify({
    scripts: {
      serve: 'vue-cli-service serve',
    },
    dependencies: Object.assign(commonDeps, dependencies),
    devDependencies: Object.assign(commonDevDeps, devDependencies),
  })
}

export default (code: string = defaultExample, config = {}) => getParameters({
  files: {
    'package.json': {
      content: packageJson(config),
      isBinary: false,
    },
    'babel.config.js': {
      content: babel,
      isBinary: false,
    },
    'src/main.js': {
      content: main,
      isBinary: false,
    },
    'src/App.vue': {
      content: code,
      isBinary: false,
    },
    'public/index.html': {
      content: html,
      isBinary: false,
    },
  },
})
