import { ApiDocsBlock } from '@/types/configTypes'
import { DocsHelper } from '@/helpers/DocsHelper'

const config = (path: string) => {
  return `installation.${path}`
}

const installation = `
npm install vuestic-ui
//or
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
import { VuesticPlugin } from 'vuestic-ui' //(✓)
import 'vuestic-ui/dist/vuestic-ui.css' //(✓)
//...
const app = createApp(App)
app.use(VuesticPlugin) //(✓)
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

const iconsInstall = `
yarn add material-design-icons-iconfont -D
// or
npm install material-design-icons-iconfont -D
`

const iconsConfig = `
//main.js
...
import { VuesticPlugin, createIconsConfig } from 'vuestic-ui/src/main'
import 'vuestic-ui/dist/vuestic-ui.css'

createApp(App)
  .use(VuesticPlugin, {
    icons: createIconsConfig({
      aliases: [
        {
          "name": "bell",
          "to": "fa4-bell"
        },
        {
          "name": "ru",
          "to": "flag-icon-ru small"
        },
      ],
      fonts: [
        {
          name: /fa4-(.*)/,
          iconClass: (code) => \`fa4fafa -\${code}\`
        },
        {
          name: /flag-icon-(.*) (.*)/,
          iconClass: (code, size) => \`flag - iconflag - icon -\${code}flag - icon -\${size}\`
        }
      ],
    }),
    // ...
  })
`

const componentsConfig = `
//main.js
...
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

const app = createApp(App)
app.use(VuesticPlugin, {
  components: {
    VaButton: {
      outline: true,
      round: false,
      size: 'small',
    },
  },
})
`
export default [
  DocsHelper.title(config('title')),
  DocsHelper.subtitle(config('manual.title')),
  DocsHelper.paragraph(config('subtitle')),
  DocsHelper.paragraph(config('prerequisites')),
  DocsHelper.paragraph(config('node')),
  DocsHelper.paragraph(config('npm')),
  DocsHelper.paragraph(config('afterCheck')),
  DocsHelper.code(installation),
  DocsHelper.headline(config('quickStart.title')),
  DocsHelper.paragraph(config('quickStart.description')),
  DocsHelper.code(quickStart),
  DocsHelper.subtitle(config('cli.title')),
  DocsHelper.paragraph(config('cli.description')),
  DocsHelper.paragraph(config('cli.attention')),
  DocsHelper.paragraph(config('cli.linkToOfficial')),
  DocsHelper.paragraph(config('cli.codeAnnotation')),
  DocsHelper.code('vue add vuestic-ui'),
  // DocsHelper.subtitle(config('nuxt.title')),
  // DocsHelper.paragraph(config('nuxt.description')),
  // DocsHelper.code(nuxtInstallation),
  // DocsHelper.code(nuxtConfig),
// examples
  // ...DocsHelper.exampleBlock(
  //   'installation.examples.yourExample.title',
  //   'installation.examples.yourExample.text',
  //   'va-installation/Example',
  // ),
] as ApiDocsBlock[]
