export const componentsConfigCode = `
import { createVuestic } from 'vuestic-ui'

createApp(App)
  .use(createVuestic({
    colors: {
      primary: '#ff00ff',
      button: '#000'
    },
    components: {
      VaButton: {
        color: 'button'
      }
    },
  }))
  .mount('#app')
`
