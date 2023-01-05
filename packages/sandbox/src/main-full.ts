import { createApp } from 'vue'
import App from './app.vue'
import { createVuestic  } from "vuestic-ui";

const app = createApp(App)

app.use(createVuestic())

app.mount('#app')
