export const setupCodeExample = `
import { VuesticPlugin, createIconsConfig } from 'vuestic-ui/src/main'

const aliases = [...]
const fonts = [...]

createApp(App)
  .use(VuesticPlugin, {
    icons: createIconsConfig({ aliases, fonts })
  })
  .mount('#app')
`;
