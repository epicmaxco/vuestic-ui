import { createApp } from 'vue'
import App from './App.vue'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

createApp(App)
  .use(createVuestic({
    config: {
      colors: {
        variables: {
          primary: '#343a40',
        }
      }
    }
  }))
  .mount('#app')
