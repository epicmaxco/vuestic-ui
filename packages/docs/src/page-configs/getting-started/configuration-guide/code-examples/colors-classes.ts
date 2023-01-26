export const colorsClasses = `
// main.js
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

const app = createApp(App)

app.use(VuesticPlugin, {
  colors: { ... },
  colorsClasses: [
    {
      prefix: '',
      property: ['border', 'color'],
    },
    {
      prefix: 'brand',
      property: 'background',
    },
  ],
})
`
