import { createApp, Plugin } from 'vue'
import App from './Devtools.vue'
import { createVuesticEssential } from 'vuestic-ui'
import 'vuestic-ui/styles/essential.css'
import './styles.css'

export const createVuesticDevtools = () => ({
  install(app) {
    const appRoot = document.createElement('div')
    appRoot.id = 'vuestic-devtools'
    document.body.appendChild(appRoot)

    createApp(App)
      .use(createVuesticEssential())
      .mount(appRoot)
  }
}) satisfies Plugin
