import { createApp } from 'vue'
import App from './App.vue'
import { VaInput } from 'vuestic-ui'
import 'vuestic-ui/dist/styles/essential.css'
import 'vuestic-ui/dist/styles/global/typography.css'

const app = createApp(App)

app.component('VaInput', VaInput)

app.mount('#app')
