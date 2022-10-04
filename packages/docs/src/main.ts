import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { i18n } from './locales/i18n'
import { createVuestic, VuesticComponents } from 'vuestic-ui/src/main'
import { VuesticConfig } from './config/vuestic-config'
import { useGtag } from './services/gtag'
import { useTranslateIfExists } from './locales/translateIfExistsPlugin'
import { useMeta } from './services/vue-meta'

// pwa
import './registerServiceWorker'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(createVuestic({
  config: VuesticConfig,
}))

useMeta(app)
useGtag(app, router)
useTranslateIfExists(app)

app.mount('#app')
