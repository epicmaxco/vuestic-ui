export const pluginCode = `
import { createVuesticNuxt } from 'vuestic-ui'
import 'vuestic-ui/css'

export default createVuesticNuxt({
  config: {
    // Config here
  }
})
`

export const nuxtConfigCode = `
export default defineNuxtConfig({
  alias: {
    '~normalize.css/normalize.css': 'normalize.css/normalize.css'
  },

  meta: {
    link: [
      { href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap', rel: 'stylesheet' },
      { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' },
    ],
  },
})
`
