import { getParameters } from 'codesandbox/lib/api/define'
import { CodesandboxConfig } from '../types/configTypes'
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
const ICON_FONTS = `
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
      rel="stylesheet"
    />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
      rel="stylesheet"
    />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/3.0.0/css/ionicons-core.min.css"
      integrity="sha512-NSMQZM1faPgx9ZS2XXgNhPgiPyIJyhRCR2V0G/6KZKTbTjS20eXWTmuztKGdzCVgn7ry+I0CknTqH4Uc3zS7TA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
      rel="stylesheet"
    />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/3.0.0/css/ionicons.min.css"
      integrity="sha512-1MnDtyeTdty8j5fL/qDGB0Q2akuH88v1wA9QO9CRZlKUBY10Ch++Yle1XUjNE2vleqvhIPb9MxLrktY+qLyDng=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
      rel="stylesheet"
    />
    <script src="https://cdn.jsdelivr.net/npm/entypo@2.2.1/index.min.js"></script>
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
    ${requireIcons ? ICON_FONTS : ''}
    <div id="app"></div>
  `
}

const packageJson = ({ dependencies = {}, devDependencies = {} }: CodesandboxConfig): string => {
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

export default (code: string = defaultExample, config: CodesandboxConfig = {}): string => getParameters({
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
      content: getCodeSandboxHtml(config),
      isBinary: false,
    },
  },
})
