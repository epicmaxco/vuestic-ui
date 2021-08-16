import { ApiDocsBlock } from '@/types/configTypes'
import { DocsHelper } from '@/helpers/DocsHelper'

const config = (path: string) => {
  return `installation.${path}`
}

const installation = `
npm install vuestic-ui
// or
yarn add vuestic-ui
`

const nuxtInstallation = `
// plugins/vuestic.js
import Vue from 'vue'
import { VuesticPlugin } from 'vuestic-ui'

Vue.use(VuesticPlugin)
`

const nuxtConfig = `
// nuxt.config.js
  plugins: [
    ...
    { src: '~/plugins/vuestic.ts' }
  ],
`

const quickStart = `
//main.js
import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPlugin } from 'vuestic-ui' // <-
import 'vuestic-ui/dist/vuestic-ui.css' // <-
//...
const app = createApp(App)
app.use(VuesticPlugin) // <-
//...
`

const colorsConfig = `
//main.js
...
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

const app = createApp(App)
app.use(VuesticPlugin, {
  colors: {
    default: {
      primary: '#23e066',
      secondary: '#002c85',
      success: '#40e583',
      info: '#2c82e0',
      danger: '#e34b4a',
      warning: '#ffc200',
      gray: '#babfc2',
      dark: '#34495e',
    },
    corporate: {
      primary: '#6c7fee',
      secondary: '#6e7ff1',
      success: '#8ddc88',
      info: '#71baff',
      danger: '#f8706d',
      warning: '#ffd652',
      gray: '#8396a5',
      dark: '#34495e',
    },
  }
})
`

const fontInstallationHTML = `
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap" rel="stylesheet"> 
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
`

const fontInstallationCSS = `
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
`

const cliPrepare = `
vue --version
`
export default [
  DocsHelper.title('installation.title'),
  DocsHelper.paragraph('installation.description'),
  DocsHelper.subtitle('installation.manual.title'),
  DocsHelper.paragraph('installation.subtitle'),
  DocsHelper.paragraph('installation.prerequisites'),
  DocsHelper.list(['installation.node','installation.npm']),
  DocsHelper.paragraph('installation.afterCheck'),
  DocsHelper.code(installation, 'bash'),

  DocsHelper.headline('installation.fonts.title'),
  DocsHelper.paragraph('installation.fonts.description'),
  DocsHelper.paragraph('installation.fonts.htmlExampleTitle'),
  DocsHelper.code(fontInstallationHTML),
  DocsHelper.paragraph('installation.fonts.cssExampleTitle'),
  DocsHelper.code(fontInstallationCSS),

  DocsHelper.headline('installation.quickStart.title'),
  DocsHelper.paragraph('installation.quickStart.description'),
  DocsHelper.code(quickStart),

  DocsHelper.subtitle('installation.cli.title'),
  DocsHelper.paragraph('installation.cli.description'),
  DocsHelper.alert('installation.cli.attention', 'warning'),
  DocsHelper.paragraph('installation.cli.prepare'),
  DocsHelper.code(cliPrepare, 'bash'),
  DocsHelper.paragraph('installation.cli.upgrade'),
  DocsHelper.paragraph('installation.cli.codeAnnotation'),
  DocsHelper.code('vue add vuestic-ui', 'bash'),

  // TODO Reenable when nuxt support is added back.
  // DocsHelper.subtitle(config('nuxt.title')),
  // DocsHelper.paragraph(config('nuxt.description')),
  // DocsHelper.code(nuxtInstallation),
  // DocsHelper.code(nuxtConfig),
] as ApiDocsBlock[]
