export const setupCodeExample = `
import { VuesticPlugin } from 'vuestic-ui/src/main'

createApp(App)
  .use(VuesticPlugin, {
    colors: { ... },
    classHelpers: [
      {
        stylePrefix: 'custom',
        styleProperty: ['border-color', 'color'],
      },
      {
        stylePrefix: 'brand',
        styleProperty: 'background',
      },
    ]
  })
  .mount('#app')
`
