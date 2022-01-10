export const iconsInstall = `
yarn add material-design-icons-iconfont -D
// {{ $t('all.code.or') }}
npm install material-design-icons-iconfont -D
`

export const iconsConfig = `
// main.js
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
          resolve: ({iconName}) => ({ class: \`fa fa-\${iconName}\` }),
        },
        {
          name: 'flag-icon-{countryCode} {flagSize}',
          resolve: ({countryCode, flagSize}) => ({
            class: \`flag-icon flag-icon-\${countryCode} flag-icon-\${flagSize}\`
          }),
        }
      ],
    }),
    // ...
  })
`
