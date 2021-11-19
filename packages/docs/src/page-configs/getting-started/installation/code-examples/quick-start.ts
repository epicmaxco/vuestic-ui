export const quickStart = `
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPlugin } from 'vuestic-ui' // <-
import 'vuestic-ui/dist/vuestic-ui.css' // <-
//...
const app = createApp(App)
app.use(VuesticPlugin) // <-
//...
`
