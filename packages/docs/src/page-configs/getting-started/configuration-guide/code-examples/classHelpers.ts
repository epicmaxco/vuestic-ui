export const classHelpersConfig = `
// main.js
...
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

const app = createApp(App)
app.use(VuesticPlugin, {
  colors: { ... },
  classHelpers: [
    {
      stylePrefix: 'custom',
      styleProperty: ['border', 'color'],
    },
    {
      stylePrefix: 'brand',
      styleProperty: 'background',
    },
  ]
})
`
