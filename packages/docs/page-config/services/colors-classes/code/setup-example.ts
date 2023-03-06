// main.js
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

createApp()
  .use(createVuestic({
    config: {
      colors: { ... },
      colorsClasses: [
        {
          prefix: 'custom',
          property: ['border', 'color'],
        },
        {
          prefix: 'brand',
          property: 'background',
        },
      ],
    }
  }))
  .mount('#app')
