import { createVuestic, createIconsConfig } from 'vuestic-ui'

createApp(App)
  .use(createVuestic({
    config: {
      colors: {
        variables: {
          success: '#0fb',
          'player-icon': '#aaa',
        }
      },
      icons: createIconsConfig({
        aliases: [
          {
            name: 'prev',
            to: 'fa4-prev',
            color: 'player-icon',
          },
          {
            name: 'play',
            to: 'fa4-play',
            color: 'success',
          }
        ],
        fonts: [...],
      })
    }
  }))
  .mount('#app')
