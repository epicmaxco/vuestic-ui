export const setupExampleCode = `
import { createVuestic } from 'vuestic-ui'

createApp(App)
  .use(createVuestic({
    config: {
      icons: [...],
      components: { ... },
      componentsAll: { ... },
      colors: { ... },
    },
  }))
  .mount('#app')
`
