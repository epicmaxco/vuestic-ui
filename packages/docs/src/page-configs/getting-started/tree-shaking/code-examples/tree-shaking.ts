export const treeShakingExample = `
import { createApp } from 'vue'
import { 
  createVuesticEssential, VaButton, VaSelect,
  VaInput, VaDropdownPlugin 
} from 'vuestic-ui'
import App from './App.vue'

createApp(App)
  .use(createVuesticEssential({
    components: { VaButton, VaSelect, VaInput },
    plugins: { VaDropdownPlugin },
    config: { ... }
  }))
  .mount('#app')
`
