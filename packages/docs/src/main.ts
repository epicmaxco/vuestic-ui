import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { i18n } from './locales/i18n'

// plugin to change algolia colors according docs theme
import AlgoliaColorPlugin from './components/sidebar/algolia-search/algolia-color-plugin'
import { VuesticPlugin } from 'vuestic-ui/src/main'
import { VuesticConfig } from './config/vuestic-config'
import { useGtag } from './services/gtag'
import { useTranslateIfExists } from './locales/translateIfExistsPlugin'
import { useMeta } from './services/vue-meta'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(AlgoliaColorPlugin)
app.use(VuesticPlugin, VuesticConfig)

useMeta(app)
useGtag(app, router)
useTranslateIfExists(app)

app.mount('#app')
