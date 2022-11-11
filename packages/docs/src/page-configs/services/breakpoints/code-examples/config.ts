export const configCode = `
import { createVuestic } from 'vuestic-ui'

createApp(App)
  .use(createVuestic({
    config: {
      breakpoint: {
        enable: true,
        bodyClass: false,
        thresholds: {
          xs: 0,
          sm: 320,
          md: 768,
          lg: 1024,
          xl: 1280,
        },
      },
    }
  }))
  .mount('#app')
`
