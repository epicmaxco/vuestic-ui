import { createI18n } from 'vue-i18n'
import { messages, DEFAULT_LANGUAGE } from './index'

export const i18n = createI18n({
  locale: DEFAULT_LANGUAGE,
  fallbackLocale: 'en',
  messages,
})

export const { te, t, locale, fallbackLocale } = i18n.global
