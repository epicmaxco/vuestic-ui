export const componentsConfig = `
//main.js
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

const app = createApp(App)
  .use(createVuestic({
    config: {
      components: {
        VaButton: {
          preset: "secondary",
          borderColor: "primary",
          size: "small",
        },
      },
    }
  }))
  .mount('#app')
`
