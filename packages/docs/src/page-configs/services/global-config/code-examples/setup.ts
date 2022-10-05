export const setupExampleCode = `
import { createVuestic } from 'vuestic-ui'

createApp(App)
  .use(createVuestic({
    config: {
      icons: [...],
        components: {
          ...,
          all: { ... },
          presets: { ... },
        },
      colors: { ... },
    },
  }))
  .mount('#app')
`
