export const componentsConfig = `
//main.js
...
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

const app = createApp(App)
app.use(createVuestic({
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
`
