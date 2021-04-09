import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'

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
  DocsHelper.title('configurationGuide.title'),
  DocsHelper.subtitle('configurationGuide.colors.title'),
  DocsHelper.paragraph('configurationGuide.colors.description'),
  DocsHelper.code(colorsConfig),
  DocsHelper.subtitle('configurationGuide.icons.title'),
  DocsHelper.paragraph('configurationGuide.icons.description'),
  DocsHelper.code(iconsInstall),
  DocsHelper.headline('configurationGuide.icons.title'),
  DocsHelper.paragraph('WIP'),
  DocsHelper.code(iconsConfig),
  DocsHelper.subtitle('configurationGuide.components.title'),
  DocsHelper.paragraph('configurationGuide.components.description'),
  DocsHelper.paragraph('configurationGuide.components.setConfig'),
  DocsHelper.code(componentsConfig),
  DocsHelper.paragraph('configurationGuide.components.example'),
] as ApiDocsBlock[]
