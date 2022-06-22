export const setupCodeExample = `
import { createVuestic, createIconsConfig } from 'vuestic-ui/src/main'

const aliases = [...]
const fonts = [...]

createApp(App)
  .use(createVuestic, {
    icons: createIconsConfig({ aliases, fonts })
  })
  .mount('#app')
`
