import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPlugin } from "vuestic-ui";
import 'vuestic-ui/dist/styles/essential.css'
import 'vuestic-ui/dist/styles/global/typography.css'

const app = createApp(App)

app.use(VuesticPlugin)

app.mount('#app')
