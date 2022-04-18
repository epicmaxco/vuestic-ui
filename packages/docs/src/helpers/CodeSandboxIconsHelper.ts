
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
  import { VuesticPlugin, createIconsConfig } from "vuestic-ui"
  import 'vuestic-ui/dist/vuestic-ui.css'

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
    .use(VuesticPlugin, {
      icons: createIconsConfig({ fonts }),
    })

  app.mount("#app")
`
