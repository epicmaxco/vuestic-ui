export const setupExampleCode = `
import { createVuestic } from 'vuestic-ui'

createApp(App)
  .use(createVuestic({
    // ...

    i18n: {
      ok: 'Добре',
      cancel: 'Скасувати',
      search: 'Пошук',

      // ...
    }
  }))
  .mount('#app')
`
