export const treeShakingExample = `
import { createApp } from 'vue'
import { 
  createVuesticEssential, VaButton, VaSelect,
  VaInput, VaDropdownPlugin 
} from 'vuestic-ui'
import App from './App.vue'
import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/global/typography.css'

createApp(App)
  .use(createVuesticEssential({
    components: { VaButton, VaSelect, VaInput },
    plugins: { VaDropdownPlugin },
    config: { ... }
  }))
  .mount('#app')
`
