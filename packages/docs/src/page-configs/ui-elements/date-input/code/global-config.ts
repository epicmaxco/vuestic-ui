export default `
import { VuesticPlugin } from 'vuestic-ui'

createApp(App)
  .use(VuesticPlugin, {
    icons: [ ... ],
    components: {
      VaDateInput: {
        formatDate: (date) => {
          // ...
        },
        parseDate: (str) => {
          // ...
        }
      }
    },
    colors: { ... },
  })
  .mount('#app')
`
