export const setupExampleCode = `
import { VuesticPlugin } from 'vuestic-ui'

createApp(App)
  .use(VuesticPlugin, {
    icons: [...],
    components: { ... },
    componentsAll: { ... },
    colors: { ... },
  })
  .mount('#app')
`;
