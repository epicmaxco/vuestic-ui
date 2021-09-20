import { createI18n } from 'vue-i18n'
import { DEFAULT_LANGUAGE, messages } from '@/locales'

const i18n = createI18n({
  locale: DEFAULT_LANGUAGE,
  fallbackLocale: 'en',
  messages,
  missing (_, key) {
    return key
  },
})

export default i18n
