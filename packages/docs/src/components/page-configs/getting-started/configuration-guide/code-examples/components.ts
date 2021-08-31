export const componentsConfig = `
//main.js
...
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

const app = createApp(App)
app.use(VuesticPlugin, {
  components: {
    VaButton: {
      outline: true,
      rounded: false,
      size: 'small',
    },
  },
})
`
