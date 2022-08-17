export const componentsConfig = `
//main.js
...
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

const app = createApp(App)
app.use(createVuestic({
  config: {
    components: {
      VaButton: {
        outline: true,
        rounded: false,
        size: 'small',
      },
    },
  } 
}))
`
