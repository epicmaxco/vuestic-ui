import { createVuestic } from 'vuestic-ui'

createApp(App)
  .use(createVuestic({
    config: {
      icons: [ /* ... */ ],
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
      colors: { /* ... */ },
    },
  }))
  .mount('#app')
