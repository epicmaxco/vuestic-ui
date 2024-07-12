import { createApp, Plugin, markRaw } from 'vue'
import App from './Devtools.vue'
import { createIconsConfig, createVuesticEssential } from 'vuestic-ui'
import 'vuestic-ui/styles/essential.css'
import './styles.css'
import VSCodeIcon from './components/base/VSCodeIcon.vue'

export const createVuesticDevtools = () => ({
  install(app) {
    const appRoot = document.createElement('div')
    appRoot.id = 'vuestic-devtools'
    document.body.appendChild(appRoot)

    createApp(App)
      .use(createVuesticEssential({
        config: {
          colors: {
            variables: {
              outlinePrimary: '#00b4d8',
              outlineSecondary: '#90e0ef',
              outlinePrimaryBackground: '#00b4d811',
              outlineSecondaryBackground: '#90e0ef01'
            }
          },
          icons: createIconsConfig({
            aliases: [
              {
                name: 'vscode',
                component: markRaw(VSCodeIcon),
              }
            ]
          })
        }
      }))
      .mount(appRoot)
  }
}) satisfies Plugin
