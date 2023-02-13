export const configuringVuesticFull = `
// main.*

import { createVuestic } from 'vuestic-ui'
import config from '../vuestic.config.js'

createApp(App)
  .use(createVuestic({ config }))
  .mount('#app')
`

export const configuringVuesticPartial = `
// main.*

import { createVuestic } from 'vuestic-ui'
import config from '../vuestic.config.js'

import { createVuestic } from 'vuestic-ui'

createApp(App)
  .use(createVuestic({
    config: {
      icons: [...],
        components: {
          all: { ... },
          presets: { ... },
        },
      colors: config.colors,
    },
  }))
  .mount('#app')
`

export const configExample = `
// vuestic.config.js

{
breakpoint: {
  thresholds: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    },
  },
colors: {
  variables: {
    black: '#000',
    white: '#fff',
    'gray-50': '#f9fafb',
    'gray-100': '#f3f4f6',
    'gray-200': '#e5e7eb',
    ...
    'rose-700': '#be123c',
    'rose-800': '#9f1239',
    'rose-900': '#881337',
    },
  },
}
`
