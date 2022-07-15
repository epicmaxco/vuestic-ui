import { createApp } from 'vue'
import App from './App.vue'
import { createVuesticEssential, VaInput, VaTimePicker, VaTimeInput, VaButton  } from "vuestic-ui";
import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'

const app = createApp(App)

app.use(createVuesticEssential({
  components: { VaInput, VaTimePicker, VaTimeInput, VaButton }
}))

app.mount('#app')
