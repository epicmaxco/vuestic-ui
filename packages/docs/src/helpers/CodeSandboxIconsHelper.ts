
export const iconsStyles = `
  <!-- Font Awesome 5 -->
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
    rel="stylesheet"
  />
  <!-- Ionic icons -->
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
      resolve: ({ code }) => ({ class: 'icon ion-md-' + code }),
    },
    {
      name: 'ion-outline-{code}',
      resolve: ({ code }) => ({ class: 'icon ion-ios-' + code + '-outline' }),
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
