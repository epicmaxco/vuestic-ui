export const treeShakingExample = `
import { createApp } from 'vue'
import App from './App.vue'
import { VaInput, VaButton, VaSelect } from 'vuestic-ui'

createApp(App)
  .component('va-input', VaInput)
  .component('va-button', VaButton)
  .component('va-select', VaSelect)
  .mount('#app')
`;

export const treeShakingPluginExample = `
import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPluginsWithoutComponents } from 'vuestic-ui'
createApp(App)
  .use(VuesticPluginsWithoutComponents)
  .mount('#app')
`;
