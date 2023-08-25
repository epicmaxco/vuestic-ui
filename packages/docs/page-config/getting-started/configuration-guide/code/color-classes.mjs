import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

createApp(App)
  .use(createVuestic({
    colors: { /* ... */ },
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
  }))
