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
    // Default colors
    primary: '#23e066',
    secondary: '#002c85',
    success: '#40e583',
    info: '#2c82e0',
    danger: '#e34b4a',
    warning: '#ffc200',
    gray: '#babfc2',
    dark: '#34495e',

    // Custom colors
    yourCustomColor: '#d0f55d',
  },
})
`

const iconsInstall = `
yarn add material-design-icons-iconfont -D
// $t('all.code.or')
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
          "color": "#FFD43A",
          "to": "fa4-bell"
        },
        {
          "name": "ru",
          "to": "flag-icon-ru small"
        },
      ],
      fonts: [
        {
          name: 'fa4-{iconName}',
          resolve: ({iconName}) => ({ class: \`fa fa-\${code}\` }),
        },
        {
          name: 'flag-icon-{countryCode} {flagSize}'/,
          resolve: ({countryCode, flagSize}) => ({ class: \`flag-icon flag-icon-\${countryCode} flag-icon-\${flagSize}\` }),
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
      rounded: false,
      size: 'small',
    },
  },
})
`

export default [
  DocsHelper.title('configurationGuide.title'),
  DocsHelper.paragraph('configurationGuide.description'),
  DocsHelper.subtitle('configurationGuide.colors.title'),
  DocsHelper.paragraph('configurationGuide.colors.description'),
  DocsHelper.code(colorsConfig),
  DocsHelper.link('configurationGuide.readMore', `/services/colors-config`),

  DocsHelper.subtitle('configurationGuide.icons.title'),
  DocsHelper.paragraph('configurationGuide.icons.description'),
  DocsHelper.code(iconsInstall, 'bash'),
  DocsHelper.headline('configurationGuide.icons.subtitle'),
  DocsHelper.paragraph('configurationGuide.icons.subDescription'),
  DocsHelper.code(iconsConfig),
  DocsHelper.link('configurationGuide.readMore', `/services/icons-config`),

  DocsHelper.subtitle('configurationGuide.components.title'),
  DocsHelper.paragraph('configurationGuide.components.intro'),
  DocsHelper.paragraph('configurationGuide.components.description'),
  DocsHelper.example('config/PageConfigButtonDefault', { hideCode: true }),
  DocsHelper.paragraph('configurationGuide.components.action'),
  DocsHelper.code(componentsConfig),
  DocsHelper.paragraph('configurationGuide.components.result'),
  DocsHelper.example('config/PageConfigButton', { hideCode: true }),
  DocsHelper.paragraph('configurationGuide.components.example'),
  DocsHelper.paragraph('configurationGuide.components.more'),
  DocsHelper.link('configurationGuide.readMore', `/services/components-config`),
] as ApiDocsBlock[]
