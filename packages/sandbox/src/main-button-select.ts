import { createApp } from 'vue'
import App from './app.vue'
import { createVuesticEssential, VaButton, VaSelect  } from "vuestic-ui";

const app = createApp(App)

app.use(createVuesticEssential({
  components: { VaButton, VaSelect }
}))

app.mount('#app')
