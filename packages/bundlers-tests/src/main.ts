import { createApp } from 'vue'
import App from './App.vue'
import { VaInput } from 'vuestic-ui'

const app = createApp(App)

app.component('VaInput', VaInput)

app.mount('#app')
