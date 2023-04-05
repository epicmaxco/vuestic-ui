// main.*

import { createVuestic } from 'vuestic-ui'
import config from '../vuestic.config.js'

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
