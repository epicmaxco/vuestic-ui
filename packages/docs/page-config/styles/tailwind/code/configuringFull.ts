// main.*

import { createVuestic } from 'vuestic-ui'
import config from '../vuestic.config.js'

createApp(App)
  .use(createVuestic({ config }))
  .mount('#app')
