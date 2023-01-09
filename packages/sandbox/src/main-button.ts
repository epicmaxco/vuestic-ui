import { createApp } from 'vue'
import App from './app.vue'
import { createVuesticEssential, VaButton  } from "vuestic-ui";

const app = createApp(App)

app.use(createVuesticEssential({
  components: { VaButton }
}))

app.mount('#app')
