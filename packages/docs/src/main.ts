import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createI18n } from 'vue-i18n'
import { messages, DEFAULT_LANGUAGE } from './locales'

// plugin to change algolia colors according docs theme
import AlgoliaColorPlugin from './components/sidebar/algolia-search/algolia-color-plugin'
import { VuesticPlugin } from 'vuestic-ui/src/main'
import { VuesticConfig } from './config/vuestic-config'
import { useGtag } from './services/gtag'
import { useMeta } from '@/services/vue-meta'

export const i18n = createI18n({ locale: 'en', messages, fallbackLocale: 'en' })

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(AlgoliaColorPlugin)
app.use(VuesticPlugin, VuesticConfig)

useMeta(app)
useGtag(app, router)

app.mount('#app')

// Update i18n locale if needed.
router.beforeEach((to) => {
  const newLocale = to.params.locale as string || DEFAULT_LANGUAGE
  const currentLocale = i18n.global.locale

  if (newLocale === currentLocale) { return }

  i18n.global.locale = newLocale
})
